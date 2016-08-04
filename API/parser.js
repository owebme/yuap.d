var libs = process.cwd() + '/libs/';
var config = require(libs + 'config');
var express = require('express');
var request = require('request');
var validator = require('validator');
var fs = require('fs');
var to_json = require('xmljson').to_json;
var utils = require(libs + 'utils');
var mongoose = require('mongoose');
var app = express.Router();

var db = mongoose.connection;

//http://weather.yandex.ru/static/cities.xml
//http://export.yandex.ru/weather-ng/forecasts/27612.xml

app.get('/weather', function(req, res) {
	// request('http://export.yandex.ru/weather-ng/forecasts/27612.xml', function (error, response, body) {
		// if (!error && response.statusCode == 200) {
			// return res.send(body);
		// }
	// })
	fs.readFile('./weather.xml', function(err, xml) {
		to_json(xml, function (error, data) {
			if (!error){	
			
				var weather = {
					now: {},
					days: []
				};
			
				weather.now = {
					temp: data.forecast.fact.temperature._,
					day: data.forecast.day["0"].day_part["4"]["temperature-data"].avg._, 
					night: data.forecast.day["0"].day_part["5"]["temperature-data"].avg._,
					code: data.forecast.fact.weather_condition.$.code, 
					type: data.forecast.fact.weather_type,
					humidity: data.forecast.fact.humidity,
					pressure: data.forecast.fact.pressure._,
					date: validator.toDate(data.forecast.fact.uptime)
				}		
				
				for (var i=0; i < 5; i++){
					weather.days.push({
						day: data.forecast.day[i].day_part["4"]["temperature-data"].avg._, 
						night: data.forecast.day[i].day_part["5"]["temperature-data"].avg._,
						code: data.forecast.day[i].day_part["4"].weather_condition.$.code, 
						type: data.forecast.day[i].day_part["4"].weather_type, 
						humidity: data.forecast.day[i].day_part["4"].humidity, 
						pressure: data.forecast.day[i].day_part["4"].pressure._,
						date: validator.toDate(data.forecast.day[i].$.date)
					});
				}				
				db.collection('weather').drop();
				db.collection('weather').insert(weather);
				
				return res.send(data.forecast.fact);
			}
		});
	});
	
});

app.get('/currency', function(req, res) {
	request.get({
	    uri: config.get('parser:currency:url'),
		encoding: 'binary'
	},
	function(error, response, xml){
		if (!error && response.statusCode == 200) {
			
			xml = utils.convert(xml, 'win1251', 'utf8');
			
			to_json(xml, function (error, data) {
				if (!error){
				
					var currency = [],
						date = data.ValCurs.$.Date,
						valuta = config.get('parser:currency:valuta');
				
					for (var i=0; i < 100; i++){
						if (data.ValCurs.Valute[i] && valuta.indexOf(data.ValCurs.Valute[i].CharCode) > -1){
							var value = String(data.ValCurs.Valute[i].Value).replace(/,/g, '.');
							currency.push({
								code: data.ValCurs.Valute[i].CharCode, 
								title: data.ValCurs.Valute[i].Name,
								value: parseFloat(value).toFixed(3),
								date: date
							});
						}
					}
					
					db.collection('currency').drop();
					db.collection('currency').insert(currency);
					
					return res.send(JSON.stringify(data));
				}
			});
		}
	});
});

module.exports = app;
