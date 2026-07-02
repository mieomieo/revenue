/**
 * Add daily revenue summary to the sheet
 */
function addDailyRevenueSummary(currentSheet) {
  const lastRow = currentSheet.getLastRow();
  if (lastRow < 2) return;

  const dataRange = currentSheet.getRange(2, 1, lastRow - 1, 15).getValues();
  let dailyTotals = {};

  dataRange.forEach(row => {
    const checkinCheckout = row[3]; // cột "Checkin-Checkout"
    if (checkinCheckout) {
      const parts = checkinCheckout.trim().split(' ');
      if (parts.length >= 1) {
        const dateStr = parts[0]; // Ngày checkin
        const price = parseFloat((row[9] || '0').toString().replace(/[^\d]/g, '')) || 0;
        const service = parseFloat((row[10] || '0').toString().replace(/[^\d]/g, '')) || 0;
        dailyTotals[dateStr] = (dailyTotals[dateStr] || 0) + (price + service);
      }
    }
  });

  // Clear old summary
  const lastSummaryRow = currentSheet.getLastRow();
  currentSheet.getRange('M4:O' + lastSummaryRow).clearContent().clearFormat();

  // Create output
  let output = [];
  Object.keys(dailyTotals)
    .sort((a, b) => {
      const [da, ma, ya] = a.split('/').map(Number);
      const [db, mb, yb] = b.split('/').map(Number);
      return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db);
    })
    .forEach(dateStr => {
      output.push([`👉 Doanh thu ngày ${dateStr}`, '', dailyTotals[dateStr]]);
    });

  if (output.length > 0) {
    currentSheet.getRange(4, 13, output.length, 3).setValues(output);
    currentSheet.getRange(4, 13, output.length, 3).setBackground('#d9ead3');
    currentSheet.getRange(4, 15, output.length, 1).setNumberFormat('#,##0 [$₫-vi-VN]');
  }
}

/**
 * Add cumulative revenue summary to the sheet
 */
function addCurrentRevenueSummary(currentSheet) {
  const lastRow = currentSheet.getLastRow();
  if (lastRow < 2) return;

  const dataRange = currentSheet.getRange(2, 1, lastRow - 1, 15).getValues();
  let totalRevenue = 0;

  const now = new Date();
  const todayStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

  dataRange.forEach(row => {
    const checkinCheckout = row[3]; // cột "Checkin-Checkout"
    if (checkinCheckout) {
      const dateStr = checkinCheckout.split(' ')[0];
      const [d, m, y] = dateStr.split('/').map(Number);
      const rowDate = new Date(y, m - 1, d);

      if (rowDate <= now) {
        const price = parseFloat((row[9] || '0').toString().replace(/[^\d]/g, '')) || 0;
        const service = parseFloat((row[10] || '0').toString().replace(/[^\d]/g, '')) || 0;
        totalRevenue += (price + service);
      }
    }
  });

  const outputRow = currentSheet.getLastRow() + 2;
  currentSheet.getRange(outputRow, 13, 1, 3).setValues([
    [`🔥 Doanh thu lũy kế đến ${todayStr}`, '', totalRevenue]
  ]);
  currentSheet.getRange(outputRow, 13, 1, 3).setBackground('#cfe2f3');
  currentSheet.getRange(outputRow, 15).setNumberFormat('#,##0 [$₫-vi-VN]');
}
