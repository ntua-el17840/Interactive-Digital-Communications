function isTargetPage() {
    // Check if the current page URL contains the specified path, ignoring query parameters or hash fragments
    const path = window.location.pathname + window.location.search + window.location.hash;
    return path.startsWith('/content/Digcom_Lab1.html');
}


function hideInitialCodecells() {
    // Dynamically find and hide all 'codecell' elements with a number 28 or higher
    document.querySelectorAll('[id^="codecell"]').forEach(element => {
        let match = element.id.match(/^codecell(\d+)$/);
        if (match && parseInt(match[1], 10) >= 28) {
            element.style.display = 'none';
            console.log(`Element with ID ${element.id} has been initially hidden.`);
        }
    });
}

function customFunction() {
    // Dynamically hide '.thebelab-input' within 'codecell' elements with a number 28 or higher
    document.querySelectorAll('[id^="codecell"]').forEach(element => {
        let match = element.id.match(/^codecell(\d+)$/);
        if (match && parseInt(match[1], 10) >= 28) {
            let inputElement = element.querySelector('.thebelab-input');
            if (inputElement) {
                inputElement.style.display = 'none';
                console.log(`Thebelab input within ${element.id} has been hidden.`);
            }
        }
    });
}

function observeStatusChanges() {
    if (!isTargetPage()) return; // Exit if not on the target page

    const config = {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: false
    };

    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                let elements = document.querySelectorAll('.status');
                elements.forEach((element) => {
                    if (element.textContent.trim().toLowerCase() === 'ready') {
                        customFunction(); // Hide '.thebelab-input' in relevant codecells when status is 'ready'
                    }
                });
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(document.body, config);
}

if (isTargetPage()) {
    document.addEventListener('DOMContentLoaded', (event) => {
        hideInitialCodecells(); // Initially hide relevant codecells
        observeStatusChanges(); // Start observing for changes to '.status' elements
    });
}
