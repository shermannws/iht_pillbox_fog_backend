# Fog Layer - Backend
## Author
Done by: Sherman Ng Wei Sheng

## Requirements
<u>Tested on the following hardware / software</u><br/>
Device: Windows 10, 64 bit<br/>
Node.JS Version: 18.4.0<br/>
npm Version: 8.12.1<br/>
PostgreSQL: 16<br/>

## Description
This repository contains code for interaction with a local PostgreSQL server and code involved to do back up to the Cloud.

## Directory Description
1. `backup/`: Contains the script to run backup to a Google Cloud Storage Instance
2. `db/scripts`: Contains the pgsql commands to recreate DB tables
3. `index.js`: Entry point to start the backend server
4. `mock_runner.js`: Script to mock result into local DB
5. `pgsql.js`: Code that contains instantiation of pg pool instances
6. `*Model.js`: Models for the respective tables

## How to Run
### DB setup
1. Create all necessary tables as found in `db_scripts/creation.txt`

### Start Express Server
1. Update the following environment variables in a `.env` file
```
DB_USERNAME=\<pgsql database username>
DB_DATABASE=\<pgsql database name>
DB_HOST=\<pgsql ip address / localhost>
DB_PORT=\<pgsql port number>
DB_PASSWORD=\<pgsql password>
GOOGLE_AUTH_TOKEN=\<google auth token to Google Cloud Storage>
GOOGLE_BUCKET_NAME=\<google cloud storage bucket name>
```
2. Install all dependencies
```bash
npm install
```
3. Start the express server by running
```bash
node index.js
```
4. Cron Job
- Arrange a cron job that would run `backup/backup.js` peridocially to store local database data into the cloud database. This is used for future extention to extend capability of cloud.

