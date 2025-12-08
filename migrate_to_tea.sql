-- Скрипт миграции с кофе на чай
-- Выполните этот скрипт в phpMyAdmin или через командную строку MySQL

-- Создаем новую базу данных для чая
CREATE DATABASE IF NOT EXISTS teapro_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE teapro_db;

-- Копируем структуру и данные из старой базы (если она существует)
-- Если старой базы нет, просто создаем новую

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица категорий
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица товаров
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    category_id INT,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица корзины для авторизованных пользователей
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица корзины для неавторизованных пользователей (сессии)
CREATE TABLE IF NOT EXISTS session_cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_session (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    session_id VARCHAR(255),
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Таблица элементов заказа
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Очищаем старые данные (если они есть)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM session_cart;
DELETE FROM cart;
DELETE FROM products;
DELETE FROM categories;
DELETE FROM users;

-- Добавление тестовых категорий
INSERT INTO categories (name, description) VALUES
('Чайники', 'Профессиональные и домашние чайники'),
('Чай', 'Листовой и пакетированный чай'),
('Аксессуары', 'Аксессуары для чая и чайников'),
('Фильтры', 'Фильтры и расходные материалы');

-- Добавление тестовых товаров
INSERT INTO products (name, description, price, image, category_id, stock) VALUES
('Чайник DeLonghi KBI 3001', 'Электрический чайник с регулировкой температуры. Идеально подходит для дома и небольшого офиса. Быстрое закипание, поддержание температуры.', 1599, '1.jpg', 1, 10),
('Чай Twinings Earl Grey 100г', 'Английский чай премиум класса. Сбалансированный вкус с нотками бергамота и цитрусов. Подходит для утреннего и вечернего чаепития.', 250, '2.jpg', 2, 50),
('Чайник Bosch TWK 8611', 'Профессиональный чайник для кафе и ресторанов. Полностью автоматический, с сенсорным экраном и множеством настроек температуры.', 8999, '3.jpg', 1, 5),
('Чай Ahmad Tea 500г', 'Премиум чай высшего качества. Интенсивный вкус с бархатистым ароматом. Идеален для классического чаепития.', 320, '4.jpg', 2, 30);

-- Создание тестового администратора
-- Логин: admin
-- Пароль: admin123
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@teapro.ua', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin');

