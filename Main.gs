/**
 * Web app entry point - GET request handler
 * Parameters: room (phòng), month, year, run
 * Ví dụ: ?room=nivo&month=7&year=2025&run=true
 */
function doGet(e) {
  try {
    const roomParam = e?.parameter?.room || "nivo"; // Default nivo room
    const monthParam = e?.parameter?.month;
    const yearParam = e?.parameter?.year;
    const isRun = e?.parameter?.run === "true";

    // Validate room exists
    if (!CONFIG[roomParam.toLowerCase()]) {
      return ContentService.createTextOutput(
        `❌ Phòng '${roomParam}' không tồn tại. Các phòng có sẵn: ${Object.keys(CONFIG).join(", ")}`,
      );
    }

    const roomConfig = CONFIG[roomParam.toLowerCase()];
    let now;

    if (monthParam && yearParam) {
      now = new Date(parseInt(yearParam), parseInt(monthParam) - 1, 1);
    } else {
      now = new Date();
    }

    if (isRun) {
      importMonthlyCreatedEvents(roomConfig, now);
    }

    // Get revenue data
    const ss = SpreadsheetApp.openById(roomConfig.sheetId);
    const sheetName = `T${now.getMonth() + 1}/${now.getFullYear().toString().slice(-2)}`;
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return ContentService.createTextOutput(
        `❌ Chưa có dữ liệu cho phòng ${roomParam}`,
      );
    }

    const revenue = sheet.getRange("O2").getValue() || 0;
    const profit = sheet.getRange("X2").getValue() || 0;
    const commission = sheet.getRange("W2").getValue() || 0;

    return ContentService.createTextOutput(
      `🏠 ${roomParam.toUpperCase()} | 💰 Doanh thu: ${revenue.toLocaleString("vi-VN")} ₫ | ` +
        `Hoa hồng: ${commission.toLocaleString("vi-VN")} ₫ | 💵 Lãi: ${profit.toLocaleString("vi-VN")} ₫`,
    );
  } catch (error) {
    return ContentService.createTextOutput(`❌ Lỗi: ${error.message}`);
  }
}

/**
 * Trigger to run import for all rooms monthly
 * Set this as a time-based trigger in Apps Script
 */
function runMonthlyImportAllRooms() {
  const now = new Date();
  let results = [];

  Object.keys(CONFIG).forEach((roomName) => {
    try {
      const roomConfig = CONFIG[roomName];
      importMonthlyCreatedEvents(roomConfig, now);
      results.push(`✅ ${roomName}: Import thành công`);
    } catch (error) {
      results.push(`❌ ${roomName}: ${error.message}`);
    }
  });

  Logger.log(results.join("\n"));
  // Optionally send email notification
  // GmailApp.sendEmail('your-email@gmail.com', 'Monthly Import Results', results.join('\n'));
}

/**
 * Get all rooms summary for current month
 */
function getAllRoomsSummary(monthParam, yearParam) {
  let now;
  if (monthParam && yearParam) {
    now = new Date(parseInt(yearParam), parseInt(monthParam) - 1, 1);
  } else {
    now = new Date();
  }

  const sheetName = `T${now.getMonth() + 1}/${now.getFullYear().toString().slice(-2)}`;
  let output = `📊 TỔNG HỢP DOANH THU - THÁNG ${sheetName}\n\n`;
  let totalRevenue = 0;
  let totalCommission = 0;
  let totalProfit = 0;

  Object.keys(CONFIG).forEach((roomName) => {
    try {
      const roomConfig = CONFIG[roomName];
      const ss = SpreadsheetApp.openById(roomConfig.sheetId);
      const sheet = ss.getSheetByName(sheetName);

      if (sheet) {
        const revenue = sheet.getRange("O2").getValue() || 0;
        const profit = sheet.getRange("X2").getValue() || 0;
        const commission = sheet.getRange("W2").getValue() || 0;

        totalRevenue += revenue;
        totalCommission += commission;
        totalProfit += profit;

        output += `🏠 ${roomName.toUpperCase()}\n`;
        output += `   💰 Doanh thu: ${revenue.toLocaleString("vi-VN")} ₫\n`;
        output += `   🤝 Hoa hồng: ${commission.toLocaleString("vi-VN")} ₫\n`;
        output += `   💵 Lãi: ${profit.toLocaleString("vi-VN")} ₫\n\n`;
      }
    } catch (error) {
      output += `❌ ${roomName}: Lỗi - ${error.message}\n\n`;
    }
  });

  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  output += `📈 TỔNG CỘNG\n`;
  output += `💰 Doanh thu: ${totalRevenue.toLocaleString("vi-VN")} ₫\n`;
  output += `🤝 Hoa hồng: ${totalCommission.toLocaleString("vi-VN")} ₫\n`;
  output += `💵 Lãi: ${totalProfit.toLocaleString("vi-VN")} ₫`;

  return output;
}
