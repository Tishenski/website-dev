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
        $stmt = $pdo->query("
            SELECT c.*, 
                (SELECT COUNT(*) FROM products WHERE category_id = c.id) as products_count
            FROM categories c 
            ORDER BY c.name
        ");
        jsonResponse($stmt->fetchAll());
        break;
        
    case 'POST':
        $input = getInput();
        
        $name = trim($input['name'] ?? '');
        $description = trim($input['description'] ?? '');
        
        if (empty($name)) {
            jsonResponse(['error' => 'Name is required'], 400);
        }
        
        $stmt = $pdo->prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
        $stmt->execute([$name, $description]);
        
        jsonResponse([
            'success' => true,
            'id' => $pdo->lastInsertId(),
            'message' => 'Category created'
        ]);
        break;
        
    case 'PUT':
        $input = getInput();
        $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
        
        if ($id <= 0) {
            jsonResponse(['error' => 'Category ID required'], 400);
        }
        
        $name = trim($input['name'] ?? '');
        $description = trim($input['description'] ?? '');
        
        if (empty($name)) {
            jsonResponse(['error' => 'Name is required'], 400);
        }
        
        $stmt = $pdo->prepare("UPDATE categories SET name = ?, description = ? WHERE id = ?");
        $stmt->execute([$name, $description, $id]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Category updated'
        ]);
        break;
        
    case 'DELETE':
        $input = getInput();
        $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
        
        if ($id <= 0) {
            jsonResponse(['error' => 'Category ID required'], 400);
        }
        
        $stmt = $pdo->prepare("UPDATE products SET category_id = NULL WHERE category_id = ?");
        $stmt->execute([$id]);
        
        $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Category deleted'
        ]);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

