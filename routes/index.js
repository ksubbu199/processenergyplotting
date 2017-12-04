var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});
router.get('/plot', function(req, res, next) {
  var data = require("../data.json");
  var regionNo=req.query.region;
//  outJSON= [ {team: "TeamA",name: "Ahmed",field3:"val3"}, {team: "TeamB",name: "Ahmed",field3:"val43"}, {team: "TeamA",name: "Ahmed",field3:"val55"} ]

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

var groubedByRegion=groupBy(data, 'RegionID');
var region12=groubedByRegion[String(regionNo)];
var yodata=[];


function getRandomColor() {
           var letters = '0123456789ABCDEF'.split('');
           var color = '#';
           for (var i = 0; i < 6; i++ ) {
               color += letters[Math.floor(Math.random() * 16)];
           }
           return color;
        }
for(var i=0;i<region12.length;i++)
{
  var proc ='Process '+i;
  var atemp=[];
  var temp={};
  var ftemp={
    label: [proc],
    backgroundColor: getRandomColor(),
    //hoverBackgroundColor: "#000000",
    //hoverBorderColor: "#9966FF",
    //hoverBorderWidth: 5,
    //hoverRadius: 5
  };
  temp.x=region12[i].ProcNo;
  temp.y=region12[i].Energy;
  temp.r=30//region12[i].Energy;
  atemp.push(temp);
  ftemp.data=atemp;

  yodata.push(ftemp);
}

//console.log(yodata);

// var popData = {
//   datasets: [{
//     label: ['Deer Population'],
//     data:data,
//     backgroundColor: "#9966FF",
//     hoverBackgroundColor: "#000000",
//     hoverBorderColor: "#9966FF",
//     hoverBorderWidth: 5,
//     hoverRadius: 5
//   }]
// };
var popData=yodata;
var popDataString=JSON.stringify(popData);

//console.log(groubedByRegion['12']);

  res.render('index', { title: 'Express' ,popData:popDataString});
});



module.exports = router;
