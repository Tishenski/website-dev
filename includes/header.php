<?php
session_start();
include __DIR__ . '/db.php';
include __DIR__ . '/auth.php';

$user = getUser();
$page_title = $page_title ?? 'TeaPro';
$cart_count = countCartItems();
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($page_title) ?></title>
    <link rel="stylesheet" href="\xampp\htdocs\coffeepro\assets\css">

</head>
<body class="theme-default">
    <header class="cp-header">
        <div class="cp-header-inner container">
            <div class="cp-left">
                <button class="cp-btn catalog-toggle" aria-label="Каталог">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    <span class="cp-catalog-label">Каталог</span>
                </button>

                <a class="cp-logo" href="/index.php">
                    <img src="/assets/images/logo.svg" alt="TeaPro" onerror="this.style.display='none'">
                    <span class="cp-logo-text">TeaPro</span>
                </a>
            </div>

            <div class="cp-search">
                <form action="/products.php" method="GET" class="cp-search-form" role="search">
                    <input name="q" type="search" placeholder="Я шукаю..." aria-label="Пошук" value="<?= htmlspecialchars($_GET['q'] ?? '') ?>">
                    <button type="submit" class="cp-btn cp-btn-primary" aria-label="Знайти">🔍</button>
                </form>
            </div>

            <div class="cp-actions">
                <?php if (isLoggedIn()): ?>
                    <a href="/profile.php" class="cp-action user">👤 <?= htmlspecialchars($user['username']) ?></a>
                    <a href="/logout.php" class="cp-action">Вихід</a>
                <?php else: ?>
                    <a href="/login.php" class="cp-action">Увійти</a>
                    <a href="/register.php" class="cp-action">Реєстрація</a>
                <?php endif; ?>

                <a href="/cart.php" class="cp-action cart" aria-label="Кошик">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span class="cp-cart-badge" aria-hidden><?= $cart_count > 0 ? $cart_count : '' ?></span>
                </a>

                <button class="cp-btn mobile-menu-toggle" aria-label="Меню">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                </button>
            </div>
        </div>

        <!-- catalog sidebar (hidden on mobile by default) -->
        <nav class="cp-catalog-sidebar" aria-hidden="true">
            <div class="container cp-catalog-inner">
                <h4>Категорії</h4>
                <ul class="cp-categories">
                    <?php
                    try {
                        $stmt = $pdo->query("SELECT id, name FROM categories ORDER BY name");
                        while ($cat = $stmt->fetch()):
                    ?>
                        <li><a href="/products.php?category=<?= (int)$cat['id'] ?>"><?= htmlspecialchars($cat['name']) ?></a></li>
                    <?php endwhile; } catch (Exception $e) {} ?>
                </ul>
            </div>
        </nav>
    </header>

    <main class="cp-main">
        <div class="container">
