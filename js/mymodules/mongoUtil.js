var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var url ="mongodb://thousand0001:mm570129@ds153730.mlab.com:53730/heroku_tmgjg46t";
var bindings = mongoose.model("bindings",{
	"eId":String,
	"lId":String,
	"creatTime":{type:Date, default:Date.now}
});
var equips = mongoose.model("equips",{
	"eId":String,
	"password":String,
	"creatTime":{type:Date, default:Date.now}
});
module.exports = {
	connectToServer: function(callback) {
		//		mongoose.Promise = global.Promise;
		mongoose.connect(url);
		var db = mongoose.connection;
		db.on("error", console.error.bind(console, "connection error:"));
		db.once("open", function() {
			console.log("We're connected to mongodb! ");
		});
	},
	getBindings: function(){
		return bindings;
	},
	getEquips: function(){
		return equips;
	},
	getDb: function(){
		return mongoose.connection;
	},
	disconnect:function(callback){
		mongoose.disconnect(function(){
			console.log('mongodb disconnect');
		});
	},
	addBinding: function(eId,lId,event){
		// console.log('設備編號：'+eId);
		var newBinding = new  bindings;
		newBinding.eId =eId;
		newBinding.lId = lId;
		newBinding.save(function bindutilt (err){
			if (err) {
				console.log('newBinding err');
			} else {
				console.log((newBinding.eId)+" 綁定成功");
				console.log(newBinding._id);
				// event.reply('成功綁定設備編號：'+newBinding.eId)
				// bot.push(userIdPush123,'設備編號：'+newBinding.eId.toString()+" 綁定成功");
				event.reply('設備編號：'+newBinding.eId+'綁定成功');

			}
			newBinding = null;
			delete newBinding;
			// mongoUtil.disconnect();
		})
	},
	removeBinding: function(lId){
		// var newBinding = new  bindings;
		console.log('remove lId');
		bindings.find({"lId":lId},function(err, results){
		// ewBinding.find({"lId":lId},function(err,results){
			console.log(results.length);
		})
		bindings.remove({"lId":lId},function(err){
			if(err){
				console.log("退出後刪除資料失敗,lId："+lId);
				return;
			}
			console.log(lId+"退出後刪除資料完成");
		});

	},
	removeBinding1: function(lId){
		var newBinding = new  bindings;
		console.log('remove lId');
		bindings.remove({"lId":lId},function(err){
			if(err){
				console.log("退出後刪除資料失敗,lId："+lId);
				return;
			}
			console.log(lId+"退出後刪除資料完成");
		});

	}
}
