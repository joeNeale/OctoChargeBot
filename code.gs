function processEmails() {
  Logger.log('Started');
  var searchQuery = 'subject:"Power-ups:"'; // Customize this query
  var processedLabel = GmailApp.getUserLabelByName("Processed");
  if (!processedLabel) {
    // Create the label if it doesn't exist
    processedLabel = GmailApp.createLabel("Processed");
  }
  var threads = GmailApp.search(searchQuery, 0, 5); // Adjust search parameters as needed
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var alreadyProcessed = false;
    var labels = thread.getLabels();
    for (var k = 0; k < labels.length; k++) {
      if (labels[k].getName() === "Processed") {
        alreadyProcessed = true;
        break;
      }
    }
    if (alreadyProcessed) {
      Logger.log('Thread already processed. Skipping...');
      continue; // Skip this thread if it has already been processed
    }
    var messages = thread.getMessages();
    Logger.log('Processing thread ' + (i+1) + '/' + threads.length);
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      if (!message.isInTrash()) { // Check if the email is not already processed or deleted
        var subject = message.getSubject();
        Logger.log('Subject: ' + subject);
        var eventDetails = extractEventDetails(subject);
        if (eventDetails) {
          createCalendarEvent(eventDetails);
          message.markRead(); // Mark the email as read
          Logger.log('Email processed.');
        }
      }
    }
    thread.addLabel(processedLabel); // Mark the thread as processed by adding the label
  }
}

function extractEventDetails(subject) {
  var eventDetails = {};
  var match = subject.match(/Power-ups: Opt in to Power up for free at (\d{1,2}:\d{2} [AP]M) - (\d{1,2}:\d{2} [AP]M), .+ (\d{2}\/\d{2}\/\d{2})/);
  if (match) {
    Logger.log('match');
    eventDetails.summary = 'Powerup!'; //match[1];
    eventDetails.startTime = match[1];
    eventDetails.endTime = match[2];
    eventDetails.date = match[3]; // Assuming DD/MM/YY format
    return eventDetails;
  } else {
    Logger.log('no match');
    return null;
  }
}

function createCalendarEvent(details) {
  Logger.log('Start: ' + details.startTime);
  Logger.log('End: ' + details.endTime);
  Logger.log('Date: ' + details.date);
  
  // Split the date string into components
  var dateParts = details.date.split('/');
  
  // Assuming dateParts array is [dd, mm, yy]
  var day = dateParts[0];
  var month = dateParts[1] - 1; // Adjust month value for JavaScript Date (0-11)
  var year = '20' + dateParts[2]; // Adjust year to full format if necessary
  
  // Parse the times
  var startTimeParts = details.startTime.match(/(\d{1,2}):(\d{2}) ([AP]M)/);
  var endTimeParts = details.endTime.match(/(\d{1,2}):(\d{2}) ([AP]M)/);
  
  // Create Date objects for start and end times
  var startDate = new Date(year, month, day, get24Hour(startTimeParts[1], startTimeParts[3]), startTimeParts[2]);
  var endDate = new Date(year, month, day, get24Hour(endTimeParts[1], endTimeParts[3]), endTimeParts[2]);
  
  var calendarEvent = CalendarApp.getDefaultCalendar().createEvent(details.summary, startDate, endDate);
  Logger.log('Event ID: ' + calendarEvent.getId());
}

// Helper function to convert 12-hour format to 24-hour format
function get24Hour(hour, amPm) {
  var hourInt = parseInt(hour, 10);
  if (amPm === 'PM' && hourInt < 12) {
    hourInt += 12;
  } else if (amPm === 'AM' && hourInt === 12) {
    hourInt = 0;
  }
  return hourInt;
}