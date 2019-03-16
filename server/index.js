const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const NLP = require('./nlp');


var nlp = new NLP();

nlp.test();


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('client'));

app.get('/', function (req, res) {

    res.sendfile('./client/index.html');

});


app.get('/', (req, res) => res.send('Hello World!'))


app.post('/nlp', (req, res) => {
    
    
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;
    
    var responseData = nlp.run(geo)
    console.log(">>>> "+responseData);
//    console.log({
//        user_id:user_id,
//        token:token,
//        geo:geo
//    });
//    res.send('Hello World!')
    
    responseData.then(function(data){
        console.log(data);
        res.send(data)
    })
    


})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))