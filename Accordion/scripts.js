async function copyTitle(title) {
    try {
        await navigator.clipboard.writeText(title);
        showNotification('Title copied');
    } catch (err) {
        console.error('Failed to copy title: ', err);
        showNotification('Failed to copy title');
    }
}

async function copyDesc(descId) {
    const descElement = document.getElementById(descId);
    const textToCopy = descElement.innerText;

    try {
        await navigator.clipboard.writeText(textToCopy);
        showNotification('Description copied');
    } catch (err) {
        console.error('Failed to copy description: ', err);
        showNotification('Failed to copy description');
    }
}


function enableEditDesc(descId) {
    const descElement = document.getElementById(descId);
    descElement.contentEditable = true;
    descElement.focus();
    const range = document.createRange();
    range.selectNodeContents(descElement);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    // Instead of using nextElementSibling, directly select the button by class
    const button = document.querySelector(`button[onclick="enableEditDesc('${descId}')"]`);
    if (button) { // Check if the button exists
        button.textContent = 'Save Desc';
        button.setAttribute('onclick', `saveDesc('${descId}')`);
    }
}


function saveDesc(descId) {
    const descElement = document.getElementById(descId);
    descElement.contentEditable = false; // Disable editing

    const newDesc = descElement.innerText; // Get updated description
    localStorage.setItem(descId, newDesc); // Save the new description to local storage
    showNotification("Description saved!"); // Notify the user

    // Update button text
    const button = document.querySelector(`button[onclick="enableEditDesc('${descId}')"]`);
    if (button) { // Check if the button exists
        button.textContent = 'Change Desc';
        button.setAttribute('onclick', `enableEditDesc('${descId}')`);
    }
}


function toggleAccordion(element) {
    const panel = element.parentElement.nextElementSibling;
    // Toggle panel display between block and none
    panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Load descriptions from local storage when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    const descElements = document.querySelectorAll('.desc');
    descElements.forEach((element) => {
        const id = element.id; // Assuming each description element has a unique ID
        const storedDesc = localStorage.getItem(id);
        if (storedDesc) {
            element.innerText = storedDesc; // Update the content with the stored description
        }
    });
});
