<?php
$page_title = 'Каталог';
include 'includes/header.php';

// build query (category, search q)
$where = [];
$params = [];

if (!empty($_GET['category']) && is_numeric($_GET['category'])) {
    $where[] = "p.category_id = ?";
    $params[] = (int)$_GET['category'];
}
if (!empty($_GET['q'])) {
    $where[] = " (p.name LIKE ? OR p.description LIKE ?)";
    $params[] = '%' . $_GET['q'] . '%';
    $params[] = '%' . $_GET['q'] . '%';
}

$sql = "SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id";
if ($where) $sql .= " WHERE " . implode(' AND ', $where);
$sql .= " ORDER BY p.id DESC LIMIT 48";

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$products = $stmt->fetchAll();
?>

<div class="hero">
    <div class="hero-left">
        <!-- Optional left promo / categories block -->
        <div class="card" style="padding:12px; border-radius:10px;">
            <strong>Популярні категорії</strong>
            <ul style="margin-top:8px; padding-left:16px; color:#4b5563;">
                <?php
                $cstmt = $pdo->query("SELECT id, name FROM categories ORDER BY name LIMIT 8");
                while ($c = $cstmt->fetch()): ?>
                    <li><a href="/products.php?category=<?= (int)$c['id'] ?>"><?= htmlspecialchars($c['name']) ?></a></li>
                <?php endwhile; ?>
            </ul>
        </div>
    </div>

    <div class="hero-carousel">
        <div class="slider-track">
            <div class="slider-item">
                <img src="/assets/images/slide1.jpg" alt="Promo 1" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="slider-item">
                <img src="/assets/images/slide2.jpg" alt="Promo 2" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="slider-item">
                <img src="/assets/images/slide3.jpg" alt="Promo 3" style="width:100%; height:100%; object-fit:cover;">
            </div>
        </div>
    </div>
</div>

<h2 class="section-title">Рекомендовано для вас</h2>

<div class="products-grid">
    <?php foreach ($products as $p): ?>
        <div class="product-card" data-id="<?= $p['id'] ?>">
            <div class="product-media">
                <img src="/assets/images/<?= htmlspecialchars($p['image']) ?>" alt="<?= htmlspecialchars($p['name']) ?>">
            </div>
            <div class="product-title"><?= htmlspecialchars($p['name']) ?></div>
            <div class="product-desc"><?= mb_strlen($p['description'])>120 ? htmlspecialchars(mb_substr($p['description'],0,120)).'...' : htmlspecialchars($p['description']) ?></div>
            <div class="product-prices">
                <div>
                    <div class="price"><?= number_format($p['price'], 0, ',', ' ') ?> ₴</div>
                    <!-- optional old price -->
                    <!-- <div class="old-price">1999 ₴</div> -->
                </div>
                <div class="card-actions" style="margin-left:auto;">
                    <form method="POST" action="/cart.php" style="display:inline;">
                        <input type="hidden" name="product_id" value="<?= (int)$p['id'] ?>">
                        <input type="hidden" name="quantity" value="1">
                        <button type="submit" name="add_to_cart" class="btn-primary btn-add-cart">В кошик</button>
                    </form>
                    <a href="/product-detail.php?id=<?= (int)$p['id'] ?>" class="btn-ghost">Деталі</a>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</div>

<?php include 'includes/footer.php'; ?>
