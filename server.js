const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5500",
};

app.use(cors(corsOptions));
app.use(bodyParser.json);
app.post("/", (request, response) => {
  app.saveToFile('./my.json', request.body);
  response.send("Done")
});

function saveToFile(file,data){
  // Datei öffnen zum Schreiben/Hinzufügen
  const fileDescriptor = fs.openSync(file, 'a');
  fs.writeSync(fileDescriptor,  data);
  // Übertragung der Änderungen in die Datei
  fs.fsyncSync(fileDescriptor);
  // Datei schließen
  fs.closeSync(fileDescriptor)
}
function readFromFile(file){
  response = fs.readFileSync(file);
}
app.listen(port, () => console.info("Server läuft!"));
app.saveToFile("./my.json");