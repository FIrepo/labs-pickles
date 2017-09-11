const
    _ = require('lodash'),
    fs = require('fs-extra'),
    path = require('path'),
    request = require('supertest');

function getDatabasePath() {
    return path.join(__dirname, '..', 'db', `database_${process.env.NODE_ENV || 'development'}.json`)
}

async function start() {
    await fs.writeFileSync(getDatabasePath(), JSON.stringify({"drivers":{"index":0,"table":[]}}, null, 4), 'utf-8');
}

start();