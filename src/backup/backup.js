<<<<<<< HEAD:src/backup.js
'use strict';

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const db = require('./back/database.js');
const rl = require('./readline.js');
const { iniciarMenu } = require('./menu.js');


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
            iniciarMenu(rl);
            return;
        }
        console.log(`Backup realizado com sucesso: ${stout}`);
        iniciarMenu(rl);
    });
};

module.exports = {
    fazerBackup
=======
'use strict';

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const db = require('./database.js');
const rl = require('../readline.js');
const { iniciarMenu } = require('./menu.js');


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
            iniciarMenu(rl);
            return;
        }
        console.log(`Backup realizado com sucesso: ${stout}`);
        iniciarMenu(rl);
    });
};

module.exports = {
    fazerBackup
>>>>>>> 078bcaafbf8376fbc5a25223578a56ed6a67a8f8:src/backup/backup.js
}