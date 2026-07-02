# 📖 Complete Documentation Index

## 🚀 Getting Started

**Mới dùng?** Bắt đầu từ đây:

1. **[QUICK_START.md](./QUICK_START.md)** ⚡
   - Setup trong 5 phút
   - Test cơ bản
   - Dùng đơn giản

2. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** 📦
   - Tải code lên Apps Script
   - Deploy web app
   - Cấu hình quyền

3. **[SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)** ✅
   - Verify mọi thứ đúng
   - Test từng bước
   - Troubleshoot

---

## 📚 Detailed Guides

### Core Documentation

- **[README_UPDATED.md](./README_UPDATED.md)** 
  - Cấu trúc file
  - Cách sử dụng
  - Định dạng dữ liệu
  - Troubleshooting

- **[API_DOCS.md](./API_DOCS.md)** 📡
  - Tất cả endpoints
  - Parameters & response
  - Curl/Python/JavaScript examples
  - Error codes

### Configuration & Expansion

- **[ADDING_ROOMS.md](./ADDING_ROOMS.md)** 🏠
  - Thêm phòng mới
  - Template copy-paste
  - Bulk add multiple rooms
  - Verify & troubleshoot

- **[CONFIG Guide](./Config.gs)** ⚙️
  - Định dạng config
  - Giá tiền (housePrice, commonPrice, cleanPrice)
  - Calendar & Sheet IDs

### Automation & Scheduling

- **[AUTOMATION.md](./AUTOMATION.md)** 🔄
  - Google Apps Script Triggers
  - Linux/Mac cron jobs
  - Windows Task Scheduler
  - Cloud Scheduler (Google, AWS)
  - Discord/Slack webhooks

### Help & Reference

- **[FAQ.md](./FAQ.md)** ❓
  - Câu hỏi thường gặp
  - Setup & config
  - Data & import
  - Automation
  - Advanced topics

---

## 💻 Code Files

### Essential Files (.gs)

```
├── Config.gs         ← Cấu hình tất cả phòng
├── Main.gs           ← Web app entry point (doGet)
├── Import.gs         ← Logic import calendar → sheet
├── Calendar.gs       ← Fetch Google Calendar events
├── Summary.gs        ← Tính toán doanh thu
├── Utils.gs          ← Helper functions
└── appsscript.json   ← Manifest & permissions
```

---

## 🎯 Common Tasks

### Lần đầu setup
1. [QUICK_START.md](./QUICK_START.md)
2. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
3. [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)

### Lấy doanh thu
```
?room=nivo
?room=nivo&month=6&year=2025
```
→ Xem [API_DOCS.md](./API_DOCS.md)

### Chạy import
```
?room=nivo&run=true
runMonthlyImportAllRooms()  // Tất cả phòng
```
→ Xem [README_UPDATED.md](./README_UPDATED.md)

### Thêm phòng mới
→ [ADDING_ROOMS.md](./ADDING_ROOMS.md)

### Tự động hàng tháng
→ [AUTOMATION.md](./AUTOMATION.md)

### Có câu hỏi
→ [FAQ.md](./FAQ.md)

---

## 📊 File Structure

```
revenue/
├── Config.gs                  # Configuration
├── Main.gs                    # Web app
├── Import.gs                  # Import logic
├── Calendar.gs                # Calendar API
├── Summary.gs                 # Calculations
├── Utils.gs                   # Helpers
├── appsscript.json            # Manifest
│
├── QUICK_START.md             # 5 phút setup
├── DEPLOYMENT_GUIDE.md        # Deploy instructions
├── SETUP_CHECKLIST.md         # Verification
├── README_UPDATED.md          # Full documentation
├── API_DOCS.md                # API reference
├── ADDING_ROOMS.md            # Add new rooms
├── AUTOMATION.md              # Scheduling
├── FAQ.md                     # Q&A
└── DOCUMENTATION_INDEX.md     # File này
```

---

## 🔍 Quick Links

| Tôi muốn... | Tài liệu |
|-----------|----------|
| Bắt đầu nhanh | [QUICK_START.md](./QUICK_START.md) |
| Deploy web app | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| Verify setup | [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) |
| Hiểu API | [API_DOCS.md](./API_DOCS.md) |
| Thêm phòng | [ADDING_ROOMS.md](./ADDING_ROOMS.md) |
| Chạy tự động | [AUTOMATION.md](./AUTOMATION.md) |
| Xem Q&A | [FAQ.md](./FAQ.md) |
| Full docs | [README_UPDATED.md](./README_UPDATED.md) |

---

## 📱 For Different Users

### 👨‍💼 Manager (Quản lý)
1. [QUICK_START.md](./QUICK_START.md) - Hiểu cách dùng
2. [README_UPDATED.md](./README_UPDATED.md) - Format dữ liệu
3. [API_DOCS.md](./API_DOCS.md) - Biết endpoints

### 👨‍💻 Developer (Kỹ sư)
1. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy
2. [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Verify
3. [AUTOMATION.md](./AUTOMATION.md) - Schedule
4. [ADDING_ROOMS.md](./ADDING_ROOMS.md) - Expand

### 🔧 DevOps (Hệ thống)
1. [AUTOMATION.md](./AUTOMATION.md) - Setup triggers
2. [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy
3. [API_DOCS.md](./API_DOCS.md) - Monitor via API

### ❓ Support (Hỗ trợ)
1. [FAQ.md](./FAQ.md) - Trả lời câu hỏi
2. [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) - Troubleshoot
3. [README_UPDATED.md](./README_UPDATED.md) - Full reference

---

## 🆘 Troubleshooting Quick Guide

### Lỗi Setup
- Không deploy được → [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Code error → [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md) → Gỡ lỗi
- Permission denied → [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) → Quyền

### Lỗi Data
- Chưa có dữ liệu → [FAQ.md](./FAQ.md) → Q10
- Data cũ → Chạy import với `&run=true`
- Format sai → [README_UPDATED.md](./README_UPDATED.md) → Format dữ liệu

### Lỗi Automation
- Trigger không chạy → [AUTOMATION.md](./AUTOMATION.md)
- Cron không hoạt động → Check crontab, timezone
- Email/webhook không gửi → [FAQ.md](./FAQ.md) → Q13

---

## 📞 Support Resources

| Loại Vấn đề | Nguồn Tham Khảo |
|-----------|-----------------|
| Setup/Deploy | [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) |
| Config | [ADDING_ROOMS.md](./ADDING_ROOMS.md) |
| API | [API_DOCS.md](./API_DOCS.md) |
| Data Format | [README_UPDATED.md](./README_UPDATED.md) |
| Q&A | [FAQ.md](./FAQ.md) |
| Automation | [AUTOMATION.md](./AUTOMATION.md) |

---

## 🎓 Learning Path

**Mới bắt đầu:**
```
QUICK_START → DEPLOYMENT_GUIDE → SETUP_CHECKLIST → ✅ Ready
```

**Muốn dùng API:**
```
API_DOCS → Examples → Test & integrate
```

**Muốn scale:**
```
ADDING_ROOMS → AUTOMATION → runMonthlyImportAllRooms()
```

**Có vấn đề:**
```
SETUP_CHECKLIST → FAQ → TROUBLESHOOTING
```

---

## 📝 Version Info

| Component | Version | Updated |
|-----------|---------|---------|
| Config | v2 (Multi-room) | 2025-07-02 |
| Main | v2 (Web app) | 2025-07-02 |
| Documentation | v2 (Complete) | 2025-07-02 |
| Supported Rooms | 7 | 2025-07-02 |

---

## 🚀 Next Steps

1. **Đọc**: [QUICK_START.md](./QUICK_START.md)
2. **Setup**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
3. **Test**: [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
4. **Expand**: [ADDING_ROOMS.md](./ADDING_ROOMS.md)
5. **Automate**: [AUTOMATION.md](./AUTOMATION.md)
6. **Reference**: Bookmark [API_DOCS.md](./API_DOCS.md)
7. **Help**: Dùng [FAQ.md](./FAQ.md)

---

**🎉 Hệ thống sẵn sàng! Bắt đầu từ [QUICK_START.md](./QUICK_START.md)**
