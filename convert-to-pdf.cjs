const puppeteer = require('puppeteer');
const path = require('path');

async function convertHtmlToPdf() {
  console.log('Iniciando conversión HTML a PDF...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });
  
  const page = await browser.newPage();
  
  // Configurar viewport para mejor renderizado
  await page.setViewport({ width: 1200, height: 800 });
  
  // Cargar el archivo HTML
  const htmlPath = path.join(__dirname, 'asistoya-resumen-ejecutivo.html');
  console.log('Cargando archivo HTML...');
  await page.goto(`file://${htmlPath}`, { 
    waitUntil: 'networkidle0',
    timeout: 60000 
  });

  // Esperar a que las fuentes de Google se carguen
  console.log('Esperando que las fuentes se carguen...');
  await page.evaluateHandle('document.fonts.ready');
  
  // Esperar un poco más para asegurar el renderizado completo
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Verificar que todos los elementos se hayan cargado correctamente
  await page.evaluate(() => {
    // Forzar repaint para asegurar que todos los estilos se apliquen
    document.body.style.display = 'none';
    document.body.offsetHeight; // trigger reflow
    document.body.style.display = '';
  });
  
  // Configurar opciones del PDF mejoradas
  const pdfOptions = {
    path: 'AsistoYA-Resumen-Ejecutivo.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm'
    },
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    omitBackground: false,
    tagged: false
  };

  console.log('Generando PDF con configuración mejorada...');
  await page.pdf(pdfOptions);
  
  await browser.close();
  
  console.log('✅ PDF generado exitosamente: AsistoYA-Resumen-Ejecutivo.pdf');
  console.log('📄 El archivo PDF ha sido corregido con mejor renderizado de elementos');
}

// Ejecutar la conversión
convertHtmlToPdf().catch(error => {
  console.error('❌ Error al generar PDF:', error);
  process.exit(1);
});
