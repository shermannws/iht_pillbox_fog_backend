const express = require('express')
const app = express()
const port = 3002

const pill_status_model = require('./pillStatusesModel')
const pill_list_model = require('./pillListModel')
const pill_prescription_model = require('./pillPrescriptionModel')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/pillStatuses/patient/:patientId', (req, res) => {
  console.log("GET activated");
  const patientId = req.params.patientId;
  pill_status_model.getEntries(patientId)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/pillStatus', (req, res) => {
  console.log("POST activated\n\t");
  console.log(req.body);
  pill_status_model.createEntry(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put("/pillStatus/patient/:patientId/medication/:medicationId", (req, res) => {
  console.log("PUT activated\n\t");
  console.log(req.params.patientId, req.params.medicationId, req.body);
  const patientId = req.params.patientId;
  const medicationId = req.params.medicationId;
  const body = req.body;
  pill_status_model
    .updateEntry(patientId, medicationId, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/pill-list', (req, res) => {
  console.log("GET pill-list activated");
  pill_list_model.getActivePills()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/pill', (req, res) => {
  console.log("POST pill to pill-list activated");
  const {
    name,
    weight
  } = req.body;
  pill_list_model.addNewPill(name, weight)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/pill', (req, res) => {
  console.log("DELETE pill of pill-list activated");
  const {
    name
  } = req.body;
  pill_list_model.deletePill(name)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/prescription/patient/:patientId', (req, res) => {
  console.log("GET prescription activated");
  const patientId = req.params.patientId;
  pill_prescription_model.getPrescription(patientId)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})