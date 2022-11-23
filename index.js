const fs = require('fs');
const http = require('http');
const cors = require('cors');
const https = require('https');
const express = require('express');

const prjct = 'redirect-test';

const config = require('./config');

const app = express();

// Certificate
const privateKey = config.env === 'production' ? fs.readFileSync('/etc/letsencrypt/live/esanttests.com/privkey.pem', 'utf8') : '';
const certificate = config.env === 'production' ? fs.readFileSync('/etc/letsencrypt/live/esanttests.com/cert.pem', 'utf8') : '';;
const ca = config.env === 'production' ? fs.readFileSync('/etc/letsencrypt/live/esanttests.com/chain.pem', 'utf8') : '';
const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
};

app.use(cors());

app.get('/', function (req, res) {
  res.redirect(301, 'https://www.esanttests.com/cws/new-ui/?CSESSID=1234567890')
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(config.host.httpServerPort, () => {
  console.log(prjct, ` http on port ${config.host.httpServerPort}`);
})

httpsServer.listen(config.host.httpsServerPort, () => {
  console.log(prjct, ` https listening on port ${config.host.httpsServerPort}`);
});
