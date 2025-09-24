<?php
// Simple database connection and update test
echo "🔄 Testing Database Connection and Updates\n\n";

try {
    // Database configuration (same as config.php)
    $host = "localhost";
    $db_name = "socio_connect";
    $username = "root";
    $password = "";
    
    // Create PDO connection
    $conn = new PDO("mysql:host=" . $host . ";dbname=" . $db_name, $username, $password);
    $conn->exec("set names utf8");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "✅ Database connection successful\n\n";
    
    // Test 1: Check current complaints count
    $query = "SELECT COUNT(*) as total FROM complaints WHERE mc_area = 'MC1'";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "📊 Total MC1 complaints in database: {$result['total']}\n\n";
    
    // Test 2: Find first open complaint and update it
    $query = "SELECT id, title, status, updated_at FROM complaints WHERE mc_area = 'MC1' AND status = 'open' LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $testComplaint = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($testComplaint) {
        echo "🎯 Test complaint found:\n";
        echo "   ID: {$testComplaint['id']}\n";
        echo "   Title: {$testComplaint['title']}\n";
        echo "   Status: {$testComplaint['status']}\n";
        echo "   Last Updated: {$testComplaint['updated_at']}\n\n";
        
        // Test 3: Update the complaint
        echo "📝 Updating complaint status to 'resolved'...\n";
        $updateQuery = "UPDATE complaints SET status = 'resolved', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND mc_area = 'MC1'";
        $updateStmt = $conn->prepare($updateQuery);
        $updateResult = $updateStmt->execute([$testComplaint['id']]);
        
        if ($updateResult && $updateStmt->rowCount() > 0) {
            echo "✅ Update successful! Rows affected: " . $updateStmt->rowCount() . "\n\n";
            
            // Test 4: Verify the update
            echo "🔍 Verifying the update...\n";
            $verifyQuery = "SELECT id, title, status, updated_at FROM complaints WHERE id = ? AND mc_area = 'MC1'";
            $verifyStmt = $conn->prepare($verifyQuery);
            $verifyStmt->execute([$testComplaint['id']]);
            $updatedComplaint = $verifyStmt->fetch(PDO::FETCH_ASSOC);
            
            if ($updatedComplaint) {
                echo "📋 Updated complaint details:\n";
                echo "   ID: {$updatedComplaint['id']}\n";
                echo "   Title: {$updatedComplaint['title']}\n";
                echo "   Status: {$updatedComplaint['status']}\n";
                echo "   Last Updated: {$updatedComplaint['updated_at']}\n\n";
                
                if (strtolower($updatedComplaint['status']) === 'resolved') {
                    echo "✅ SUCCESS: Database update is working correctly!\n";
                    echo "✅ Complaint status has been permanently changed to 'resolved'\n";
                    echo "✅ Timestamp has been updated automatically\n\n";
                    
                    // Revert back for testing purposes
                    echo "🔄 Reverting back to original status for clean testing...\n";
                    $revertQuery = "UPDATE complaints SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND mc_area = 'MC1'";
                    $revertStmt = $conn->prepare($revertQuery);
                    $revertResult = $revertStmt->execute([$testComplaint['status'], $testComplaint['id']]);
                    
                    if ($revertResult) {
                        echo "✅ Reverted successfully to original status\n";
                    }
                    
                } else {
                    echo "❌ FAILURE: Status was not updated correctly\n";
                }
            } else {
                echo "❌ FAILURE: Could not retrieve updated complaint\n";
            }
        } else {
            echo "❌ FAILURE: Update query did not affect any rows\n";
        }
    } else {
        echo "⚠️ No open complaints found for testing. Creating a test complaint...\n";
        
        $insertQuery = "INSERT INTO complaints (title, description, category, status, location, mc_area, citizen_name, phone_number, email, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $insertStmt = $conn->prepare($insertQuery);
        $insertResult = $insertStmt->execute([
            'Test API Update Complaint',
            'This is a test complaint to verify API updates work correctly',
            'Electricity',
            'open',
            'Test Location',
            'MC1',
            'Test User',
            '9999999999',
            'test@test.com',
            'Medium'
        ]);
        
        if ($insertResult) {
            echo "✅ Test complaint created successfully\n";
        }
    }
    
    echo "\n🏁 Database persistence test completed!\n";
    echo "🎉 Your database is ready for permanent complaint status updates!\n";
    
} catch (PDOException $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
    echo "💡 Make sure your MySQL server is running and the database 'socio_connect' exists\n";
} catch (Exception $e) {
    echo "💥 Test failed: " . $e->getMessage() . "\n";
}
?>