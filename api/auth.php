<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($method) {
    case 'GET':
        if ($action === 'check') {
            if (isLoggedIn()) {
                $stmt = $pdo->prepare("SELECT id, username, email, role FROM users WHERE id = ?");
                $stmt->execute([$_SESSION['user_id']]);
                $user = $stmt->fetch();
                jsonResponse(['authenticated' => true, 'user' => $user]);
            } else {
                jsonResponse(['authenticated' => false, 'user' => null]);
            }
        }
        break;
        
    case 'POST':
        $input = getInput();
        
        if ($action === 'login') {
            $username = trim($input['username'] ?? '');
            $password = $input['password'] ?? '';
            
            if (empty($username) || empty($password)) {
                jsonResponse(['error' => 'Username and password required'], 400);
            }
            
            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();
            
            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role'];
                
                jsonResponse([
                    'success' => true,
                    'user' => [
                        'id' => $user['id'],
                        'username' => $user['username'],
                        'email' => $user['email'],
                        'role' => $user['role']
                    ]
                ]);
            } else {
                jsonResponse(['error' => 'Invalid credentials'], 401);
            }
        }
        
        if ($action === 'register') {
            $username = trim($input['username'] ?? '');
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';
            $confirmPassword = $input['confirmPassword'] ?? '';
            
            if (empty($username) || empty($email) || empty($password)) {
                jsonResponse(['error' => 'All fields are required'], 400);
            }
            
            if ($password !== $confirmPassword) {
                jsonResponse(['error' => 'Passwords do not match'], 400);
            }
            
            if (strlen($password) < 6) {
                jsonResponse(['error' => 'Password must be at least 6 characters'], 400);
            }
            
            $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
            $stmt->execute([$username, $email]);
            
            if ($stmt->fetch()) {
                jsonResponse(['error' => 'User already exists'], 409);
            }
            
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')");
            $stmt->execute([$username, $email, $hash]);
            
            $userId = $pdo->lastInsertId();
            $_SESSION['user_id'] = $userId;
            $_SESSION['username'] = $username;
            $_SESSION['role'] = 'user';
            
            jsonResponse([
                'success' => true,
                'user' => [
                    'id' => $userId,
                    'username' => $username,
                    'email' => $email,
                    'role' => 'user'
                ]
            ]);
        }
        
        if ($action === 'logout') {
            session_destroy();
            jsonResponse(['success' => true]);
        }
        break;
        
    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}

