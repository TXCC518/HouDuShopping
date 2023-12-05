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
})()