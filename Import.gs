/**
 * Import monthly created events from Calendar to Spreadsheet
 */
function importMonthlyCreatedEvents(roomConfig, now) {
  const calendarId = roomConfig.calendarId;
  const sheetId = roomConfig.sheetId;
  const priceHouse = roomConfig.housePrice;
  const priceCommonExtra = roomConfig.commonPrice;
  const priceClean = roomConfig.cleanPrice;

  const calendar = CalendarApp.getCalendarById(calendarId);
  if (!calendar) {
    Logger.log(`❌ Không tìm thấy lịch hoặc không có quyền truy cập: ${calendarId}`);
    return;
  }

  const ss = SpreadsheetApp.openById(sheetId);
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const currentSheetName = `T${currentMonth.toString()}/${currentYear.toString().slice(2)}`;
  const nextSheetName = `T${nextMonth}/${nextYear.toString().slice(2)}`;
  const prevSheetName = `T${prevMonth}/${prevYear.toString().slice(2)}`;

  // Date ranges
  const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
  const startOf2PrevMonth = new Date(now.getFullYear(), now.getMonth() - 2, 1, 0, 0, 0, 0);
  const endOf2PrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999);

  // Create or clear current sheet
  let currentSheet = ss.getSheetByName(currentSheetName);
  if (!currentSheet) {
    currentSheet = ss.insertSheet(currentSheetName);
    currentSheet.getRange(1, 1, 1, 15).setValues([[
      'ID', 'Tên', 'Link', 'Checkin-Checkout', 'Ngày tạo', 'Ngày cập nhật',
      'Ghi chú', 'SĐT', 'App', 'Price',
      'Service', 'Service Note', 'Tổng tiền Service', 'Tổng tiền phòng', 'Tổng doanh thu',
    ]]);
  } else {
    if (currentSheet.getLastRow() > 1) {
      currentSheet.getRange(2, 1, currentSheet.getLastRow() - 1, 16)
        .clearContent()
        .clearFormat();
    }
  }

  // Fetch calendar events
  const rangeStart = new Date(currentYear, currentMonth - 2, 1);
  const rangeEnd = new Date(currentYear, currentMonth + 6, 0, 23, 59, 59);
  let events = fetchCalendarEvents(calendarId, rangeStart, rangeEnd);

  // Filter events by creation month
  const listCurrentMonth = events.filter(e => {
    const created = new Date(e.created);
    return created > endOfPrevMonth && created < startOfNextMonth;
  });

  const listPrevMonth = events.filter(e => {
    const created = new Date(e.created);
    return created < startOfCurrentMonth && created > endOf2PrevMonth;
  });

  // List extra services from previous month that continue to current month
  const listExtraServicePrevMonth = listPrevMonth.filter(e => {
    const updatedTime = new Date(e.updated);
    const eventEnd = new Date(e.end?.dateTime || e.end?.date);
    return updatedTime > startOfCurrentMonth && updatedTime < endOfCurrentMonth && eventEnd > startOfCurrentMonth;
  });

  // Process current month data
  const dataThisMonth = [];
  listCurrentMonth.forEach(e => {
    const description = e.description || '';
    const [sdt, app, price, service, serviceNote] = parseDescription(description);
    dataThisMonth.push([
      e.id || '',
      e.summary || '',
      generateEventLink(e.id || '', calendarId),
      `${formatDateTime(e.start?.dateTime || e.start?.date)}-${formatDateTimeReverse(e.end?.dateTime || e.end?.date)}`,
      formatDateTime(e.created),
      formatDateTime(e.updated),
      description,
      sdt,
      app,
      price,
      service,
      serviceNote,
      '', '', '',
    ]);
  });

  // Write data to sheet
  if (dataThisMonth.length > 0) {
    const backgroundColors = dataThisMonth.map(row => {
      const price = row[9];
      const color = (price === 0) ? '#FFCDD2' : null;
      return Array(11).fill(color);
    });

    currentSheet.getRange(2, 1, dataThisMonth.length, 11).setBackgrounds(backgroundColors);
    currentSheet.getRange(1, 1, 1, 24).setValues([[
      'ID', 'Tên', 'Link', 'Checkin-Checkout', 'Ngày tạo', 'Ngày cập nhật',
      'Ghi chú', 'SĐT', 'App', 'Price',
      'Service', 'Service Note', 'Tổng tiền Service', 'Tổng tiền phòng',
      'Tổng doanh thu', , 'Doanh thu', 'Giá thuê nhà', 'Dịch vụ chung',
      'Điện', 'Nước', 'Dọn nhà', 'Hoa Hồng', 'Lãi'
    ]]);

    currentSheet.getRange(2, 1, dataThisMonth.length, 15).setValues(dataThisMonth);
    currentSheet.getRange(2, 1, dataThisMonth.length, 15).sort({ column: 5, ascending: true });

    // Set formulas
    currentSheet.getRange(2, 13).setFormula(`=SUM(K2:K)`);
    currentSheet.getRange(2, 14).setFormula(`=SUM(J2:J)`);
    currentSheet.getRange(2, 15).setFormula(`=M2+N2`);
    currentSheet.getRange(2, 13, 1, 3).setBackground('#79b223');

    // Format currency
    currentSheet.getRange('K:K').setNumberFormat('#,##0 [$₫-vi-VN]');
    currentSheet.getRange('J:J').setNumberFormat('#,##0 [$₫-vi-VN]');
    currentSheet.getRange('O:O').setNumberFormat('#,##0 [$₫-vi-VN]');
    currentSheet.getRange('M:M').setNumberFormat('#,##0 [$₫-vi-VN]');
    currentSheet.getRange('N:N').setNumberFormat('#,##0 [$₫-vi-VN]');
    currentSheet.getRange('Q2:X2').setNumberFormat('#,##0 [$₫-vi-VN]');

    // Set prices
    currentSheet.getRange('R2').setValue(priceHouse);
    currentSheet.getRange('S2').setValue(priceCommonExtra);
    currentSheet.getRange('V2').setValue(priceClean);

    // Headers for expenses
    currentSheet.getRange('Q4:V4').setValues([['Chi phí tiêu hao', 'Ngày', 'Tên', 'Số lượng', 'Giá', 'Tổng tiền']]);

    // Formulas for summary
    currentSheet.getRange('Q2').setFormula('=O2');
    currentSheet.getRange('W2').setFormula(
      '=IF(AND(O2>=9000000, O2<14000000), 15%, ' +
      'IF(AND(O2>=14000000, O2<19000000), 23%, ' +
      'IF(AND(O2>=19000000, O2<24000000), 29%, ' +
      'IF(O2>=24000000, 35%, ""))))*O2'
    );
    currentSheet.getRange('X2').setFormula('=Q2-R2-S2-T2-U2-V2-W2-SUM(V4:V)');

    // Add summaries
    addDailyRevenueSummary(currentSheet);
    addCurrentRevenueSummary(currentSheet);
  }

  // Handle extra services from previous month
  if (listExtraServicePrevMonth.length > 0) {
    let prevMonthSheet = ss.getSheetByName(prevSheetName);
    if (!prevMonthSheet) {
      Logger.log(`⚠️ Sheet tháng trước '${prevSheetName}' không tồn tại`);
      return;
    }

    const prevData = prevMonthSheet.getDataRange().getValues();
    let dataServiceExtra = [];

    listExtraServicePrevMonth.forEach(event => {
      const eventId = event.id;
      const rowIndex = prevData.findIndex(row => row[0] === eventId);

      if (rowIndex !== -1) {
        const currentNote = prevData[rowIndex][11] || '';
        const newNote = currentNote.includes('Tính sang tháng sau')
          ? currentNote
          : (currentNote ? currentNote + ', ' : '') + 'Tính sang tháng sau';

        prevMonthSheet.getRange(rowIndex + 1, 12).setValue(newNote).setBackground('#ffe100');
        prevMonthSheet.getRange(rowIndex + 1, 11).setValue(0);
      }

      const description = event.description || '';
      const [sdt, app, price, service, serviceNote] = parseDescription(description);
      const serviceValue = Number(service) || 0;

      if (serviceValue > 0) {
        dataServiceExtra.push([
          event.id || '',
          event.summary || '',
          generateEventLink(event.id || '', calendarId),
          `${formatDateTime(event.start?.dateTime || event.start?.date)}-${formatDateTimeReverse(event.end?.dateTime || event.end?.date)}`,
          formatDateTime(event.created),
          formatDateTime(event.updated),
          description,
          sdt,
          app,
          0,
          service,
          serviceNote,
          '', '', '',
        ]);
      }
    });

    if (dataServiceExtra.length > 0) {
      const lastRow = currentSheet.getLastRow();
      currentSheet.getRange(lastRow + 1, 1, dataServiceExtra.length, 15).setValues(dataServiceExtra);
      currentSheet.getRange(lastRow + 1, 1, dataServiceExtra.length, 12).setBackground('#ffe100');
    }
  }
}
