# Revenue Management System - Multi-Room Edition

Hệ thống quản lý doanh thu cho nhiều phòng (bento, kenzo, cento, coco, milo, nivo, pluto).

## 📁 Cấu Trúc File

```
├── Config.gs          - Cấu hình các phòng (calendar ID, sheet ID, giá tiền)
├── Main.gs            - Entry point, hàm doGet() cho web app
├── Import.gs          - Logic import dữ liệu từ calendar
├── Calendar.gs        - Hàm lấy sự kiện từ Google Calendar
├── Summary.gs         - Hàm tính toán doanh thu hàng ngày & lũy kế
├── Utils.gs           - Các hàm hỗ trợ (parse, format date, v.v.)
├── appsscript.json    - Manifest, cấu hình Google Apps Script
└── README.md          - File này
```

## 🚀 Cách Sử Dụng

### 1. **Chạy import dữ liệu cho 1 phòng**

```
GET /macros/d/<DEPLOYMENT_ID>/usercallback?room=nivo&run=true
```

Parameters:
- `room` - Tên phòng (bento, kenzo, cento, coco, milo, nivo, pluto)
- `month` - Tháng (1-12), mặc định là tháng hiện tại
- `year` - Năm, mặc định là năm hiện tại
- `run` - "true" để chạy import

### 2. **Xem doanh thu phòng**

Không cần tham số `run=true`, chỉ lấy doanh thu hiện tại:

```
GET /macros/d/<DEPLOYMENT_ID>/usercallback?room=nivo
```

### 3. **Chạy import tất cả phòng**

Mở Google Apps Script console (Ctrl+Enter) và chạy:

```javascript
runMonthlyImportAllRooms()
```

### 4. **Xem tổng hợp tất cả phòng**

Mở console và chạy:

```javascript
getAllRoomsSummary()
```

Hoặc với tháng/năm cụ thể:

```javascript
getAllRoomsSummary(7, 2025)  // Tháng 7, năm 2025
```

## ⚙️ Cấu Hình Phòng

Chỉnh sửa `Config.gs` để thêm/sửa phòng:

```javascript
const CONFIG = {
  tenPhong: {
    calendarId: 'CALENDAR_ID',
    sheetId: 'SHEET_ID',
    housePrice: 5200000,      // Giá thuê nhà
    commonPrice: 400000,      // Dịch vụ chung
    cleanPrice: 2000000,      // Giá dọn nhà
  }
};
```

## 📋 Định Dạng Dữ Liệu Calendar

Trong description của sự kiện calendar, dùng định dạng:

```
- 0123456789        (Số điện thoại)
- tt                (App/Platform)
- 379k              (Giá phòng)
- +15k dịch vụ      (Dịch vụ thêm)
- -10k nước         (Chi phí)
```

## 🔄 Tự động chạy hàng tháng

1. Mở Apps Script editor
2. Chọn **Triggers** (clock icon)
3. Nhấp **Create new trigger**
4. Chọn hàm: `runMonthlyImportAllRooms`
5. Loại sự kiện: **Time-driven**
6. Tần suất: **Month** (chọn ngày đầu tháng)

## 📊 Cấu trúc Sheet

Mỗi phòng có sheet với tên định dạng: `T<Tháng>/<Năm2số>`
Ví dụ: `T7/25` (Tháng 7, năm 2025)

Các cột:
- A: ID (Event ID)
- B: Tên (Event summary)
- C: Link (Google Calendar link)
- D: Check-in/Check-out
- E-F: Ngày tạo/cập nhật
- G: Ghi chú
- H: SĐT
- I: App
- J: Giá phòng
- K: Dịch vụ
- L: Ghi chú dịch vụ
- M: Tổng tiền dịch vụ
- N: Tổng tiền phòng
- O: Tổng doanh thu

Phần tóm tắt (Q-X):
- Q: Doanh thu (=O2)
- R: Giá thuê nhà
- S: Dịch vụ chung
- T: Điện
- U: Nước
- V: Dọn nhà
- W: Hoa hồng (15-35% dựa vào doanh thu)
- X: Lãi ròng

## 🔍 Troubleshooting

**❌ "Phòng 'xxx' không tồn tại"**
→ Kiểm tra tên phòng đúng chính tả trong Config.gs

**❌ "Chưa có dữ liệu"**
→ Sheet chưa có dữ liệu cho tháng đó, chạy import với `run=true`

**❌ Không thấy dữ liệu sau khi import**
→ Kiểm tra calendar ID có quyền truy cập không
→ Kiểm tra sheet ID có hợp lệ không

## 📝 Ghi chú

- Timezone: Asia/Ho_Chi_Minh
- Hoa hồng tính theo công thức:
  - 15% nếu doanh thu 9-14M
  - 23% nếu doanh thu 14-19M
  - 29% nếu doanh thu 19-24M
  - 35% nếu doanh thu ≥ 24M
