$('.toolkit').html(`
  <div class="toolkit-list">
      <div class="phone">
        <i class="iconfont">&#xe6bf;</i>
        <span>手机购买</span>
      </div>
      <div class="news">
        <i class="iconfont">&#xe61d;</i>
        <span>消息</span>
      </div>
      <div class="cart">
        <i class="iconfont">&#xe600;</i>
        <span>购物车</span>
      </div>
      <div class="response">
        <i class="iconfont">&#xe738;</i>
        <span>反馈</span>
      </div>
      <div class="report">
        <i class="iconfont">&#xe652;</i>
        <span>举报</span>
      </div>
      <div class="scroll-top no-show">
        <i class="iconfont">&#xe609;</i>
        <span>回到顶部</span>
      </div>
    </div>
`);

// 滚动条滚动的距离到一定位置，出现回到顶部模块
(() => {
  const $toolkit_list = $('.toolkit-list');
  const $top = $toolkit_list.find('.scroll-top');
  $(window).scroll(() => {
    if ($(this).scrollTop() >= 600) {
      $top.removeClass('no-show');
    } else {
      $top.addClass('no-show');
    }
  });
  // 滚动到顶部
  $top.click(() => {
    $('html,body').animate({
      scrollTop: 0
    }, 1000);
  })
})();

// 点击侧边栏购物车图标，进入购物车页面
(() => {
  $('.toolkit .toolkit-list .cart').click(() => {
    if (!localStorage.getItem('userinfo')) {
      location.href = '../../templates/login.html';
    }
    window.open('../../templates/cart.html');
  })
})();