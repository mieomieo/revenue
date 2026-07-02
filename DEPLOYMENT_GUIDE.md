# 🚀 Hướng Dẫn Deploy Web App

## Bước 1: Tải code lên Google Apps Script

1. Mở [Google Apps Script](https://script.google.com)
2. Tạo project mới hoặc mở project hiện tại
3. Xóa code mặc định
4. Tạo các file với nội dung từ folder này:
   - **Config.gs** - Copy từ Config.gs
   - **Main.gs** - Copy từ Main.gs
   - **Import.gs** - Copy từ Import.gs
   - **Calendar.gs** - Copy từ Calendar.gs
   - **Summary.gs** - Copy từ Summary.gs
   - **Utils.gs** - Copy từ Utils.gs

5. Cập nhật **appsscript.json**:
   - Nhấn **Project Settings** (⚙️)
   - Show manifest file
   - Copy nội dung từ appsscript.json vào

## Bước 2: Deploy Web App

1. Nhấn **Deploy** → **New Deployment**
2. Type: **Web app**
3. Execute as: **Your account**
4. Who has access: **Anyone**
5. Nhấn **Deploy**
6. Copy URL deployment (dạng: `https://script.google.com/macros/d/<DEPLOYMENT_ID>/usercallback`)

## Bước 3: Test Web App

### Kiểm tra doanh thu phòng nivo tháng hiện tại:
```
https://script.google.com/macros/d/<DEPLOYMENT_ID>/usercallback?room=nivo
```

### Chạy import dữ liệu cho phòng nivo:
```
https://script.google.com/macros/d/<DEPLOYMENT_ID>/usercallback?room=nivo&run=true
```

### Chạy import cho tháng cụ thể:
```
https://script.google.com/macros/d/<DEPLOYMENT_ID>/usercallback?room=nivo&month=6&year=2025&run=true
```

## Bước 4: Tạo Trigger để chạy tự động

1. Mở Apps Script editor
2. Nhấn **Triggers** (⏰ icon bên trái)
3. Nhấn **Create new trigger**
4. Cấu hình:
   - Function: `runMonthlyImportAllRooms`
   - Deployment: **Head**
   - Event source: **Time-driven**
   - Type: **Month**
   - Day of month: **1** (hoặc ngày bạn muốn)
   - Time: **2:00 AM** (hoặc thời gian bạn chọn)
5. Nhấn **Save**

## Bước 5: Kiểm tra quyền (Authorizations)

Khi chạy lần đầu, Google sẽ yêu cầu cấp quyền:
- ✅ Truy cập Google Calendar (đọc)
- ✅ Truy cập Google Sheets (đọc/ghi)
- ✅ Truy cập Google Drive
- ✅ Gửi email (nếu muốn thông báo)

Nhấn **Review permissions** → **Allow** để cấp phép

## 📱 Cách sử dụng qua Web

### GET request để lấy doanh thu:
```bash
curl "https://script.google.com/macros/d/<ID>/usercallback?room=nivo&month=7&year=2025"
```

### GET request để chạy import:
```bash
curl "https://script.google.com/macros/d/<ID>/usercallback?room=nivo&run=true"
```

## 🔄 Cập nhật code

Nếu cần thay đổi code:
1. Chỉnh sửa file trong Apps Script editor
2. Nhấn **Ctrl+S** để lưu (hoặc Save icon)
3. **Không** cần deploy lại nếu dùng "Head" deployment
4. Code sẽ cập nhật tự động

## 📊 Xem logs

1. Mở Apps Script editor
2. Nhấn **Executions** (bên trái)
3. Xem logs của lần chạy gần nhất
4. Hoặc nhấn **Ctrl+Shift+Enter** để mở **Logs**

## 🆘 Gỡ lỗi

**Nếu thấy lỗi:**
1. Mở **Executions** để xem chi tiết lỗi
2. Kiểm tra:
   - Calendar ID có đúng không
   - Sheet ID có hợp lệ không
   - Có quyền truy cập vào Calendar & Sheets không
3. Xem logs với **Ctrl+Shift+Enter**

## 💡 Mẹo

- Bạn có thể tạo **Apps Script add-on** để dễ quản lý hơn
- Có thể tạo **Google Sheet** để hiển thị dashboard
- Có thể integrate với **Discord/Slack** để thông báo doanh thu
