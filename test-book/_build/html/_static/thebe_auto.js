document.addEventListener('DOMContentLoaded', (event) => {
    if (window.thebe) {
      window.thebe.bootstrapThebe({
        url: "https://mybinder.org",
        repo: "ntua-el17840/Interactive-Digital-Communications",
        branch: "main",
        path_to_book: "test-book/",
        kernelOptions: {
          kernelName: "python3",
          path: "content/Digcom_Lab1.ipynb"  // Adjust the path as necessary
        },
        selectors: {
          cellSelector: 'div.cell',
          codeCellSelector: 'div.cell.code_cell',
          inputSelector: 'div.input',
          outputSelector: 'div.output',
          buttonSelector: '.thebe-launch-button'
        },
        bootstrap: true,
        mountActivateWidget: true,
        requestKernel: true
      });
    }
  });
  