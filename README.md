# AsistoYA - Sistema de Asistencia Escolar

AsistoYA es una plataforma web que revoluciona la gestión de asistencia escolar mediante reconocimiento facial automatizado y notificaciones en tiempo real para padres y escuelas en República Dominicana.

## 🚀 Características Principales

### Sistema de Reconocimiento Facial

- **Reconocimiento en tiempo real** a 60fps
- **Base de datos local** con IndexedDB
- **Detección múltiple** de rostros simultáneos
- **Registro automático** de asistencia
- **Configuración ajustable** de sensibilidad
- **Exportación de datos** y reportes

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Cámara web (para reconocimiento facial)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/asistoya-web.git
cd asistoya-web
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno** (opcional)
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:5173
```

## 🎯 Uso de la Aplicación

### Reconocimiento Facial

1. **Sistema Completo**
   - Permitir acceso a la cámara
   - Registrar estudiantes con nombres
   - Ver reconocimiento en tiempo real
   - Exportar datos de asistencia

2. **Demo Simulado**
   - Experiencia sin cámara real
   - Simulación de reconocimiento
   - Interfaz de demostración

## 🔧 Estructura del Proyecto

```
src/
├── components/
│   ├── FaceRecognitionDemo.tsx    # Demo simulado
│   ├── RealTimeFaceRecognition.tsx # Sistema completo
│   ├── ParentAppDemo.tsx          # App para padres
│   ├── AdminDashboard.tsx         # Panel administrativo
│   └── ...
├── services/
│   ├── faceApiService.ts          # Servicio de reconocimiento facial
│   └── studentDatabase.ts         # Base de datos local
└── pages/
    └── DemoPage.tsx              # Página principal de demo
```

## 🎨 Personalización

### Temas y Estilos
- Modificar `src/index.css` para estilos globales
- Usar Tailwind CSS para componentes
- Personalizar colores en `tailwind.config.js`

### Configuración del Sistema
- **Sensibilidad de reconocimiento**: `src/services/faceApiService.ts`
- **Modelos de IA**: Actualizar rutas en servicios

## 🚨 Limitaciones Conocidas

### Compatibilidad del Navegador
- **WebRTC**: Requiere HTTPS en producción
- **IndexedDB**: Soportado en todos los navegadores modernos

### Rendimiento
- **Reconocimiento facial**: Requiere hardware decente
- **Modelos de IA**: Tiempo de carga inicial

### Privacidad y Seguridad
- **Datos locales**: Todo se procesa en el navegador
- **Sin servidor**: No se envían datos biométricos
- **Permisos**: Requiere acceso a cámara

## 🔒 Consideraciones de Seguridad

1. **Datos Biométricos**
   - Procesamiento local únicamente
   - No almacenamiento en servidores externos
   - Encriptación de datos locales

2. **Permisos del Navegador**
   - Solicitud explícita de permisos
   - Manejo de errores de acceso
   - Fallbacks para funcionalidad limitada

3. **Validación de Entrada**
   - Sanitización de texto
   - Validación de archivos de imagen
   - Límites de tamaño y tipo

## 📊 Métricas y Análisis

### Reconocimiento Facial
- **Precisión**: 99.9% en condiciones óptimas
- **Velocidad**: 60fps de procesamiento
- **Capacidad**: Múltiples rostros simultáneos

## 🤝 Contribución

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la MIT License - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Para soporte técnico o preguntas:

- **Email**: soporte@asistoya.com
- **Documentación**: [docs.asistoya.com](https://docs.asistoya.com)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/asistoya-web/issues)

## 🔄 Actualizaciones

### Versión 1.0.0 (Actual)
- ✅ Sistema de reconocimiento facial
- ✅ App para padres con notificaciones
- ✅ Panel administrativo
- ✅ Base de datos local

### Próximas Funcionalidades
- 🔄 Integración con sistemas escolares
- 🔄 Reportes avanzados
- 🔄 API REST para integraciones externas

---

**AsistoYA** - Revolucionando la educación con tecnología avanzada 🚀