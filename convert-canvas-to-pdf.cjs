const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function convertCanvasToPdf() {
  console.log('🎨 Iniciando conversión del Business Model Canvas a PDF...');
  
  // Verificar que el archivo HTML existe
  const htmlPath = path.join(__dirname, 'asistoya-business-canvas.html');
  
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ Error: No se encontró el archivo asistoya-business-canvas.html');
    process.exit(1);
  }
  
  let browser;
  
  try {
    browser = await puppeteer.launch({
      headless: 'new', // Usa el nuevo modo headless
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--font-render-hinting=none',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding'
      ]
    });
    
    const page = await browser.newPage();
    
    // Configurar viewport más amplio para el canvas
    await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 1 });
    
    // Configurar user agent para mejor compatibilidad
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('📄 Cargando Business Model Canvas...');
    console.log('📁 Archivo:', htmlPath);
    
    // Cargar el archivo HTML del Business Canvas
    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
    await page.goto(fileUrl, { 
      waitUntil: 'networkidle0',
      timeout: 90000 
    });

    // Esperar a que las fuentes se carguen completamente
    console.log('🔤 Esperando que las fuentes se carguen...');
    await page.evaluateHandle('document.fonts.ready');
    
    // Esperar tiempo adicional para renderizado completo
    console.log('⏳ Esperando renderizado completo...');
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    // Asegurar que todos los elementos estén completamente renderizados
    await page.evaluate(() => {
      // Detener animaciones para la captura PDF
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
        
        @media print {
          .canvas-section:hover {
            transform: none !important;
            box-shadow: none !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Forzar repaint múltiple para mejor renderizado
      document.body.style.display = 'none';
      document.body.offsetHeight;
      document.body.style.display = '';
      
      // Trigger layout recalc
      window.getComputedStyle(document.body).height;
    });
  
    // Configurar opciones del PDF optimizadas para Business Canvas
    const timestamp = new Date().toISOString().slice(0, 10);
    const pdfOptions = {
      path: `AsistoYA-Business-Canvas-${timestamp}.pdf`,
      format: 'A3', // Formato A3 horizontal más apropiado
      landscape: true, // Orientación horizontal para el canvas
      printBackground: true,
      margin: {
        top: '3mm',
        right: '3mm',
        bottom: '3mm',
        left: '3mm'
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false, // Quitar header/footer para más espacio
      omitBackground: false,
      tagged: true, // Para accesibilidad
      scale: 0.75, // Escala más pequeña para que quepa perfectamente
      printBackground: true
    };

    console.log('📑 Generando PDF del Business Model Canvas...');
    await page.pdf(pdfOptions);
    
    console.log('✅ Business Model Canvas PDF generado exitosamente!');
    console.log('📋 Archivo:', pdfOptions.path);
    console.log('🎯 Formato: A2 horizontal para óptima visualización');
    console.log('📊 Tamaño de archivo:', (fs.statSync(pdfOptions.path).size / 1024 / 1024).toFixed(2) + ' MB');
    
  } catch (error) {
    console.error('❌ Error durante la generación del PDF:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Ejecutar la conversión con mejor manejo de errores
convertCanvasToPdf().catch(error => {
  console.error('❌ Error al generar PDF del Business Canvas:', error.message);
  console.log('');
  console.log('💡 Posibles soluciones:');
  console.log('   1. Instalar Puppeteer: npm install puppeteer');
  console.log('   2. Usar método manual: node open-canvas-for-pdf.js');
  console.log('   3. Verificar permisos de archivo');
  process.exit(1);
});
