import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const certificatePath = resolve(__dirname, '../../http_ca.crt');

export const ElasticsearchConfig = {
  node: process.env.ELASTICSEARCH_URL || 'https://127.0.0.1:9200',
  auth: {
    username: 'elastic', // Replace with your Elasticsearch username (if applicable)
    password: 'uW0jF1K9Evlwn*SKgCqW', // Replace with your office mac Elasticsearch password (if applicable)
    // password: 'TTddLihlgBhdA7OPqjdN', // Replace with your home laptop Elasticsearch password (if applicable)
    // password: 'aIcRYybndN-7Mce3D4=E', // production password
  },
  tls: {
    ca: readFileSync(certificatePath),
    rejectUnauthorized: false,
  },
  log: 'info',
  maxRetries: 5,
  requestTimeout: 60000,
};
