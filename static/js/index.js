/* 用户登录 */
(() => {
  function user_Show() {
    let userinfo = localStorage.getItem('userinfo');
    if (!userinfo) return;
    userinfo = JSON.parse(userinfo);
    $('.header .user .user-show').removeClass('no-show');
    $('.header .user .user-show img').attr('src', '../static/images/avatar.jpg');
    $('.header .user .user-show i').html(userinfo.userName);
    $('.header .user .login').addClass('no-show');
  }
  $('.header .user .user-show a').click(function () {
    localStorage.clear();
    $('.header .user .user-show').addClass('no-show');
    $('.header .user .login').removeClass('no-show');
  });
  user_Show();
})();

/* 主页商品信息 */
(() => {
  data = [
    { img: '../static/images/goods/1.jpg' },
    { img: '../static/images/goods/2.jpg' },
    { img: '../static/images/goods/3.jpg' },
    { img: '../static/images/goods/4.jpg' },
    { img: '../static/images/goods/5.jpg' },
    { img: '../static/images/goods/6.jpg' },
    { img: '../static/images/goods/7.jpg' },
    { img: '../static/images/goods/8.jpg' },
    { img: '../static/images/goods/9.jpg' },
    { img: '../static/images/goods/10.jpg' },
    { img: '../static/images/goods/11.jpg' },
    { img: '../static/images/goods/12.jpg' },
    { img: '../static/images/goods/13.jpg' },
    { img: '../static/images/goods/14.jpg' },
    { img: '../static/images/goods/15.jpg' },
    { img: '../static/images/goods/16.jpg' },
    { img: '../static/images/goods/17.jpg' },
    { img: '../static/images/goods/18.jpg' },
    { img: '../static/images/goods/19.jpg' },
    { img: '../static/images/goods/20.jpg' },
    { img: '../static/images/goods/21.jpg' },
    { img: '../static/images/goods/22.jpg' },
    { img: '../static/images/goods/23.jpg' },
    { img: '../static/images/goods/24.jpg' },
    { img: '../static/images/goods/25.jpg' },
    { img: '../static/images/goods/26.jpg' },
    { img: '../static/images/goods/27.jpg' },
    { img: '../static/images/goods/28.jpg' },
    { img: '../static/images/goods/29.jpg' },
    { img: '../static/images/goods/30.jpg' },
    { img: '../static/images/goods/31.jpg' },
    { img: '../static/images/goods/32.jpg' },
    { img: '../static/images/goods/33.jpg' },
    { img: '../static/images/goods/34.jpg' },
    { img: '../static/images/goods/35.jpg' },
    { img: '../static/images/goods/36.jpg' },
    { img: '../static/images/goods/37.jpg' },
    { img: '../static/images/goods/38.jpg' },
    { img: '../static/images/goods/39.jpg' },
    { img: '../static/images/goods/40.jpg' },
  ];
  let i = 0;
  function getShopList() {
    let num = 0;
    for (; i < data.length; i++) {
      if (num === 8) return;
      $('.shop-background .shop-list').append(`
    <div class="shop-item">
        <div class="img">
          <img src="${data[i].img}" alt="">
        </div>
        <div class="tittle">honor/荣耀 荣耀9X PRO 4G升降式摄像头 游戏手机 百元老人手机</div>
        <div class="price">￥ <b>5499</b></div>
        <img class="index" src="../static/images/index.png">
      </div>
    `);
      num++;
    }
  }
  getShopList();
  $(window).scroll(function () {
    // 滚动条滚动的距离
    let scrollTop = $(this).scrollTop();
    // 整个网页的长度
    let scrollHeight = $(document).height();
    // 滚动条初始的长度
    let windowHeight = $(this).height();
    console.log(scrollTop, scrollHeight, windowHeight);
    if (scrollTop + windowHeight + 10 >= scrollHeight) {
      //这部分写逻辑代码
      //滚动条下拉时，再追加下面的dom数据
      if (i < data.length) {
        getShopList();
      }
    }
  });
})()

/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta charset="UTF-8">
    <title>滚动简易加载</title>
    <script src="http://www.jq22.com/jquery/jquery-1.10.2.js"></script>
    <style>
        *{margin: 0;padding: 0}
        body{background: #f2f2f2}
        .box{width:96%;max-width: 500px;margin: 0 auto;padding: 2%;font-size:14px;}
        .box-list{padding:30px 0;text-align: center;border: 1px solid #57bfa0;border-radius: 6px;width: 100%;margin-bottom: 3%;background: #fff}
        .box-list i{margin: 0 5px;font-style: normal}
    </style>
</head>
<script type="text/javascript">

    $(function () {

        var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        let num= 7;
        
        //页面初始时，只加载7条数据
        let str = getData(data,0,7);
        $(".box").html(str)  
        
        function getData(data,start,end) { 
            let str = "";
            let zdata = data.slice(start,end)
            for (let i = 0; i < zdata.length; i++) {
                str += "<div class=\"box-list\">第<i>"+ zdata[i]+"</i>条信息</div>"
            }
            return str;
        }
        
        //滚动监听
        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var scrollHeight = $(document).height();
            var windowHeight = $(this).height();
           
            if (scrollTop + windowHeight + 10 >= scrollHeight) {
                //这部分写逻辑代码
                //滚动条下拉时，再追加下面的dom数据
                if(num <= data.length){
                    let sum = getData(data,num,num+7);
                    num = num+7;
                    $(".box").append(sum)
                }
            }
        });
    });

  
</script>
<body>
    <div class="box">

    </div>
</body>
</html>
*/