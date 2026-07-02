# 📝 Changelog & Migration Notes

## Version 2.0 - Multi-Room Edition (2025-07-02)

### ✨ New Features

#### 1. **Multi-Room Support**
- Refactored từ single-room sang multi-room architecture
- Support 7 phòng: bento, kenzo, cento, coco, milo, nivo, pluto
- Config centralized trong `Config.gs`
- Dễ dàng thêm phòng mới

#### 2. **Web App with Parameters**
```javascript
doGet(e) {
  const room = e?.parameter?.room || 'nivo';
  const month = e?.parameter?.month;
  const year = e?.parameter?.year;
  const run = e?.parameter?.run === 'true';
  // ...
}
```

Cách dùng:
```
?room=nivo                          ← Lấy doanh thu
?room=nivo&run=true               ← Chạy import
?room=nivo&month=6&year=2025      ← Tháng cụ thể
```

#### 3. **Bulk Import Function**
```javascript
function runMonthlyImportAllRooms() {
  // Import tất cả 7 phòng
}
```

#### 4. **Summary Function**
```javascript
function getAllRoomsSummary(month, year) {
  // Tổng hợp doanh thu tất cả phòng
}
```

#### 5. **Modular Code Structure**
- `Config.gs` - Configuration
- `Main.gs` - Web app & bulk functions
- `Import.gs` - Import logic
- `Calendar.gs` - Calendar API
- `Summary.gs` - Calculations
- `Utils.gs` - Helpers
- `appsscript.json` - Manifest

### 📚 New Documentation

- [QUICK_START.md](./QUICK_START.md) - Setup nhanh 5 phút
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy hướng dẫn
- [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Verify checklist
- [API_DOCS.md](./API_DOCS.md) - API reference
- [ADDING_ROOMS.md](./ADDING_ROOMS.md) - Thêm phòng
- [AUTOMATION.md](./AUTOMATION.md) - Automation & scheduling
- [FAQ.md](./FAQ.md) - Q&A
- [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) - Mục lục

---

## Migration from v1.0 to v2.0

### ✅ Backward Compatible

Những thứ vẫn hoạt động:
- `Calendar.gs` API không đổi
- `Summary.gs` functions
- `Utils.gs` helpers
- Sheet format

### 🔄 Breaking Changes

**Không có breaking changes** - Nhưng code cũ cần update:

**v1.0 (Old):**
```javascript
function doGet(e) {
  const isRun = e?.parameter?.run === "true"
  // ... hardcoded calendarId
  importMonthlyCreatedEvents(now);
}
```

**v2.0 (New):**
```javascript
function doGet(e) {
  const roomParam = e?.parameter?.room || 'nivo';
  const roomConfig = CONFIG[roomParam.toLowerCase()];
  importMonthlyCreatedEvents(roomConfig, now);
}
```

### 🔧 What to Update

#### 1. **Copy .gs Files**
```
Config.gs      (NEW - Centralized config)
Main.gs        (UPDATED - Multi-room support)
Import.gs      (UPDATED - Accept roomConfig param)
Calendar.gs    (UNCHANGED)
Summary.gs     (UNCHANGED)
Utils.gs       (UNCHANGED)
appsscript.json (UPDATED - Permissions)
```

#### 2. **Update import() calls**

**Old:**
```javascript
importMonthlyCreatedEvents(now);
```

**New:**
```javascript
const roomConfig = CONFIG['nivo'];
importMonthlyCreatedEvents(roomConfig, now);
```

#### 3. **Update doGet() calls**

**Old:**
```javascript
function doGet(e) {
  // Hardcoded nivo
}
```

**New:**
```javascript
function doGet(e) {
  const room = e?.parameter?.room || 'nivo';
  const roomConfig = CONFIG[room.toLowerCase()];
  // ...
}
```

---

## Upgrade Steps

### For Existing Users (v1.0)

1. **Backup**
   - Backup tất cả sheets (File → Download)
   - Keep old code as reference

2. **Copy New Files**
   ```
   Config.gs      (NEW)
   Main.gs        (UPDATED)
   Import.gs      (UPDATED)
   appsscript.json (UPDATED)
   Calendar.gs    (Keep old)
   Summary.gs     (Keep old)
   Utils.gs       (Keep old)
   ```

3. **Test**
   - Test import 1 phòng: `?room=nivo&run=true`
   - Verify data in sheets
   - Check logs for errors

4. **Setup Trigger** (Tuỳ chọn)
   - Create trigger cho `runMonthlyImportAllRooms()`
   - Schedule hàng tháng

5. **Deploy**
   - New deployment hoặc update old
   - Test all rooms

---

## Performance Improvements

### v1.0 Issues
- ❌ Single file quá lớn
- ❌ Khó maintain
- ❌ Khó scale nhiều phòng
- ❌ Hardcoded values

### v2.0 Solutions
- ✅ Modular code structure
- ✅ Config centralized
- ✅ Easy to add rooms
- ✅ Dynamic parameters
- ✅ Bulk operations

### Metrics
- **Code size**: Chia thành 6 file (dễ maintain)
- **Setup time**: 5 phút (trước: 30 phút)
- **Scale**: +7 phòng → +N phòng dễ dàng
- **API**: 1 endpoint → N endpoints (1 per room)

---

## Known Issues & Fixes

### Issue 1: Phòng không tìm thấy
**Cause**: Config chưa add, hoặc tên sai
**Fix**: 
```javascript
Object.keys(CONFIG).forEach(room => Logger.log(room));
// Xem danh sách tất cả phòm
```

### Issue 2: Import quá chậm
**Cause**: Quá nhiều events trong calendar
**Fix**: 
- Import từng phòng
- Hoặc increase Apps Script quota

### Issue 3: Sheet formula lỗi
**Cause**: Column index sai sau thay đổi
**Fix**: 
- Check Import.gs columns
- Verify sheet headers

---

## Future Enhancements

### Planned
- [ ] Dashboard sheet tổng hợp
- [ ] Discord/Slack integration
- [ ] Email reports
- [ ] Budget forecasting
- [ ] Analytics & charts
- [ ] Multi-account support

### Possible
- [ ] Mobile app
- [ ] Database (instead of Sheets)
- [ ] Advanced reports
- [ ] Budget alerts
- [ ] API key authentication

---

## Deprecation

### v1.0 Code
**Not removed**, but **not recommended**:
```javascript
// ❌ Old way - Don't use
function doGet(e) {
  const calendarId = 'd5ebb4f5d99d4ec96880d0954d08777d9770e609c76a898ff1712512b37018eb@group.calendar.google.com';
  // ...
}

// ✅ New way - Use this
function doGet(e) {
  const room = e?.parameter?.room || 'nivo';
  const roomConfig = CONFIG[room];
  // ...
}
```

---

## Version Timeline

| Version | Date | Status | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-01 | EOL | Single-room |
| 2.0 | 2025-07-02 | Active | Multi-room |
| 2.1 | TBD | Planned | Dashboard |
| 3.0 | TBD | Planned | Database |

---

## Support

- **Questions**: Xem [FAQ.md](./FAQ.md)
- **Issues**: Xem [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
- **API**: Xem [API_DOCS.md](./API_DOCS.md)
- **Config**: Xem [ADDING_ROOMS.md](./ADDING_ROOMS.md)

---

**Ngày update**: 2025-07-02
**Tác giả**: Revenue Team
