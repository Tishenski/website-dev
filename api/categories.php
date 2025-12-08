<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM categories ORDER BY name");
        $categories = $stmt->fetchAll();
        jsonResponse($categories);
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

