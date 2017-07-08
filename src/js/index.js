//轮播图
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay: 3000,
    autoplayDisableOnInteraction: false
});

var param = location.search.slice(1)
var arr = param.split('&')
var username = '';
arr.forEach(function(items) {
    var temp = items.split('=')
    if(temp[0] == 'username') {
        username = temp[1]
    }
})  
//返回顶部
$(document).scroll(function() {
    if ($(document).scrollTop() > 100) {
        $('.icon4').fadeIn();

    } else {
        $('.icon4').fadeOut()

    }

    //按钮top
    $('.icon4').on('click', function() {
        $('body').stop(true).animate({
            scrollTop: 0
        }, 500)
    })

})

$('.list1').on('click',function(){
    window.location.href="./html/list1.html?Class=面膜&username="+username
})
$('.list2').on('click',function(){
    window.location.href="./html/list1.html?Class=服饰&username="+username
})
$('.list3').on('click',function(){
    window.location.href="./html/list1.html?Class=洗浴&username="+username
})
$('.list4').on('click',function(){
    window.location.href="./html/list1.html?Class=旅游&username="+username
})
//搜索
// $('#shou').blur(
//     function() {
//         if ($('#shou').val() == '') {

//         } else {

//             console.log($('#shou').val())
//                 // window.location.href="http://w.lefeng.com/search/"+$('#shou').val()
//         }
//     }
// )
// $(document).keypress(function(e) {
//     // 回车键事件  
//     if (e.which == 13) {
//         if ($('#shou').val() == '') {

//         } else {

//             console.log($('#shou').val())
//                 // window.location.href="http://w.lefeng.com/search/"+$('#shou').val()
//         }

//     }
// });



// var page = 1

// function loa() {
//     $(".weui-panel__ft").hide();
//     $(".page__bd").show();
//     $("#loadingToast").show();
//     $.ajax({
//         type: 'get',
//         url: "http://localhost:3000/index",
//         async: true,
//         data: {
//             page: page++
//         },
//         dataType: 'json',
//         success: function(data) {
//             console.log(data.jobs)
//             var html = data.jobs.map(function(item) {
//                 return `       <li class="_12WPUxCZhYhpNDEXav7r1j">
//                 <a href="/brand/800035815">
//                     <div class="lazyload-img-wraper loaded" style="height: 141px;">
//                         <div class="lazyload-img" style="background-image: url(${item.brandImage});"></div>
//                     </div>
//                     <div class="pms-wrap">
//                         <p>${item.pms}</p>
//                     </div>
//                 </a>
//                 <p class="brandInfo"><span>${item.agio}</span>
//                     <!-- react-text: 655 -->${item.name}
//                     <!-- /react-text -->
//                 </p>
//             </li>
//                     `
//             }).join(" ")
//             $(".weui-panel__ft").show();
//             $(".page__bd").hide();
//             $("#loadingToast").hide();
//             $("#clearfix").append(html);
//         }
//     })

// }
// loa()

var page = 1

loa()

$(window).scroll(function() {
    if ($(window).scrollTop() >= page * 1000) {
        page++
        loa()
    }
})

function loa() {
    $.ajax({
        type: 'get',
        url: "http://localhost:3000/index",
        async: true,
        data: {
            page: page
        },
        dataType: 'json',
        success: function(data) {
            console.log(data.jobs)
            var html = data.jobs.map(function(item) {
            	console.log(username)
                return `       <li class="_12WPUxCZhYhpNDEXav7r1j">
                <a class="nav" name="${item.name}">
                    <div class="lazyload-img-wraper loaded" style="height: 141px;">
                        <div class="lazyload-img" style="background-image: url(${item.brandImage});"></div>
                    </div>
                    <div class="pms-wrap">
                        <p>${item.pms}</p>
                    </div>
                </a>
                <p class="brandInfo"><span>${item.agio}</span>
                    <!-- react-text: 655 -->${item.name}
                    <!-- /react-text -->
                </p>
            </li>
                    `
            }).join(" ")

            $("#clearfix").append(html);
            $(".nav").click(function(){
            	location.href="./html/list1.html?Class="+this.name+"&username="+username
            })
        }
    })
}

$('.search-bar').on('click', function() {
    $("#shou").show()
})
$(".qu").on('click', function() {
     $("#shou").hide()

})

//搜索 取消
// $(".keyword").focus(function() {
//     $(".shou").show()
//     $(".qu").hide()
// })


$(".keyword").bind('input propertychange', function() {
    if ($('.keyword').val() === '') {
        $(".shou").hide()
        $(".qu").show()


    } else {
        $(".shou").show()
        $(".qu").hide()


    }
});


$('.shou').on('click', function() {

    if ($('.keyword').val() == '') {

    } else {

        console.log($('.keyword').val())
         window.location.href = "./html/list1.html?Class=" + $('.keyword').val()
    }

})

//点击home返回首页
$(".home").on('click', function() {
    window.location.href = "index.html"
})

$("._2zSykbfnp9HX1QFp7QarD5").on('click', '.highlight', function() {
    console.log($(this).html())
    $(".shou").show()
    $(".qu").hide()
    $(".keyword").val($(this).html())

})

//历史
$('.shou').on('click', function() {

    if ($('.keyword').val() == '') {

    } else {
      
        $.ajax({
            type: 'post',
            url: 'http://localhost:3000/history',
            data: {
                username: $('.keyword').val()
            },
            // dataType:'json',
            success: function(res) {
                console.log(typeof res);

                if (typeof res==='object') {
                      var dd=$('<dd>').addClass('ui-decoration-hyperlink look').html($('.keyword').val());
                        $('.history').append(dd)
                }


            }
        })
    }

})
//历史查询记录
$.ajax({
    type: 'get',
    url: 'http://localhost:3000/look',
    dataType: 'json',
    success: function(data) {
        console.log(data.jobs)
        var html=data.jobs.map(function(item){
            return `
                <dd class="ui-decoration-hyperlink look">${item.name}</dd>
                
            `
        })
        $(".history").on('click', '.look', function() {
            console.log($(this).html())
            $(".shou").show()
            $(".qu").hide()
            $(".keyword").val($(this).html())

        })
        $('.history').append(html)
    }

})
//删除所有历史记录
$('.search-clear').on('click',function(){

    $.ajax({
        type:'post',
        url: 'http://localhost:3000/qing',
        success: function(data) {
            console.log(data)
        }

    })
    $('.history').html('')

})
//遮罩
//  var i=3
// var time= setInterval(function(){
//      console.log(111)
//      $('#b').html(i--)
//      if (i<0) {
//          clearInterval(time)
//      }
//  },1000)
//  setTimeout(function(){
//      // console.log(1111)
//      $('#zhe').hide()


//  },4000)



// //top
// $(document).scroll(function() {
//     if ($(document).scrollTop() > 45) {
//         $('#tou2').fadeIn();

//     } else {
//         $('#tou2').fadeOut()

//     }


// })
