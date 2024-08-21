'use strict';

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const db = require('./database.js');
const rl = require('./readline.js');


const fazerBackup = function () {
    const backupPath = path.join(__dirname, 'backups');
    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true});
    }

    const backupFile = path.join(backupPath, `backup-${new Date().toISOString()}.sql`);

    const dumpCommand = `pg_dump -U ${db.user} -h ${db.host} -p ${db.port} -d ${db.database} -F c -b -v -f ${backupFile}`;

    exec(dumpCommand, {env: {PGPASSWORD: db.password } }, (error, stout, stderr) => {
        if (error) {
            console.error(`Erro ao fazer backup: ${error.message}`);
            exibirMenu(rl);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
        }
        console.log(`Backup realizado com sucesso em: ${backupFile}`);
        exibirMenu(rl);
    });
};

module.exports = {
    fazerBackup
};