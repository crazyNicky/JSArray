const express = require('express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const app = express();
const path = './backend/';
const port = 3003;
const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET","PUT","POST"]
};
function saveToFile(file,data){
  const fileDescriptor = fs.openSync(file, 'w');
  fs.writeSync(fileDescriptor,  data);
  fs.fsyncSync(fileDescriptor);
  fs.closeSync(fileDescriptor);
}
app.use(cors(corsOptions));
app.use(express.raw({ type: 'application/json'})); 
app.get('/', (request,response)=>{
  const jsonData = fs.readFileSync(path+request.headers['x-filename']);
  response.send(jsonData);
});
app.put('/', (request, response) => {
  try {
    saveToFile(path+request.headers['x-filename'], request.body.toString());
    response.sendStatus(200)
  } catch (error) {
    console.log(error);
    response.sendStatus(error);
  }
});
app.post("/", multer().none(), (request, response) => {
  const readData = fs.readFileSync(path+'input.json');
  const array = JSON.parse(readData);
  array.push(request.body);
  const writeData = JSON.stringify(array);
  saveToFile(path+'input.json', writeData);
  response.json("Vielen Dank!");
});
app.listen(port, () => console.log(`Server läuft auf ${port}`));

