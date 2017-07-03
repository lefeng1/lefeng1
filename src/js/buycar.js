$(function() {
	function randomNum(min, max) {
		var num = Math.floor(Math.random() * (max - min + 1)) + min;
		return num;
	}
	function buyCar() {
		var param = location.search.slice(1)
		var arr = param.split('&')
		var username = '';
		arr.forEach(function(items) {
			var temp = items.split('=')
			if(temp[0] == 'username') {
				username = temp[1]
			}
		})
		$('.ui-decoration-hyperlink').click(function(){
			console.log(111)
			history.back();
		})
		console.log(username)
		if(username) {
			console.log('已登录')
			$('.SqVnKJSjGIm-VF1dqj8wv').click(function(){
				location.href='coupon.html?username='+username
			})
			//封装加载购物车信息
			function buycarLoad() {
				
				//先根据用户名获取购物车信息
				$.ajax({
					url: 'http://localhost:3000/buycarLoad',
					dataType: 'json',
					data: {
						username: username

					},
					success: function(res) {
						//					console.log(JSON.parse(res[0].buycarMessage))
						// console.log(res)
						var buyMessArr = res[0].buycarMessage ? JSON.parse(res[0].buycarMessage):[];
						var gidArr = buyMessArr.map(function(items) {
							return items.gid
						})
						//					console.log(gidArr)
						$.ajax({
							url: 'http://localhost:3000/buycarSelectId',
							dataType: 'json',
							data: {
								gid: gidArr
							},
							success: function(res) {
								console.log(res)
								$('.list-empty').css('display', 'none')
								$('section').css('display', 'block')
								$('.SqVnKJSjGIm-VF1dqj8wv').css('display', 'block')
								if(res[0] !== "购物车没有商品") {
									var carHtml = $.map(res, function(items) {
										var qty = 1;
										$.each(buyMessArr, function(i, data) {
											if(items.gid == data.gid) {
												qty = data.qty
											}
										})
										return `
										<li class="_2x2q-D1HfUB-t0Mz-xT6p2 clearfix" gid='${items.gid}'>
											<!-- react-empty: 177 -->
											<div class="lazyload-img-wraper img loaded">
												<div class="lazyload-img" style="background-image: url(&quot;${items.verticalImage}&quot;);"></div>
											</div>
											<div class="info">
												<h3><b></b><!-- react-text: 184 -->${items.name}<!-- /react-text --></h3>
												<div class="price">${items.vipshopPrice}</div>
												<div class="_1RID7OuQz16ROtIrAVVNZF"><i class="operate icon-remove "></i><span class="item-count">${qty}</span><i class="operate icon-add"></i><i class="img-icon cart-delete"></i></div>
											</div>
										</li>
									`
									}).join('')
									
									$(".car").html(carHtml)
									//点击删除该项和数据库中相关内容
									$(".cart-delete").click(function() {

										var gid = $(this).closest('li').attr('gid')
										$(this).closest('li').remove();
										sum();
										console.log(1111)
										$.ajax({
											url: 'http://localhost:3000/delBuyCar',
											dataType: 'json',
											data: {
												gid: gid,
												username: username
											},
											success: function(res) {
												console.log(res)

												buycarLoad();
											}
										})
									})
									//当商品数量为1时，禁用-按钮
									$.each($(".item-count"), function(i, items) {
										if($(items).html() == 1) {

											$(items).prev('i').addClass('disabled')
										} else {
											$(items).prev('i').removeClass('disabled')
										}

									})

									//绑定加数量点击事件,写进数据库
									$('.icon-add').click(function() {
										$(this).prev('span').html(function(i, oldVal) {
											var res = Number(oldVal)
											res++

											$(this).prevAll('.icon-remove').removeClass('disabled')
											return res
										})
										sum()
										//传进数据库
										var gid = $(this).closest('li').attr('gid')
										var qty = $(this).html();
										$.ajax({
											url: 'http://localhost:3000/addBuyCar',
											dataType: 'json',
											data: {
												gid: gid,
												username: username,
												qty: qty
											},
											success: function(res) {
												console.log(res)
												buycarLoad();
											}
										})
									})

									//绑定减数量点击事件,写进数据库
									$('.icon-remove').click(function() {
										$(this).next('span').html(function(i, oldVal) {
											var res = Number(oldVal)
											res--
											console.log(res)
											if(res == 1) {
												$(this).addClass('disabled')
											}
											return res
										}.bind(this))
										sum()
										//写进数据库
										var gid = $(this).closest('li').attr('gid')										
										var qty = $(this).html();
										$.ajax({
											url: 'http://localhost:3000/minusBuyCar',
											dataType: 'json',
											data: {
												gid: gid,
												username: username,
												qty: qty
											},
											success: function(res) {
												console.log(res)
												buycarLoad();
											}
										})
									})
									
									//封装金额合计函数
//									console.log($('.car ._2x2q-D1HfUB-t0Mz-xT6p2'))
									function sum(){
										var sum = 0;
										$.each($('.car ._2x2q-D1HfUB-t0Mz-xT6p2'),function(){
											var qty = $(this).find('.item-count').html()*1
											console.log(qty)
											var price = $(this).find('.price').html()*1
											sum +=qty*price
											
										})
										
										if(sum>=199){
											$('.m199').removeClass('disabled')
										}else{
											$('.m199').addClass('disabled')
										}
										if(sum>=188){
											$('.m188').removeClass('disabled')
										}else{
											$('.m188').addClass('disabled')
										}
										if(sum>=99){
											$('.m99').removeClass('disabled')
										}else{
											$('.m99').addClass('disabled')
										}
										$('.sum').html(sum)
										
									}
									sum()
								} else {
									//购物车空的话显示另一个结构
									$('.list-empty').css('display', 'block')
									$('section').css('display', 'none')
									$('.SqVnKJSjGIm-VF1dqj8wv').css('display', 'none')
								}

							}
						})

					}
				})

			}
			buycarLoad();

			//随机加载.bd ul的信息

			$.ajax({
				url: 'http://localhost:3000/buyCarRandomLoad',
				dataType: 'json',
				data: {
					page: randomNum(1, 900)
				},
				success: function(res) {
					//					console.log("进入随机产生商品");
					//					console.log(res)
					var carHtml = $.map(res, function(items) {

						return `
							<li class="_2x2q-D1HfUB-t0Mz-xT6p2 clearfix" gid='${items.gid}'>
								<div class="lazyload-img-wraper img loaded">
									<div class="lazyload-img" style="background-image: url(&quot;${items.verticalImage}&quot;);"></div>
								</div>
								<div class="info">
									<h3><b>御泥坊</b><!-- react-text: 62 -->${items.name}<!-- /react-text --></h3>
									<div class="price">${items.vipshopPrice}</div>
									<div class="gap">
										<a class="rebuyProduct">重新抢购</a><i class="img-icon cart-delete"></i></div>
								</div>
							</li>
								`
					}).join('')
					$(".bd").html(carHtml)
					//绑定加入购物车事件，重新写进数据库
					$('.rebuyProduct').click(function() {
						var gid = $(this).closest('li').attr('gid')

						$.ajax({
							url: 'http://localhost:3000/addBuyCar',
							dataType: 'json',
							data: {
								gid: gid,
								username: username
							},
							success: function(res) {
								console.log(res)
								buycarLoad();
							}
						})
					})
					$(".cart-delete").click(function() {

						$(this).closest('li').remove();

					})
				}
			})

		} else {
			console.log('没登陆')
			// alert('请先登录')
			location.href='../html/login.html'
		}
	}
	buyCar();

})