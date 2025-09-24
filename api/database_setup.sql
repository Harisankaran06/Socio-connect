-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS socio_connect;
USE socio_connect;

-- Create the complaints table
CREATE TABLE IF NOT EXISTS complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category ENUM('Electricity', 'Water Supply', 'Sanitation', 'Roads', 'PWD', 'Others') NOT NULL,
    status ENUM('Open', 'In Progress', 'Resolved', 'Closed') DEFAULT 'Open',
    location VARCHAR(255),
    mc_area VARCHAR(10) NOT NULL DEFAULT 'MC1',
    citizen_name VARCHAR(100),
    phone_number VARCHAR(15),
    email VARCHAR(100),
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    image_path VARCHAR(255) NULL,
    priority ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    assigned_to VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_mc_area (mc_area),
    INDEX idx_status (status),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at)
);

-- Insert sample data for MC1
INSERT INTO complaints (title, description, category, status, location, mc_area, citizen_name, phone_number, email, priority) VALUES
('Street light not working', 'The street light near bus stop has been non-functional for 3 days', 'Electricity', 'Open', 'Bus Stop, Main Road', 'MC1', 'Rajesh Kumar', '9876543210', 'rajesh@email.com', 'High'),
('Water leakage in pipeline', 'Major water leakage causing road damage', 'Water Supply', 'In Progress', 'Anna Nagar, 2nd Street', 'MC1', 'Priya Sharma', '9876543211', 'priya@email.com', 'High'),
('Garbage not collected', 'Garbage collection missed for 2 days', 'Sanitation', 'Open', 'Gandhi Street', 'MC1', 'Murugan S', '9876543212', 'murugan@email.com', 'Medium'),
('Pothole on main road', 'Large pothole causing traffic issues', 'Roads', 'Open', 'Main Road, near school', 'MC1', 'Lakshmi Devi', '9876543213', 'lakshmi@email.com', 'High'),
('Sewage overflow', 'Sewage overflowing on the street', 'Sanitation', 'In Progress', 'Cross Street, 5th Block', 'MC1', 'Venkat Reddy', '9876543214', 'venkat@email.com', 'Critical'),
('Power outage', 'Frequent power cuts in residential area', 'Electricity', 'Open', 'Residential Area, Block A', 'MC1', 'Anita Joshi', '9876543215', 'anita@email.com', 'Medium'),
('Road construction debris', 'Construction debris blocking the road', 'PWD', 'Resolved', 'Industrial Area, Phase 2', 'MC1', 'Suresh Babu', '9876543216', 'suresh@email.com', 'Low'),
('Water supply disruption', 'No water supply for 24 hours', 'Water Supply', 'Open', 'New Colony, Sector 3', 'MC1', 'Deepa Krishnan', '9876543217', 'deepa@email.com', 'High'),
('Broken traffic signal', 'Traffic signal not functioning properly', 'Electricity', 'In Progress', 'Signal Junction, Main Road', 'MC1', 'Ravi Shankar', '9876543218', 'ravi@email.com', 'High'),
('Drainage blockage', 'Storm water drain blocked causing flooding', 'Sanitation', 'Open', 'Market Street', 'MC1', 'Meera Nair', '9876543219', 'meera@email.com', 'Critical'),
('Streetlight repair completed', 'Thank you for fixing the streetlight', 'Electricity', 'Resolved', 'Park Road', 'MC1', 'Karthik Ram', '9876543220', 'karthik@email.com', 'Low'),
('Water meter issue', 'Water meter showing incorrect readings', 'Water Supply', 'Open', 'Lotus Apartments', 'MC1', 'Sahana Kumari', '9876543221', 'sahana@email.com', 'Medium'),
('Road widening required', 'Narrow road causing traffic congestion', 'Roads', 'Open', 'Temple Street', 'MC1', 'Gopal Krishna', '9876543222', 'gopal@email.com', 'Low'),
('Public toilet maintenance', 'Public toilet needs cleaning and repair', 'Sanitation', 'In Progress', 'Bus Station', 'MC1', 'Radha Krishnan', '9876543223', 'radha@email.com', 'Medium'),
('Electric pole damaged', 'Electric pole leaning dangerously', 'Electricity', 'Open', 'Old Town, Heritage Street', 'MC1', 'Ashok Kumar', '9876543224', 'ashok@email.com', 'Critical');

-- Insert some sample data for other MC areas for testing
INSERT INTO complaints (title, description, category, status, location, mc_area, citizen_name, phone_number, email, priority) VALUES
('Water shortage', 'Acute water shortage in residential area', 'Water Supply', 'Open', 'Residential Complex', 'MC2', 'Test User', '9876543225', 'test@email.com', 'High'),
('Road maintenance', 'Road needs urgent maintenance', 'Roads', 'In Progress', 'Main Highway', 'MC3', 'Test User 2', '9876543226', 'test2@email.com', 'Medium');

-- Create an index for better performance on frequently queried columns
CREATE INDEX idx_mc_status ON complaints(mc_area, status);
CREATE INDEX idx_mc_category ON complaints(mc_area, category);