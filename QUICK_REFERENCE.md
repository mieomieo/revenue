# ⌨️ Quick Reference Commands

## 🌐 Web App URLs

### Template
```
https://script.google.com/macros/d/<YOUR_DEPLOYMENT_ID>/usercallback
```

### Common Requests

| Purpose | URL | Result |
|---------|-----|--------|
| **Current month** | `?room=nivo` | Doanh thu tháng hiện tại |
| **Specific month** | `?room=nivo&month=6&year=2025` | Doanh thu T6/2025 |
| **Run import** | `?room=nivo&run=true` | Import + doanh thu |
| **All rooms** | `runMonthlyImportAllRooms()` | Import tất cả (console) |
| **Summary** | `getAllRoomsSummary()` | Tổng hợp (console) |

---

## 🏠 Available Rooms

```
bento, kenzo, cento, coco, milo, nivo, pluto
```

---

## 📝 Apps Script Console Commands

Mở: **Ctrl+Enter** (trong Apps Script editor)

### Import & Run

```javascript
// Import 1 phòng (tháng hiện tại)
importMonthlyCreatedEvents(CONFIG.nivo, new Date())

// Import tất cả phòng
runMonthlyImportAllRooms()

// Import phòng cụ thể với tháng cụ thể
const date = new Date(2025, 5, 1);  // Tháng 6/2025
importMonthlyCreatedEvents(CONFIG.bento, date)
```

### Query & Get Data

```javascript
// Xem tất cả phòm
Object.keys(CONFIG).forEach(room => Logger.log(room))

// Xem config 1 phòng
Logger.log(CONFIG.nivo)

// Tổng hợp tất cả phòng
getAllRoomsSummary()

// Tổng hợp tháng cụ thể
getAllRoomsSummary(6, 2025)

// Kiểm tra dữ liệu
testFunctions()
```

### Spreadsheet Operations

```javascript
// Get sheet của phòng nivo
const ss = SpreadsheetApp.openById(CONFIG.nivo.sheetId)
const sheet = ss.getSheetByName('T7/25')

// Xem doanh thu
const revenue = sheet.getRange('O2').getValue()
Logger.log(revenue)

// Xem lãi
const profit = sheet.getRange('X2').getValue()
Logger.log(profit)

// Export data
const data = sheet.getDataRange().getValues()
Logger.log(data)
```

### Utilities

```javascript
// Format date
formatDateTime(new Date())                    // 02/07/2025 14:30
formatDateTimeReverse(new Date())             // 14:30 02/07/2025

// Parse description
const desc = '- 0123456789\n- tt\n- 379k\n- +15k service'
parseDescription(desc)                        // [sdt, app, price, service, notes]

// Generate link
generateEventLink('eventId123', 'calendarId')
```

---

## 🔧 Configuration Changes

### Thêm phòm mới

**File**: `Config.gs`

```javascript
const CONFIG = {
  // ... existing rooms ...
  
  newRoom: {
    calendarId: 'CALENDAR_ID@group.calendar.google.com',
    sheetId: 'SHEET_ID',
    housePrice: 5200000,
    commonPrice: 400000,
    cleanPrice: 2000000,
  },
};
```

### Thay đổi giá

```javascript
const CONFIG = {
  nivo: {
    // ...
    housePrice: 6000000,    // ← Thay đổi
    commonPrice: 500000,    // ← Thay đổi
    cleanPrice: 2500000,    // ← Thay đổi
  },
};
```

---

## 📊 Google Sheets Formulas

### Doanh thu theo ngày (Column M-O)
```
=SUM(K2:K)    (M2) - Tổng dịch vụ
=SUM(J2:J)    (N2) - Tổng phòng
=M2+N2        (O2) - Tổng doanh thu
```

### Commission (Column W)
```javascript
=IF(AND(O2>=9000000, O2<14000000), 15%,
    IF(AND(O2>=14000000, O2<19000000), 23%,
    IF(AND(O2>=19000000, O2<24000000), 29%,
    IF(O2>=24000000, 35%, ""))))*O2
```

### Profit (Column X)
```
=Q2-R2-S2-T2-U2-V2-W2-SUM(V4:V)
```

Hoặc đơn giản:
```
=Doanh_thu - Giá_nhà - Dịch_vụ_chung - Điện - Nước - Dọn_nhà - Hoa_hồng - Chi_phí_khác
```

---

## 🚀 Automation Commands

### Set Trigger (Apps Script UI)
1. **Triggers** → **Create new trigger**
2. Function: `runMonthlyImportAllRooms`
3. Event: **Time-driven** → **Month** → Day 1 → 2:00 AM

### Linux Cron

```bash
# Add to crontab (crontab -e)
0 2 1 * * curl "https://...?room=nivo&run=true"

# For all rooms (one-liner)
0 2 1 * * for room in bento kenzo cento coco milo nivo pluto; do curl "https://...?room=$room&run=true"; done
```

### Windows Batch

```batch
@echo off
curl "https://...?room=bento&run=true"
curl "https://...?room=kenzo&run=true"
curl "https://...?room=cento&run=true"
```

---

## 🔍 Debugging

### View Logs
```javascript
// In console
testFunctions()

// Or manually
Logger.log('Debug message')

// View logs: Ctrl+Shift+Enter
```

### Check Config
```javascript
// List all rooms
Object.keys(CONFIG)

// Verify calendar ID
CONFIG.nivo.calendarId

// Verify sheet ID
CONFIG.nivo.sheetId
```

### Test Import
```javascript
// Test 1 room
const date = new Date()
importMonthlyCreatedEvents(CONFIG.nivo, date)

// Check Executions tab for errors
```

---

## 📱 Common Workflows

### Daily Check Revenue
```
1. Browser: ?room=nivo
2. Check output
3. If need update: ?room=nivo&run=true
```

### Weekly Summary
```javascript
// In console
getAllRoomsSummary()
```

### Monthly Import
```
1. Auto trigger (setup once)
2. Or manual: ?room=nivo&run=true for each room
3. Or console: runMonthlyImportAllRooms()
```

### Add New Room
```
1. Get Calendar ID & Sheet ID
2. Edit Config.gs
3. Save
4. Test: ?room=newRoom
5. Import: ?room=newRoom&run=true
```

---

## ⚡ Keyboard Shortcuts (Apps Script)

| Shortcut | Action |
|----------|--------|
| Ctrl+S | Save |
| Ctrl+Enter | Open console/logs |
| Ctrl+Shift+Enter | View execution logs |
| Tab | Indent |
| Shift+Tab | Unindent |
| Ctrl+/ | Comment/uncomment |
| Ctrl+F | Find |
| Ctrl+H | Find & replace |

---

## 🔐 Security Commands

### Check Permissions
```javascript
// View current scopes
ScriptApp.getOAuthToken()

// Check triggers
ScriptApp.getProjectTriggers()

// Check deployed apps
ScriptApp.getOAuthTokenExpiresAt()
```

### Reset Permissions
1. **Project Settings** → **Show manifest file**
2. Edit oauthScopes if needed
3. Redeploy

---

## 📈 Analytics Commands

### Get Statistics

```javascript
// Count rooms
Object.keys(CONFIG).length  // 7

// Sum all revenue
let total = 0
Object.keys(CONFIG).forEach(room => {
  const ss = SpreadsheetApp.openById(CONFIG[room].sheetId)
  // ... sum logic
})

// Get revenue by room
const results = {}
Object.keys(CONFIG).forEach(room => {
  const ss = SpreadsheetApp.openById(CONFIG[room].sheetId)
  const sheet = ss.getSheetByName('T7/25')
  results[room] = sheet.getRange('O2').getValue()
})
Logger.log(results)
```

---

## 🎯 Most Used Commands

### Top 5 Daily

```javascript
// 1. Check revenue (URL)
?room=nivo

// 2. Run import (URL)
?room=nivo&run=true

// 3. Summary (Console)
getAllRoomsSummary()

// 4. Import all (Console)
runMonthlyImportAllRooms()

// 5. Test (Console)
testFunctions()
```

---

**Bookmark này để tra cứu nhanh!** 🚀
