const pgsql = require('./pgsql')

const pool = pgsql.createNewPool();

const getActivePills = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM pill_list WHERE deleted = FALSE", (error, results) => {
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

const addNewPill = async (name, weight) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "INSERT INTO pill_list (name, weight, deleted) VALUES ($1, $2, false) RETURNING *",
      [name, weight],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `A new entry has been created in pill_list table: ${JSON.stringify(results.rows[0])}`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
}

const deletePill = async (name) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM pill_list WHERE name = $1",
      [name],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows) {
          resolve(
            `Entry has been deleted from pill_list table`
          );
        } else {
          reject(new Error("No results found"));
        }
      }
    );
  });
}


module.exports = {
  getActivePills,
  addNewPill,
  deletePill
};