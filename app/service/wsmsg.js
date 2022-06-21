'use strict';
var ws = require("ws");
var fs = require('fs');
const path = require('path')
var jsonFile = require('jsonfile')
const BaseService = require('./base');

class WSMsgService extends BaseService {

    /**
     * 根据条件获取ws数据
     * @returns 
     */
    async getWSMsg(params) {
        try { 
            var jsonData = jsonFile.readFileSync('./data/json.json');
            return { code: 200, msg: '', data: jsonData }; 
            
        } catch (err) {
            console.error(err);
            return { code: 500, msg: '获取数据发生异常', data: err };
        }
    }
    
    /**
     * 
     * @returns 提取保存数据到数据库
     */
    async saveWSMsg() {
        try {
            var sock = new ws("ws://machinestream.herokuapp.com/ws");
            sock.on("open", function () {
                console.log("connect success !!!!");
                //sock.send("open");
            });
            sock.on("message",function(data) {
                let value = data.toString();
                //let result=Json.Parse(data.toString());
                fs.writeFile('./data/json.json', value, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('写入成功!');
                })
            });
            return { code: 200, msg: '', data: "" }; 
            // sock.on("error", function(err) {
            //     console.log("error: ", err);
            // });
            // sock.on("close", function() {
            //     console.log("close");
            // });
        } catch (err) {
            console.error(err);
            return { code: 500, msg: '', data: err }; 
        }
    }
    async writeData(value) {
        
        return true;
    } 
}
module.exports = WSMsgService;
