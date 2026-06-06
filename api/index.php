<?php
// Simple API server for registration
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
$db_file = __DIR__ . '/database.sqlite';
$pdo = new PDO('sqlite:' . $db_file);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Initialize database if needed
if (!file_exists($db_file)) {
    initializeDatabase($pdo);
}

// Router
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($method === 'POST' && $path === '/api/register') {
    handleRegister($pdo);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}

function initializeDatabase($pdo) {
    $sql = "
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ";
    $pdo->exec($sql);
}

function handleRegister($pdo) {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validation
    $errors = [];
    
    if (empty($data['name'])) {
        $errors['name'] = 'Name is required';
    }
    
    if (empty($data['email'])) {
        $errors['email'] = 'Email is required';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Invalid email format';
    } else {
        // Check if email already exists
        $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            $errors['email'] = 'Email already exists';
        }
    }
    
    if (empty($data['password'])) {
        $errors['password'] = 'Password is required';
    } elseif (strlen($data['password']) < 6) {
        $errors['password'] = 'Password must be at least 6 characters';
    }
    
    if (!empty($errors)) {
        http_response_code(422);
        echo json_encode(['errors' => $errors]);
        return;
    }
    
    // Hash password with bcrypt
    $hashed_password = password_hash($data['password'], PASSWORD_BCRYPT);
    
    // Create user
    try {
        $stmt = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        $stmt->execute([$data['name'], $data['email'], $hashed_password]);
        
        $user_id = $pdo->lastInsertId();
        
        http_response_code(201);
        echo json_encode([
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user_id,
                'name' => $data['name'],
                'email' => $data['email']
            ],
            'token' => generateToken($user_id)
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Registration failed']);
    }
}

function generateToken($user_id) {
    // Simple token generation (in production, use JWT or similar)
    return base64_encode(json_encode(['user_id' => $user_id, 'time' => time()]));
}
