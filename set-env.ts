const fs = require('fs');

const targetPath = './src/environments/environment.ts';

const colors = require('colors');
require('dotenv').config();

const envConfigFile = `
  export const environment = {
  production: '${process.env.PRODUCTION}',
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}'
  }
};
`;

console.log(colors.magenta('The file `environment.ts` will be written with: \n'));
console.log(colors.grey(envConfigFile));

fs.writeFile(targetPath, envConfigFile, err => {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(`Angular environment.ts file generated correctly at ${targetPath}. \n`)
    );
  }
});
