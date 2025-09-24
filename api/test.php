<?php
// Simple test file to check if everything is working
header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Socio Connect - Setup Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .success { color: #4CAF50; background: #E8F5E8; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .error { color: #F44336; background: #FFEBEE; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .info { color: #2196F3; background: #E3F2FD; padding: 10px; border-radius: 5px; margin: 10px 0; }
        .test-section { margin: 20px 0; border-left: 4px solid #2196F3; padding-left: 15px; }
        .json-output { background: #f4f4f4; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 12px; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Socio Connect - Database Setup Test</h1>
        
        <div class="test-section">
            <h2>1. PHP Configuration Test</h2>
            <?php
            echo "<div class='success'>✅ PHP is working! Version: " . phpversion() . "</div>";
            
            if (extension_loaded('pdo_mysql')) {
                echo "<div class='success'>✅ MySQL PDO extension is loaded</div>";
            } else {
                echo "<div class='error'>❌ MySQL PDO extension is NOT loaded</div>";
            }
            ?>
        </div>

        <div class="test-section">
            <h2>2. Database Connection Test</h2>
            <?php
            try {
                require_once 'config.php';
                $database = new Database();
                $db = $database->getConnection();
                echo "<div class='success'>✅ Database connection successful!</div>";
                
                // Test if complaints table exists
                $stmt = $db->query("SHOW TABLES LIKE 'complaints'");
                if ($stmt->rowCount() > 0) {
                    echo "<div class='success'>✅ Complaints table exists</div>";
                    
                    // Count records
                    $stmt = $db->query("SELECT COUNT(*) as total FROM complaints WHERE mc_area = 'MC1'");
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    echo "<div class='success'>✅ Found " . $result['total'] . " complaints for MC1</div>";
                } else {
                    echo "<div class='error'>❌ Complaints table does not exist. Please run database_setup.sql</div>";
                }
                
            } catch (Exception $e) {
                echo "<div class='error'>❌ Database connection failed: " . $e->getMessage() . "</div>";
                echo "<div class='info'>💡 Make sure MySQL is running and database 'socio_connect' exists</div>";
            }
            ?>
        </div>

        <div class="test-section">
            <h2>3. API Endpoints Test</h2>
            <?php
            $base_url = "http://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']);
            $endpoints = [
                'stats' => $base_url . '/stats?mc_area=MC1',
                'recent' => $base_url . '/recent?mc_area=MC1&limit=3',
                'category-stats' => $base_url . '/category-stats?mc_area=MC1'
            ];
            
            foreach ($endpoints as $name => $url) {
                echo "<h4>Testing $name endpoint:</h4>";
                echo "<div class='info'>URL: $url</div>";
                
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_TIMEOUT, 10);
                $response = curl_exec($ch);
                $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                curl_close($ch);
                
                if ($http_code == 200 && $response) {
                    echo "<div class='success'>✅ $name API working!</div>";
                    echo "<div class='json-output'>" . htmlspecialchars($response) . "</div>";
                } else {
                    echo "<div class='error'>❌ $name API failed (HTTP $http_code)</div>";
                }
            }
            ?>
        </div>

        <div class="test-section">
            <h2>4. React App Integration</h2>
            <div class="info">
                <strong>📝 Next Steps:</strong><br>
                1. If all tests above pass, your API is ready!<br>
                2. Start your React app: <code>npm start</code><br>
                3. Navigate to DBMC1 to see live data<br>
                4. Check TOTMC1 for complaint listings<br>
                5. View ANAMC1 for analytics
            </div>
            
            <div class="info">
                <strong>🔧 If React app shows "API connection failed":</strong><br>
                • Check if the API URLs in your React components match this server<br>
                • Current API base URL: <code><?php echo $base_url; ?></code><br>
                • Update React components if your API is hosted elsewhere
            </div>
        </div>

        <div class="test-section">
            <h2>5. Quick Links</h2>
            <p><a href="<?php echo $base_url; ?>/stats?mc_area=MC1" target="_blank">📊 Stats API</a></p>
            <p><a href="<?php echo $base_url; ?>/complaints?mc_area=MC1" target="_blank">📋 All Complaints API</a></p>
            <p><a href="<?php echo $base_url; ?>/recent?mc_area=MC1&limit=5" target="_blank">🕐 Recent Complaints API</a></p>
            <p><a href="<?php echo $base_url; ?>/category-stats?mc_area=MC1" target="_blank">📈 Category Stats API</a></p>
        </div>
    </div>
</body>
</html>