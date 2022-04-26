const express = require("express");
const app = express();
const cors = require("cors");

const ObjectId = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const RequestLogger = require("./Logs/Logger");
require("dotenv").config({ path: ".env" });
app.use(cors());
''
app.use(bodyParser());
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb+srv://admin:polpik11@kai2.sc90x.mongodb.net/webstore?retryWrites=true&w=majority'
, (err, client) => {
db = client.db('webstore')
}) 
// get the collection name
app.param('collectionName'
, (req, res, next, collectionName) => {
req.collection = db.collection(collectionName)
 console.log('collection name:'
, req.collection)
return next()
})
app.post('/collection/:collectionName',function(req,res){
  
  res.send("received post");
});




app.get('/'
, function (req, res) {
res.send('Select a collection, e.g., /collection/messages')
})
// retrieve all the objects from an collection
app.get('/collection/:collectionName'
, (req, res) => {
req.collection.find({}).toArray((e, results) => {
if (e) return next(e)
res.send(results)
})
})




app.delete('/collection/:collectionName/:id'
, (req, res, next) => {
req.collection.deleteOne(
{_id: ObjectID(req.params.id)},
(e, result) => {
if (e) return next(e)
res.send((result.result.n === 1) ? {msg: 'success'} : {msg: 'error'})
})
})










app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, OPTIONS,DELETE"
  ); //allowable methods
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
// body-parser extract the entire body portion of an incoming request stream and
// exposes it on req. body . The middleware was a part of Express. js
// earlier but now you have to install it separately
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const client = new MongoClient(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//Logs in console every request from client side
//Request Logger is exported from Logs folder all detail is over there related to logs
app.use(RequestLogger);
client.connect((err, db) => {
  if (err) console.log("Error While connection", err);
  console.log("Connection Successfully");
 
});

app.all("*", (request, response, next) => {
  request.client = client;
  request.ObjectId = ObjectId;
  next();
});

app.delete('/collection/:collectionName/:id'
, (req, res, next) => {
req.collection.deleteOne(
{ _id: ObjectID(req.params.id) },
(e, result) => {
if (e) return next(e)
res.send((result.result.n === 1) ?
{msg: 'success'} : {msg: 'error'})
})
})


app.post('/post-data', function(request, response){
  // get data and write to the file here
})
app.listen(3000, () => console.log('Server is running'));