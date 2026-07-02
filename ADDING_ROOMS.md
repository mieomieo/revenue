# 🏠 Adding New Rooms

## Cách thêm phòng mới

### Bước 1: Lấy thông tin cần thiết

#### Calendar ID

1. Mở [Google Calendar](https://calendar.google.com)
2. Nhấp phải vào calendar → **Settings**
3. Tìm mục **Calendar ID**
4. Copy (dạng: `xxx@group.calendar.google.com`)

#### Sheet ID

1. Mở [Google Sheets](https://sheets.google.com)
2. Tạo sheet mới hoặc mở sheet hiện tại
3. URL sẽ có dạng: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`
4. Copy phần `<SHEET_ID>` (chuỗi dài)

#### Pricing (tuỳ chọn)

- **housePrice**: Giá thuê nhà (mặc định: 5,200,000)
- **commonPrice**: Dịch vụ chung (mặc định: 400,000)
- **cleanPrice**: Dọn nhà (mặc định: 2,000,000)

### Bước 2: Thêm vào Config.gs

Mở **Config.gs** và thêm vào cuối:

```javascript
const CONFIG = {
  // ... phòng cũ ...

  tenPhongMoi: {
    calendarId: 'YOUR_CALENDAR_ID@group.calendar.google.com',
    sheetId: 'YOUR_SHEET_ID',
    housePrice: 5200000,
    commonPrice: 400000,
    cleanPrice: 2000000,
  },
};
```

**Lưu ý:**
- `tenPhongMoi` phải là chữ thường, không dấu, không space
- `calendarId` phải có `@group.calendar.google.com`
- `sheetId` phải là chuỗi dài (không phải URL)

### Bước 3: Test

1. **Save** (Ctrl+S)
2. Mở Apps Script console (Ctrl+Enter)
3. Chạy:
   ```javascript
   testFunctions()
   ```
4. Hoặc dùng URL:
   ```
   ?room=tenPhongMoi
   ```

---

## Template

```javascript
// Copy paste template này vào Config.gs

  tenPhongMoi: {
    calendarId: 'PASTE_CALENDAR_ID_HERE',
    sheetId: 'PASTE_SHEET_ID_HERE',
    housePrice: 5200000,
    commonPrice: 400000,
    cleanPrice: 2000000,
  },
```

---

## Ví dụ: Thêm phòng "leo"

**1. Lấy Calendar ID**: `abc123def456@group.calendar.google.com`

**2. Lấy Sheet ID**: `1abc123def456ghi789`

**3. Thêm vào Config.gs**:

```javascript
const CONFIG = {
  // ... phòng cũ ...

  leo: {
    calendarId: 'abc123def456@group.calendar.google.com',
    sheetId: '1abc123def456ghi789',
    housePrice: 5200000,
    commonPrice: 400000,
    cleanPrice: 2000000,
  },
};
```

**4. Save & Test**:

```javascript
testFunctions()  // Kiểm tra có lỗi không

// Hoặc dùng URL
?room=leo
?room=leo&run=true
```

---

## Bulk Add (Thêm nhiều phòng cùng lúc)

Nếu muốn thêm 5 phòng mới:

```javascript
const CONFIG = {
  // ... phòng cũ ...

  phong1: {
    calendarId: 'CALENDAR_ID_1@group.calendar.google.com',
    sheetId: 'SHEET_ID_1',
    housePrice: 5200000,
    commonPrice: 400000,
    cleanPrice: 2000000,
  },

  phong2: {
    calendarId: 'CALENDAR_ID_2@group.calendar.google.com',
    sheetId: 'SHEET_ID_2',
    housePrice: 5200000,
    commonPrice: 400000,
    cleanPrice: 2000000,
  },

  // ... và cứ thế ...
};
```

---

## Import dữ liệu phòng mới

Sau khi thêm phòng:

1. **Qua URL**:
   ```
   ?room=tenPhongMoi&run=true
   ```

2. **Qua Console**:
   ```javascript
   importMonthlyCreatedEvents(CONFIG.tenPhongMoi, new Date())
   ```

3. **Qua Trigger**:
   - Setup trigger để chạy `runMonthlyImportAllRooms()`
   - Phòng mới sẽ tự động import

---

## Verify Phòng Mới

Kiểm tra sau khi thêm:

- [ ] **Config.gs** có entry mới
- [ ] Tên phòng đúng chính tả
- [ ] Calendar ID đúng (có `@group.calendar.google.com`)
- [ ] Sheet ID đúng (không phải URL)
- [ ] Import chạy không lỗi
- [ ] Dữ liệu xuất hiện trong sheet
- [ ] URL trả về doanh thu đúng

---

## Troubleshooting

| Vấn đề | Nguyên nhân | Giải pháp |
|--------|-----------|----------|
| ❌ Phòng không tồn tại | Tên phòng sai hoặc chưa save | Kiểm tra Config.gs, Ctrl+S |
| ❌ Chưa có dữ liệu | Sheet chưa tạo hoặc calendar rỗng | Tạo sheet, thêm event calendar |
| ❌ Error import | Calendar ID / Sheet ID sai | Verify ID lại, compare với phòng khác |
| 🔴 Event không tìm thấy | Calendar không chia sẻ | Chia sẻ calendar với tài khoản Apps Script |
| 🟡 Data cũ | Import chưa chạy | Chạy `?room=tenPhongMoi&run=true` |

---

## Migration từ Phòng Cũ

Nếu muốn sao chép cấu hình từ phòng cũ:

1. Mở phòng cũ: `Config.gs`
2. Copy block của phòng cũ:
   ```javascript
   bento: {
     calendarId: '...',
     sheetId: '...',
     ...
   }
   ```
3. Paste & sửa:
   - Tên phòng
   - Calendar ID
   - Sheet ID

---

## API Endpoints cho phòng mới

Sau khi thêm, có thể dùng ngay:

```javascript
// Lấy doanh thu
https://...?room=tenPhongMoi

// Import dữ liệu
https://...?room=tenPhongMoi&run=true

// Tháng cụ thể
https://...?room=tenPhongMoi&month=7&year=2025

// Console
runMonthlyImportAllRooms()  // Bao gồm phòng mới
getAllRoomsSummary()        // Bao gồm phòng mới
```

---

**✅ Phòng mới sẽ hoạt động ngay lập tức mà không cần deploy lại!**
