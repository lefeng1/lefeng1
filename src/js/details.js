$(function() {
    var details = {
        init: function() {
            //获取url上的ID参数
            var str = location.search.substring(1);
            var arr = str.split('&')
            var id = '';
            var username = '';
            arr.forEach(function(items) {
                var temp = items.split('=')
                console.log(temp)
                if (temp[0] == 'id') {
                    id = decodeURI(temp[1])

                }else if(temp[0] == 'username') {
                    this.username = decodeURI(temp[1])
                    console.log(this.username)
                }

            }.bind(details))
           
            this.id = id;

            // 顶部app
            $('.left').on('click', function() {
                console.log(555)
                $('.lazyload-img-wraper').hide()
            });


        },
        data: function() {
            console.log(this.id);
            $.ajax({
                type: "post",
                url: "http://localhost:3000/detail",
                data: {
                    id: this.id
                },
                dataType: 'json',
                success: function(res) {
                    console.log(res)
                    var html = res.detail.map(function(item) {
//                  	var descriptions = item.descriptions.slice(1,-1).split('},{')
//                  	console.log(descriptions)
//                  	descriptions.map(function(items,i){
//                  		console.log(i)
//                  		return JSON.parse(items)
//                  	})
						console.log(typeof item.descriptions)
                        return `
							<div class="_38_Z28Q4LpfXqInYVZPJZI">
                    			<header class="clearfix">
                    				<i class="icon-arrow-left ui-decoration-hyperlink bback"></i>
                        			<div class="content">${item.name}</div>
                        			<span class="right-btn ui-decoration-hyperlink">
                        				<i class="img-icon home"></i>
                        			</span>
                    			</header>
                			</div>
                			<div class="page-container">
                    			<section class="_1pwdCXn_D63SNMh3LeMzSI">
                        			<div class="wrap-pic">
                            			<div style="overflow: hidden; visibility: visible; position: relative; white-space: nowrap; font-size: 0px;">
                                			<ul style="overflow: hidden; position: relative; width: 375px;">
                                    			<li data-index="0" style="display: inline-block; width: 375px; position: relative; left: 0px; transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                                        			<div class="lazyload-img-wraper loaded">
                                            			<div class="lazyload-img" style="background-image: url(&quot;${item.verticalImage}&quot;);"></div>
                                        			</div>
                                    			</li>
                                			</ul>
                            			</div>
                        			</div>
                        			<div class="wrap">
                            			<h2><!-- react-text: 40 -->${item.name}<!-- /react-text -->
                            				<div class="_10CT17zgUiBnVpHzEZHK4T"><!-- react-empty: 173 -->
                            					<i id="aaa" class="img-icon product-favorite ui-decoration-hyperlink">
                            					</i>
                            				</div>
                            			</h2>
                            			<p class="price-wrap"><span class="price">${item.vipshopPrice}</span><span class="market-price">${item.marketPrice}</span></p>
                        			</div>
                        			<div class="pms-area">
			                            <ul class="pms-tips">
			                                <li><i>${JSON.parse(item.pmsList)[0].type}</i>
			                                    <p>${JSON.parse(item.pmsList)[0].msg}</p>
			                                </li>
			                                <li><i>${JSON.parse(item.pmsList)[1].type}</i>
			                                    <p>${JSON.parse(item.pmsList)[1].msg}</p>
			                                </li>
			                               
			                            </ul>
                        			</div>
                    			</section>
                    			<!-- react-empty: 56 -->
                    			<section class="_3AFVKtIpJA5G1Ph1VbnQnP">
			                        <ul>
			                            <li>
			                                <!-- react-text: 60 -->商品评价
			                                <!-- /react-text --><span class="ps"><!-- react-text: 62 -->（ <!-- /react-text --><!-- react-text: 171 -->1143<!-- /react-text --><!-- react-text: 64 --> ）<!-- /react-text --></span><span class="pull-right"><b>95.4%</b><!-- react-text: 140 -->好评<!-- /react-text --></span></li>
			                            <li>
			                                <div class="bar clearfix">
			                                    <div class="grade"><span><i class="img-icon comment-like active"></i><!-- react-text: 146 -->满意<!-- /react-text --></span></div>
			                                    <div class="pull-right">
			                                        <!-- react-text: 148 -->${JSON.parse(item.commentContent)[0].authorName}
			                                        <!-- /react-text --><span class="time">2017-6-30</span></div>
			                                </div>
			                                <div>${JSON.parse(item.commentContent)[0].content}</div>
			                            </li>
			                            <li>
			                                <div class="bar clearfix">
			                                    <div class="grade"><span><i class="img-icon comment-like active"></i><!-- react-text: 156 -->满意<!-- /react-text --></span></div>
			                                    <div class="pull-right">
			                                        <!-- react-text: 158 -->${JSON.parse(item.commentContent)[1].authorName}
			                                        <!-- /react-text --><span class="time">2017-6-29</span></div>
			                                </div>
			                                <div>${JSON.parse(item.commentContent)[1].content}</div>
			                            </li>
			                            <li>
			                                <div class="bar clearfix">
			                                    <div class="grade"><span><i class="img-icon comment-like active"></i><!-- react-text: 166 -->满意<!-- /react-text --></span></div>
			                                    <div class="pull-right">
			                                        <!-- react-text: 168 -->${JSON.parse(item.commentContent)[2].authorName}
			                                        <!-- /react-text --><span class="time">2017-6-29</span></div>
			                                </div>
			                                <div>${JSON.parse(item.commentContent)[2].content}</div>
			                            </li>
			                        </ul>
                    			</section>
			                    <ul class="pms-tips pollen">
			                        <li><span><i>花粉</i></span>
			                            <p>
			                                <!-- react-text: 70 -->购买最多可获得
			                                <!-- /react-text --><span class="highlight">59</span>
			                                <!-- react-text: 72 -->个花粉
			                                <!-- /react-text -->
			                            </p>
			                        </li>
			                    </ul>
			                    <ul class="tag-list clearfix">
			                        <li class="active">商品信息</li>
			                        <li class="">购物说明</li>
			                    </ul>
			                    <section class="desc">
			                        <table>
			                            <tbody>
			                                <tr>
			                                    <th>${JSON.parse(item.descriptions)[0]?JSON.parse(item.descriptions)[0].name:''}</th>
			                                    <td>${JSON.parse(item.descriptions)[0]?JSON.parse(item.descriptions)[0].value:''}</td>
			                                </tr>
			                                <tr>
			                                    <th>${JSON.parse(item.descriptions)[1]?JSON.parse(item.descriptions)[1].name:''}</th>
			                                    <td>${JSON.parse(item.descriptions)[1]?JSON.parse(item.descriptions)[1].value:''}</td>
			                                </tr>
			                                <tr>
			                                    <th>${JSON.parse(item.descriptions)[2]?JSON.parse(item.descriptions)[2].name:''}</th>
			                                    <td>${JSON.parse(item.descriptions)[2]?JSON.parse(item.descriptions)[2].value:''}</td>
			                                </tr>
			                                <tr>
			                                   <th>${JSON.parse(item.descriptions)[3]?JSON.parse(item.descriptions)[3].name:''}</th>
			                                    <td>${JSON.parse(item.descriptions)[3]?JSON.parse(item.descriptions)[3].value:''}</td>
			                                </tr>
			                                <tr>
			                                    <th>${JSON.parse(item.descriptions)[4]?JSON.parse(item.descriptions)[4].name:''}</th>
			                                    <td>${JSON.parse(item.descriptions)[4]?JSON.parse(item.descriptions)[4].value:''}</td>
			                                </tr>
			                                <tr>
			                                    <th>${JSON.parse(item.descriptions)[5]?JSON.parse(item.descriptions)[5].name:''}</th>
			                                    <td>${JSON.parse(item.descriptions)[5]?JSON.parse(item.descriptions)[5].value:''}</td>
			                                </tr>
			                                <tr>
			                                    <th>${JSON.parse(item.descriptions)[6]?JSON.parse(item.descriptions)[6].name:''}</th>
			                                    <td>${JSON.parse(item.descriptions)[6]?JSON.parse(item.descriptions)[6].value:''}</td>
			                                </tr>
			                                <tr>
			                                    <th>${JSON.parse(item.descriptions)[7]?JSON.parse(item.descriptions)[7].name:''}</th>
			                                    <td>${JSON.parse(item.descriptions)[7]?JSON.parse(item.descriptions)[7].value:''}</td>
			                                </tr>
			                            </tbody>
			                        </table>
			                        <div class="click-to-detail ui-decoration-hyperlink">点击查看图文详情</div>
			                        <div class="image-detail" style="display:none">
				                        <img src="${item.detailImage.split(',')[0]?item.detailImage.split(',')[0]:''}">
			                        	<img src="${item.detailImage.split(',')[1]?item.detailImage.split(',')[1]:''}">
			                        	<img src="${item.detailImage.split(',')[2]?item.detailImage.split(',')[2]:''}">
			                        	<img src="${item.detailImage.split(',')[3]?item.detailImage.split(',')[3]:''}">
			                        	<img src="${item.detailImage.split(',')[4]?item.detailImage.split(',')[4]:''}">
			                        	<img src="${item.detailImage.split(',')[5]?item.detailImage.split(',')[5]:''}">
			                        	<img src="${item.detailImage.split(',')[6]?item.detailImage.split(',')[6]:''}">
			                        	<img src="${item.detailImage.split(',')[7]?item.detailImage.split(',')[7]:''}">
			                        	<img src="${item.detailImage.split(',')[8]?item.detailImage.split(',')[8]:''}">
			                        	<img src="${item.detailImage.split(',')[9]?item.detailImage.split(',')[9]:''}">
			                        	<img src="${item.detailImage.split(',')[10]?item.detailImage.split(',')[10]:''}">
			                        	<img src="${item.detailImage.split(',')[11]?item.detailImage.split(',')[11]:''}">
			                        	<img src="${item.detailImage.split(',')[12]?item.detailImage.split(',')[12]:''}">
			                        	<img src="${item.detailImage.split(',')[13]?item.detailImage.split(',')[13]:''}">
			                        	<img src="${item.detailImage.split(',')[14]?item.detailImage.split(',')[14]:''}">
			                        	<img src="${item.detailImage.split(',')[15]?item.detailImage.split(',')[15]:''}">
			                        </div>
			                    </section>
			                    <ul class="note" style="display: none;">
			                        <li>
			                            <h2>关于商品</h2>
			                            <p>乐蜂网上所售卖的商品均经过品牌授权，确保正品，并由中国太平洋财产保险股份有限公司为您购买的每一件商品进行承保。</p>
			                        </li>
			                        <li>
			                            <h2>商品价格说明</h2>
			                            <p>乐蜂展示的中间未划横线价格（显示如¥799）为乐蜂销售价，该价格是交易成交价，是您最终决定是否购买商品的依据。</p>
			                            <p>乐蜂展示的中间划横线价格（显示如￥1399）为参考价，采集自品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价可能会与您购物时展示的不一致。该价格仅供您参考。</p>
			                            <p>折扣比为乐蜂销售价与参考价的对比（该值四舍五入后采用小数点后1位，如¥799/¥2899=0.2756=2.8折），该对比值仅供您参考，不作为结算基数。</p>
			                        </li>
			                        <li>
			                            <h2>售后说明</h2>
			                            <p class="with-indent">在您签收商品之日起的7天之内，乐蜂为您提供七天无理由放心退服务，但以下情形将不能退货：</p>
			                            <p> </p>
			                            <p>1、非乐蜂销售的商品，或有明显使用痕迹影响二次销售的商品；</p>
			                            <p>2、法律明确规定不适用七天无理由退货的商品；</p>
			                            <p>2、基于安全及健康的考虑，已拆封的食品、药品、保健品、化妆品、贴身用品等；</p>
			                            <p>4、已经激活的手机、电脑、数码产品等；</p>
			                            <p>5、已在线交付的充值类商品；</p>
			                            <p>6、未经授权的维修、误用、碰撞、疏忽、滥用、进液、事故、改动、不正确的安装所造成的商品质量问题，或撕毁、涂改标贴、机器序号、防伪标记；</p>
			                            <p>7、无法提供商品的发票（如已索要发票）、保修卡等三包凭证或者三包凭证信息与商品不符及被涂改的；</p>
			                            <p>8、礼包或套装中的商品不可以部分退换货。上述退货规则，客户一经购买，视为认可。</p>
			                        </li>
			                    </ul>
			                    <div class="_2je43mssPpq3rot5HNhUEl _3povNXiwZV_-LP6ZMppsxs">
			                        <div class="_3dAnNUcJ3R7M_M_UssIDJM"></div>
			                        <a>
			                            <div class="cart-wrap"><i class="cart"></i><span class="num"></span></div>
			                        </a>
			                        <button class="btn-primary">加入购物车</button>
			                        <div>
			                            <div class="_3FmPsJubKs-Ys_FH8ksXO4"></div>
			                            <div class="_2qMs9THP2bUpWIAG1OhCmP">
			                                <div class="_1bIecDkNapDGLpwch2H9cH ispinner--animating">
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                    <div class="ispinner__blade"></div>
			                                </div>
			                                <p>加载中</p>
			                            </div>
			                        </div>
			                    </div>
                			</div>
                        `
                    }).join('')
					
                    $('.lazyload-img-wraper').after(html);
                    //点击查看图文详情
                    $('.click-to-detail').click(function(){
                    	console.log('ff')
                    	$(".image-detail").css('display','block')
                    	$(".click-to-detail").css('display','none')
                    	
                    })
                    $('.btn-primary').click(function(){
	                    if(!this.username){
	                    	location.href='../html/login.html'
	                    }else{

	                    	$.ajax({
								url: 'http://localhost:3000/addBuyCar',
								dataType: 'json',
								data: {
									gid: this.id,
									username: this.username
								},
								success: function(res) {
									console.log(res)
									
								}
							})
	                    }
                    }.bind(details))
                    // 绑定去购物车
                     $('.cart').click(function(){
                     	console.log(this.username)
		            	location.href='../html/buycar.html?username='+this.username
		            }.bind(details))
                   // 绑定去主页
                    $('.home').click(function(){
                     	console.log(this.username)
		            	location.href='../index.html?username='+this.username
		            }.bind(details))
					$('.bback').click(function(){
						console.log(111)
						history.back()
					})
                    // 点击收藏和取消收藏
		            $('#aaa').on('click', function() {
		                if ($(this).hasClass('active')) {
		                    $(this).removeClass('active');
		                    $('.weui-skin_android').show().find('.weui-actionsheet__cell').text('取消收藏商品成功');
		                    setTimeout(function() {
		                        $('.weui-skin_android').hide();
		                    }, 1000)
		                } else {
		                    $(this).addClass('active');
		                    $('.weui-skin_android').show().find('.weui-actionsheet__cell').text('收藏商品成功');
		                    setTimeout(function() {
		                        $('.weui-skin_android').hide();
		                    }, 1000)
		                }
		            })

		            // 点击切换商品信息和购物说明
		            $('ul.tag-list').on('click','li',function(){
		            	$(this).addClass('active').siblings().removeClass('active');
		            	if($(this).index() == 0){
		            		$('.note').hide();
		            		$('.desc').show();
		            	}else{
		            		$('.note').show();
		            		$('.desc').hide();
		            	}
		            })

                }
            })
        },
    }
    details.init();
    details.data();
})
