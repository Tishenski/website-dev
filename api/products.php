<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("
                SELECT p.*, c.name as category_name 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                WHERE p.id = ?
            ");
            $stmt->execute([(int)$_GET['id']]);
            $product = $stmt->fetch();
            
            if ($product) {
                jsonResponse($product);
            } else {
                jsonResponse(['error' => 'Product not found'], 404);
            }
        } else {
            $where = [];
            $params = [];
            
            if (!empty($_GET['category']) && is_numeric($_GET['category'])) {
                $where[] = "p.category_id = ?";
                $params[] = (int)$_GET['category'];
            }
            
            if (!empty($_GET['q'])) {
                $where[] = "(p.name LIKE ? OR p.description LIKE ?)";
                $params[] = '%' . $_GET['q'] . '%';
                $params[] = '%' . $_GET['q'] . '%';
            }
            
            $sql = "SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id";
            if ($where) {
                $sql .= " WHERE " . implode(' AND ', $where);
            }
            $sql .= " ORDER BY p.id DESC LIMIT 100";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $products = $stmt->fetchAll();
            
            jsonResponse($products);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

