<?php
$page_title = 'Кошик';
include 'includes/header.php';

if ($_POST['add_to_cart']) {
    $product_id = (int)$_POST['product_id'];
    $quantity = (int)$_POST['quantity'];
    if ($quantity < 1) $quantity = 1;

    if (isLoggedIn()) {
        $stmt = $pdo->prepare("
            INSERT INTO cart (user_id, product_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?
        ");
        $stmt->execute([$_SESSION['user_id'], $product_id, $quantity, $quantity]);
    } else {
        $session_id = session_id();
        $stmt = $pdo->prepare("
            INSERT INTO session_cart (session_id, product_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?
        ");
        $stmt->execute([$session_id, $product_id, $quantity, $quantity]);
    }
    header("Location: cart.php");
    exit;
}

$cart = [];
$total = 0;

if (isLoggedIn()) {
    $stmt = $pdo->prepare("
        SELECT p.*, c.quantity, p.price * c.quantity as total_price
        FROM cart c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    ");
    $stmt->execute([$_SESSION['user_id']]);
    $cart = $stmt->fetchAll();
} else {
    $session_id = session_id();
    $stmt = $pdo->prepare("
        SELECT p.*, s.quantity, p.price * s.quantity as total_price
        FROM session_cart s
        JOIN products p ON s.product_id = p.id
        WHERE s.session_id = ?
    ");
    $stmt->execute([$session_id]);
    $cart = $stmt->fetchAll();
}

foreach ($cart as $item) {
    $total += $item['total_price'];
}
?>

<?php if (empty($cart)): ?>
    <p>Ваш кошик порожній.</p>
    <a href="products.php" class="add-to-cart" style="display:inline-block; width:auto;">Перейти до каталогу</a>
<?php else: ?>
    <div class="product-grid">
        <?php foreach ($cart as $item): ?>
            <div class="product-card">
                <img src="assets/images/<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['name']) ?>">
                <div class="product-info">
                    <h3><?= htmlspecialchars($item['name']) ?></h3>
                    <p>Кількість: <?= $item['quantity'] ?></p>
                    <div class="price"><?= number_format($item['total_price'], 2, ',', ' ') ?> грн</div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <div style="text-align:center; margin-top:20px; font-size:24px; color:#5d4037;">
        <strong>Разом: <?= number_format($total, 2, ',', ' ') ?> грн</strong>
    </div>
    <?php if (isLoggedIn()): ?>
        <div style="text-align:center; margin-top:20px;">
            <a href="checkout.php" class="add-to-cart">Оформити замовлення</a>
        </div>
    <?php else: ?>
        <p style="text-align:center; margin-top:20px;">
            Щоб оформити замовлення, <a href="login.php">Увійдіть</a> або <a href="register.php">Зареєструйтесь</a>
        </p>
    <?php endif; ?>
<?php endif; ?>

<?php include 'includes/footer.php'; ?>