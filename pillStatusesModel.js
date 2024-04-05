const pgsql = require('./pgsql')

const pool = pgsql.createNewPool();

//get all merchants our database
const getEntries = async (patientId) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM pillstatuses WHERE patientId = $1", [patientId], (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(results.rows);
        } else {
          reject(new Error("No results found"));
        }
      });
    });
  } catch (error_1) {
    console.error(error_1);
    throw new Error("Internal server error");
  }
};

//create a new merchant record in the databsse
const createEntry = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      patientId,
      medicationId,
      medicationType,
      administeredTime
    } = body;
    pool.query(
      "INSERT INTO pillstatuses (patientId, medicationId, medicationType, administeredTime) VALUES ($1, $2, $3, $4) RETURNING *",
      [patientId, medicationId, medicationType, administeredTime],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new entry has been created in pillStatuses table: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

//update an entry
const updateEntry = (patientId, medicationId, body) => {
  return new Promise(function (resolve, reject) {
    const { consumedTime } = body;
    pool.query(
      "UPDATE pillstatuses SET consumedTime = $1 WHERE patientId = $2 AND medicationId = $3 RETURNING *",
      [consumedTime, patientId, medicationId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(`Medication entry updated: ${JSON.stringify(results.rows[0])}`);
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
};

module.exports = {
  getEntries,
  createEntry,
  updateEntry
};