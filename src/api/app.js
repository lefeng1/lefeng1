var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var mysql = require("mysql");
var multer = require('multer');

//var connection;

function createConnection() {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'app'
    });	
    return connection
}
//配置post body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//列表页查询数据库
app.get('/jobs', function(req, res) {
    var connection = createConnection()
    connection.connect();
    console.log(req.query)
     var Class = req.query.Class;
   //ajax 分页传入
    var pageCount = 10 * (req.query.page - 1)
    connection.query(`SELECT * FROM goods WHERE class = '${Class}' limit ${pageCount},10`, function(error, results, fields) {
        if (error) throw error;
        //results =>array类型
        // console.log('The solution is: ', results);
        var obj = {
            jobs: results
        }
        res.send(JSON.stringify(obj));
        connection.end();

    });
    // console.log(req.query)
    res.append("Access-Control-Allow-Origin", "*")
})


// 列表页查询数据库降序查询
app.get('/ascending', function(req, res) {
     var connection = createConnection()
    connection.connect();
    console.log(111)
   //ajax 分页传入
    var pageCount = 10 * (req.query.page - 1)
    var Class = req.query.Class;
    connection.query(`SELECT * FROM goods where class = '${Class}' ORDER BY vipshopPrice asc limit ${pageCount},10`, function(error, results, fields) {
        if (error) throw error;
        //results =>array类型
        var obj = {
            jobs: results
        }
        res.send(JSON.stringify(obj));
           connection.end();
    });
    res.append("Access-Control-Allow-Origin", "*")
})

// 列表页查询数据库升序
app.get('/descending', function(req, res) {
     var connection = createConnection()
    connection.connect();
    console.log(111)
   //ajax 分页传入
    var pageCount = 10 * (req.query.page - 1)
     var Class = req.query.Class;
    connection.query(`SELECT * FROM goods where class = '${Class}' ORDER BY vipshopPrice desc limit ${pageCount},10`, function(error, results, fields) {
        if (error) throw error;
        //results =>array类型
        var obj = {
            jobs: results
        }
        res.send(JSON.stringify(obj));
           connection.end();
    });
    res.append("Access-Control-Allow-Origin", "*")
})

// 列表页查询数据库分类
app.get('/classify', function(req, res) {
    var connection = createConnection()
    connection.connect();
   //ajax 分页传入
    var pageCount = 10 * (req.query.page - 1)
     var  taxon = req.query.taxon;
    console.log(taxon)
    connection.query(`SELECT * FROM goods where brandStoreName = '${taxon}' limit ${pageCount},10`, function(error, results, fields) {
        if (error) throw error;
        //results =>array类型
        var obj = {
            jobs: results
        }
        res.send(JSON.stringify(obj));
           connection.end();
    });
    res.append("Access-Control-Allow-Origin", "*")
})



// 数据库查id进入详情页
app.post('/detail', function(req, res) {
	 var connection = createConnection()
	// console.log(req.body.id);
	var id = req.body.id;
	console.log(id)
	connection.query('SELECT * FROM goods where gid = ' + id,function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		// console.log('The solution is: ', results);
		var obj = {
			detail: results
		}
		res.send(JSON.stringify(obj));
		connection.end();
	});
	res.append("Access-Control-Allow-Origin", "*")
})


//加入购物车的接口
//参数：username、gid、qty:不传默认为1
//首次点击会把商品gid和qty=1存进数据库
//多次点击加入购物车，qty会增加，并存进数据库
app.get('/addBuyCar', function(req, res) {
	//  解决跨域
	res.append("Access-Control-Allow-Origin", "*")
	 var connection = createConnection()
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
				 connection.end();
			})
			
		}else{
			res.send(JSON.stringify(goodsArr));
		}

	});

})


//把图片写入文件夹
app.use(express.static('../uploads'));

var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, '../uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],
// 然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload =multer({
	storage:storage
})

app.post('/biao', upload.any(), function(req, res, next) {	
	res.append('Access-Control-Allow-Origin',"*");
	res.send({
		wscats_code:'0'
	})

})

//把图片显示掉页面上
app.post('/upload-single', upload.any(), function(req, res, next) {
	console.log(req.files)
	res.append("Access-Control-Allow-Origin","*");
	res.send({
		wscats_code: '0',
		imgInfo: req.files
	});
});


//注册页面
app.post('/jia',function(req,res){
	var connection=createConnection();
	connection.connect();

	var username = req.body.username;
	var password = req.body.password;
 	var userAddSql="INSERT INTO register(username,password) VALUES('"+username+"','"+password+"')"

	var userAddSqla="select username from register where username='"+username+"'"
	connection.query(userAddSqla,function(error, results, fields){
		if (error) {
			throw error;
		}
		var obj={
			news:results
		}
		if (obj.news.length>0) {
			res.send('no');
			
		}else{

		connection.query(userAddSql,function(error, results, fields){
			if (error) {
				throw error;
			}

			res.send('ok')
			})
		}
	})
	res.append('Access-Control-Allow-Origin',"*")

})


//登录页面
app.post('/login',function(req,res){
	 var connection = createConnection()
	connection.connect();

	var username = req.body.phone;
	var password = req.body.password;
	console.log(username)
	// var getid =zhi.zhi;
	// console.log(zhi)
	var userAddSql="select * from register where username='"+username+"' and password='"+password+"'";
		 // console.log(userAddSql)

	connection.query(userAddSql,function(error, results, fields){
		if (error) {
			throw error;
		}
		var obj={
			news:results
		}
		console.log(obj)
		if (obj.news.length>0) {
			res.send('ok')

		}else{
			res.send('no')

		}
		// console.log(obj)

	})
	res.append('Access-Control-Allow-Origin',"*")
})

//通过id删除数据库信息
app.post('/shan',function(req,res){
		 var connection = createConnection()
		connection.connect();
	var id = req.body;
	var getid =id.id;
	console.log(getid)

	var userAddSql="DELETE FROM reg WHERE id = '"+getid+"'"
	connection.query(userAddSql,function(error, results, fields){
		if (error) {
			throw error;
		}

		res.send('删除成功')
	})
	res.append('Access-Control-Allow-Origin',"*")
})



app.get('/selectClass',function(req,res){
	res.append('Access-Control-Allow-Origin',"*")
	var Class = req.query.class
	 var connection = createConnection()
	connection.connect();
	connection.query(`SELECT brandStoreName FROM goods where class = '${Class}'`,function(rerr,data){
		for(i=0;i<=data.length-2;i++){
			for(j=i+1;j<=data.length-1;j++){
				if(data[i].brandStoreName==data[j].brandStoreName){
					data.splice(j,1)
					j--
				}
			}
		}
		console.log(data)
		res.end(JSON.stringify(data))

	})
})

//通过id更改数据库信息
app.post('/gai',function(req,res){
	 var connection = createConnection()
	connection.connect();
	var id = req.body;
	var getid =id.id;
	var username = req.body.username;
	var useremail = req.body.useremail;
	var userphone = req.body.userphone;
	var userqq = req.body.userqq;
	var userweibo = req.body.userweibo;
	var userintro = req.body.userintro;
	console.log(id)

	var userAddSql="UPDATE reg SET name = '"+username+"',email = '"+useremail+"',telephone = '"+userphone+"',qq = '"+userqq+"',intro = '"+userintro+"' WHERE id ="+getid;
	
	connection.query(userAddSql,function(error, results, fields){
		if (error) {
			throw error;
		}

		res.send('ok')
	})
	res.append('Access-Control-Allow-Origin',"*")
	connection.end();

})


// ...............................................................zhang
//进入页面根据username获取商品id
app.get('/buycarLoad', function(req, res) {

	//  解决跨域
	res.append("Access-Control-Allow-Origin", "*")
	 var connection = createConnection()
	connection.connect();
	//引入查找模块
	var username = req.query.username;
	connection.query(`SELECT buycarMessage FROM register where username = '${username}'`, function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		//		console.log('The solution is: ', results);
		//把数据整理，返回到前端

		res.send(JSON.stringify(results));
		connection.end();
	});
	//	console.log(req.query)

})

//根据gid查找goods中的商品并返回
app.get('/buycarSelectId', function(req, res) {
	//  解决跨域
	res.append("Access-Control-Allow-Origin", "*")
	 var connection = createConnection()
	connection.connect();
	//引入查找模块
	var gid = req.query.gid ? req.query.gid : [];
	if(gid.length != 0) {
		var gidStr = gid.join(',')

		connection.query(`SELECT * FROM goods where gid in (${gidStr})`, function(error, results, fields) {
			if(error) throw error;
			//results =>array类型
			//		console.log('The solution is: ', results);
			//把数据整理，返回到前端

			res.send(JSON.stringify(results));
			connection.end();
		});

	} else {
		res.send(JSON.stringify(['购物车没有商品']))
	}

})

//随机加载商品
app.get('/buyCarRandomLoad', function(req, res) {

	//  解决跨域
	res.append("Access-Control-Allow-Origin", "*")
	 var connection = createConnection()
	connection.connect();

	//引入查找模块
	//写死加载4条商品
	var pageCount = 5;
	var page = req.query.page;
	var pageBegin = pageCount * (page - 1)
	//从这里开始显示     显示多少个
	connection.query('select * from goods limit ' + pageBegin + ',' + pageCount, function(err, results, fields) {

		res.end(JSON.stringify(results))
		connection.end()
	})

})



//按减号减少商品数量qty
app.get('/minusBuyCar', function(req, res) {
	//  解决跨域
	res.append("Access-Control-Allow-Origin", "*")
	 var connection = createConnection()
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
				items.qty--
					temp = false;
			}
		})

		if(temp) {
			goodsArr.push(newGood)
		}
		//把数据整理，返回到前端
		console.log(goodsArr)

		connection.query(`update register set buycarMessage='${JSON.stringify(goodsArr)}' where username = '${username}'`, function(error, results, fields) {
			if(error) throw error;
			//results =>array类型
			//			console.log('The solution is: ', results);
			//把数据整理，返回到前端
			var obj = {
				news: results,
				status: true
			}
			res.send(JSON.stringify(obj));
			connection.end();
		})

	});

})

//删除商品
//传进username,gid
app.get('/delBuyCar', function(req, res) {
	res.append("Access-Control-Allow-Origin", "*")
	 var connection = createConnection()
	connection.connect();

	var gid = req.query.gid;
	var username = req.query.username;

	connection.query(`SELECT buycarMessage FROM register where username = '${username}'`, function(error, results, fields) {
		if(error) throw error;

		//		把字符串变为数组在操作
		//		console.log(JSON.parse(results[0].buycarMessage));
		var goodsArr = results[0].buycarMessage ? JSON.parse(results[0].buycarMessage) : [];

		goodsArr.forEach(function(items, i) {
			//判断原本没有该商品才添加gid进去数组			
			if(gid == items.gid) {
				goodsArr.splice(i, 1)
			}
		})

		connection.query(`update register set buycarMessage='${JSON.stringify(goodsArr)}' where username = '${username}'`, function(error, results, fields) {
			if(error) throw error;
			//results =>array类型
			//			console.log('The solution is: ', results);
			//把数据整理，返回到前端
			var obj = {
				news: results,
				status: true
			}
			res.send(JSON.stringify(obj));

		})

	});

})


//.....................................................chuan
//把图片写入文件夹
app.use(express.static('../uploads'));

var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, '../uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],
// 然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload =multer({
	storage:storage
})


//登录页面
app.post('/cha',function(req,res){
	 var connection = createConnection()
	connection.connect();

	var username = req.body.username;
	var password = req.body.password;

	// var getid =zhi.zhi;
	// console.log(zhi)
	var userAddSql="select username from register where username='"+username+"' and password='"+password+"'"
		 // console.log(userAddSql)

	connection.query(userAddSql,function(error, results, fields){
		if (error) {
			throw error;
		}
		var obj={
			news:results
		}
		console.log(obj)
		if (obj.news.length>0) {
			res.send('ok')

		}else{
			res.send('no')

		}
		// console.log(obj)

	})
	res.append('Access-Control-Allow-Origin',"*")
})


//通过id删除数据库信息
app.post('/shan',function(req,res){
		 var connection = createConnection()
		connection.connect();
	var id = req.body;
	var getid =id.id;
	console.log(getid)

	var userAddSql="DELETE FROM reg WHERE id = '"+getid+"'"
	connection.query(userAddSql,function(error, results, fields){
		if (error) {
			throw error;
		}

		res.send('删除成功')
	})
	res.append('Access-Control-Allow-Origin',"*")
})


//通过id更改数据库信息
app.post('/gai',function(req,res){
	 var connection = createConnection()
	connection.connect();
	var id = req.body;
	var getid =id.id;
	var username = req.body.username;
	var useremail = req.body.useremail;
	var userphone = req.body.userphone;
	var userqq = req.body.userqq;
	var userweibo = req.body.userweibo;
	var userintro = req.body.userintro;
	console.log(id)

	var userAddSql="UPDATE reg SET name = '"+username+"',email = '"+useremail+"',telephone = '"+userphone+"',qq = '"+userqq+"',intro = '"+userintro+"' WHERE id ="+getid;
	
	connection.query(userAddSql,function(error, results, fields){
		if (error) {
			throw error;
		}

		res.send('ok')
	})
	res.append('Access-Control-Allow-Origin',"*")
	

})

//首页页查询数据库
app.get('/index', function(req, res) {
     var connection = createConnection()
    connection.connect();
    console.log(req.query)
   //ajax 分页传入
    var pageCount = 10 * (req.query.page - 1)
    connection.query('SELECT * FROM brand  limit ' + pageCount + ',10', function(error, results, fields) {
        if (error) throw error;
        //results =>array类型
        // console.log('The solution is: ', results);
        var obj = {
            jobs: results
        }
        res.send(JSON.stringify(obj));
        connection.end();
    });
    // console.log(req.query)
    res.append("Access-Control-Allow-Origin", "*")
})


//查询当前id的图片
app.post('/tu', function(req, res) {
	 var connection = createConnection()
    connection.connect();
	// console.log(req.body.id);
	var msg = req.body.msg;
	console.log(msg)
	connection.query("select * from register where username='"+msg+"'", function(error, results, fields) {
		if(error) throw error;
		//results =>array类型
		// console.log('The solution is: ', results);
		var obj = {
			detail: results
		}
		if (obj.detail.length>0) {
			res.send(JSON.stringify(obj));
			
		}else{
			res.send('no')
		}
		console.log(obj)
		connection.end();
	});
	res.append("Access-Control-Allow-Origin", "*")
})

app.post('/tupian',function(req,res){
	 var connection = createConnection()
	connection.connect();
	var msg = req.body.msg;
	var img = req.body.img;
	console.log(msg,img)

	var userAddSql="UPDATE register SET headPicUrl = '"+img+"' WHERE username ='"+msg+"'";
	
	connection.query(userAddSql,function(error, results, fields){
		if (error) {
			throw error;
		}

		res.send('ok')
	})
	res.append('Access-Control-Allow-Origin',"*")
	

})

//历史记录
app.post('/history',function(req,res){
	 var connection = createConnection()
	connection.connect();

	var username = req.body.username;
 	var userAddSql="INSERT INTO historys(name) VALUES('"+username+"')"

	var userAddSqla="select name from historys where name='"+username+"'"
	connection.query(userAddSqla,function(error, results, fields){
		if (error) {
			throw error;
		}
		var obj={
			news:results
		}
		if (obj.news.length>0) {
			res.send('no');
			
		}else{

		connection.query(userAddSql,function(error, results, fields){
			if (error) {
				throw error;
			}
			res.send(obj)
			})
		}

	})
	res.append('Access-Control-Allow-Origin',"*")
})


app.get('/look', function(req, res) {
    var connection = createConnection()
    connection.connect();
    // console.log(req.query)
   //ajax 分页传入
    connection.query('SELECT * FROM historys', function(error, results, fields) {
        if (error) throw error;
        //results =>array类型
        // console.log('The solution is: ', results);
        var obj = {
            jobs: results
        }
        res.send(JSON.stringify(obj));
           connection.end();
    });
    // console.log(req.query)
    res.append("Access-Control-Allow-Origin", "*")
})

//删除所有历史记录
app.post('/qing',function(req,res){
		 var connection = createConnection()
		connection.connect();

	var userAddSql="DELETE FROM historys "
	connection.query(userAddSql,function(error, results, fields){
		if (error) {
			throw error;
		}

		res.send('删除成功')
	})
	res.append('Access-Control-Allow-Origin',"*")
})




var server= app.listen(3000,function(){
	var host = server.address().address
	var port = server.address().port
	console.log('访问地址http://%s:%s', host,port)
})