const pgsql = require('./pgsql')

const pool = pgsql.createNewPool();

//get all merchants our database
const getPrescription = async (patientId) => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM pill_list as pl\
      LEFT JOIN pill_prescription AS pp\
      ON pp.pill_id = pl.id\
      WHERE pl.deleted = FALSE AND pp.patient_id = $1", [patientId],(error, results) => {
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

module.exports = {
  getPrescription
};