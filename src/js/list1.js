$(function() {
var list1 = {
		init: function() {

			var page = 1;
			var Class = '';
			var taxon = '';
			var username = '';
			var str = location.search.substring(1);
			var arr = str.split('&')
			arr.forEach(function(items) {
				var temp = items.split('=')
				if(temp[0] == 'Class') {
					Class = decodeURI(temp[1])
				} else if(temp[0] == 'username') {
					username = decodeURI(temp[1])
				}
			})
			$('._2je43mssPpq3rot5HNhUEl').click(function() {
				location.href = '../html/buycar.html?username=' + username
			})
			$('.home').click(function() {
				location.href = '../index.html?username=' + username
			})
			if(username) {

			}
			// 生成筛选里面的数据
			$.ajax({
				url: "http://localhost:3000/selectClass",
				data: {
					class: Class
				},
				dataType: 'json',
				success: function(res) {
					// console.log(res)
					var divHtml = res.map(function(items) {
						return `<dd class="">${items.brandStoreName}</dd>`
					}).join('')
					$('.ddclass').html(divHtml)

					// 点击筛选里面的字元素
					$('.filterBody').on('click', 'dd', function() {
						$(this).addClass('checked').siblings().removeClass('checked');
						taxon = $(this).text();

					})

					// 点击分类
					$('span.submit').on('click', function() {
						console.log($('.filterBody dd').hasClass('checked'))
						if($('.filterBody dd').hasClass('checked')) {
							console.log(666)
							$('.goodslist').html('');
							luyou = 'classify';
							loadMore(luyou);
						}
					})
				}
			})
			console.log(Class)
			// 点击筛选出现
			$('i.filter').parent().on('click', function() {
				$('._1u1iuEeNLuruAqLXg8xrdz').show();
				$('.sort').removeClass('asc desc');
			})
			// 点击筛选隐藏
			$('._1u1iuEeNLuruAqLXg8xrdz').on('click', '.submit', function() {
				$('._1u1iuEeNLuruAqLXg8xrdz').hide();
			})

			//点击筛选隐藏
			$('.header').on('click', '.cancel', function() {
				$('._1u1iuEeNLuruAqLXg8xrdz').hide();
			})

			// 点击价格销量切换
			var luyou = 'jobs';
			$('.sort').parent().on('click', function() {
				$(this).addClass('sorted').siblings().removeClass('sorted');
				$(this).siblings().children().removeClass('asc desc')
				if($(this).children().hasClass('asc')) {
					$(this).children().addClass('desc')
					$(this).children().removeClass('asc')
					$('.goodslist').html('');
					luyou = 'descending';
					loadMore(luyou);
				} else {
					console.log(555)
					$(this).children().addClass('asc').removeClass('desc')
					$('.goodslist').html('');
					luyou = 'ascending';
					loadMore(luyou);
				}

			})

			loadMore(luyou);
			$(window).on('scroll', function() {
				// 滚动条距离顶部的距离 大于 px时

				if($(window).scrollTop() + parseInt($('html').css('height')) >= $('html').get(0).scrollHeight - parseInt($('footer').css('height'))) {
					console.log(555555555)
					$(window).off('scroll')

					page++;
					loadMore(luyou);
				}
			})

			function increase() {

			}

			function loadMore(louyou) {
				console.log(taxon)
				$.ajax({
					type: "get",
					url: "http://localhost:3000/" + louyou,
					async: true,
					dataType: "json",

					data: {
						page: page,
						Class: Class,
						taxon: taxon
					},
					success: function(data) {
						console.log(data)
						var ul = $('<ul class="clearfix"></ul>');
						var html = data.jobs.map(function(item) {
							return `

                                     <li class="_3dznqSdmEYuOI-7s36xTkF Ekwoj4AzxaaLKz3hCWWQv clearfix" id="${item.gid}">
                                        <!-- react-empty: 2152 -->
                                        <div class="lazyload-img-wraper img loaded">
                                            <div class="lazyload-img" style="transition: none; background-image: url(&quot;${item.verticalImage}&quot;);">
                                            </div>
                                        </div>
                                        <div class="info">
                                            <div class="tag-wrap"></div>
                                            <div class="name-wrap">
                                                <h2>${item.brandStoreName}</h2>
                                                <h3>${item.name}</h3>
                                            </div>
                                            <div class="buyer-item"><i class="buyer-num-icon"></i><span class="buyer-num"><!-- react-text: 2163 -->20740<!-- /react-text --><!-- react-text: 2164 -->人购买<!-- /react-text --></span></div>
                                            <div class="price-wrap"><span class="price">${item.vipshopPrice}</span>
                                                <br>
                                                <span class="market-price">${item.marketPrice}</span>
                                                <i class="cart"></i>
                                            </div>
                                        </div>
                                    </li>
                                `

						}).join('');

						ul.html(html);
						$('.bback').click(function() {
							console.log(111)
							history.back()
						})
						setTimeout(function() {
							$(window).on('scroll', function() {
								// 滚动条距离顶部的距离 大于 px时

								if($(window).scrollTop() + parseInt($('html').css('height')) >= $('html').get(0).scrollHeight - parseInt($('footer').css('height'))) {
									console.log(555555555)
									$(window).off('scroll')
									page++;
									loadMore(luyou);
								}

							})
						}, 1000)
						$('.goodslist').append(ul);
						// 点击跳转详情页
						$('.lazyload-img-wraper').on('click', function() {
							var id = $(this).parent().attr('id')
							console.log(id)
							window.location.href = "../html/details.html?id=" + id + "&username=" + username;
						})
						list1.fly();
						// $(window).scroll(function(){
						//     // 滚动条距离顶部的距离 大于 200px时
						//     if($(window).scrollTop() >= page*500){
						//         console.log($(window).scrollTop())
						//         $('ul.clearfix').css({
						//             height: 1385,
						//             visibility: 'hidden',
						//         })
						//     }                              
						// })
					}
				})

			}

			// 传递username
			this.username = username;

		},

		// 飞入购物车
		fly: function() {
			// 点击飞入购物车
			$('.info').on('click', '.cart', function() {

				//生成图片
				var $cloneImg = $('<div></div>');
				var s_left = $(this).offset().left;
				var s_top = $(this).offset().top;
				var gid = $(this).parent().parent().parent().attr('id');

				console.log(gid)

				$cloneImg.css({
					position: 'absolute',
					left: s_left,
					top: s_top,
					width: 40,
					height: 40,
					'line-height': 40,
					'text-align': 'center',
					'border-radius': '50%',
					'background-repeat': 'no-repeat',
					'background-size': 'contain',
					'background-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAyVBMVEUAAAD/gar/hKr/hKz/gar/////hKz/gav/gKr/h63/m7b/gKv/gKv/gar/gav/jK//gKr/gKr/gqv/gqv/gKr/gKv/gav/gav/gqz/gqv/hKz/g63/hKz/i63/gar/gKr/gKv/gKv/gKv/gav/gqv/g6z/g6v/haz/hqz/trb/gqz/gar/gav/hLD/gqv/gKr/8/f/0uH/tc7/gqv/4+3/w9b/scv/ocD/mrv/kLT/ydv/6/L/6vH/3Of/2OT/vNL/qMX/krb/jLJiP+PHAAAAL3RSTlMASzY09gEm+/IZB4PTy2kO5N3Xwbezd29jWD8vHxTprZ2YkX5RRDoqIwPupoodX4kG7iAAAAInSURBVFjD7djZbuJAFATQMmCMbcK+DTthT0I6xIEEkln//6NGFwdpEFiuRj0vMz7PraLdt9QYkEgk/lN2NytWHsxx8yoU9AePRZhxq/6Q83swYahO9KcwoJM7TQ3GMKA3+SJa41omjPVhUnEc7roAoxY3EprJwqjiIbUKs3olSU3BLEtC72GYHEDOhlkF2WoaZs0ltJEipLseSEtH5q84FX8BSkUWK5bjU9utK6XuFK/mkZehozTcs+Pfrwn7519KtBFrKuvWT5T3V1lcR6yurNs8kd7kBoo/VVvu1S0bupctdLhOvbKh3yR0xnVqx4auydAH+apiQ79LaI/s1IvGoEow26kXtv0rjU5tZa0FmOzUV8ks2SDk2U597CS0CcaA7NT7m2Tml2A8yFpiSD9lnTMDpUV1ahMo0QKnHd+pj81O883LVTKp50jbH4fDpId07BSnb4GXpyKDYREaBkRkZpTFEd+pTKRcuXprneyS7hS9EZ1OPcKsoiMvCX/jfdJJg8YfasmFUV5ZUsuW4VEFSlT9iRWjA15TsYY6qQ6bugAvlSdDV9BgTwY5ItOHJtvtpGO4+GfNG6NmxGx7hdF4his0pFWZAi6w+jKj0RK6JuogaONM97MWjauuKlGL/I9I/5ex56jQHc5U1ae5bkePzS/jTO0Yqt3SevSN0Tj7PFY2Ez79hd14lXCGU2hLy5Vyc/HYXHmMkoUr2Fmriwiu1VkikUic+A0oSSO0LAB34wAAAABJRU5ErkJggg==)'
				}).appendTo('body');

				// 图片飞入动画效果
				// 动画完成后，把复制li写入购物车列表
				var e_left = $('._2je43mssPpq3rot5HNhUEl').offset().left;
				var e_top = $('._2je43mssPpq3rot5HNhUEl').offset().top;
				setTimeout(function() {
					$cloneImg.animate({
						left: e_left,
						top: e_top,
						width: 40,
						height: 40
					}, function() {

						// 删除动画图片
						$cloneImg.remove();
						list1.join(gid);
						$('.countdown-wrap').find('span').text()
						var time = (list1.countDown())(1200);
						//clearInterval(time)
					});
				}, 200)
				// this.gid = gid;
			})

		},

		// 加入
		join: function(gid) {
			console.log(666)
			if(this.username) {
				$.ajax({
					type: "get",
					url: "http://localhost:3000/addBuyCar",
					data: {
						username: this.username,
						gid: gid
					},
					dataType: 'json',
					success: function(res) {
						console.log(res)
						var html = 0;
						for(var i = 0; i < res.length; i++) {
							html += Number(res[i].qty);
						}
						$('.cart-wrap .num').text(Number(html - 1));
					}
				})

			}
		},

		// 倒计时

		countDown: function() {
			//var intDiff = parseInt(1200);//倒计时总秒数量
			return function(intDiff) {
				var time
				console.log(intDiff)

				//clearInterval(time);
				time = setInterval(function() {
					var day = 0,
						hour = 0,
						minute = 0,
						second = 0; //时间默认值        
					if(intDiff > 0) {
						day = Math.floor(intDiff / (60 * 60 * 24));
						hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
						minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
						second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
					} else if(intDiff <= 0) {
						clearInterval(time)
					}
					if(minute <= 9) {
						minute = '0' + minute
					};
					if(second <= 9) {
						second = '0' + second
					};
					$('.countdown-wrap').find('span').text(minute + ':' + second);
					intDiff--;

				}, 1000);
				console.log(time)
				return time;
			}
			//timer(intDiff);
		},
	}
	list1.init();
	list1.join();

})

