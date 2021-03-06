const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const bodyParser = require('body-parser');

const NLP = require('./nlp');
const Utils = require('./utils');


var nlp = new NLP();
var utils = new Utils();

nlp.test();


app.use(bodyParser.json()); // support json encoded bodies
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

app.use(express.static('client'));

app.get('/', function (req, res) {

    res.sendfile('./client/index.html');

});


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/draw', (req, res) => {
    var command = req.body.command;
    utils.drawCircle(command);  
    res.send('success')
    
});

app.post('/nlp', (req, res) => {


    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    var responseData = nlp.run(geo)
    console.log(">>>> " + responseData);
    //    console.log({
    //        user_id:user_id,
    //        token:token,
    //        geo:geo
    //    });
    //    res.send('Hello World!')

    responseData.then(function (data) {
        console.log(data);

        var arrData = data.split(',');
        var resultObj = {};
        for (d in arrData) {
            console.log(d);
            var pair = arrData[d].split(':');
            var key = pair[0];
            var value = pair[1];
            resultObj[key] = value;
        }
        
        //
        
        if(resultObj['shape'] == 'Circle'){
            utils.drawCircle();   
        }else{
            console.log("OTHER SHAPE DA!");
        }
        
        res.send(resultObj)
    })



})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
