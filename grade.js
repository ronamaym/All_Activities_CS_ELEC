// ==========================================
// SETTINGS (change these if the rules change)
// ==========================================
var PASSING_GRADE = 3.0;      // grades above this are "Failed"
var DEANS_LISTER_GWA = 1.75;  // GWA at or below this (with no fails) = Dean's Lister

// Remembers how many subjects were created
var subjectCount = 0;


// ==========================================
// STEP 1: Create the input boxes for each subject
// ==========================================
function createSubjectInputs() {
    var count = parseInt(document.getElementById("numSubjects").value); //

    // Check the number
    if (isNaN(count) || count <= 0) {
        alert("Please enter a valid number of subjects.");
        return;
    }

    subjectCount = count; //=0
    var html = ""; // the input boxes, built as simple text

    // Repeat once per subject
    for (var i = 1; i <= count; i++) {
        html = html + "<div class='subject-block'>";
        // html = html + "<div class='subject-block' id='block" + i + "'>";

        html = html + "<h4>Subject " + i + "</h4>";
        // html = html + "<button onclick='removeSubject(" + i + ")'>Delete</button>";

        // Each box gets its own id: name1, units1, grade1, name2, ...
        html = html + "<div class='field-group'><label>Subject " + i + " name: </label>" +
                      "<input type='text' id='name" + i + "'></div>";

        html = html + "<div class='field-group'><label>Subject " + i + " units: </label>" +
                      "<input type='number' id='units" + i + "' step='0.5'></div>";

        html = html + "<div class='field-group'><label>Subject " + i + " grade (1.00-5.00): </label>" +
                      "<input type='number' id='grade" + i + "' step='0.25'></div>";

        html = html + "<div class='field-group'><label>Subject " + i + " hours: </label>" +
                      "<input type='number' id='hour" + i + "' step='0.25'></div>";

        html = html + "</div>";
    }

    // Put the boxes on the page and show the Calculate button
    document.getElementById("subjectInputs").innerHTML = html; // ""
    document.getElementById("calcBtn").style.display = "block"; // none
}


// ==========================================
// STEP 2: Compute everything and show the report
// ==========================================
function calculateGradeReport() {
    var totalUnits = 0;
    var totalPoints = 0;
    var totalHour = 0;
    var hasFailing = false;
    var lines = "";

    // Repeat once per subject
    for (var i = 1; i <= subjectCount; i++) {
        // if (document.getElementById("name" + i) === null) {
        //     continue;
        // }

        // Read the boxes using their ids (name1, units1, grade1, ...)
        var name = document.getElementById("name" + i).value;
        var units = parseFloat(document.getElementById("units" + i).value);
        var grade = parseFloat(document.getElementById("grade" + i).value);
        var hour = parseFloat(document.getElementById("hour" + i).value);

        if (name === "") {
            name = "Subject " + i;
        }

        // Check the inputs
        if (isNaN(units) || isNaN(grade)) {
            alert("Please fill out units and grades for all subjects.");
            return;
        }
        if (units <= 0) {
            alert("Units must be greater than 0 (" + name + ").");
            return;
        }
        if (grade < 1 || grade > 5) {
            alert("Grade must be between 1.00 and 5.00 (" + name + ").");
            return;
        }
        if (isNaN(hour) || hour < 1 || hour > 7) {
            alert("Hours must be between 1 and 7 (" + name + ").");
            return;
        }

        // Add to totals
        totalUnits += units;
        totalHour += hour;
        totalPoints += (grade * units);

        // Passed or failed?
        var remarks = "Passed";
        if (grade > PASSING_GRADE) {
            remarks = "Failed";
            hasFailing = true;
        }

        // One line per subject (the CSS arranges these into columns)
        lines = lines + "<div class='report-row'>" +
                "<span>" + name + "</span>" +
                "<span>" + units.toFixed(1) + "</span>" +
                "<span>" + grade.toFixed(2) + "</span>" +
                "<span>" + hour + "</span>" +
                "<span>" + remarks + "</span>" +
                "</div>";
    }

    // GWA = total points / total units, rounded to 2 decimals
    var gwa = Math.round((totalPoints / totalUnits) * 100) / 100;

    // Academic standing
    var standing = "Passed";
    if (hasFailing) {
        standing = "Has failing grade(s)";
    } else if (gwa <= DEANS_LISTER_GWA) {
        standing = "Dean's Lister";
    } else if (gwa <= 1.90) {
        standing = "With Honors";
    }

    // Show results
    document.getElementById("reportLines").innerHTML = lines; //
    document.getElementById("outUnits").textContent = "Total units: " + totalUnits.toFixed(1);
    document.getElementById("outPoints").textContent = "Total Points: " + totalPoints.toFixed(2);
    document.getElementById("outHours").textContent = "Total Hours: " + totalHour;
    document.getElementById("outGwa").textContent = "GWA: " + gwa.toFixed(2);
    document.getElementById("outStanding").textContent = "Standing: " + standing;
    document.getElementById("reportSection").style.display = "block"; // none
}