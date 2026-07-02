# 📡 API Documentation

## Base URL

```
https://script.google.com/macros/d/<DEPLOYMENT_ID>/usercallback
```

Thay `<DEPLOYMENT_ID>` với ID deployment thực tế của bạn.

## Endpoints

### 1️⃣ GET - Lấy doanh thu phòng

**URL:**
```
GET /usercallback?room=<ROOM_NAME>&month=<MONTH>&year=<YEAR>
```

**Parameters:**
| Param | Type | Required | Default | Ví dụ |
|-------|------|----------|---------|-------|
| room | string | ✅ | - | nivo, bento, kenzo |
| month | number | ❌ | Tháng hiện tại | 7 |
| year | number | ❌ | Năm hiện tại | 2025 |

**Response:**
```
🏠 NIVO | 💰 Doanh thu: 25,000,000 ₫ | Hoa hồng: 5,750,000 ₫ | 💵 Lãi: 15,250,000 ₫
```

**Examples:**

Doanh thu tháng hiện tại:
```
GET ?room=nivo
```

Doanh thu tháng 6/2025:
```
GET ?room=nivo&month=6&year=2025
```

---

### 2️⃣ GET - Chạy import dữ liệu

**URL:**
```
GET /usercallback?room=<ROOM_NAME>&run=true&month=<MONTH>&year=<YEAR>
```

**Parameters:**
| Param | Type | Required | Default | Ví dụ |
|-------|------|----------|---------|-------|
| room | string | ✅ | - | nivo |
| run | string | ✅ | - | "true" |
| month | number | ❌ | Tháng hiện tại | 7 |
| year | number | ❌ | Năm hiện tại | 2025 |

**Response:**
```
🏠 NIVO | 💰 Doanh thu: 25,000,000 ₫ | Hoa hồng: 5,750,000 ₫ | 💵 Lãi: 15,250,000 ₫
```

**Examples:**

Import tháng hiện tại:
```
GET ?room=nivo&run=true
```

Import tháng 7/2025:
```
GET ?room=nivo&month=7&year=2025&run=true
```

---

## Response Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Thành công |
| 400 | Bad Request | Tham số không hợp lệ |

## Error Messages

| Message | Nguyên nhân | Giải pháp |
|---------|-----------|----------|
| ❌ Phòng 'xxx' không tồn tại | Tên phòng sai | Kiểm tra tên phòng (bento, kenzo, cento, coco, milo, nivo, pluto) |
| ❌ Chưa có dữ liệu | Sheet chưa tạo hoặc không có booking | Chạy import hoặc kiểm tra dữ liệu calendar |
| ❌ Lỗi: ... | Lỗi server | Xem logs trong Apps Script |

---

## Examples

### 📱 JavaScript Fetch

```javascript
// Lấy doanh thu
const response = await fetch(
  'https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo'
);
const data = await response.text();
console.log(data);

// Chạy import
await fetch(
  'https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true'
);
```

### 🐍 Python

```python
import requests

url = 'https://script.google.com/macros/d/YOUR_ID/usercallback'

# Lấy doanh thu
response = requests.get(url, params={'room': 'nivo'})
print(response.text)

# Chạy import
response = requests.get(url, params={'room': 'nivo', 'run': 'true'})
```

### 📊 Google Sheets Formula

```
=IMPORTDATA("https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo")
```

### 🔗 Direct URL (Browser)

```
https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo
https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&month=7&year=2025
https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true
```

---

## 🔐 Security Notes

- Web app được set **"Anyone"** - bất kỳ ai có URL cũng có thể gọi
- Tất cả dữ liệu được lấy từ các sheet của bạn
- Import chỉ hoạt động nếu có quyền truy cập calendar
- Khuyến cáo: Nếu muốn bảo mật, thay đổi access level hoặc thêm token

---

## 🎯 Common Use Cases

### 1. Dashboard hiển thị tất cả phòng

```html
<script>
const rooms = ['bento', 'kenzo', 'cento', 'coco', 'milo', 'nivo', 'pluto'];
const baseURL = 'https://script.google.com/macros/d/YOUR_ID/usercallback';

rooms.forEach(async (room) => {
  const res = await fetch(`${baseURL}?room=${room}`);
  console.log(room, await res.text());
});
</script>
```

### 2. Chạy import tất cả phòng

```javascript
const rooms = ['bento', 'kenzo', 'cento', 'coco', 'milo', 'nivo', 'pluto'];
const baseURL = 'https://script.google.com/macros/d/YOUR_ID/usercallback';

Promise.all(
  rooms.map(room => 
    fetch(`${baseURL}?room=${room}&run=true`)
  )
);
```

### 3. Lên lịch chạy hàng tháng

Sử dụng cron job hoặc scheduled task:

```bash
# Linux/Mac - crontab
0 2 1 * * curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true"
```

```bash
# Windows - Task Scheduler
# Chạy PowerShell: Invoke-WebRequest "https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true"
```

---

## 📚 Related Functions

Bạn cũng có thể gọi từ Apps Script console:

```javascript
// Import tất cả phòng
runMonthlyImportAllRooms()

// Xem tổng hợp tất cả phòng
getAllRoomsSummary()
getAllRoomsSummary(7, 2025)  // Tháng cụ thể

// Test functions
testFunctions()
```
