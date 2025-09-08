# Recomendaciones de seguridad y checklist para Solstice

1. Elimina cualquier clave o valor sensible hardcodeado en el código fuente. Usa solo variables de entorno (.env).
2. Mantén tus dependencias actualizadas. Ejecuta regularmente:
   npm update
   npm audit
3. Aplica una Content Security Policy (CSP) en producción. Consulta el archivo public/CSP-README.txt.
4. Revisa los permisos de tu proyecto Firebase en la consola de Firebase.
5. Asegúrate de que todas las validaciones críticas (como límites de compra) estén implementadas también en el backend o smart contract.
6. Realiza auditorías de seguridad periódicas y revisa los resultados de npm audit.
7. No subas nunca tu archivo .env real a ningún repositorio público.

Checklist de seguridad completado por GitHub Copilot, 2025-09-07.
