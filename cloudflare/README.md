# Cloudflare

Cloudflare es una empresa de servicios de infraestructura en la nube que proporciona una variedad de soluciones para mejorar la seguridad, rendimiento y confiabilidad de sitios web y aplicaciones en línea. 

- Secure API request from Workers
- Cloudflare AI Gateway
- Enhanced security and error handling

**Comandos**

```sh
npm create cloudflare@latest

## Install OpenAI in your Worker project
npm install openai

## Save API key to your Workers environment
npx wrangler secret put OPENAI_API_KEY

## Deploy the latest Worker changes
npx wrangler deploy 
```

---

# Cross-Origin Resource Sharing (CORS)

El Intercambio de Recursos de Origen Cruzado es un mecanismo de seguridad implementado en los navegadores web que permite o restringe las solicitudes de recursos entre diferentes orígenes (**diferentes dominios, protocolos o puertos**).

Cuando un recurso web (como una API) está alojado en un dominio diferente al del sitio que intenta acceder a él, el navegador bloquea la solicitud por razones de seguridad. CORS permite que el servidor indique explícitamente que ciertos orígenes tienen permiso para acceder a sus recursos. Esto se hace mediante la inclusión de **encabezados HTTP** en las respuestas del servidor.

1. `Access-Control-Allow-Origin:` Especifica qué orígenes pueden acceder al recurso. Puede ser un dominio específico o un asterisco (*) para permitir todos los orígenes.

2. `Access-Control-Allow-Methods:` Especifica qué métodos HTTP (GET, POST, PUT, DELETE, etc.) están permitidos para el recurso.

3. `Access-Control-Allow-Headers:` Indica qué encabezados HTTP pueden ser utilizados en la solicitud.