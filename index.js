let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
let multer  = require('multer');
const upload = multer({ dest: 'uploads/' })

const pokemon = require('./routes/pokemon.js');

app.use('/pokemon', pokemon);


// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.query.first_name,
      last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/process_post', urlencodedParser, function (req, res) {
  // Prepare output in JSON format
  response = {
     first_name:req.body.first_name,
     last_name:req.body.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})

const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }])

app.post('/file_upload', cpUpload, function (req, res) {
  req.files.file.forEach(element => {
    let file = __dirname + "/" + element.originalname;
    console.log('file :', file);
    
    fs.readFile( element.path, function (err, data) {
       fs.writeFile(file, data, function (err) {
          if( err ) {
             console.log( err );
             res.end( JSON.stringify( err ) );
             } else {
                response = {
                   message:'File uploaded successfully',
                   filename:element.originalname
                };
                res.end( JSON.stringify( response ) );
             }
          
       });
    });
    
  });
})

// app.get('/pokemon/:id/:poke', (req, res) => {
//   const id = req.params.id;
//   const poke = req.params.poke;
//   res.send(`Vous avez demandé le pokémon n° ${id}} qui est ${poke}`)
// })

let server = app.listen(8081, function () {
   let host = server.address().address
   let port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})