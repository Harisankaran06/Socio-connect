pm satrt<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database configuration
class Database {
    private $host = "localhost";
    private $db_name = "socio_connect"; // Change this to your database name
    private $username = "root"; // Change this to your MySQL username
    private $password = ""; // Change this to your MySQL password
    private $conn;

    // Get the database connection with enhanced settings for data persistence
    public function getConnection() {
        $this->conn = null;

        try {
            // Create PDO connection with enhanced attributes for data integrity
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            
            // Set PDO attributes for better error handling and data persistence
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->conn->setAttribute(PDO::ATTR_AUTOCOMMIT, true);
            
            // Ensure the connection uses proper charset for data integrity
            $this->conn->exec("SET CHARACTER SET utf8");
            $this->conn->exec("SET NAMES utf8");
            
        } catch(PDOException $exception) {
            echo json_encode([
                'error' => true,
                'message' => 'Connection error: ' . $exception->getMessage()
            ]);
            exit();
        }

        return $this->conn;
    }
}

// Helper function to send JSON response
function sendResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

// Helper function to validate required fields
function validateRequired($data, $requiredFields) {
    $errors = [];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $errors[] = "Field '$field' is required";
        }
    }
    return $errors;
}
?>