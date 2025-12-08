<?php
$page_title = 'Адмінка';
include '../includes/header.php';

if (!isLoggedIn() || $_SESSION['role'] !== 'admin') {
    die("Доступ заборонено");
}

echo "<p>Ласкаво просимо, " . htmlspecialchars($_SESSION['username']) . "!</p>";
echo '<a href="../index.php" class="add-to-cart" style="display:inline-block; width:auto;">На сайт</a>';

include '../includes/footer.php';
?>