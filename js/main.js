function toggleSection(sectionId) {
    // Get the section element
    var $section = $('#' + sectionId);

    // If the section is already visible, hide it
    if ($section.is(':visible')) {
        $section.slideUp();
    } else {
        // Otherwise, hide all sections and show the selected one
        $('.content-section').slideUp(); // Hide all sections with the class 'content-section'
        $section.slideDown(); // Show the selected section
    }
}

function filterProjects(category) {
    const allProjects = document.querySelectorAll('.grid-item');
    
    allProjects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'flex';
        } else {
            project.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.category-button');
    const projects = document.querySelectorAll('.grid-item');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));

            // Add active class to the clicked button
            button.classList.add('active');

            // Filter projects
            const category = button.getAttribute('data-category');
            projects.forEach(project => {
                const projectCategories = project.getAttribute('data-category').split(' ');
                
                // Check if the project categories include the selected category
                if (category === 'all' || projectCategories.includes(category)) {
                    project.style.display = 'flex';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
});



