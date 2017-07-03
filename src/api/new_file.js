
//加入购物车的接口
//参数：username、gid、qty:不传默认为1
//首次点击会把商品gid和qty=1存进数据库
//多次点击加入购物车，qty会增加，并存进数据库
app.get('/addBuyCar', function(req, res) {
	//  解决跨域
	res.append("Access-Control-Allow-Origin", "*")
	createConnection()
	connection.connect();

	var gid = req.query.gid;
	var username = req.query.username;
	var qty = req.query.qty ? req.query.qty : 1;
	var newGood = {
		"gid": gid * 1,
		"qty": qty * 1
	}
	connection.query(`SELECT buycarMessage FROM register where username = '${username}'`, function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		//		把字符串变为数组在操作
		//		console.log(JSON.parse(results[0].buycarMessage));
		var goodsArr = results[0].buycarMessage ? JSON.parse(results[0].buycarMessage) : [];
		var temp = true;
		goodsArr.forEach(function(items) {
			//判断原本没有该商品才添加gid进去数组			
			if(gid == items.gid) {
				items.qty++
					temp = false;
			}
		})

		if(temp) {
			goodsArr.push(newGood)
		}
		//把数据整理，返回到前端
		console.log(goodsArr)
		if(gid){
			connection.query(`update register set buycarMessage='${JSON.stringify(goodsArr)}' where username = '${username}'`, function(error, results, fields) {
				if(error) throw error;
				//results =>array类型
				//			console.log('The solution is: ', results);
				//把数据整理，返回到前端
				console.log(results)
				console.log(error)
				console.log(fields)
				// var obj = {
				// 	news: results,
				// 	status: true
				// }
				res.send(JSON.stringify(goodsArr));
				// connection.end();
			})
			
		}else{
			res.send(JSON.stringify(goodsArr));
		}

	});

})