# Informe de Incidente: Failure Rate Increase

**ID del problema:** -6714115538700769215_1747942620000V2
**Título:** Failure rate increase
**Severidad:** ERROR
**Fecha de aparición:** timestamp 1747942920000

## Entidad afectada
- **Servicio:** MDEAPI:443
- **entityId:** SERVICE-F4067980CB30773E
- **Tipo de servicio:** WEB_REQUEST_SERVICE
- **Tecnologías detectadas:**
  - ASP.NET CORE 8.0.1625.21611
  - IIS App Pool 10.0.17763.1
  - .NET 8.0.16
  - .NET Framework 4.8.4110.0
  - CLR FullCLR 4.0.30319.0, 4.8.4110.0, 8.0.16, 8.0.16.0
  - ADO.NET System.Data.Common 8.0.1625.21506
  - WCF 4.8.4110.0
  - MSSQL_CLIENT 5.16.24240.5
- **Context root:** /
- **Tecnología de agente:** IIS
- [Ver detalles del servicio en Dynatrace](https://xoa06678.apps.dynatrace.com//ui/apps/dynatrace.services/explorer?detailsId=SERVICE-F4067980CB30773E&sidebarOpen=false)

## Logs y eventos
- No se encontraron logs recientes asociados al servicio.
- No hay eventos de Kubernetes relacionados.

## Ownership
- No se encontró información de ownership para el servicio. Se recomienda revisar la configuración de ownership en Dynatrace: https://docs.dynatrace.com/docs/deliver/ownership

## Enlace directo al problema
[Ver en Dynatrace](https://xoa06678.apps.dynatrace.com//ui/apps/dynatrace.davis.problems/problem/-6714115538700769215_1747942620000V2)

---

**Notas:**
- El incidente corresponde a un aumento en la tasa de fallos detectado por Dynatrace en el servicio MDEAPI:443.
- El servicio está basado en tecnologías .NET y ASP.NET Core, ejecutándose sobre IIS.
- No se hallaron logs ni eventos adicionales en el entorno para profundizar el análisis.
- Se recomienda revisar el código, la infraestructura y la configuración del servicio para identificar la causa del aumento de errores.
