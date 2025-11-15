SERIE II: Envío de Mensajes (Formulario Protegido)
1. Cree un formulario que permita al usuario escribir y enviar un mensaje.
2. Realice una petición POST a la API de mensajes:
   https://backcvbgtmdesa.azurewebsites.net/api/Mensajes
3. El cuerpo de la petición debe ser el siguiente JSON:
   JSON
   {
   "Cod_Sala": 0,
   "Login_Emisor": "[SU USUARIO DE LA SERIE I]",
   "Contenido": "[EL MENSAJE ESCRITO]"
   }
4. CRÍTICO y OBLIGATORIO: Envíe el Token Bearer obtenido en la Serie I en la cabecera
   Authorization de la petición, de contrario su petición será bloqueada.