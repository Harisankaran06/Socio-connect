<?php
require_once 'config.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    echo "<h1>Adding Location Data to Complaints</h1>";
    
    // Sample location updates for Chennai area
    $locationUpdates = [
        1 => ['lat' => 13.0827, 'lng' => 80.2707], // Street light - Bus Stop, Main Road
        2 => ['lat' => 13.0850, 'lng' => 80.2101], // Water leakage - Anna Nagar
        3 => ['lat' => 13.0878, 'lng' => 80.2785], // Garbage - Gandhi Street
        4 => ['lat' => 13.0825, 'lng' => 80.2750], // Pothole - Main Road near school
        5 => ['lat' => 13.0890, 'lng' => 80.2720], // Sewage - Cross Street
        6 => ['lat' => 13.0810, 'lng' => 80.2680], // Power outage - Residential Area
        7 => ['lat' => 13.0770, 'lng' => 80.2800], // Construction debris - Industrial Area
        8 => ['lat' => 13.0860, 'lng' => 80.2650], // Water supply - New Colony
        9 => ['lat' => 13.0840, 'lng' => 80.2730], // Traffic signal - Signal Junction
        10 => ['lat' => 13.0820, 'lng' => 80.2710], // Drainage - Market Street
        11 => ['lat' => 13.0805, 'lng' => 80.2760], // Streetlight repair - Park Road
        12 => ['lat' => 13.0855, 'lng' => 80.2695], // Water meter - Lotus Apartments
        13 => ['lat' => 13.0830, 'lng' => 80.2740], // Road widening - Temple Street
        14 => ['lat' => 13.0815, 'lng' => 80.2775], // Public toilet - Bus Station
        15 => ['lat' => 13.0795, 'lng' => 80.2785], // Electric pole - Old Town
    ];
    
    $updated = 0;
    foreach ($locationUpdates as $id => $coords) {
        $stmt = $db->prepare("UPDATE complaints SET latitude = ?, longitude = ? WHERE id = ?");
        $result = $stmt->execute([$coords['lat'], $coords['lng'], $id]);
        if ($result) {
            $updated++;
            echo "<p>✅ Updated complaint ID $id with coordinates ({$coords['lat']}, {$coords['lng']})</p>";
        } else {
            echo "<p>❌ Failed to update complaint ID $id</p>";
        }
    }
    
    echo "<h2>Summary: Updated $updated complaints with location coordinates</h2>";
    
    // Test the location API
    echo "<h2>Testing Location API:</h2>";
    $stmt = $db->prepare("SELECT id, title, category, status, location, latitude, longitude FROM complaints WHERE mc_area = 'MC1' AND latitude IS NOT NULL AND longitude IS NOT NULL LIMIT 5");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<div style='border: 1px solid #ccc; padding: 10px; margin: 10px;'>";
    echo "<h3>Sample complaints with location data:</h3>";
    foreach ($results as $complaint) {
        echo "<div style='margin: 5px 0; padding: 5px; background: #f9f9f9;'>";
        echo "<strong>#{$complaint['id']}: {$complaint['title']}</strong><br>";
        echo "Category: {$complaint['category']} | Status: {$complaint['status']}<br>";
        echo "Location: {$complaint['location']}<br>";
        echo "Coordinates: {$complaint['latitude']}, {$complaint['longitude']}<br>";
        echo "</div>";
    }
    echo "</div>";
    
} catch (Exception $e) {
    echo "<h2>Error: " . $e->getMessage() . "</h2>";
}
?>

<br><br>
<a href="test_location_api.html">Test Location API</a> | 
<a href="../xd/build/index.html">Open React App</a>
