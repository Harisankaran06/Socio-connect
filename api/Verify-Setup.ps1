# Socio Connect - PowerShell API Verification Script
# Advanced testing with detailed diagnostics

param(
    [switch]$Detailed,
    [switch]$Quick,
    [string]$BaseUrl = "http://localhost/project/desktop/web/api"
)

# Color functions
function Write-Success { param($Message) Write-Host "✅ $Message" -ForegroundColor Green }
function Write-Error { param($Message) Write-Host "❌ $Message" -ForegroundColor Red }
function Write-Warning { param($Message) Write-Host "⚠️  $Message" -ForegroundColor Yellow }
function Write-Info { param($Message) Write-Host "ℹ️  $Message" -ForegroundColor Cyan }

# Test counters
$script:PassCount = 0
$script:FailCount = 0
$script:TotalTests = 0

function Test-Result {
    param($Condition, $SuccessMessage, $FailMessage)
    $script:TotalTests++
    if ($Condition) {
        Write-Success $SuccessMessage
        $script:PassCount++
        return $true
    } else {
        Write-Error $FailMessage
        $script:FailCount++
        return $false
    }
}

function Test-ApiEndpoint {
    param($Endpoint, $Name, $ExpectedKey = "success")
    
    try {
        $url = "$BaseUrl/$Endpoint"
        Write-Host "  Testing: $url" -ForegroundColor Gray
        
        $response = Invoke-RestMethod -Uri $url -Method Get -TimeoutSec 10
        
        if ($response.$ExpectedKey -eq $true) {
            Test-Result $true "$Name API is working" "$Name API failed"
            if ($Detailed) {
                Write-Host "  Response:" -ForegroundColor Gray
                $response | ConvertTo-Json -Depth 3 | Write-Host -ForegroundColor DarkGray
            }
            return $true
        } else {
            Test-Result $false "$Name API is working" "$Name API returned error: $($response.message)"
            return $false
        }
    }
    catch {
        Test-Result $false "$Name API is working" "$Name API failed: $($_.Exception.Message)"
        return $false
    }
}

# Header
Clear-Host
Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           🚀 SOCIO CONNECT - POWERSHELL VERIFICATION         ║" -ForegroundColor Cyan
Write-Host "║                     Advanced API Testing                     ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Info "Starting comprehensive API verification..."
Write-Host "Base URL: $BaseUrl" -ForegroundColor Gray
Write-Host ""

# Test 1: Network Connectivity
Write-Host "🌐 Test 1: Network Connectivity" -ForegroundColor Yellow
$ping = Test-Connection -ComputerName "localhost" -Count 1 -Quiet
Test-Result $ping "Localhost is accessible" "Localhost is not accessible - Check network"

# Test 2: Web Server
Write-Host "`n🔧 Test 2: Web Server Status" -ForegroundColor Yellow
try {
    $webTest = Invoke-WebRequest -Uri "http://localhost" -Method Head -TimeoutSec 5
    Test-Result ($webTest.StatusCode -eq 200) "Apache web server is running" "Apache web server is not responding"
}
catch {
    Test-Result $false "Apache web server is running" "Apache web server is not running: $($_.Exception.Message)"
}

# Test 3: API Directory
Write-Host "`n📁 Test 3: API Directory Access" -ForegroundColor Yellow
try {
    $apiTest = Invoke-WebRequest -Uri $BaseUrl -Method Head -TimeoutSec 5
    Test-Result ($apiTest.StatusCode -eq 200) "API directory is accessible" "API directory is not accessible"
}
catch {
    Test-Result $false "API directory is accessible" "API directory access failed: $($_.Exception.Message)"
}

# Test 4: Database Connection via test.php
Write-Host "`n🗄️ Test 4: Database Connection" -ForegroundColor Yellow
try {
    $dbTest = Invoke-WebRequest -Uri "$BaseUrl/test.php" -TimeoutSec 10
    $dbWorking = $dbTest.Content -match "Database connection successful"
    Test-Result $dbWorking "Database connection is working" "Database connection failed - Check MySQL"
}
catch {
    Test-Result $false "Database connection is working" "Database test failed: $($_.Exception.Message)"
}

# Test API Endpoints
Write-Host "`n📊 Test 5: Statistics API" -ForegroundColor Yellow
Test-ApiEndpoint "stats?mc_area=MC1" "Statistics"

Write-Host "`n🕐 Test 6: Recent Complaints API" -ForegroundColor Yellow
Test-ApiEndpoint "recent?mc_area=MC1&limit=5" "Recent Complaints"

Write-Host "`n📋 Test 7: All Complaints API" -ForegroundColor Yellow
Test-ApiEndpoint "complaints?mc_area=MC1" "All Complaints"

Write-Host "`n📈 Test 8: Category Statistics API" -ForegroundColor Yellow
Test-ApiEndpoint "category-stats?mc_area=MC1" "Category Statistics"

Write-Host "`n📊 Test 9: Analytics API" -ForegroundColor Yellow
Test-ApiEndpoint "analytics?mc_area=MC1" "Analytics"

# Test 10: Data Validation
Write-Host "`n🔍 Test 10: Data Validation" -ForegroundColor Yellow
try {
    $statsResponse = Invoke-RestMethod -Uri "$BaseUrl/stats?mc_area=MC1" -TimeoutSec 10
    $hasValidData = $statsResponse.data.total -gt 0
    Test-Result $hasValidData "Sample data exists in database" "No sample data found - Run database_setup.sql"
}
catch {
    Test-Result $false "Sample data exists in database" "Data validation failed"
}

# Final Results
Write-Host "`n╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║                        📋 FINAL RESULTS                      ║" -ForegroundColor Magenta
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""

$successRate = [math]::Round(($script:PassCount / $script:TotalTests) * 100, 1)

Write-Host "✅ Passed Tests: $script:PassCount / $script:TotalTests ($successRate%)" -ForegroundColor Green
Write-Host "❌ Failed Tests: $script:FailCount / $script:TotalTests" -ForegroundColor Red
Write-Host ""

if ($script:PassCount -eq $script:TotalTests) {
    Write-Host "🎉 PERFECT! All tests passed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "✅ Your API is fully functional and ready for React integration" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Start your React development server: npm start" -ForegroundColor White
    Write-Host "   2. Navigate to the MC1 Dashboard" -ForegroundColor White
    Write-Host "   3. Verify real data appears instead of fallback data" -ForegroundColor White
    Write-Host "   4. Test all MC1 components (DBMC1, TOTMC1, ANAMC1)" -ForegroundColor White
}
elseif ($script:PassCount -ge ($script:TotalTests * 0.7)) {
    Write-Warning "Most tests passed, but some issues need attention"
    Write-Host ""
    Write-Host "🔧 Recommended Actions:" -ForegroundColor Yellow
    Write-Host "   1. Review and fix the failed tests above" -ForegroundColor White
    Write-Host "   2. Re-run this verification script" -ForegroundColor White
    Write-Host "   3. Test React app (should work with fallback data)" -ForegroundColor White
}
else {
    Write-Error "Multiple critical issues found!"
    Write-Host ""
    Write-Host "🛠️  Required Actions:" -ForegroundColor Red
    Write-Host "   1. Ensure XAMPP/WAMP is running (Apache + MySQL)" -ForegroundColor White
    Write-Host "   2. Verify 'socio_connect' database exists" -ForegroundColor White
    Write-Host "   3. Check API files are in: C:\xampp\htdocs\project\desktop\web\api\" -ForegroundColor White
    Write-Host "   4. Run database_setup.sql in phpMyAdmin" -ForegroundColor White
}

Write-Host ""
Write-Host "🔗 Quick Links:" -ForegroundColor Cyan
Write-Host "   • Detailed Test Page: http://localhost/project/desktop/web/api/test.php" -ForegroundColor White
Write-Host "   • Database Admin: http://localhost/phpmyadmin" -ForegroundColor White
Write-Host "   • API Base URL: $BaseUrl" -ForegroundColor White

# Save log
$logEntry = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Verification: $script:PassCount/$script:TotalTests passed ($successRate%)"
$logEntry | Out-File -FilePath "verification_log.txt" -Append

Write-Host ""
Write-Host "📄 Results logged to: verification_log.txt" -ForegroundColor Gray
Write-Host ""
Read-Host "Press Enter to exit"