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
                SELECT id, username, email, role, created_at,
                    (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as orders_count,
                    (SELECT COALESCE(SUM(total), 0) FROM orders WHERE user_id = users.id) as total_spent
                FROM users 
                WHERE id = ?
            ");
            $stmt->execute([(int)$_GET['id']]);
            $user = $stmt->fetch();
            
            if ($user) {
                jsonResponse($user);
            } else {
                jsonResponse(['error' => 'User not found'], 404);
            }
        } else {
            $stmt = $pdo->query("
                SELECT id, username, email, role, created_at,
                    (SELECT COUNT(*) FROM orders WHERE user_id = users.id) as orders_count,
                    (SELECT COALESCE(SUM(total), 0) FROM orders WHERE user_id = users.id) as total_spent
                FROM users 
                ORDER BY created_at DESC
            ");
            jsonResponse($stmt->fetchAll());
        }
        break;
        
    case 'PUT':
        $input = getInput();
        $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
        $role = trim($input['role'] ?? '');
        
        if ($id <= 0) {
            jsonResponse(['error' => 'User ID required'], 400);
        }
        
        if ($id === $_SESSION['user_id']) {
            jsonResponse(['error' => 'Cannot change own role'], 400);
        }
        
        $validRoles = ['user', 'admin'];
        if (!in_array($role, $validRoles)) {
            jsonResponse(['error' => 'Invalid role'], 400);
        }
        
        $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
        $stmt->execute([$role, $id]);
        
        jsonResponse([
            'success' => true,
            'message' => 'User role updated'
        ]);
        break;
        
    case 'DELETE':
        $input = getInput();
        $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
        
        if ($id <= 0) {
            jsonResponse(['error' => 'User ID required'], 400);
        }
        
        if ($id === $_SESSION['user_id']) {
            jsonResponse(['error' => 'Cannot delete yourself'], 400);
        }
        
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$id]);
        
        jsonResponse([
            'success' => true,
            'message' => 'User deleted'
        ]);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

