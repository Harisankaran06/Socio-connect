# PHP MySQL Database Setup Guide for Socio Connect

## Prerequisites
- XAMPP/WAMP/LAMP server with PHP 7.4+ and MySQL 5.7+
- Web server (Apache) running on localhost

## Step 1: Database Setup

1. **Start your local server** (XAMPP/WAMP)
   - Start Apache and MySQL services

2. **Access phpMyAdmin**
   - Open: http://localhost/phpmyadmin

3. **Create Database**
   - Run the SQL script: `api/database_setup.sql`
   - This will create the `socio_connect` database with sample data

## Step 2: Configure Database Connection

1. **Update database credentials in `api/config.php`**
   ```php
   private $host = "localhost";
   private $db_name = "socio_connect"; // Your database name
   private $username = "root";         // Your MySQL username
   private $password = "";             // Your MySQL password
   ```

## Step 3: Setup Web Server

1. **Place API files in web server directory**
   - Copy the entire `api` folder to your web server root
   - Example paths:
     - XAMPP: `C:\xampp\htdocs\project\desktop\web\api\`
     - WAMP: `C:\wamp64\www\project\desktop\web\api\`

2. **Enable Apache mod_rewrite** (for clean URLs)
   - In Apache config, ensure mod_rewrite is enabled
   - The .htaccess file will handle URL routing

## Step 4: Test API Endpoints

Test these URLs in your browser:

1. **Statistics**: `http://localhost/project/desktop/web/api/stats?mc_area=MC1`
2. **All Complaints**: `http://localhost/project/desktop/web/api/complaints?mc_area=MC1`
3. **Recent Complaints**: `http://localhost/project/desktop/web/api/recent?mc_area=MC1&limit=5`
4. **Category Stats**: `http://localhost/project/desktop/web/api/category-stats?mc_area=MC1`
5. **Analytics**: `http://localhost/project/desktop/web/api/analytics?mc_area=MC1`

## Step 5: Update React App URLs

If your API is hosted at a different path, update these files:
- `src/Tamilnadu/MC/MC1/TOTMC1.js`
- `src/Tamilnadu/MC/MC1/RecentCompliants.js`
- `src/Tamilnadu/MC/MC1/DBMC1.js`

Change the API base URL from:
```javascript
'http://localhost/project/desktop/web/api/'
```
to your actual server path.

## Database Schema

### Complaints Table Structure
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- title (VARCHAR(255), NOT NULL)
- description (TEXT)
- category (ENUM: Electricity, Water Supply, Sanitation, Roads, PWD, Others)
- status (ENUM: Open, In Progress, Resolved, Closed)
- location (VARCHAR(255))
- mc_area (VARCHAR(10), DEFAULT 'MC1')
- citizen_name (VARCHAR(100))
- phone_number (VARCHAR(15))
- email (VARCHAR(100))
- latitude (DECIMAL(10,8))
- longitude (DECIMAL(11,8))
- image_path (VARCHAR(255))
- priority (ENUM: Low, Medium, High, Critical)
- assigned_to (VARCHAR(100))
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## API Response Format

All API endpoints return JSON in this format:
```json
{
  "success": true/false,
  "data": [...],
  "message": "Error message (if any)",
  "count": 10
}
```

## Troubleshooting

1. **CORS Issues**: The API includes CORS headers for cross-origin requests
2. **Database Connection**: Check MySQL credentials in config.php
3. **Apache Rewrite**: Ensure mod_rewrite is enabled for clean URLs
4. **PHP Errors**: Check Apache error logs for PHP issues
5. **API Path**: Verify the API URL path matches your server setup

## Adding New MC Areas

To add support for other MC areas (MC2, MC3, etc.):
1. Add sample data with appropriate `mc_area` values
2. Update React components to use different `mc_area` parameters
3. The API already supports filtering by `mc_area`

## Security Notes

- In production, use environment variables for database credentials
- Implement proper authentication/authorization
- Add input validation and sanitization
- Use HTTPS for secure data transmission