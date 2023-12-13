/* CLASE 6 - SERVIDORES WEB */

//Temas de hoy: 

//  1)¿Que es un servidor?
//  2)Protocolo HTTP. 
//  3)Modulo nativo HTTP. 
//  4)Express JS.
//  5)Objeto request.
//  6) Desafio n°3. 

////////////////////////////////////////////////////////////

//1) Servidor: software o hardware que almacena y administra recursos web. Como imágenes, archivos, sitios web, videos, datos. Su función es responder a las peticiones de los clientes. Y recordemos que un servidor puede escuchar peticiones de varios clientes en simultaneo. 

//2) HTTP: Es un protocolo de comunicación, es decir un conjunto de reglas que definen como se comunican dos o mas dispositivos. 

//cliente = peticiones = request = req
//servidor = respuestas = response = res

//Instalamos NODEMON: 
//Si lo quieren instalar de forma local como una dependencia de desarrollo : npm install nodemon -D
//Nodemon nos permite reiniciar automáticamente el servidor cuando detecta que hay cambios en el código. 

//3) Modulo Nativo HTTP: es un modulo que viene por defecto en NOde JS. Y nos permite crear un servidor web y enviar información a traves del protocolo HTTP. 

//Primer pasito, lo tenemos que importar: 
/*
const http = require("http");

//Segundo pasito, vamos a crear el servidor: 

const server = http.createServer((request, response) => {
    response.end("Mi primera chamba!");
    //Este método del objeto response me permite enviar una respuesta al cliente. 
});
*/
//Tercer pasito: vamos a poner a escuchar a nuestro server en un puerto. 

const PUERTO = 8080;
/*
server.listen(PUERTO, ()=> {
    //console.log(`El servidor esta escuchando en el puerto ${PUERTO}`);
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})
*/
//Express JS: es un framework minimalista de Node JS que nos permite crear servidores web de una manera mucho más sencilla. 

//Instalamos con el siguiente comando: npm install express

//Importamos el modulo: 

const express = require("express");

//Creamos una app: 

const app = express();

//Crear nuestra ruta: 

app.get("/", (req, res) => {
    //Cuando utilizo "/" estoy haciendo referencia a la ruta raíz de mi aplicación. 
    res.send("Mi primera chamba, pero con Express");
})

//Ponemos a escuchar nuestro servidor: 

app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})

//Practicamos con más rutas: (endpoints)

app.get('/tienda', (req, res)=> {
    res.send("Bienvenido a la tienda");
})


app.get('/contacto', (req, res)=> {
    res.send("Bienvenidos a contacto");
})

//5) Objeto Request: es un objeto que representa la petición que realiza el cliente. 

const misProductos = [
    {id:1, nombre:"Fideos", precio: 150},
    {id:2, nombre:"Arroz", precio: 200},
    {id:3, nombre:"Aceite", precio: 900},
    {id:4, nombre:"Coca Cola", precio: 500},
    {id:5, nombre:"Pan", precio: 300},
]

//req.params

app.get("/productos/:id", (req, res) => {
    //res.send(misProductos);
    let id = req.params.id;
    //Recuerde que la info viene en string. 

    const producto = misProductos.find(item => item.id == id );

    if(producto) {
        res.send(producto);
    }else{
        res.send("Producto no encontrado");
    }
})

//req.query: query se refiere a las multiples consutlas que se pueden realizar en determinado endpoint. 

//Atentos: si queremos trabajar con datos complejos se recomienda usar la linea: 

app.use(express.urlencoded({extended:true})); 


//Ejemplo: 

app.get('/clientes', (req, res)=> {
    //let nombre = req.query.nombre;
    //let apellido = req.query.apellido; 

    let {nombre, apellido} = req.query; 

    res.send(`Bienvenido ${nombre} ${apellido}`);

})

//Ejemplo para el desafio n°3: 

//Para el limite voy a trabajar con query: 

app.get("/product", (req, res)=> {
    let limit = parseInt(req.query.limit);

    const productos = misProductos.slice(0, limit);
    res.send(productos);
})



//Consejito para el desafio: no se olviden de importar el product manager: 

const ProductManger = require("./product-manager.js");

const manager = new ProductManger("./productos.json"); 