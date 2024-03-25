const pgsql = require('./pgsql')

const pool = pgsql.createNewPool();

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

Date.prototype.addMinutes = function(m) {
  this.setTime(this.getTime() + (m*60*1000));
  return this;
}

//create a new merchant record in the databsse
const createEntry = async (n) => {
  const patientId = 4;
  let medicationId = 1;
  let medicationTypeId = 0;

  let numHoursToAdd = 0;

  for (let i = 0; i < n; i++) {
    let mockAdministeredTime = new Date().addHours(numHoursToAdd);
    let mockConsumedTime = new Date().addHours(numHoursToAdd).addMinutes(2).addMinutes(Math.random()*30);
    if (medicationTypeId%2 == 1) {
      mockConsumedTime.addMinutes(30).addMinutes(Math.random()*50);
    }
    const medicationType = medicationTypeId%2 == 0 ? "before" : "after";
    await pool.query(
      "INSERT INTO pillstatuses (patientId, medicationId, medicationType, administeredTime, consumedTime) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [patientId, medicationId, medicationType, mockAdministeredTime, mockConsumedTime]
    );

    if (medicationTypeId%2==1) {
      numHoursToAdd = numHoursToAdd + 8;
    }
    medicationTypeId++;
    medicationId++;
  }
};

createEntry(10);