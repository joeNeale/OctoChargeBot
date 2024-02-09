### Setup Google Apps Script

1. **Open Google Apps Script:**
   - Navigate to [Google Apps Script](https://script.google.com/) and click on "New Project".

2. **Replace the Code:**
   - In the script editor, replace the contents of the `Code.gs` file with the script.

3. **Adjust the Script:**
   - Modify the `searchQuery` variable to match the specific emails you're forwarding or recieving from Octopus. For example, if all your event emails have a subject that includes "Power-ups:", you might use a query like `subject:Power-ups`.
  
4. **Set up a Time-Driven Trigger:**
   - To run this script automatically, you can create a trigger that executes the script at regular intervals (e.g., hourly).
   - In the Apps Script editor, click on the clock icon (⏲️) on the left sidebar to open the "Triggers" page, then click on "+ Add Trigger" at the bottom right corner.
   - Set the function to run as `processEmails`, choose "Time-driven" and the interval you prefer.
