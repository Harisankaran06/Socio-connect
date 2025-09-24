<?php
// Test correct status values
try {
    $conn = new PDO('mysql:host=localhost;dbname=socio_connect', 'root', '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Testing status update with correct values...\n";
    
    $stmt = $conn->prepare('UPDATE complaints SET status = ? WHERE id = 1');
    $result = $stmt->execute(['Resolved']);
    
    if ($result) {
        echo "✅ SUCCESS: 'Resolved' status update works!\n";
    } else {
        echo "❌ FAILED: 'Resolved' status update failed\n";
    }
    
    $stmt2 = $conn->prepare('UPDATE complaints SET status = ? WHERE id = 2');
    $result2 = $stmt2->execute(['In Progress']);
    
    if ($result2) {
        echo "✅ SUCCESS: 'In Progress' status update works!\n";
    } else {
        echo "❌ FAILED: 'In Progress' status update failed\n";
    }
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
}
?>