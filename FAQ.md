# ❓ Frequently Asked Questions

## 🔧 Setup & Configuration

### Q1: Làm sao để thêm phòng mới?

**A:** Mở `Config.gs` và thêm:

```javascript
const CONFIG = {
  // ... phòng cũ ...
  
  tenPhongMoi: {
    calendarId: 'CALENDAR_ID_MỚI',
    sheetId: 'SHEET_ID_MỚI',
    housePrice: 5200000,
    commonPrice: 400000,
    cleanPrice: 2000000,
  },
};
```

Lưu file và deploy lại. Ngay lập tức có thể dùng:
```
?room=tenPhongMoi&run=true
```

### Q2: Tìm Calendar ID ở đâu?

**A:** 
1. Mở [Google Calendar](https://calendar.google.com)
2. Nhấp phải vào calendar → **Settings**
3. Kéo xuống tìm **Calendar ID** (dạng `xxx@group.calendar.google.com`)
4. Copy vào `Config.gs`

### Q3: Tìm Sheet ID ở đâu?

**A:**
Xem URL của Google Sheet:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_Ở_ĐÂY/edit
```

Sheet ID là chuỗi dài trong URL.

### Q4: Giá thuê nhà bao nhiêu thì hoa hồng bao nhiêu %?

**A:**
- **15%** nếu doanh thu 9-14 triệu
- **23%** nếu doanh thu 14-19 triệu
- **29%** nếu doanh thu 19-24 triệu
- **35%** nếu doanh thu ≥ 24 triệu

Chỉnh sửa công thức tại cột **W** trong sheet để thay đổi.

---

## 📊 Data & Import

### Q5: Format dữ liệu calendar như thế nào?

**A:** Trong description của event calendar:

```
- 0123456789        (Số điện thoại - bắt đầu bằng -)
- tt                (Platform/App - bắt đầu bằng -)
- 379k              (Giá phòng - không ký hiệu)
- +15k dịch vụ      (Dịch vụ thêm - bắt đầu bằng +)
- -10k nước         (Chi phí - bắt đầu bằng -)
```

**Lưu ý:**
- Mỗi dòng bắt đầu bằng `-` (dash) hoặc `·` (bullet)
- Giá dùng ký hiệu `k` cho nghìn (379k = 379,000)
- Các dòng không khớp sẽ bị bỏ qua

### Q6: Làm sao để import dữ liệu cũ?

**A:** Nhấp vào URL với tháng/năm cũ:

```
?room=nivo&month=5&year=2025&run=true
```

### Q7: Có thể import nhiều phòng cùng lúc không?

**A:** Có 2 cách:

**Cách 1 - Web app:**
Mở tab browser riêng cho mỗi phòng:
```
?room=bento&run=true
?room=kenzo&run=true
?room=cento&run=true
```

**Cách 2 - Function:**
Chạy trong Apps Script console:
```javascript
runMonthlyImportAllRooms()
```

---

## 🔄 Automation

### Q8: Chạy tự động hàng tháng?

**A:** 
1. Mở Apps Script editor
2. Nhấn **Triggers** (⏰)
3. **Create new trigger**:
   - Function: `runMonthlyImportAllRooms`
   - Event source: **Time-driven**
   - Type: **Month**
   - Day: **1** (ngày đầu tháng)
   - Time: **2:00 AM**
4. Save

### Q9: Chạy hàng tuần được không?

**A:** Có, thay đổi trigger:
- Type: **Week**
- Day: **Monday** (hoặc ngày bạn muốn)
- Time: **2:00 AM**

---

## 🔍 Troubleshooting

### Q10: Không có dữ liệu sau import?

**A:** Kiểm tra:

1. **Calendar có event không?**
   - Mở Google Calendar
   - Xem có sự kiện trong tháng không

2. **Event có description không?**
   - Description không có hoặc sai format → bỏ qua

3. **Calendar ID đúng không?**
   - Kiểm tra `Config.gs`
   - So sánh với Calendar Settings

4. **Sheet ID đúng không?**
   - Kiểm tra URL Google Sheet
   - Copy đầy đủ ID

5. **Có quyền truy cập không?**
   - Kiểm tra calendar chia sẻ với tài khoản bạn
   - Kiểm tra sheet có edit permission

### Q11: Error "Phòng 'xxx' không tồn tại"?

**A:** Tên phòng sai. Các phòng có sẵn:
- bento
- kenzo
- cento
- coco
- milo
- nivo
- pluto

**Kiểm tra chính tả, chữ hoa/thường!**

### Q12: Chậm hoặc timeout?

**A:** 
- Apps Script có giới hạn 6 phút per execution
- Nếu import nhiều dữ liệu → có thể timeout
- **Giải pháp**: Import từng phòng thay vì tất cả

### Q13: Email thông báo?

**A:** Thêm vào hàm `runMonthlyImportAllRooms()` trong `Main.gs`:

```javascript
function runMonthlyImportAllRooms() {
  let results = [];
  Object.keys(CONFIG).forEach(roomName => {
    try {
      const roomConfig = CONFIG[roomName];
      importMonthlyCreatedEvents(roomConfig, new Date());
      results.push(`✅ ${roomName}: OK`);
    } catch (error) {
      results.push(`❌ ${roomName}: ${error.message}`);
    }
  });

  // Gửi email
  GmailApp.sendEmail(
    'email@example.com',
    '📊 Monthly Import Report',
    results.join('\n')
  );
}
```

---

## 💡 Advanced

### Q14: Có thể tích hợp với Discord/Slack không?

**A:** Có, thêm webhook:

```javascript
function sendToDiscord(message) {
  const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';
  const payload = {
    content: message
  };
  
  UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    payload: JSON.stringify(payload),
    contentType: 'application/json'
  });
}
```

### Q15: Có thể xuất dữ liệu CSV không?

**A:** Mở sheet → **File** → **Download** → **CSV**

Hoặc dùng Apps Script:
```javascript
const csv = sheet.getDataRange().getValues().map(row => row.join(',')).join('\n');
```

### Q16: API key an toàn không?

**A:** 
- Web app hiện tại **PUBLIC** - ai có URL cũng truy cập được
- **Để bảo mật**: 
  1. Thay access level thành **specific people**
  2. Hoặc thêm token validation

### Q17: Có thể thay đổi công thức hoa hồng không?

**A:** Mở sheet, cột **W**, sửa công thức:

```
=IF(AND(O2>=9000000, O2<14000000), 15%, 
    IF(AND(O2>=14000000, O2<19000000), 23%, ...
```

Hoặc tạo bảng giá tính hoa hồng riêng.

---

## 📞 Support

**Nếu có vấn đề:**
1. Kiểm tra logs: **Ctrl+Shift+Enter** trong Apps Script
2. Đọc error message kỹ
3. Xem lại documentation
4. Hỏi ChatGPT hoặc tìm trên Stack Overflow

**Có câu hỏi khác?** Thêm vào FAQ này!
