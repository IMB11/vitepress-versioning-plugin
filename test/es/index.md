---
layout: home

hero:
  name: "Plataforma API ACME"
  text: "Suite de APIs de Nivel Empresarial"
  tagline: "APIs potentes y escalables para gestión de usuarios, pagos, análisis y notificaciones en tiempo real"
  image:
    src: /logo.svg
    alt: Plataforma API ACME
  actions:
    - theme: brand
      text: Comenzar
      link: /es/getting-started
    - theme: alt
      text: Referencia API
      link: /es/api/
    - theme: alt
      text: Ver en GitHub
      link: https://github.com/acme/api-platform

features:
  - icon: 👥
    title: API de Gestión de Usuarios
    details: Gestión completa del ciclo de vida del usuario con autenticación, autorización, perfiles y preferencias. Soporta SSO, MFA y control de acceso basado en roles.
    
  - icon: 💳
    title: Procesamiento de Pagos
    details: Procesamiento seguro de pagos con soporte para múltiples métodos de pago, suscripciones, facturación y reportes financieros completos.
    
  - icon: 📊
    title: Análisis y Perspectivas
    details: Motor de análisis en tiempo real con paneles personalizables, seguimiento de eventos, análisis de comportamiento del usuario y herramientas de inteligencia empresarial.
    
  - icon: 🔔
    title: Notificaciones en Tiempo Real
    details: Sistema de notificaciones multicanal que soporta email, SMS, notificaciones push, webhooks y mensajería en tiempo real.
    
  - icon: 🔐
    title: Seguridad Empresarial
    details: Seguridad de nivel bancario con OAuth 2.0, gestión de claves API, limitación de velocidad, cifrado en reposo y en tránsito, y registro de auditoría.
    
  - icon: 🌍
    title: Escala Global
    details: Distribuido en múltiples regiones con SLA de 99.99% de tiempo de actividad, infraestructura de escalado automático y entrega de contenido con CDN.
---

## Última Versión: v2.0.0 <span class="version-badge">Actual</span>

La Plataforma API ACME v2.0.0 introduce mejoras significativas y nuevas capacidades:

### 🚀 Nuevas Características
- **Autenticación Mejorada**: Nuevo sistema de autenticación basado en JWT con tokens de actualización
- **API de Notificaciones en Tiempo Real**: Soporte WebSocket y webhook para actualizaciones instantáneas
- **Análisis Avanzado**: Perspectivas impulsadas por aprendizaje automático y análisis predictivo
- **Soporte GraphQL**: Consulta múltiples recursos de manera eficiente con nuestro nuevo endpoint GraphQL

### ⚠️ Cambios que Rompen Compatibilidad
- Los endpoints de autenticación han sido reestructurados (ver [Guía de Migración](/es/guides/migration-v2))
- La API de perfil de usuario ahora usa nombres de campo diferentes para consistencia
- La estructura de carga útil del webhook de pagos ha sido actualizada

### 📈 Mejoras de Rendimiento
- 40% más rápido en tiempos de respuesta en todos los endpoints
- Mejor limitación de velocidad con capacidad de ráfaga
- Estrategias de caché mejoradas para mejor rendimiento

---

## Inicio Rápido

Comience a usar la Plataforma API ACME en minutos:

```bash
# Instalar el SDK oficial
npm install @acme/api-sdk

# O usar cURL directamente
curl -H "Authorization: Bearer TU_CLAVE_API" \
     https://api.acme.com/v2/users/me
```

::: tip 💡 ¿Necesita ayuda para elegir una versión?
- **v2.0.0** (Actual): Lo mejor para nuevos proyectos con las últimas características
- **v1.1.0**: Estable con soporte de análisis, recomendado para integraciones existentes
- **v1.0.0**: Soporte heredado, solo actualizaciones de seguridad

Use el selector de versión arriba para explorar la documentación de diferentes versiones de API.
:::

## Listo para Empresas

Confiado por más de 10,000 empresas en todo el mundo:

- **SLA de 99.99% de Tiempo de Actividad** con redundancia global
- **Certificado SOC 2 Tipo II** e **ISO 27001**
- **Soporte 24/7** con gestión de cuentas dedicada
- **SDKs Completos** para todos los principales lenguajes de programación

---

## ¿Qué Sigue?

<div class="next-steps">

### Para Desarrolladores
- [🚀 Guía de Inicio](/es/getting-started) - Configure su primera integración API
- [📚 Referencia API](/es/api/) - Documentación completa de endpoints
- [💡 Guías de Desarrollador](/es/guides/) - Mejores prácticas y patrones avanzados

### Para Gerentes de Producto
- [📊 Panel de Análisis](https://dashboard.acme.com) - Rastree el uso y rendimiento de la API
- [💼 Características Empresariales](/es/guides/enterprise) - Seguridad avanzada y cumplimiento
- [🔧 Ejemplos de Integración](/es/guides/integrations) - Implementaciones de casos de uso comunes

### Para Equipos DevOps
- [⚙️ Guía de Infraestructura](/es/guides/infrastructure) - Mejores prácticas de implementación y escalado
- [🔍 Monitoreo y Alertas](/es/guides/monitoring) - Observabilidad y resolución de problemas
- [🛡️ Pautas de Seguridad](/es/guides/security) - Proteja sus integraciones API

</div>

<style>
.next-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.next-steps h3 {
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
}

.next-steps ul {
  list-style: none;
  padding: 0;
}

.next-steps li {
  margin: 0.75rem 0;
  padding-left: 0;
}

.next-steps a {
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.next-steps a:hover {
  background: var(--vp-c-bg-soft);
}
</style>