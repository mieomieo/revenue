# 🔄 Automation & Scheduling

## Google Apps Script Trigger (Recommended ✅)

### Cách 1: Chạy hàng tháng (Easiest)

1. Mở Apps Script editor
2. Nhấn **Triggers** (⏰ icon)
3. **Create new trigger**
4. Cấu hình:
   ```
   Function: runMonthlyImportAllRooms
   Deployment: Head
   Event source: Time-driven
   Type of time based trigger: Month
   Day of month: 1 (hoặc ngày bạn chọn)
   Time of day: 2:00 AM - 3:00 AM (hoặc bất kỳ)
   ```
5. **Save**

Khi đó, hàng tháng vào lúc 2:00 AM ngày 1, tất cả các phòng sẽ tự động import.

### Cách 2: Chạy hàng tuần

Trigger tương tự nhưng:
```
Type of time based trigger: Week
Day: Monday (hoặc ngày bạn chọn)
Time: 2:00 AM
```

### Cách 3: Chạy hàng ngày

```
Type of time based trigger: Day
Time: 2:00 AM
```

---

## External Scheduler (cron job)

### Linux / Mac / WSL

**Crontab setup:**

```bash
# Edit crontab
crontab -e

# Thêm dòng này (chạy 2:00 AM ngày 1 hàng tháng)
0 2 1 * * curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true"

# Chạy tất cả phòng
0 2 1 * * \
  curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=bento&run=true" && \
  curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=kenzo&run=true" && \
  curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=cento&run=true"
```

**Cron format:**
```
┌───────────── phút (0-59)
│ ┌───────────── giờ (0-23)
│ │ ┌───────────── ngày tháng (1-31)
│ │ │ ┌───────────── tháng (1-12)
│ │ │ │ ┌───────────── ngày tuần (0-7, 0 & 7 = Chủ Nhật)
│ │ │ │ │
│ │ │ │ │
0 2 1 * * command
```

**Các ví dụ:**
```bash
0 2 1 * *     # 2:00 AM ngày 1 hàng tháng
0 9 * * 1     # 9:00 AM mỗi thứ Hai
*/30 * * * *  # Mỗi 30 phút
0 0 * * *     # Mỗi ngày lúc 12:00 AM
```

### Windows Task Scheduler

**Cách 1: PowerShell**

1. Mở **Task Scheduler**
2. **Create Basic Task**
3. Name: "Import Revenue"
4. Trigger: **Monthly** → 1st day at 2:00 AM
5. Action: **Start a program**
   ```
   Program: powershell.exe
   Arguments: -Command "Invoke-WebRequest 'https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true'"
   ```
6. **OK**

**Cách 2: Batch Script**

Tạo file `import.bat`:
```batch
@echo off
curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=bento&run=true"
curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=kenzo&run=true"
curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=cento&run=true"
```

Sau đó task scheduler chạy file này.

### macOS (launchd)

Tạo file `~/Library/LaunchAgents/com.revenue.import.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.revenue.import</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>-c</string>
        <string>curl "https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true"</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>2</integer>
        <key>Minute</key>
        <integer>0</integer>
        <key>Day</key>
        <integer>1</integer>
    </dict>
</dict>
</plist>
```

Sau đó:
```bash
launchctl load ~/Library/LaunchAgents/com.revenue.import.plist
```

---

## Cloud Schedulers

### Google Cloud Scheduler

1. Mở [Google Cloud Console](https://console.cloud.google.com)
2. **Cloud Scheduler** → **Create Job**
3. Cấu hình:
   ```
   Name: revenue-import
   Frequency: 0 2 1 * * (2:00 AM ngày 1 hàng tháng)
   Timezone: Asia/Ho_Chi_Minh
   Execution timeout: 600s
   ```
4. **Create Execution**:
   ```
   HTTP: GET
   URL: https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true
   Authentication: No auth
   ```

### AWS EventBridge + Lambda

```python
import urllib.request

def lambda_handler(event, context):
    url = "https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true"
    urllib.request.urlopen(url)
    return {"statusCode": 200}
```

Rule:
```
Schedule: cron(0 2 1 * ? *)  # 2:00 AM ngày 1 hàng tháng
Target: Lambda function
```

### IFTTT

1. Mở [IFTTT](https://ifttt.com)
2. **Create applet**
3. If: **Date & Time** → Every month on the 1st at 2:00 AM
4. Then: **Webhooks** → Make a web request
   ```
   URL: https://script.google.com/macros/d/YOUR_ID/usercallback?room=nivo&run=true
   Method: GET
   ```

---

## Discord/Slack Webhook (Email thay thế)

### Setup Webhook

Thêm vào **Main.gs**:

```javascript
function sendNotification(message) {
  const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL';
  
  const payload = {
    content: message,
    username: 'Revenue Bot',
  };
  
  UrlFetchApp.fetch(webhookUrl, {
    method: 'post',
    payload: JSON.stringify(payload),
    contentType: 'application/json'
  });
}

function runMonthlyImportAllRooms() {
  const now = new Date();
  let results = [];
  
  Object.keys(CONFIG).forEach(roomName => {
    try {
      const roomConfig = CONFIG[roomName];
      importMonthlyCreatedEvents(roomConfig, now);
      results.push(`✅ ${roomName}: Import thành công`);
    } catch (error) {
      results.push(`❌ ${roomName}: ${error.message}`);
    }
  });
  
  // Gửi notification
  const message = `📊 **Monthly Import Report**\n\n${results.join('\n')}`;
  sendNotification(message);
}
```

---

## Monitoring & Logging

### Xem Logs

```javascript
function checkTriggers() {
  const executions = ScriptApp.getProjectTriggers();
  Logger.log('Active triggers:');
  executions.forEach(t => {
    Logger.log(`- ${t.getHandlerFunction()} every ${t.getTriggerSource()}`);
  });
}
```

### Email Report

```javascript
function sendEmailReport(to) {
  const results = getAllRoomsSummary();
  GmailApp.sendEmail(
    to,
    '📊 Revenue Report - ' + new Date().toLocaleDateString('vi-VN'),
    results
  );
}
```

---

## Troubleshooting

| Vấn đề | Giải pháp |
|--------|----------|
| Trigger không chạy | Kiểm tra Apps Script đã được triển khai |
| Cron không chạy | Kiểm tra crontab: `crontab -l` |
| URL timeout | Increase timeout hoặc import từng phòng |
| No email/notification | Kiểm tra webhook URL |

---

## Best Practices

✅ **Nên làm:**
- Chạy import vào lúc 2-3 AM (traffic thấp)
- Set reminder để kiểm tra logs
- Test trigger trước khi deploy
- Backup sheet hàng tháng

❌ **Không nên:**
- Chạy import giữa trưa (có thể slow)
- Chạy quá nhiều concurrent imports
- Để webhook URL public (bảo mật)

---

## Reference

- [Google Apps Script Triggers](https://developers.google.com/apps-script/guides/triggers)
- [Cron Format](https://crontab.guru)
- [Cloud Scheduler](https://cloud.google.com/scheduler/docs)
