const express = require('express'); //  framework para construir aplicaciones web y APIs en Node.js.
const OpenAI = require('openai'); //  interactuar con la API de OpenAI.
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env en process.env.
const path = require('path'); // Manipular rutas de archivos.
const cors = require('cors'); // Permite el acceso de recursos desde cualquier origen.

// Configuración de Express.
const app = express();
const port = 3000;
app.use(cors()); // Configuración de CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Configuración de la API de OpenAI.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
});

// Endpoint para obtener la clave de la API de Polygon.
app.get('/api/key', (req, res) => {
    console.log('Obteniendo la clave de la API...');
    res.json({ apiKey: process.env.POLYGON_API_KEY });
});

// Endpoint para obtener los datos de la API de OpenAI.
app.post('/api/report', async (req, res) => {
    const { data } = req.body; // Recibe los datos de stock desde el frontend
    console.log('Obteniendo el reporte de la API...: ', data);

    const messages = [
        {
            role: 'system',
            content: 'You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell. Use the examples provided between ### to set the style of your response.'
        },
        {
            role: 'user',
            content: `${data}
            ###
            OK baby, hold on tight! You are going to haate this! Over the past three days, Tesla (TSLA) shares have plummetted. The stock opened at $223.98 and closed at $202.11 on the third day, with some jumping around in the meantime. This is a great time to buy, baby! But not a great time to sell! But I'm not done! Apple (AAPL) stocks have gone stratospheric! This is a seriously hot stock right now. They opened at $166.38 and closed at $182.89 on day three. So all in all, I would hold on to Tesla shares tight if you already have them - they might bounce right back up and head to the stars! They are volatile stock, so expect the unexpected. For APPL stock, how much do you need the money? Sell now and take the profits or hang on and wait for more! If it were me, I would hang on because this stock is on fire right now!!! Apple are throwing a Wall Street party and y'all invited!
            ###
            ###
            Apple (AAPL) is the supernova in the stock sky – it shot up from $150.22 to a jaw-dropping $175.36 by the close of day three. We’re talking about a stock that’s hotter than a pepper sprout in a chilli cook-off, and it’s showing no signs of cooling down! If you’re sitting on AAPL stock, you might as well be sitting on the throne of Midas. Hold on to it, ride that rocket, and watch the fireworks, because this baby is just getting warmed up! Then there’s Meta (META), the heartthrob with a penchant for drama. It winked at us with an opening of $142.50, but by the end of the thrill ride, it was at $135.90, leaving us a little lovesick. It’s the wild horse of the stock corral, bucking and kicking, ready for a comeback. META is not for the weak-kneed So, sugar, what’s it going to be? For AAPL, my advice is to stay on that gravy train. As for META, keep your spurs on and be ready for the rally.
            ###
            `
        }
    ]

    try {

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages,
            max_tokens: 16, // Unidades de texto que el modelo procesa
            temperature: 1, // Controla la aleatoriedad de las respuestas
            presence_penalty: 0, // Controla la presencia de palabras
            frequency_penalty: 0 // Controla la frecuencia de palabras
        });

        res.json({ report: response.choices[0].message.content.trim() });
    } catch (error) {
        if (error.code === 'insufficient_quota') {
            console.error('Error de cuota: has superado tu límite de uso de la API. Revisa tu plan.');
        } else if (error.status === 429) {
            console.error('Error de límite de tasa: has hecho demasiadas solicitudes en poco tiempo.');
        } else {
            console.error('Error al obtener la respuesta:', error);
        }
        res.status(500).send('Error al conectar con OpenAI API');
    }
});

// Endpoint para generar una imagen con DALL-E.
app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;
    console.log('Generando imagen con DALL-E...: ', prompt);

    try {
        const response = await openai.images.generate({
            model: 'dall-e-2', // default dall-e-2
            prompt: prompt, //required
            n: 1, //default 1 
            size: '256x256', //default 1024x1024
            style: 'natural', //default vivid (other option: natural)
            response_format: 'b64_json' //default url
        });

        res.json({ image: response.data[0].b64_json });
    } catch (error) {
        if (error.code === 'insufficient_quota') {
            console.error('Error de cuota: has superado tu límite de uso de la API. Revisa tu plan.');
        } else if (error.status === 429) {
            console.error('Error de límite de tasa: has hecho demasiadas solicitudes en poco tiempo.');
        } else {
            console.error('Error al obtener la respuesta:', error);
        }
        res.status(500).send('Error al conectar con OpenAI API');
    }
});

// Servidor HTTP para la API.
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});