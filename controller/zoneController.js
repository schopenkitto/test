'use strict'

var fs = require('fs');
var xml2js = require('xml2js');

var zoneModel = require('../models/zoneModel');
var deviceModel = require('../models/deviceModel');
var measdataModel = require('../models/measdataModel');


var devices = [];
var zones = [];

function createDevice(deviceObj) {
    return deviceModel.findOne({ deviceId: deviceObj.id[0], 
        deviceType: deviceObj.ident[0]
    }).then(function(device){
        if(device == null){
            device = new deviceModel({
                deviceId: deviceObj.id[0],
                deviceType: deviceObj.ident[0],
                comment: deviceObj.comment[0],
                zone: this
            });
        }
        else{
            device.comment = deviceObj.comment[0];
        }
        return device.save();
    }); 
}

function createZone(zoneObj){
    return zoneModel.findOne({ zoneId: zoneObj.id })
    .then(function(zone){
        if(zone == null){
            zone = new zoneModel({
                zoneId: zoneObj.id,
                zoneType: zoneObj.type,
                comment: zoneObj.comment
            });
        }
        else{
            zone.zoneType = zoneObj.type,
            zone.comment = zoneObj.comment
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
