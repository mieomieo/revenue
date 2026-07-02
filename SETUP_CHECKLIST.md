# ✅ Setup Checklist

## Pre-Setup

- [ ] Có quyền truy cập tất cả Google Calendars (phòng)
- [ ] Có quyền edit tất cả Google Sheets (doanh thu)
- [ ] Tài khoản Google có đủ quota (không bị limit)

## Code Setup

### Files Created
- [ ] **Config.gs** - Cấu hình phòng
  - [ ] Calendar ID chính xác
  - [ ] Sheet ID chính xác  
  - [ ] Giá tiền đúng
- [ ] **Main.gs** - Entry point (doGet, runMonthlyImportAllRooms)
- [ ] **Import.gs** - Logic import
- [ ] **Calendar.gs** - Fetch events
- [ ] **Summary.gs** - Tính toán
- [ ] **Utils.gs** - Helper functions
- [ ] **appsscript.json** - Manifest

### Manifest Permissions
- [ ] `https://www.googleapis.com/auth/calendar.readonly`
- [ ] `https://www.googleapis.com/auth/spreadsheets`
- [ ] `https://www.googleapis.com/auth/drive`
- [ ] `https://www.googleapis.com/auth/gmail.send`

## Deployment

- [ ] Code lưu (Ctrl+S)
- [ ] Không có syntax errors
- [ ] Deployed as **Web app**
- [ ] Execute as: **Your account**
- [ ] Who has access: **Anyone** (hoặc specific people)
- [ ] Copy deployment URL

## Testing

### Basic Function Test
- [ ] Mở Apps Script console (Ctrl+Enter)
- [ ] Chạy: `testFunctions()` (không error)

### Single Room Test
- [ ] URL: `?room=nivo`
  - [ ] Hiển thị doanh thu hoặc "Chưa có dữ liệu"
- [ ] URL: `?room=nivo&month=6&year=2025`
  - [ ] Hiển thị doanh thu tháng 6/2025

### Import Test
- [ ] URL: `?room=nivo&run=true`
  - [ ] Chạy 10-30 giây
  - [ ] F5 để xem kết quả
  - [ ] Dữ liệu xuất hiện trong sheet

### All Rooms Test
- [ ] Apps Script console: `getAllRoomsSummary()`
  - [ ] Hiển thị tất cả 7 phòng
- [ ] Apps Script console: `runMonthlyImportAllRooms()`
  - [ ] Import tất cả (5-10 phút)

### Edge Cases
- [ ] URL: `?room=invalidRoom`
  - [ ] Error message rõ ràng
- [ ] URL: `?month=13&year=2025`
  - [ ] Xử lý hợp lệ hoặc error

## Data Validation

### Sheet Format
- [ ] Sheet có header: ID, Tên, Link, Checkin-Checkout, ...
- [ ] Dữ liệu từ hàng 2 trở đi
- [ ] Có công thức: M2, N2, O2, W2, X2
- [ ] Định dạng tiền: `#,##0 [$₫-vi-VN]`

### Calendar Data
- [ ] Event có description đúng format
- [ ] Ít nhất 1 event có dạng:
  ```
  - 0123456789
  - tt
  - 379k
  ```
- [ ] Không có event bị bỏ qua do format

### Numbers
- [ ] Doanh thu (O) = Phòng (J) + Dịch vụ (K)
- [ ] Hoa hồng (W) = O * % (15-35%)
- [ ] Lãi (X) = Q - R - S - T - U - V - W

## Authorization

- [ ] Lần đầu chạy, Apps Script yêu cầu permission
- [ ] Nhấn "Review permissions" → "Allow"
- [ ] Chọn account đúng (với access đến calendar/sheet)

## Automation (Tuỳ chọn)

- [ ] **Trigger setup:**
  - [ ] Function: `runMonthlyImportAllRooms`
  - [ ] Time-driven, hàng tháng
  - [ ] Ngày 1, lúc 2:00 AM
  - [ ] Timezone: Asia/Ho_Chi_Minh
- [ ] **Test trigger:**
  - [ ] **Executions** tab → xem trigger chạy lần đầu
  - [ ] Kiểm tra logs

## Documentation

- [ ] Đọc **QUICK_START.md**
- [ ] Đọc **API_DOCS.md**
- [ ] Đọc **FAQ.md**
- [ ] Đọc **DEPLOYMENT_GUIDE.md**
- [ ] Đọc **AUTOMATION.md**

## Security (Tuỳ chọn)

- [ ] **If public access not needed:**
  - [ ] Thay access level thành "Specific people"
  - [ ] Thêm email người dùng
- [ ] **If webhook needed:**
  - [ ] Tạo Discord/Slack webhook
  - [ ] Thêm vào Main.gs
- [ ] **Backup:**
  - [ ] Regular backup Google Sheets
  - [ ] Version control sheets (history)

## Monitoring

- [ ] Kiểm tra logs định kỳ
- [ ] Alert nếu import fail
- [ ] Verify dữ liệu hàng tháng

## Rollout

- [ ] Test đầy đủ trên 1 phòng
- [ ] Deploy cho tất cả phòng
- [ ] Huấn luyện team cách dùng
- [ ] Documentation lưu nơi dễ tìm

---

## Quick Fixes

### Nếu thất bại ở bước nào:

**Setup không chạy:**
- [ ] Kiểm tra internet connection
- [ ] F5 refresh
- [ ] Xóa cache browser
- [ ] Thử incognito mode

**Code error:**
- [ ] Ctrl+Shift+Enter → xem logs
- [ ] Google syntax error message
- [ ] Kiểm tra đã copy đầy đủ code không

**Import không lấy dữ liệu:**
- [ ] Calendar có event không?
- [ ] Event có description không?
- [ ] Description format đúng không?
- [ ] Calendar/Sheet ID đúng không?

**Authorization error:**
- [ ] Login lại Google account
- [ ] Cấp quyền lại
- [ ] Xóa authorization: **Project Settings** → **Authorization scopes**

---

## Final Verification

Khi hoàn tất, bạn sẽ có:

✅ 7 file `.gs` hoạt động  
✅ 1 web app deployment  
✅ Có thể lấy doanh thu bất kỳ phòng nào  
✅ Có thể import dữ liệu tự động  
✅ Dữ liệu chính xác và đầy đủ  
✅ Có thể scale thêm phòng mới  

---

**Khi hoàn tất checklist này, hệ thống sẵn sàng production! 🚀**
