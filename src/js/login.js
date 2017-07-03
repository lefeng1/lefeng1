$(function() {
    var login = {
        verify: function() {

            $('.btn-primary').on('click', function() {
                var phone = $('#username').val();
                var username = $('#username').val();
                var password = $('#password').val();
                var reg = /^[\d\D]+$/;

                if (!reg.test(phone)) {
                    $('.weui-skin_android').show().find('.weui-actionsheet__cell').text('请输入帐号');
                    setTimeout(function() {
                        $('.weui-skin_android').hide();
                    }, 1000)
                } else if (!reg.test(password)) {
                    $('.weui-skin_android').show().find('.weui-actionsheet__cell').text('请输入密码');
                    setTimeout(function() {
                        $('.weui-skin_android').hide();
                    }, 1000)
                } else {
                    // 发送请求
                    function ajax() {
                        console.log(666)
                        $.ajax({
                            type: "post",
                            url: "http://localhost:3000/cha",
                            data: {
                                username: phone,
                                password: password
                            },
                            async: true,
                            // dataType:"json",
                            success: function(data) {
                                if (data == 'no') {
                                    $('.tips-error').show();
                                } else if (data == 'ok') {
//                                  alert('登录成功');
                                    var check = document.getElementById('check');

                                    // $('#btnReg').on('click', function() {
                                    var _username = $('#username').val();
                                    var _password = $('#password').val();

                                    var str1 = 'username=' + _username;
                                    // var str2 = 'password=' + _password;

                                    if (check.checked) {
                                        var now = new Date();
                                        now.setDate(now.getDate() + 7);

                                        str1 += ';expires=' + now.toUTCString();
                                        // str2 += ';expires=' + now.toUTCString();
                                    }

                                    document.cookie = str1;
                                    // document.cookie = str2;

                                    // })
                                    var cookies = document.cookie;

                                    if (cookies) {
                                        var arr = cookies.split('; ');

                                        arr.forEach(function(item) {
                                            var temp = item.split('=');
                                            if (temp[0] === 'username') {
                                                location.href = './deng.html?username='+username;
                                            }
                                        });
                                    }


                                }
                            }
                        })
                    };
                    ajax()
                }

            });
        },

        login:function(){
                $('.home').on('click',function(){
                    window.location.href="../index.html?username="+username
                })
                $('.bback').on('click',function(){
                    window.history.back()
                })
                $('.eye').on('click',function(){
                    if ($(this).is('.active')) {
                        $(this).removeClass('active')
                      $('#password').attr('type','password')
                        
                    }else{

                     $(this).addClass('active')
                      $('#password').attr('type','text')
                    }
                })
        }

    }
    login.verify();
    login.login();
    


})
