// contributor.js

function showContent(option) {
    // Hide all content divs
    const contentDivs = document.getElementsByClassName('content');
    for (const div of contentDivs) {
        div.style.display = 'none';
    }

    // Show the selected content div
    const selectedContent = document.getElementById(`${option}Content`);
    selectedContent.style.display = 'block';
}
