/**
 * Fetch calendar events within a date range
 */
function fetchCalendarEvents(calendarId, startTime, endTime) {
  let events = [];
  let pageToken;

  do {
    try {
      const response = Calendar.Events.list(calendarId, {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 2500,
        pageToken: pageToken
      });

      if (response.items && response.items.length > 0) {
        events = events.concat(response.items);
      }

      pageToken = response.nextPageToken;
    } catch (error) {
      Logger.log(`Error fetching calendar events: ${error.message}`);
      break;
    }
  } while (pageToken);

  return events;
}
