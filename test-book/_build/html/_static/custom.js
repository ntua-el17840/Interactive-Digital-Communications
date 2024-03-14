function isTargetPage() {
    // Check if the URL path contains the specific page segment, accounting for variable base paths
    const urlPath = window.location.pathname;
    return urlPath.includes('/content/Digcom_Lab1.html');
}


function hideInitialCodecells() {
    // Dynamically find and hide all 'codecell' elements with a number 28 or higher
    document.querySelectorAll('[id^="codecell"]').forEach(element => {
        let match = element.id.match(/^codecell(\d+)$/);
        if (match && parseInt(match[1], 10) >= 27) {
            element.style.display = 'none';
            console.log(`Element with ID ${element.id} has been initially hidden.`);
        }
    });
}

function customFunction() {
    // Dynamically hide '.thebelab-input' within 'codecell' elements with a number 28 or higher
    document.querySelectorAll('[id^="codecell"]').forEach(element => {
        let match = element.id.match(/^codecell(\d+)$/);
        if (match && parseInt(match[1], 10) >= 27) {
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
        console.log("starting custom code");
        hideInitialCodecells(); // Initially hide relevant codecells
        observeStatusChanges(); // Start observing for changes to '.status' elements
    });
}