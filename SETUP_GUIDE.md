# Quick Setup Instructions

## ✅ What I've Already Done For You:
1. ✅ Created all PHP API files
2. ✅ Set up database configuration 
3. ✅ Updated React components to use API
4. ✅ Created SQL database script
5. ✅ Added error handling and fallbacks
6. ✅ Created API test script

## 🔧 What You Need To Do (5 Simple Steps):

### Step 1: Install XAMPP
- Download: https://www.apachefriends.org/download.html
- Install with default settings
- ✅ **Done when**: You see XAMPP Control Panel

### Step 2: Start Services
- Open XAMPP Control Panel
- Click "Start" next to Apache
- Click "Start" next to MySQL
- ✅ **Done when**: Both show green "Running"

### Step 3: Create Database
- Open browser → http://localhost/phpmyadmin
- Click "New" → Name: `socio_connect` → Create
- Click "SQL" tab
- Copy/paste content from `database_setup.sql`
- Click "Go"
- ✅ **Done when**: You see "15 rows affected"

### Step 4: Copy API Files
- Copy your `api` folder to: `C:\xampp\htdocs\project\desktop\web\api\`
- ✅ **Done when**: You can see files in that folder

### Step 5: Test Everything
- Double-click `test_api.bat` in your api folder
- ✅ **Done when**: You see JSON responses (not errors)

## 🚨 If Step 5 Shows Errors:

### Error: "API connection failed"
**Fix**: Check if Apache is running in XAMPP

### Error: "Database connection error"  
**Fix**: Check if MySQL is running in XAMPP

### Error: "404 Not Found"
**Fix**: Make sure API folder is in: `C:\xampp\htdocs\project\desktop\web\api\`

### Error: "Table doesn't exist"
**Fix**: Run the SQL script again in phpMyAdmin

## 🎯 Expected Result:
After setup, your React app will show:
- Real complaint counts in dashboard
- Actual complaint data in lists
- Live analytics from database

## 📞 Need Help?
Run `test_api.bat` and share the output if you see errors!