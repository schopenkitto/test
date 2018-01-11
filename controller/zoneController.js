'use strict'

var fs = require('fs');
var xml2js = require('xml2js');

var zoneModel = require('../models/zoneModel');
var deviceModel = require('../models/deviceModel');
var measdataModel = require('../models/measdataModel');


var devices = [];
var zones = [];

var currZone;

function createDevice(deviceJSON) {
    currZone = this;
    return deviceModel.findOne({ deviceId: deviceJSON.id[0], 
        deviceType: deviceJSON.ident[0],
        zone: currZone
    }).populate('zone')
    .then(function(device){
        if(device == null){
            device = new deviceModel({
                deviceId: deviceJSON.id[0],
                deviceType: deviceJSON.ident[0],
                comment: deviceJSON.comment[0],
                zone: currZone
            });
        }
        else{
            device.comment = deviceJSON.comment[0];
        }
        console.log(device.zone.zoneId);
        return device.save();
    }); 
}

function createZone(zoneJSON){
    return zoneModel.findOne({ zoneId: zoneJSON.id })
    .then(function(zone){
        if(zone == null){
            zone = new zoneModel({
                zoneId: zoneJSON.id,
                zoneType: zoneJSON.type,
                comment: zoneJSON.comment
            });
        }
        else{
            zone.zoneType = zoneJSON.type,
            zone.comment = zoneJSON.comment
        }
        return zone.save();
    });
}


function readDZAFile(path){
    return new Promise(function(resolve, reject){
        fs.readFile(path, 'utf-8', function (err, text) {
            if (err != null) {
                reject(err);
            }
            else{
                resolve(text)
            }
         });
    }).then(function(text){
        return new Promise(function(resolve, reject){
            var parser = new xml2js.Parser();
            parser.parseString(text, function(err, json){
                if(err != null){
                    reject(err);
                }
                else{
                    resolve(json);
                }
            })
        });
    });
}

function loadModel(json){
       return createZone(json['zone']['$'])
       .then(function(zone){
           var ds = json['zone']['device'];
           return Promise.all(ds.map(createDevice, zone));
       });
          
}
 
exports.index = function (req, res) {
    readDZAFile('./public/11111967.dza')
    .then(loadModel)
    .then(function(devices){
        res.render('index', { title: 'Express', devices: devices });
    })
    .catch(function(err){
        console.log(err);
    });

};
