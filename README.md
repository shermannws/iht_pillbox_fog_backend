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
This repository contains code for interaction with a local PostgreSQL server and code involved to mock data into the local database.

## Directory Description
1. `db/scripts`: Contains the pgsql commands to recreate DB tables
2. `index.js`: Entry point to start the backend server
3. `mock_runner.js`: Script to mock result into local DB
4. `pgsql.js`: Code that contains instantiation of pg pool instances
5. `*Model.js`: Models for the respective tables

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
```
2. Install all dependencies
```bash
npm install
```
3. Start the express server by running
```bash
node index.js
```

