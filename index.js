const express = require("express");
const bodyParser = require("body-parser");
const clientesController = require("./clientes/ClientesController");
//const connection = require("./database/database");
const app = express();


//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
// connection
//     .authenticate()
//     .then(()=>{
//         console.log("Conexão feita com sucesso!!");
//     }).catch((error)=>{
//         console.log(error);
//     });


app.use("/", clientesController);


app.listen(8080, ()=>{
    console.log("Servidor está rodando!!");
});