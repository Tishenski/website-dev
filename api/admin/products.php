<?php
require_once '../config.php';

function requireAdmin() {
    if (!isLoggedIn() || $_SESSION['role'] !== 'admin') {
        jsonResponse(['error' => 'Access denied'], 403);
    }
}

requireAdmin();

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
            $stmt = $pdo->query("
                SELECT p.*, c.name as category_name 
                FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id 
                ORDER BY p.id DESC
            ");
            jsonResponse($stmt->fetchAll());
        }
        break;
        
    case 'POST':
        $input = getInput();
        
        $name = trim($input['name'] ?? '');
        $description = trim($input['description'] ?? '');
        $price = (float)($input['price'] ?? 0);
        $image = trim($input['image'] ?? '');
        $categoryId = (int)($input['category_id'] ?? 0);
        $stock = (int)($input['stock'] ?? 0);
        
        if (empty($name) || $price <= 0) {
            jsonResponse(['error' => 'Name and price are required'], 400);
        }
        
        $stmt = $pdo->prepare("
            INSERT INTO products (name, description, price, image, category_id, stock) 
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$name, $description, $price, $image, $categoryId ?: null, $stock]);
        
        $productId = $pdo->lastInsertId();
        
        jsonResponse([
            'success' => true,
            'id' => $productId,
            'message' => 'Product created successfully'
        ]);
        break;
        
    case 'PUT':
        $input = getInput();
        $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
        
        if ($id <= 0) {
            jsonResponse(['error' => 'Product ID required'], 400);
        }
        
        $name = trim($input['name'] ?? '');
        $description = trim($input['description'] ?? '');
        $price = (float)($input['price'] ?? 0);
        $image = trim($input['image'] ?? '');
        $categoryId = (int)($input['category_id'] ?? 0);
        $stock = (int)($input['stock'] ?? 0);
        
        if (empty($name) || $price <= 0) {
            jsonResponse(['error' => 'Name and price are required'], 400);
        }
        
        $stmt = $pdo->prepare("
            UPDATE products 
            SET name = ?, description = ?, price = ?, image = ?, category_id = ?, stock = ?
            WHERE id = ?
        ");
        $stmt->execute([$name, $description, $price, $image, $categoryId ?: null, $stock, $id]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Product updated successfully'
        ]);
        break;
        
    case 'DELETE':
        $input = getInput();
        $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
        
        if ($id <= 0) {
            jsonResponse(['error' => 'Product ID required'], 400);
        }
        
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $stmt->execute([$id]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

