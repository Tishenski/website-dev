<?php
$page_title = 'Оформлення замовлення';
include 'includes/header.php';

if (!isLoggedIn()) {
    die("Увійдіть для оформлення замовлення.");
}

$stmt = $pdo->prepare("
    SELECT p.*, c.quantity, p.price * c.quantity as total_price
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
");
$stmt->execute([$_SESSION['user_id']]);
$cart = $stmt->fetchAll();

if (empty($cart)) {
    die("Кошик порожній.");
}

$total = array_sum(array_column($cart, 'total_price'));

if ($_POST['confirm_order']) {
    $stmt = $pdo->prepare("INSERT INTO orders (user_id, total, status) VALUES (?, ?, 'pending')");
    $stmt->execute([$_SESSION['user_id'], $total]);
    $order_id = $pdo->lastInsertId();

    foreach ($cart as $item) {
        $stmt = $pdo->prepare("
            INSERT INTO order_items (order_id, product_id, quantity, price_per_unit)
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute([$order_id, $item['id'], $item['quantity'], $item['price']]);
    }

    $stmt = $pdo->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->execute([$_SESSION['user_id']]);

    echo "<h2>Замовлення №{$order_id} оформлено!</h2>";
    echo "<p>Сума: " . number_format($total, 2, ',', ' ') . " грн</p>";
    echo '<a href="index.php" class="add-to-cart" style="display:inline-block; width:auto;">На головну</a>';
    exit;
}
?>

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

<form method="POST" style="text-align:center; margin-top:20px;">
    <button type="submit" name="confirm_order" class="add-to-cart">Підтвердити замовлення</button>
</form>

<?php include 'includes/footer.php'; ?>