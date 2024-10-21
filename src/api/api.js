const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    return res.json();
})

app.listen(port, () => {
    console.log(`Aplicação rodando na porta: ${port}`);
})