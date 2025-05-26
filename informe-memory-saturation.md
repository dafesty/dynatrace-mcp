# Informe de Incidente: Memory Saturation

**ID del problema:** -5020231253228398278_1747162840336V2
**Título:** Memory saturation
**Severidad:** RESOURCE_CONTENTION (Contención de recursos)
**Fecha de aparición:** timestamp 1747162840336

## Entidad afectada
- **Host:** soludesaonbase1.soluciones.loc
- **entityId:** HOST-016F8F573CBD7096
- **Sistema operativo:** Windows Server 2019 Standard 1809, ver. 10.0.17763
- **Arquitectura:** x86 (64 bits)
- **CPU:** 4 núcleos lógicos (Intel Xeon E5-2640 v4 @ 2.40GHz)
- **Memoria física:** 12 GB
- **Proveedor:** VMware
- **Estado:** RUNNING
- **IP:** 10.13.0.39
- [Ver detalles del host en Dynatrace](https://xoa06678.apps.dynatrace.com//ui/apps/dynatrace.infraops/hosts/HOST-016F8F573CBD7096)

## Causa raíz
- **Proceso:** obunity.exe
- **entityId:** PROCESS_GROUP-FBA5B493C1861346
- **Ruta ejecutable:** C:/Program Files (x*)/Hyland/Unity Client/obunity.exe
- **Argumentos:** C:\Program Files (x86)\Hyland\Unity Client\obunity.exe
- **Tecnologías:**
  - CLR FullCLR v4.8.4110.0
  - .NET Framework v4.8.4110.0

## Logs y eventos
- No se encontraron logs recientes asociados al host ni al proceso obunity.exe.
- No se encontraron eventos de Kubernetes relacionados.

## Ownership
- No se encontró información de ownership para el host ni para el proceso. Se recomienda revisar la configuración de ownership en Dynatrace: https://docs.dynatrace.com/docs/deliver/ownership

## Enlace directo al problema
[Ver en Dynatrace](https://xoa06678.apps.dynatrace.com//ui/apps/dynatrace.davis.problems/problem/-5020231253228398278_1747162840336V2)

---

**Notas:**
- El incidente corresponde a una saturación de memoria detectada por Dynatrace.
- La causa probable es el proceso obunity.exe, una aplicación .NET Framework 4.8.
- No se hallaron logs ni eventos adicionales en el entorno para profundizar el análisis.
- Se recomienda revisar el consumo de memoria del proceso y la configuración de ownership para mejorar la trazabilidad de futuros incidentes.
