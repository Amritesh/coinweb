const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var bitcoin = require('./bitcoin');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

var router = express.Router();
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Use /createNew to get new randomAddress' });   
});

function createNew( lastIndex , onLoad ) {
    var initializePromise = bitcoin.getNewAddress();
    initializePromise.then(function(result) {
        onLoad(result);
    }, function(err) {
        onLoad(err);
    })
}

router.route('/createNew/:lastIndex').get(function(req, res) {
    createNew(req.params.lastIndex,function(data){
        res.json(data);
    });  
});

app.use('/', router);
const generateRandomAddressTrigger = functions.https.onRequest(app);
module.exports = {generateRandomAddressTrigger};