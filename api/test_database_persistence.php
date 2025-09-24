<?php
// Test script to verify database persistence for complaint updates
require_once 'config.php';
require_once 'complaints.php';

header('Content-Type: application/json');

try {
    echo "🔄 Testing Database Persistence for Complaint Updates\n\n";
    
    $database = new Database();
    $db = $database->getConnection();
    $complaintsAPI = new ComplaintsAPI($db);
    
    // Test 1: Get initial state
    echo "📋 Test 1: Getting initial complaints state...\n";
    $initialResult = $complaintsAPI->getComplaints('MC1');
    if ($initialResult['success']) {
        $initialCount = count($initialResult['data']);
        echo "✅ Found {$initialCount} complaints initially\n";
        
        // Find the first open complaint for testing
        $testComplaint = null;
        foreach ($initialResult['data'] as $complaint) {
            if ($complaint['status'] === 'open') {
                $testComplaint = $complaint;
                break;
            }
        }
        
        if ($testComplaint) {
            echo "🎯 Using complaint ID {$testComplaint['id']} ('{$testComplaint['title']}') for testing\n\n";
            
            // Test 2: Update complaint status to 'resolved'
            echo "📝 Test 2: Updating complaint status to 'resolved'...\n";
            $updateResult = $complaintsAPI->updateComplaint($testComplaint['id'], 'resolved', 'High', 'MC1');
            
            if ($updateResult['success']) {
                echo "✅ Update successful: {$updateResult['message']}\n";
                echo "📊 Updated data: " . json_encode($updateResult['data']) . "\n\n";
                
                // Test 3: Verify the change is persistent by fetching again
                echo "🔍 Test 3: Verifying persistence by fetching fresh data...\n";
                $verifyResult = $complaintsAPI->getComplaints('MC1');
                
                if ($verifyResult['success']) {
                    $updatedComplaint = null;
                    foreach ($verifyResult['data'] as $complaint) {
                        if ($complaint['id'] == $testComplaint['id']) {
                            $updatedComplaint = $complaint;
                            break;
                        }
                    }
                    
                    if ($updatedComplaint && $updatedComplaint['status'] === 'resolved') {
                        echo "✅ SUCCESS: Complaint status is persistently saved as 'resolved'\n";
                        echo "📅 Updated timestamp: {$updatedComplaint['updated_at']}\n";
                        
                        // Test 4: Revert back to original state for clean testing
                        echo "\n🔄 Test 4: Reverting back to original state...\n";
                        $revertResult = $complaintsAPI->updateComplaint($testComplaint['id'], $testComplaint['status'], $testComplaint['priority'], 'MC1');
                        
                        if ($revertResult['success']) {
                            echo "✅ Reverted successfully to original state\n";
                        } else {
                            echo "❌ Failed to revert: {$revertResult['message']}\n";
                        }
                        
                    } else {
                        echo "❌ FAILURE: Complaint status was not persistently saved\n";
                    }
                } else {
                    echo "❌ Failed to verify persistence: {$verifyResult['message']}\n";
                }
            } else {
                echo "❌ Update failed: {$updateResult['message']}\n";
            }
        } else {
            echo "⚠️ No open complaints found for testing\n";
        }
    } else {
        echo "❌ Failed to get initial complaints: {$initialResult['message']}\n";
    }
    
    echo "\n🏁 Database persistence test completed!\n";
    
} catch (Exception $e) {
    echo "💥 Test failed with exception: " . $e->getMessage() . "\n";
}
?>