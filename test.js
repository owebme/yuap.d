var config = require('./libs/config');
var log = require('./libs/log')(module);
var db = require('./libs/db/mongoose')(log, config);
var ObjectId = require('mongodb').ObjectID;
var tempus = require('tempusjs');

var fs = require('fs');
var ttf2woff2 = require('ttf2woff2');

var input = fs.readFileSync('avenir-roman.ttf');

fs.writeFileSync('avenir-roman.woff2', ttf2woff2(input));

// db.collection('data').update(
// {
//     "_id": ObjectId("57a412750278a4fa53949733")
// },
// {
//     $set: {
//         "new": false
//     }
// }, function(err, data){
//     if (!data) {
//         console.dir(err);
//     }
//     if (!err) {
//         console.dir(data.result);
//     }
// });

// var date = function(){
//     return tempus({year: 2013, month: 1, day: 1}).format('%Y-%m-%d %H:%M');
// }
//
// console.dir(date());
