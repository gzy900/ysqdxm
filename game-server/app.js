var {msgServer, wsPool} = require("./msgServer")
var msgSer = new msgServer();


var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8080});


var gameManage = require('./gameServerUse')
var gameMan = new gameManage();


msgSer.init(); //消息队列先初始化

var dataManage = require("./dataManager");
var dataMana = new dataManage(msgSer, gameMan);

wss.on('connection', function (ws) {
    msgSer.putws(ws)

    ws.on('message', function (message) {

        // wsPool.values().forEach(function (ws, index) {
        //     ws.send(JSON.stringify(reMsg));
        // });

        var msg = JSON.parse(message.toString());
        console.log(msg)
    });

    ws.on('close', function (message) {
        console.log('连接关闭')
        let keys = msgSer.getKeys(ws);
        dataMana.closeConnect(keys);
        // 连接关闭时，将其移出连接池
        msgSer.delectWs(ws);
        console.log("close the ws", message);
    });
});



