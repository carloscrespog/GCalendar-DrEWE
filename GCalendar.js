
var config = require('./config');
var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;
var http = require('http');
var querystring = require('querystring');
var async=require('async');

function calendarToGSN(err,data){
	
	var items=data.items;

	async.eachSeries(items,function(item,callback){
		var xml=createXML(item);
		putToGSN(xml,callback);
	},function(err){

	});
	
}

function createXML(data){
	var now=new Date();
	var string='<stream-element timestamp="'
	var month=1+now.getMonth();
	string+=now.getFullYear()+'-'+month +'-'+now.getDate()+' ';
	string+=now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+' CEST">';

	string+='<field name="title" type="string">';
	string+=data.summary;
	string+='</field>';

	string+='<field name="attendees" type="string">';
	for (var j in data.attendees){
		string+=data.attendees[j].email;
		if(j<(data.attendees.length-1)){
			string+='#';
		}
	}
	string+='</field>';

	string+='<field name="start" type="string">';
	string+=data.start.dateTime.split('T')[0]+' '+data.start.dateTime.split('T')[1];
	string+='</field>';

	string+='</stream-element>';

	return string;
}

function putToGSN(xmlData,callback){

	var data=querystring.stringify({
		data: xmlData,
		'notification-id': '1.4'
	});
	var options = {

		port: 22001,
		path: '/streaming',
		method: 'PUT',
		headers: {'Content-Type':'application/x-www-form-urlencoded',
		'Content-Length':data.length},

	};

	
	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		
		res.setEncoding('utf8');
		
	});
	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	req.on('socket', function (socket) {

		socket.setTimeout(2000);  
		socket.on('timeout', function() {
			req.abort();
			callback();
		});
	});
	
	req.write(data);
	req.end();

	
	
}

function getEvents(){
	googleapis
	.discover('calendar', 'v3')
	.execute(function(err, client) {

		var oauth2Client =
		new OAuth2Client(config.consumer_key, config.consumer_secret, config.redirect_url);
		oauth2Client.credentials = {
			access_token: config.access_token,
			refresh_token: config.refresh_token
		};
		



		client.calendar.events.list({calendarId:config.calendarId}).withAuthClient(oauth2Client).execute(calendarToGSN);
		console.log('events retrieved');
	});
}
 getEvents();
setInterval(getEvents,300000);


