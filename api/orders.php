<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        requireAuth();
        
        if (isset($_GET['id'])) {
            $stmt = $pdo->prepare("
                SELECT o.*, 
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', oi.id,
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'product_name', p.name,
                            'product_image', p.image
                        )
                    ) as items
                FROM orders o
                LEFT JOIN order_items oi ON o.id = oi.order_id
                LEFT JOIN products p ON oi.product_id = p.id
                WHERE o.id = ? AND o.user_id = ?
                GROUP BY o.id
            ");
            $stmt->execute([(int)$_GET['id'], $_SESSION['user_id']]);
            $order = $stmt->fetch();
            
            if ($order) {
                $order['items'] = json_decode($order['items']);
                jsonResponse($order);
            } else {
                jsonResponse(['error' => 'Order not found'], 404);
            }
        } else {
            $stmt = $pdo->prepare("
                SELECT * FROM orders 
                WHERE user_id = ? 
                ORDER BY created_at DESC
            ");
            $stmt->execute([$_SESSION['user_id']]);
            $orders = $stmt->fetchAll();
            jsonResponse($orders);
        }
        break;
        
    case 'POST':
        requireAuth();
        
        $stmt = $pdo->prepare("
            SELECT p.*, c.quantity, (p.price * c.quantity) as total_price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        ");
        $stmt->execute([$_SESSION['user_id']]);
        $cart = $stmt->fetchAll();
        
        if (empty($cart)) {
            jsonResponse(['error' => 'Cart is empty'], 400);
        }
        
        $total = array_sum(array_column($cart, 'total_price'));
        
        $pdo->beginTransaction();
        
        try {
            $stmt = $pdo->prepare("INSERT INTO orders (user_id, total, status) VALUES (?, ?, 'pending')");
            $stmt->execute([$_SESSION['user_id'], $total]);
            $orderId = $pdo->lastInsertId();
            
            $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
            
            foreach ($cart as $item) {
                $stmt->execute([$orderId, $item['id'], $item['quantity'], $item['price']]);
            }
            
            $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = ?");
            $stmt->execute([$_SESSION['user_id']]);
            
            $pdo->commit();
            
            jsonResponse([
                'success' => true,
                'order_id' => $orderId,
                'total' => $total
            ]);
        } catch (Exception $e) {
            $pdo->rollBack();
            jsonResponse(['error' => 'Failed to create order'], 500);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

