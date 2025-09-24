#!/usr/bin/env python3
"""
Script to fix status values in all department files to match database format
"""
import os
import re

# Directory containing the department files
dept_dir = r"c:\Users\charuhari\OneDrive\Documents\project\desktop\web\xd\src\Tamilnadu\MC\MC1\DP"

# Files to process
files = ['PWDMC1.js', 'WATMC1.js']  # Already fixed others

def fix_status_values(file_path):
    """Fix status values in a JavaScript file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix mock data status values
        content = re.sub(r"status: 'open'", "status: 'Open'", content)
        content = re.sub(r"status: 'in_progress'", "status: 'In Progress'", content)
        content = re.sub(r"status: 'resolved'", "status: 'Resolved'", content)
        
        # Fix local state updates
        content = re.sub(r"status: 'resolved'(?=[\s}])", "status: 'Resolved'", content)
        content = re.sub(r"status: 'in_progress'(?=[\s}])", "status: 'In Progress'", content)
        
        # Fix bulk action status checks
        content = re.sub(r"status === 'open'", "status === 'Open'", content)
        content = re.sub(r"status === 'in_progress'", "status === 'In Progress'", content)
        
        # Fix getStatusClass function
        old_get_status = """  const getStatusClass = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in_progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-open';
    }
  };"""
        
        new_get_status = """  const getStatusClass = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case 'open': return 'status-open';
      case 'in progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return 'status-open';
    }
  };"""
        
        content = content.replace(old_get_status, new_get_status)
        
        # Fix formatStatus function
        old_format_status = """  const formatStatus = (status) => {
    switch (status) {
      case 'in_progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return 'Open';
    }
  };"""
        
        new_format_status = """  const formatStatus = (status) => {
    if (!status) return 'Open';
    // Status is already in proper case from database
    return status;
  };"""
        
        content = content.replace(old_format_status, new_format_status)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"✅ Fixed status values in {os.path.basename(file_path)}")
        
    except Exception as e:
        print(f"❌ Error fixing {file_path}: {e}")

def main():
    """Main function to process all department files"""
    print("🔧 Fixing status values in department files...")
    
    for filename in files:
        file_path = os.path.join(dept_dir, filename)
        if os.path.exists(file_path):
            fix_status_values(file_path)
        else:
            print(f"⚠️ File not found: {file_path}")
    
    print("✨ All status value fixes completed!")

if __name__ == "__main__":
    main()