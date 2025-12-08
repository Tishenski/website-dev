<?php
$page_title = 'Товар';
include 'includes/header.php';

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    die("Товар не знайдено");
}

$id = (int)$_GET['id'];
$stmt = $pdo->prepare("SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = ?");
$stmt->execute([$id]);
$product = $stmt->fetch();

if (!$product) {
    die("Товар не знайдено");
}

$page_title = htmlspecialchars($product['name']);
?>
<div style="display:flex; gap:24px; margin-top:18px; align-items:flex-start; flex-wrap:wrap;">
    <div style="flex:1; min-width:300px; max-width:520px;">
        <div style="background:#fff; border-radius:12px; padding:14px;">
            <img src="/assets/images/<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['name']) ?>" style="width:100%; border-radius:8px; display:block;">
        </div>
    </div>

    <div style="flex:1; min-width:300px;">
        <h1 style="margin:0 0 10px; font-size:22px;"><?= htmlspecialchars($product['name']) ?></h1>
        <div style="color:#6b7280; margin-bottom:10px;">Категорія: <?= htmlspecialchars($product['category_name']) ?></div>
        <div style="font-size:28px; color:#0f847d; font-weight:700; margin-bottom:12px;"><?= number_format($product['price'], 0, ',', ' ') ?> ₴</div>

        <form method="POST" action="/cart.php" style="display:flex; gap:10px; align-items:center;">
            <input type="hidden" name="product_id" value="<?= (int)$product['id'] ?>">
            <label style="display:flex; gap:8px; align-items:center;">
                Кількість:
                <input type="number" name="quantity" value="1" min="1" max="99" style="width:80px; padding:8px; border-radius:8px; border:1px solid #e6e7e9;">
            </label>
            <button type="submit" name="add_to_cart" class="btn-primary">Додати в кошик</button>
            <a href="/checkout.php" class="btn-ghost">Купити зараз</a>
        </form>

        <hr style="margin:16px 0; border:none; border-top:1px solid #f1f3f4;">
        <h3>Опис</h3>
        <p style="color:#4b5563;"><?= nl2br(htmlspecialchars($product['description'])) ?></p>
    </div>
</div>

<?php include 'includes/footer.php'; ?>
