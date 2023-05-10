const express = require('express');
const fs = require('fs');
const path = './backend/';
const cors = require('cors');
const app = express();
const port = 3003;
const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET","PUT","POST"]
};
app.use(cors(corsOptions));
app.use(express.raw({ type: 'application/json' })); 
function saveToFile(file,data){
  const fileDescriptor = fs.openSync(file, 'w');
  fs.writeSync(fileDescriptor,  data);
  fs.fsyncSync(fileDescriptor);
  fs.closeSync(fileDescriptor);
}
app.get('/', (request,response)=>{
  const jsonData = fs.readFileSync(path+request.headers['x-filename'],'utf8');
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
app.post("/", (request, response) => {
  console.log(request.body);
  saveToFile(request.headers['x-filename'],request.body.toString());
  response.json("Vielen Dank!");
});
app.listen(port, () => console.log(`Server läuft auf ${port}`));

