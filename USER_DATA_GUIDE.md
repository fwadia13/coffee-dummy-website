# The Copper Kettle — User Data & Orders Guide

## Overview
Your orders and cart data are stored **locally in your browser** for security and privacy. You have full control over this data and can export it at any time.

---

## Where Is My Data Stored?

### **Browser Local Storage**
- **Location**: Browser's built-in `localStorage` (no server required)
- **Keys Used**:
  - `copperKettleCart` — Your current shopping cart
  - `copperKettleOrders` — Your complete order history
- **Visibility**: Only accessible on this device, in this browser
- **Security**: Data never leaves your computer

---

## How to Access Your Data

### **Option 1: View Orders in Browser**
1. Go to **"My Orders"** section
2. See all your past orders with details:
   - Order ID
   - Date & time
   - Items ordered
   - Total amount
   - Payment method
   - Delivery address
   - Order status

### **Option 2: Download Your Data** ⬇️
1. Scroll to the **"My Orders"** section
2. Click the **"Download My Orders & Info"** button
3. A JSON file will be saved to your computer:
   - Filename: `copper-kettle-orders-YYYY-MM-DD.json`
   - Contains: All orders with timestamps

### **Option 3: Manually Check Local Storage**
**Browser DevTools Method:**
1. Open your browser
2. Press `F12` or `Ctrl+Shift+I` to open Developer Tools
3. Go to **"Application"** tab (or **"Storage"** in Firefox)
4. Select **"Local Storage"**
5. Find the website URL
6. Look for:
   - `copperKettleCart` — Current cart contents
   - `copperKettleOrders` — All your orders

---

## What Data Is Collected?

### **Per Order**
- Order ID (unique identifier)
- Customer name
- Mobile number
- Email address
- Delivery address (house, street, area, city, state, pincode)
- Items ordered (name, quantity, price)
- Total amount
- Payment method (UPI or Cash On Delivery)
- UPI ID (if paid via UPI)
- Order date & time
- Order status (Confirmed/Paid)
- Estimated delivery time

### **Cart Data**
- Item ID, name, price
- Quantity of each item
- Subtotal per item

---

## Exporting Your Data

### **Automatic Export (Recommended)**
1. Visit the **"My Orders"** section
2. Click **"Download My Orders & Info"**
3. A `.json` file downloads to your computer
4. Backup this file for your records

### **Manual Backup**
1. Open DevTools (F12)
2. Go to Console tab
3. Run this command to copy your orders:
   ```javascript
   copy(JSON.stringify(JSON.parse(localStorage.getItem('copperKettleOrders')), null, 2))
   ```
4. Paste into a text file and save

---

## Deleting Your Data

### **Clear Cart Only**
- Click the **"Empty Cart"** button in the cart drawer
- All cart items are removed

### **Clear All Data (Orders + Cart)**
1. Open DevTools (F12)
2. Go to **"Application"** → **"Local Storage"**
3. Find your website
4. Delete `copperKettleCart` and `copperKettleOrders` keys
5. Or in Console, run:
   ```javascript
   localStorage.removeItem('copperKettleCart');
   localStorage.removeItem('copperKettleOrders');
   ```

⚠️ **Warning**: This action cannot be undone.

---

## Data Portability

You own your data. You can:
- ✅ Download it anytime
- ✅ Move it to another device (import from backup)
- ✅ Share it (via email, export)
- ✅ Delete it permanently
- ✅ View it in any text editor

---

## Privacy & Security Notes

- **No Cloud Storage**: Your data stays on your device
- **No Tracking**: We don't track your activity
- **No Servers**: No personal information sent to any server
- **Browser-Only**: Only you can access this data
- **Clear Browser Cache**: If you clear browser data, orders will be deleted

---

## Sample Order JSON

Your downloaded file looks like this:

```json
{
  "exportDate": "2024-01-15 2:30 PM",
  "totalOrders": 2,
  "orders": [
    {
      "id": "CK234567",
      "date": "Jan 15, 2024, 2:30 PM",
      "customer": "Margaret Holt",
      "mobile": "+91 98765 43210",
      "email": "margaret@example.com",
      "address": "12A Bunder Street, Fort, Mumbai, Maharashtra - 400001",
      "paymentMethod": "UPI",
      "upiId": "margaret@upi",
      "amount": 580,
      "items": [
        {
          "name": "Espresso",
          "qty": 2,
          "price": 180
        },
        {
          "name": "Butter Croissant",
          "qty": 1,
          "price": 140
        }
      ],
      "status": "Paid",
      "eta": "30-45 minutes"
    }
  ]
}
```

---

## Need Help?

- **Cart Issues**: Refresh the page
- **Missing Orders**: Check if using same browser/device
- **Export Not Working**: Use manual DevTools method above
- **Want to Keep Backup**: Download orders periodically

---

**The Copper Kettle — Est. 1923** ☕

