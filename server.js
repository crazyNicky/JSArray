const express = require('express');
const fs = require('fs');
const path = './src/';
const cors = require('cors');
const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5500",
  methods: ["GET","PUT"]
};
app.use(cors(corsOptions));
app.use(express.raw({ type: 'application/json' })); 
function saveToFile(file,data){
  const fileDescriptor = fs.openSync(file, 'w');
  fs.writeSync(fileDescriptor,  data);
  fs.fsyncSync(fileDescriptor);
  fs.closeSync(fileDescriptor);
}
app.get('/src', (request,response)=>{
  const jsonData = fs.readFileSync(path+request.headers['x-filename'],'utf8');
  response.send(jsonData);
});
app.put('/src', (request, response) => {
  try {
    saveToFile(path+request.headers['x-filename'], request.body.toString());
    response.sendStatus(200)
  } catch (error) {
    console.log(error);
    response.sendStatus(error);
  }
});
app.listen(port, () => console.log(`Server läuft auf ${port}`));

