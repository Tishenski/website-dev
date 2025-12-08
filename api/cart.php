<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

function getSessionId() {
    return session_id();
}

function getCartItems($pdo) {
    if (isLoggedIn()) {
        $stmt = $pdo->prepare("
            SELECT p.*, c.quantity, (p.price * c.quantity) as total_price
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        ");
        $stmt->execute([$_SESSION['user_id']]);
    } else {
        $stmt = $pdo->prepare("
            SELECT p.*, s.quantity, (p.price * s.quantity) as total_price
            FROM session_cart s
            JOIN products p ON s.product_id = p.id
            WHERE s.session_id = ?
        ");
        $stmt->execute([getSessionId()]);
    }
    return $stmt->fetchAll();
}

function getCartTotal($items) {
    return array_sum(array_column($items, 'total_price'));
}

function getCartCount($pdo) {
    if (isLoggedIn()) {
        $stmt = $pdo->prepare("SELECT COALESCE(SUM(quantity), 0) as total FROM cart WHERE user_id = ?");
        $stmt->execute([$_SESSION['user_id']]);
    } else {
        $stmt = $pdo->prepare("SELECT COALESCE(SUM(quantity), 0) as total FROM session_cart WHERE session_id = ?");
        $stmt->execute([getSessionId()]);
    }
    return (int)$stmt->fetch()['total'];
}

switch ($method) {
    case 'GET':
        $items = getCartItems($pdo);
        $total = getCartTotal($items);
        $count = getCartCount($pdo);
        
        jsonResponse([
            'items' => $items,
            'total' => $total,
            'count' => $count
        ]);
        break;
        
    case 'POST':
        $input = getInput();
        $productId = (int)($input['product_id'] ?? 0);
        $quantity = (int)($input['quantity'] ?? 1);
        
        if ($productId <= 0) {
            jsonResponse(['error' => 'Invalid product'], 400);
        }
        
        if ($quantity < 1) $quantity = 1;
        
        $stmt = $pdo->prepare("SELECT id FROM products WHERE id = ?");
        $stmt->execute([$productId]);
        if (!$stmt->fetch()) {
            jsonResponse(['error' => 'Product not found'], 404);
        }
        
        if (isLoggedIn()) {
            $stmt = $pdo->prepare("
                INSERT INTO cart (user_id, product_id, quantity)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE quantity = quantity + ?
            ");
            $stmt->execute([$_SESSION['user_id'], $productId, $quantity, $quantity]);
        } else {
            $stmt = $pdo->prepare("SELECT id FROM session_cart WHERE session_id = ? AND product_id = ?");
            $stmt->execute([getSessionId(), $productId]);
            $existing = $stmt->fetch();
            
            if ($existing) {
                $stmt = $pdo->prepare("UPDATE session_cart SET quantity = quantity + ? WHERE id = ?");
                $stmt->execute([$quantity, $existing['id']]);
            } else {
                $stmt = $pdo->prepare("INSERT INTO session_cart (session_id, product_id, quantity) VALUES (?, ?, ?)");
                $stmt->execute([getSessionId(), $productId, $quantity]);
            }
        }
        
        $items = getCartItems($pdo);
        $total = getCartTotal($items);
        $count = getCartCount($pdo);
        
        jsonResponse([
            'success' => true,
            'items' => $items,
            'total' => $total,
            'count' => $count
        ]);
        break;
        
    case 'PUT':
        $input = getInput();
        $productId = (int)($input['product_id'] ?? 0);
        $quantity = (int)($input['quantity'] ?? 1);
        
        if ($productId <= 0) {
            jsonResponse(['error' => 'Invalid product'], 400);
        }
        
        if ($quantity < 1) {
            if (isLoggedIn()) {
                $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
                $stmt->execute([$_SESSION['user_id'], $productId]);
            } else {
                $stmt = $pdo->prepare("DELETE FROM session_cart WHERE session_id = ? AND product_id = ?");
                $stmt->execute([getSessionId(), $productId]);
            }
        } else {
            if (isLoggedIn()) {
                $stmt = $pdo->prepare("UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?");
                $stmt->execute([$quantity, $_SESSION['user_id'], $productId]);
            } else {
                $stmt = $pdo->prepare("UPDATE session_cart SET quantity = ? WHERE session_id = ? AND product_id = ?");
                $stmt->execute([$quantity, getSessionId(), $productId]);
            }
        }
        
        $items = getCartItems($pdo);
        $total = getCartTotal($items);
        $count = getCartCount($pdo);
        
        jsonResponse([
            'success' => true,
            'items' => $items,
            'total' => $total,
            'count' => $count
        ]);
        break;
        
    case 'DELETE':
        $input = getInput();
        $productId = (int)($input['product_id'] ?? 0);
        
        if ($productId > 0) {
            if (isLoggedIn()) {
                $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
                $stmt->execute([$_SESSION['user_id'], $productId]);
            } else {
                $stmt = $pdo->prepare("DELETE FROM session_cart WHERE session_id = ? AND product_id = ?");
                $stmt->execute([getSessionId(), $productId]);
            }
        } else {
            if (isLoggedIn()) {
                $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = ?");
                $stmt->execute([$_SESSION['user_id']]);
            } else {
                $stmt = $pdo->prepare("DELETE FROM session_cart WHERE session_id = ?");
                $stmt->execute([getSessionId()]);
            }
        }
        
        $items = getCartItems($pdo);
        $total = getCartTotal($items);
        $count = getCartCount($pdo);
        
        jsonResponse([
            'success' => true,
            'items' => $items,
            'total' => $total,
            'count' => $count
        ]);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

