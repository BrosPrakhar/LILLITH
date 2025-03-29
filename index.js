require('dotenv').config();
const express = require('express');
const app = express();
const OpenAI = require('openai');

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',  // Update the base URL
    apiKey: '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',
    defaultHeaders: {
        'api-key': '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'
    }
});

app.get('/', (req, res) => {
    res.render('home');
});

// Add chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({

            model: "openai/gpt-4o", // This is the correct model name for Deepseek's free tier
            messages: [
                {
                    role: "system", content: `You young guy how loves to talk about rendom stuff" },
                { role: "user", content: "Your guy how to love to watch movies and series. my passion is to become ethical hacker and expertise in field of website development and act like personal chatbot who love to do everthing for his owner you have to give me as relatable answer as can from do understand and if you want to ask question about my silf im ready so that i can get great result ${req.body.message}`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        });

        res.json({ message: completion.choices[0].message.content });
        // console.log('Response:', completion.choices[0].message.content);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});