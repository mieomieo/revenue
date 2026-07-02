# ⚡ Quick Start Guide

## 5 phút để chạy được hệ thống

### 🚀 Bước 1: Setup Google Apps Script (2 phút)

1. Mở [Google Apps Script](https://script.google.com)
2. Tạo project mới: **New Project**
3. Copy code từ 6 file `.gs`:
   - **Config.gs** - Cấu hình các phòng
   - **Main.gs** - Entry point
   - **Import.gs** - Logic import
   - **Calendar.gs** - Fetch calendar
   - **Summary.gs** - Tính toán doanh thu
   - **Utils.gs** - Helper functions

4. Cập nhật **appsscript.json** (Project Settings → Show manifest file)

### 📦 Bước 2: Deploy (1 phút)

1. Nhấn **Deploy** → **New Deployment**
2. Type: **Web app**
3. Execute as: **[Your account]**
4. Who has access: **Anyone**
5. Nhấn **Deploy**
6. **Copy URL** (có dạng `https://script.google.com/macros/d/...`)

### ✅ Bước 3: Test (2 phút)

Paste URL vào browser với:

```
https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo
```

Kết quả:
```
🏠 NIVO | 💰 Doanh thu: 25,000,000 ₫ | Hoa hồng: 5,750,000 ₫ | 💵 Lãi: 15,250,000 ₫
```

Nếu thấy: `❌ Chưa có dữ liệu` → chạy import ở bước 4

### 🔄 Bước 4: Chạy Import lần đầu (2 phút)

```
https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true
```

Đợi 10-30 giây, sau đó f5 để xem kết quả.

---

## 🎯 Cách sử dụng

### Lấy doanh thu phòng

```
?room=nivo                          ← Tháng hiện tại
?room=nivo&month=6&year=2025        ← Tháng 6/2025
```

### Chạy import dữ liệu

```
?room=nivo&run=true                 ← Tháng hiện tại
?room=nivo&month=6&year=2025&run=true
```

### Tất cả phòng

Mở Apps Script console (Ctrl+Enter):

```javascript
runMonthlyImportAllRooms()      // Import tất cả phòng
getAllRoomsSummary()             // Xem tổng hợp
```

---

## 📋 Danh sách phòng

```
bento, kenzo, cento, coco, milo, nivo, pluto
```

---

## ⚙️ Cấu hình (tuỳ chọn)

### Thêm phòng mới

Mở **Config.gs**, thêm:

```javascript
const CONFIG = {
  // ...
  phongMoi: {
    calendarId: 'YOUR_CALENDAR_ID',
    sheetId: 'YOUR_SHEET_ID',
    housePrice: 5200000,
    commonPrice: 400000,
    cleanPrice: 2000000,
  },
};
```

### Tìm Calendar ID & Sheet ID

**Calendar ID:**
1. Google Calendar → Calendar Settings
2. Tìm "Calendar ID" (dạng `xxx@group.calendar.google.com`)

**Sheet ID:**
```
https://docs.google.com/spreadsheets/d/SHEET_ID_Ở_ĐÂY/edit
```

---

## 🔐 Bảo mật (tuỳ chọn)

Nếu muốn giới hạn truy cập:

1. **Deploy** → chọn deployment hiện tại
2. Thay **Who has access** từ "Anyone" thành "Specific people"
3. Thêm email người được phép truy cập

---

## 🆘 Gỡ lỗi

| Vấn đề | Giải pháp |
|--------|----------|
| ❌ Chưa có dữ liệu | Chạy import: `?room=nivo&run=true` |
| ❌ Phòng không tồn tại | Kiểm tra tên phòng (chữ hoa/thường) |
| ❌ Lỗi timeout | Import từng phòng thay vì tất cả |
| 📊 Dữ liệu cũ | Xem Logs: Ctrl+Shift+Enter |

---

## 📚 Tài liệu

- [API Documentation](./API_DOCS.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [FAQ](./FAQ.md)
- [README](./README_UPDATED.md)

---

## 💬 Tips

✅ **Đơn giản**: Chỉ cần paste URL vào browser
✅ **Nhanh**: 5 phút từ setup đến chạy được
✅ **Tự động**: Có thể setup trigger chạy hàng tháng
✅ **Mở rộng**: Dễ thêm phòng mới hoặc tính năng

🎉 **Thành công!**
