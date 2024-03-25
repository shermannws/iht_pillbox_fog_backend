// importing required modules
const { execSync } = require("child_process");
const compress = require('gzipme');
const fs = require('fs');
const axios = require('axios');
const formData = require('form-data');
require('dotenv').config()

// getting db connection parameters from environment file
const username = process.env.DB_USERNAME;
const database = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

// defining backup file name
const date = new Date();
const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
const backupFile= `pg-backup-${today}.tar`;

// writing postgresql backup function
const takePGBackup = async () => {
  try {
    execSync(`pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${backupFile} -F t -d ${database}`);
    console.log("done dumping");
  } catch (error) {
    console.error(`Error executing pg_dump: ${error}`);
    return;
  }

  await compress(backupFile);
  fs.unlinkSync(backupFile);
  console.log("Zipped backup created");
}

// uploading to google cloud

// Function to upload file to Google Cloud Storage using Axios
async function uploadFileToGCS(objectLocation, authToken, contentType, bucketName, objectName) {
    try {
        const url = `https://storage.googleapis.com/upload/storage/v1/b/${bucketName}/o?uploadType=media&name=${objectName}`;
        const fileData = fs.readFileSync(objectLocation);
        const response = await axios.post(url, fileData, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': contentType
            }
        });
        console.log('File uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

// Usage example
const objectLocation = backupFile +".gz";
const authToken = process.env.GOOGLE_AUTH_TOKEN;
const contentType = 'application/octet-stream';
const bucketName = process.env.GOOGLE_BUCKET_NAME;
const objectName = backupFile;


// calling postgresql backup function
takePGBackup();

// calling upload function
uploadFileToGCS(objectLocation, authToken, contentType, bucketName, objectName);