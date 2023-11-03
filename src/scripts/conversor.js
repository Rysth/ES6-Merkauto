import html2pdf from 'html2pdf.js';

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const pdfButton = document.getElementById('pdf-button');

  pdfButton.addEventListener('click', () => {
    const pdfOptions = {
      margin: 5,
      filename: 'document.pdf',
      enableLinks: true,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: {
        dpi: 300,
        letterRendering: true,
        width: 1080,
        height: 1920,
        scale: 4,
        useCORS: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
    };

    html2pdf().from(content).set(pdfOptions).save();
  });
});
