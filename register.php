<?php
$page_title = 'Реєстрація';
include 'includes/header.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    $confirm = $_POST['confirm_password'];

    if ($password !== $confirm) {
        $error = "Паролі не співпадають";
    } elseif (strlen($password) < 6) {
        $error = "Пароль має бути не менше 6 символів";
    } else {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $email]);
        if ($stmt->fetch()) {
            $error = "Користувач з таким логіном або email вже існує";
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')");
            $stmt->execute([$username, $email, $hash]);
            $success = "Реєстрація успішна! Тепер ви можете увійти.";
        }
    }
}
?>

<?php if ($error): ?>
    <div style="color:red; margin-bottom:15px;"><?= htmlspecialchars($error) ?></div>
<?php endif; ?>
<?php if ($success): ?>
    <div style="color:green; margin-bottom:15px;"><?= htmlspecialchars($success) ?></div>
<?php endif; ?>

<form method="POST">
    <label>Логін: <input type="text" name="username" required style="padding:8px; margin:5px 0; width:100%;"></label><br>
    <label>Email: <input type="email" name="email" required style="padding:8px; margin:5px 0; width:100%;"></label><br>
    <label>Пароль: <input type="password" name="password" required style="padding:8px; margin:5px 0; width:100%;"></label><br>
    <label>Підтвердіть пароль: <input type="password" name="confirm_password" required style="padding:8px; margin:5px 0; width:100%;"></label><br>
    <button type="submit" name="register" class="add-to-cart" style="width:100%;">Зареєструватися</button>
</form>

<p style="margin-top:15px;">Вже є акаунт? <a href="login.php">Увійти</a></p>

<?php include 'includes/footer.php'; ?>