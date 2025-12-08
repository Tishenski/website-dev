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
                SELECT o.*, u.username, u.email
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                WHERE o.id = ?
            ");
            $stmt->execute([(int)$_GET['id']]);
            $order = $stmt->fetch();
            
            if ($order) {
                $stmt = $pdo->prepare("
                    SELECT oi.*, p.name as product_name, p.image as product_image
                    FROM order_items oi
                    JOIN products p ON oi.product_id = p.id
                    WHERE oi.order_id = ?
                ");
                $stmt->execute([$order['id']]);
                $order['items'] = $stmt->fetchAll();
                
                jsonResponse($order);
            } else {
                jsonResponse(['error' => 'Order not found'], 404);
            }
        } else {
            $stmt = $pdo->query("
                SELECT o.*, u.username, u.email,
                    (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as items_count
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                ORDER BY o.created_at DESC
            ");
            jsonResponse($stmt->fetchAll());
        }
        break;
        
    case 'PUT':
        $input = getInput();
        $id = (int)($input['id'] ?? $_GET['id'] ?? 0);
        $status = trim($input['status'] ?? '');
        
        if ($id <= 0) {
            jsonResponse(['error' => 'Order ID required'], 400);
        }
        
        $validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
        if (!in_array($status, $validStatuses)) {
            jsonResponse(['error' => 'Invalid status'], 400);
        }
        
        $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        
        jsonResponse([
            'success' => true,
            'message' => 'Order status updated'
        ]);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

