<?php
// Enable CORS for all origins
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

class ComplaintsAPI {
    private $conn;
    private $table_name = "complaints";

    public function __construct($db) {
        $this->conn = $db;
    }

    // Get all complaints for MC1
    public function getComplaints($mc_area = 'MC1', $status = null) {
        try {
            $query = "SELECT 
                        id, 
                        title, 
                        description, 
                        category, 
                        status, 
                        location, 
                        citizen_name,
                        phone_number,
                        email,
                        created_at,
                        updated_at,
                        mc_area
                      FROM " . $this->table_name . " 
                      WHERE mc_area = :mc_area";
            
            // Add status filter if provided
            if ($status) {
                $query .= " AND status = :status";
            }
            
            $query .= " ORDER BY created_at DESC";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':mc_area', $mc_area);
            
            if ($status) {
                $stmt->bindParam(':status', $status);
            }
            
            $stmt->execute();

            $complaints = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => $complaints,
                'count' => count($complaints)
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching complaints: ' . $e->getMessage()
            ];
        }
    }

    // Get recent complaints (last 10)
    public function getRecentComplaints($mc_area = 'MC1', $limit = 10) {
        try {
            $query = "SELECT 
                        id, 
                        title, 
                        status, 
                        category,
                        created_at
                      FROM " . $this->table_name . " 
                      WHERE mc_area = :mc_area 
                      ORDER BY created_at DESC 
                      LIMIT :limit";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':mc_area', $mc_area);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();

            $complaints = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => $complaints,
                'count' => count($complaints)
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching recent complaints: ' . $e->getMessage()
            ];
        }
    }

    // Get complaints statistics
    public function getStats($mc_area = 'MC1') {
        try {
            $query = "SELECT 
                        COUNT(*) as total,
                        SUM(CASE WHEN status = 'Open' THEN 1 ELSE 0 END) as open,
                        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as in_progress,
                        SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved,
                        SUM(CASE WHEN status = 'Closed' THEN 1 ELSE 0 END) as closed
                      FROM " . $this->table_name . " 
                      WHERE mc_area = :mc_area";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':mc_area', $mc_area);
            $stmt->execute();

            $stats = $stmt->fetch(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => $stats
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching statistics: ' . $e->getMessage()
            ];
        }
    }

    // Get category-wise statistics
    public function getCategoryStats($mc_area = 'MC1') {
        try {
            $query = "SELECT 
                        category,
                        COUNT(*) as count,
                        SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved_count
                      FROM " . $this->table_name . " 
                      WHERE mc_area = :mc_area 
                      GROUP BY category 
                      ORDER BY count DESC";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':mc_area', $mc_area);
            $stmt->execute();

            $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => $categories
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching category statistics: ' . $e->getMessage()
            ];
        }
    }

    // Get monthly analytics
    public function getMonthlyAnalytics($mc_area = 'MC1') {
        try {
            $query = "SELECT 
                        DATE_FORMAT(created_at, '%Y-%m') as month,
                        COUNT(*) as total_complaints,
                        SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolved_complaints
                      FROM " . $this->table_name . " 
                      WHERE mc_area = :mc_area 
                      AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
                      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
                      ORDER BY month DESC";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':mc_area', $mc_area);
            $stmt->execute();

            $analytics = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return [
                'success' => true,
                'data' => $analytics
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching analytics: ' . $e->getMessage()
            ];
        }
    }

    // Get complaints with location data for map visualization
    public function getComplaintsWithLocation($mc_area = 'MC1', $category = null) {
        try {
            $query = "SELECT 
                        id, 
                        title, 
                        description, 
                        category, 
                        status, 
                        location, 
                        latitude,
                        longitude,
                        priority,
                        citizen_name,
                        phone_number,
                        created_at,
                        updated_at
                      FROM " . $this->table_name . " 
                      WHERE mc_area = :mc_area 
                      AND latitude IS NOT NULL 
                      AND longitude IS NOT NULL";
            
            // Add category filter if provided
            if ($category) {
                $query .= " AND category = :category";
            }
            
            $query .= " ORDER BY created_at DESC";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':mc_area', $mc_area);
            
            if ($category) {
                $stmt->bindParam(':category', $category);
            }
            
            $stmt->execute();

            $complaints = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert coordinates to proper numeric format
            foreach ($complaints as &$complaint) {
                $complaint['latitude'] = (float)$complaint['latitude'];
                $complaint['longitude'] = (float)$complaint['longitude'];
            }
            
            return [
                'success' => true,
                'data' => $complaints,
                'count' => count($complaints)
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error fetching complaints with location: ' . $e->getMessage()
            ];
        }
    }

    // Update complaint status and priority with proper database commit
    public function updateComplaint($id, $status, $priority = null, $mc_area = 'MC1') {
        try {
            // Start transaction for data integrity
            $this->conn->beginTransaction();
            
            // Prepare base query with updated_at timestamp
            $query = "UPDATE " . $this->table_name . " 
                      SET status = :status, updated_at = CURRENT_TIMESTAMP";
            
            // Add priority to query if provided
            if ($priority !== null) {
                $query .= ", priority = :priority";
            }
            
            $query .= " WHERE id = :id AND mc_area = :mc_area";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':mc_area', $mc_area);
            
            // Bind priority parameter if provided
            if ($priority !== null) {
                $stmt->bindParam(':priority', $priority);
            }
            
            $result = $stmt->execute();
            
            if ($result && $stmt->rowCount() > 0) {
                // Commit the transaction to permanently save changes
                $this->conn->commit();
                
                // Fetch the updated record to return current data
                $fetchQuery = "SELECT id, title, status, priority, updated_at, mc_area 
                              FROM " . $this->table_name . " 
                              WHERE id = :id AND mc_area = :mc_area";
                $fetchStmt = $this->conn->prepare($fetchQuery);
                $fetchStmt->bindParam(':id', $id);
                $fetchStmt->bindParam(':mc_area', $mc_area);
                $fetchStmt->execute();
                $updatedRecord = $fetchStmt->fetch(PDO::FETCH_ASSOC);
                
                return [
                    'success' => true,
                    'message' => 'Complaint status updated successfully and saved to database',
                    'data' => $updatedRecord
                ];
            } else {
                // Rollback if no rows were affected
                $this->conn->rollback();
                return [
                    'success' => false,
                    'message' => 'No complaint found with the specified ID in the given MC area'
                ];
            }
        } catch (Exception $e) {
            // Rollback transaction on error
            if ($this->conn->inTransaction()) {
                $this->conn->rollback();
            }
            return [
                'success' => false,
                'message' => 'Error updating complaint: ' . $e->getMessage()
            ];
        }
    }
}

// Handle API requests
try {
    $database = new Database();
    $db = $database->getConnection();
    $complaintsAPI = new ComplaintsAPI($db);
    
    $request_method = $_SERVER["REQUEST_METHOD"];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path_parts = explode('/', trim($path, '/'));
    
    // Get MC area from query parameter, default to MC1
    $mc_area = isset($_GET['mc_area']) ? $_GET['mc_area'] : 'MC1';
    
    // Handle different URL patterns for development server vs Apache
    $endpoint = '';
    if (isset($_GET['endpoint'])) {
        // PHP dev server pattern: complaints.php?endpoint=stats
        $endpoint = $_GET['endpoint'];
    } else {
        // Apache pattern: complaints.php/stats
        $endpoint = end($path_parts);
    }
    
    if ($request_method == 'GET') {
        // Determine which endpoint is being called
        switch ($endpoint) {
            case 'complaints':
                $status = isset($_GET['status']) ? $_GET['status'] : null;
                $result = $complaintsAPI->getComplaints($mc_area, $status);
                break;
            case 'recent':
                $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
                $result = $complaintsAPI->getRecentComplaints($mc_area, $limit);
                break;
            case 'locations':
                $category = isset($_GET['category']) ? $_GET['category'] : null;
                $result = $complaintsAPI->getComplaintsWithLocation($mc_area, $category);
                break;
            case 'stats':
                $result = $complaintsAPI->getStats($mc_area);
                break;
            case 'category-stats':
                $result = $complaintsAPI->getCategoryStats($mc_area);
                break;
            case 'analytics':
                $result = $complaintsAPI->getMonthlyAnalytics($mc_area);
                break;
            default:
                $result = [
                    'success' => false,
                    'message' => 'Invalid endpoint. Available endpoints: complaints, recent, stats, category-stats, analytics'
                ];
        }
        
        sendResponse($result);
    } elseif ($request_method == 'POST') {
        // Handle POST requests
        if ($endpoint == 'update-complaint' || isset($_GET['action']) && $_GET['action'] == 'update-complaint') {
            // Get POST data
            $input = json_decode(file_get_contents('php://input'), true);
            
            // Validate required fields
            if (!isset($input['id']) || !isset($input['status'])) {
                sendResponse([
                    'success' => false,
                    'message' => 'Missing required fields: id and status'
                ], 400);
                return;
            }
            
            $id = $input['id'];
            $status = $input['status'];
            $priority = isset($input['priority']) ? $input['priority'] : null;
            $mc_area = isset($input['mc_area']) ? $input['mc_area'] : 'MC1';
            
            $result = $complaintsAPI->updateComplaint($id, $status, $priority, $mc_area);
            sendResponse($result);
        } else {
            sendResponse([
                'success' => false,
                'message' => 'Invalid POST endpoint. Available endpoints: update-complaint'
            ], 404);
        }
    } else {
        sendResponse([
            'success' => false,
            'message' => 'Method not allowed'
        ], 405);
    }
    
} catch (Exception $e) {
    sendResponse([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ], 500);
}
?>