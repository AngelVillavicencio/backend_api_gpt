import express from 'express';
import axios from 'axios';
import { ChatGPTAPI } from 'chatgpt';

const app = express();
const port = 8000; // Puedes cambiar el puerto si es necesario

// Middleware para analizar JSON en las solicitudes POST
app.use(express.json());

async function generateGPTResponse(message) {
    try {
        const api = new ChatGPTAPI({
            apiKey: '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',
        });

        const response = await api.sendMessage(message);

        console.log(`GPT Response: ${response.text}`);
        return response.text;
    } catch (error) {
        console.error(`Error generating GPT response: ${error.message}`);
        return "Error processing your request.";
    }
}

app.post('/consultar', async (req, res) => {
    try {
        const consulta = req.body.consulta; // El string de consulta se debe enviar en el cuerpo de la solicitud JSON

        // Aquí debes reemplazar 'TU_CLAVE_DE_API' con tu clave de API de OpenAI
        const apiKey = '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';

        // Realiza una solicitud a la API de OpenAI
        const respuesta = await generateGPTResponse(consulta);

        res.json({ respuesta: respuesta });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
