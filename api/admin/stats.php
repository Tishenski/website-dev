<?php
require_once '../config.php';

function requireAdmin() {
    if (!isLoggedIn() || $_SESSION['role'] !== 'admin') {
        jsonResponse(['error' => 'Access denied'], 403);
    }
}

requireAdmin();

$stats = [];

$stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
$stats['users_count'] = (int)$stmt->fetch()['count'];

$stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
$stats['products_count'] = (int)$stmt->fetch()['count'];

$stmt = $pdo->query("SELECT COUNT(*) as count FROM orders");
$stats['orders_count'] = (int)$stmt->fetch()['count'];

$stmt = $pdo->query("SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE status != 'cancelled'");
$stats['total_revenue'] = (float)$stmt->fetch()['total'];

$stmt = $pdo->query("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'");
$stats['pending_orders'] = (int)$stmt->fetch()['count'];

$stmt = $pdo->query("SELECT COUNT(*) as count FROM categories");
$stats['categories_count'] = (int)$stmt->fetch()['count'];

$stmt = $pdo->query("
    SELECT DATE(created_at) as date, COUNT(*) as count, SUM(total) as total
    FROM orders 
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    GROUP BY DATE(created_at)
    ORDER BY date ASC
");
$stats['orders_chart'] = $stmt->fetchAll();

$stmt = $pdo->query("
    SELECT o.id, o.total, o.status, o.created_at, u.username
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
    LIMIT 5
");
$stats['recent_orders'] = $stmt->fetchAll();

$stmt = $pdo->query("
    SELECT p.id, p.name, p.price, p.image,
        (SELECT COALESCE(SUM(quantity), 0) FROM order_items WHERE product_id = p.id) as total_sold
    FROM products p
    ORDER BY total_sold DESC
    LIMIT 5
");
$stats['top_products'] = $stmt->fetchAll();

jsonResponse($stats);

