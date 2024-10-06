function copyTitle(title) {
    const tempInput = document.createElement('input');
    tempInput.value = title;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showNotification('Title copied');
}

function copyDesc(descId) {
    const descElement = document.getElementById(descId);
    const range = document.createRange();
    range.selectNode(descElement);
    window.getSelection().removeAllRanges(); // Clear current selection
    window.getSelection().addRange(range); // Select the text in the element

    document.execCommand('copy'); // Copy the selected text
    window.getSelection().removeAllRanges(); // Clear selection after copying
    showNotification('Description copied');
}

function enableEditDesc(descId) {
    const descElement = document.getElementById(descId);
    descElement.contentEditable = true;
    descElement.focus();
    const range = document.createRange();
    range.selectNodeContents(descElement);
    range.collapse(false); // Collapse to the end
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    const button = descElement.nextElementSibling.querySelector('.change-desc-btn');
    button.textContent = 'Save Desc';
    button.setAttribute('onclick', `saveDesc('${descId}')`);
}

function saveDesc(descId) {
    const descElement = document.getElementById(descId);
    descElement.contentEditable = false;

    const button = descElement.nextElementSibling.querySelector('.change-desc-btn');
    button.textContent = 'Change Desc';
    button.setAttribute('onclick', `enableEditDesc('${descId}')`);
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
