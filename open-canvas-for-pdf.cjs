// Script para abrir el Business Model Canvas y facilitar la conversión a PDF
// Uso: node open-canvas-for-pdf.js

const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

function openCanvasForPDF() {
  console.log('🎨 Preparando Business Model Canvas para conversión a PDF...');
  
  // Verificar que el archivo HTML existe
  const htmlPath = path.join(__dirname, 'asistoya-business-canvas.html');
  
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ Error: No se encontró el archivo asistoya-business-canvas.html');
    process.exit(1);
  }
  
  console.log('📄 Archivo HTML encontrado:', htmlPath);
  console.log('');
  console.log('🌐 Instrucciones para generar PDF:');
  console.log('1. Se abrirá el Business Model Canvas en tu navegador');
  console.log('2. Presiona Ctrl+P (o Cmd+P en Mac) para imprimir');
  console.log('3. Selecciona "Guardar como PDF" como destino');
  console.log('4. Configura:');
  console.log('   - Tamaño: A3 o A4 (recomendado A3)');
  console.log('   - Orientación: Horizontal/Paisaje');
  console.log('   - Márgenes: Mínimos');
  console.log('   - Gráficos de fondo: Activado');
  console.log('5. Guarda como: AsistoYA-Business-Canvas.pdf');
  console.log('');
  
  // Intentar abrir en el navegador predeterminado
  try {
    const absolutePath = path.resolve(htmlPath);
    const fileUrl = `file:///${absolutePath.replace(/\\/g, '/')}`;
    
    console.log('🚀 Abriendo en navegador...');
    console.log('📎 URL:', fileUrl);
    
    // Detectar el sistema operativo y usar el comando apropiado
    const platform = process.platform;
    let command;
    
    if (platform === 'win32') {
      command = `start "${fileUrl}"`;
    } else if (platform === 'darwin') {
      command = `open "${fileUrl}"`;
    } else {
      command = `xdg-open "${fileUrl}"`;
    }
    
    execSync(command, { stdio: 'ignore' });
    console.log('✅ Business Model Canvas abierto en el navegador');
    console.log('');
    console.log('💡 Tip: Para mejor calidad, espera a que todos los elementos carguen completamente antes de generar el PDF');
    
  } catch (error) {
    console.log('⚠️ No se pudo abrir automáticamente en el navegador');
    console.log('');
    console.log('📋 Copia y pega esta URL en tu navegador:');
    console.log(`file:///${path.resolve(htmlPath).replace(/\\/g, '/')}`);
  }
  
  console.log('');
  console.log('📋 Archivo HTML listo para conversión manual a PDF');
}

// Ejecutar
openCanvasForPDF();
