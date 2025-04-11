// Function to toggle sections
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const button = event.currentTarget;
    
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        button.textContent = '−';
    } else {
        section.classList.add('hidden');
        button.textContent = '+';
    }
}

// Function to calculate CGPA
function calculateCGPA() {
    // Define course credits
    const courseCredits = {
        // Foundation Level
        'BSMA1001': 4, 'BSMA1002': 4, 'BSCS1001': 4, 'BSHS1001': 4,
        'BSMA1003': 4, 'BSMA1004': 4, 'BSCS1002': 4, 'BSHS1002': 4,
        
        // Diploma in Programming
        'BSCS2001': 4, 'BSCS2002': 4, 'BSCS2003': 4, 'BSCS2003P': 2,
        'BSCS2005': 4, 'BSCS2006': 4, 'BSCS2006P': 2, 'BSSE2001': 3,
        
        // Diploma in Data Science
        'BSCS2004': 4, 'BSMS2001': 4, 'BSMS2001P': 2, 'BSCS2007': 4,
        'BSCS2008': 4, 'BSCS2008P': 2, 'BSMS2002': 4, 'BSSE2002': 3
    };
    
    // Initialize variables for CGPA calculation
    let totalCredits = 0;
    let totalGradePoints = 0;
    
    // Foundation Level calculations
    let foundationCredits = 0;
    let foundationGradePoints = 0;
    let foundationCoursesCompleted = 0;
    
    // Programming Diploma calculations
    let programmingCredits = 0;
    let programmingGradePoints = 0;
    let programmingCoursesCompleted = 0;
    let programmingProjectsCompleted = 0;
    
    // Data Science Diploma calculations
    let dataCredits = 0;
    let dataGradePoints = 0;
    let dataCoursesCompleted = 0;
    let dataProjectsCompleted = 0;
    
    // Iterate through all courses
    for (const courseCode in courseCredits) {
        const selectElement = document.getElementById(courseCode);
        if (selectElement && selectElement.value !== "") {
            const gradePoint = parseFloat(selectElement.value);
            const credits = courseCredits[courseCode];
            
            
            // Skip Pass/Fail/U grades in CGPA calculation
            if (
               gradePoint === 0 && 
               (selectElement.options[selectElement.selectedIndex].text.includes('P') || 
                selectElement.options[selectElement.selectedIndex].text.includes('F') || 
                selectElement.options[selectElement.selectedIndex].text.includes('U')))
            {
          continue;
           }

            // Add to total calculations
            totalCredits += credits;
            totalGradePoints += (credits * gradePoint);
            
            // Add to specific level calculations
            if (courseCode.startsWith('BSMA1') || courseCode.startsWith('BSCS1') || courseCode.startsWith('BSHS1')) {
                foundationCredits += credits;
                foundationGradePoints += (credits * gradePoint);
                foundationCoursesCompleted++;
            } else if (courseCode === 'BSCS2001' || courseCode === 'BSCS2002' || courseCode === 'BSCS2003' || 
                       courseCode === 'BSCS2005' || courseCode === 'BSCS2006' || courseCode === 'BSSE2001') {
                programmingCredits += credits;
                programmingGradePoints += (credits * gradePoint);
                programmingCoursesCompleted++;
            } else if (courseCode === 'BSCS2003P' || courseCode === 'BSCS2006P') {
                programmingCredits += credits;
                programmingGradePoints += (credits * gradePoint);
                programmingProjectsCompleted++;
            } else if (courseCode === 'BSMS2001P' || courseCode === 'BSCS2008P') {
                dataCredits += credits;
                dataGradePoints += (credits * gradePoint);
                dataProjectsCompleted++;
            } else {
                dataCredits += credits;
                dataGradePoints += (credits * gradePoint);
                dataCoursesCompleted++;
            }
        }
    }
    
    // Calculate CGPAs
    const overallCGPA = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "N/A";
    const foundationCGPA = foundationCredits > 0 ? (foundationGradePoints / foundationCredits).toFixed(2) : "N/A";
    const programmingCGPA = programmingCredits > 0 ? (programmingGradePoints / programmingCredits).toFixed(2) : "N/A";
    const dataScienceCGPA = dataCredits > 0 ? (dataGradePoints / dataCredits).toFixed(2) : "N/A";
    
    // Update the results section 
    document.getElementById('overall-cgpa').textContent = overallCGPA;
    document.getElementById('foundation-cgpa').textContent = foundationCGPA;
    document.getElementById('programming-cgpa').textContent = programmingCGPA;
    document.getElementById('data-science-cgpa').textContent = dataScienceCGPA;
    
    document.getElementById('total-credits').textContent = totalCredits;
    document.getElementById('foundation-credits').textContent = foundationCredits;
    document.getElementById('programming-credits').textContent = programmingCredits;
    document.getElementById('data-science-credits').textContent = dataCredits;
    
    document.getElementById('foundation-completed').textContent = foundationCoursesCompleted + "/8";
    document.getElementById('programming-completed').textContent = programmingCoursesCompleted + "/6 and Projects: " + programmingProjectsCompleted + "/2";
    document.getElementById('data-science-completed').textContent = dataCoursesCompleted + "/6 and Projects: " + dataProjectsCompleted + "/2";
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', function() {
    calculateCGPA();
    
    // Add reset button functionality
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            const selects = document.querySelectorAll('select');
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
            calculateCGPA();
        });
    }
});
