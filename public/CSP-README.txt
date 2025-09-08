# Política de seguridad de contenido recomendada para producción
# Agrega esto en el <head> de tu index.html de producción
#
# <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://www.gstatic.com https://www.googleapis.com; connect-src 'self' https://firestore.googleapis.com https://*.firebaseio.com; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
#
# Ajusta los dominios según tus necesidades y dependencias externas.
