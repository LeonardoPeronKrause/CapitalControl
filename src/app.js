'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const dbHost = process.env.DB_HOST;
const appPort = process.env.PORT || 5432;

app.listen(appPort, () => {
    console.log(`Servidor rodando em http://localhost:${appPort}`);

    // Importa e chama a função main do main.js
    const { main } = require('./main.js');
    
    main();
});
