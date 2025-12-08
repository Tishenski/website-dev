<?php
$page_title = 'Вхід';
include 'includes/header.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = trim($_POST['username']);
    $password = $_POST['password'];

    if (login($username, $password)) {
        header("Location: index.php");
        exit;
    } else {
        $error = "Невірний логін або пароль";
    }
}
?>

<?php if ($error): ?>
    <div style="color:red; margin-bottom:15px;"><?= htmlspecialchars($error) ?></div>
<?php endif; ?>

<form method="POST">
    <label>Логін: <input type="text" name="username" required style="padding:8px; margin:5px 0; width:100%;"></label><br>
    <label>Пароль: <input type="password" name="password" required style="padding:8px; margin:5px 0; width:100%;"></label><br>
    <button type="submit" name="login" class="add-to-cart" style="width:100%;">Увійти</button>
</form>

<p style="margin-top:15px;">Немає акаунта? <a href="register.php">Реєстрація</a></p>

<?php include 'includes/footer.php'; ?>