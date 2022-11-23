require('dotenv').config();

const env = process.env.ENV || 'production';
const privKey = env === 'production' ? 
'/etc/letsencrypt/live/esanttests.com/privkey.pem' : 
'';
const cert = env === 'production' ? 
'/etc/letsencrypt/live/esanttests.com/cert.pem' : 
'';
const ca = env === 'production' ? 
'/etc/letsencrypt/live/esanttests.com/chain.pem' :
'';

const host = {
  httpsServerPort: process.env.HTTPS_SERVER_PORT || 1901,
  httpServerPort: process.env.HTTP_SERVER_PORT || 4490
};

let config = {
  env,
  privKey,
  cert,
  ca,
  host
};

module.exports = config;
