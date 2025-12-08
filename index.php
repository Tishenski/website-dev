<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TeaPro — Завантаження...</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            color: #fff;
            font-family: 'Inter', system-ui, sans-serif;
        }
        .loader {
            text-align: center;
        }
        .loader h1 {
            font-weight: 200;
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #d97706, #ea580c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .loader p {
            color: rgba(255,255,255,0.6);
            font-weight: 300;
        }
        .spinner {
            width: 40px;
            height: 40px;
            margin: 2rem auto;
            border: 2px solid rgba(255,255,255,0.1);
            border-top-color: #d97706;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loader">
        <h1>TeaPro</h1>
        <div class="spinner"></div>
        <p>Для запуску фронтенду виконайте:</p>
        <pre style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: left;">
cd frontend
npm install
npm run dev</pre>
        <p style="margin-top: 1rem;">Потім відкрийте <a href="http://localhost:3000" style="color: #d97706;">http://localhost:3000</a></p>
    </div>
</body>
</html>
