let timerId = null;
// 生成二维码与检验用户是否登录
(() => {
  const $id_ewm = $('.ewm-box .ewm-image');
  const $ewm = $('.ewm-box');
  async function success() {
    $ewm.removeClass('no-show');
    const $forms = $('.form');
    for (let i = 0; i < $forms.length; i++) {
      $forms.eq(i).addClass('no-show');
    }
    // 请求生成二维码的参数
    let data1 = await axios({
      url: 'http://xiaochengxu.houdu.online/login/wx/saoma',
      method: 'post',
    })
    data1 = data1.data.data.data;
    console.log(data1);
    $id_ewm.html('');
    // 生成二维码
    let qrcode = new QRCode(document.querySelector('.ewm-box .ewm-image'), {
      text: data1.qrCodeReturnUrl,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    // 判断用户是否扫码登陆
    timerId = setInterval(async () => {
      let data2 = await axios({
        url: 'http://xiaochengxu.houdu.online/login/wx/saoma/isok',
        method: 'post',
        data: {
          tempUserId: data1.tempUserId,
        }
      });
      console.log(data2);
      if (data2.status === 201) return;
      clearInterval(timerId);
      data2 = data2.data.data.token;
      let token = data2.split('.')
      // 通过split()方法将token转为字符串数组
      // 这样得到的长度为3的数组 分别就是 header、payload 以及signature
      // 我们可以通过访问数组下标的方式拿到主要存数据的payload 再进行解析 -----

      // 格式化数据
      token = token[1].replace(/-/g, "+").replace(/_/g, "/")

      let userinfo = JSON.parse(decodeURIComponent(escape(window.atob(token))));
      // 这样就能到到我们需要的信息的json数据
      localStorage.setItem('userinfo', JSON.stringify(userinfo));
      window.location.href = '../../templates/index.html';
    }, 3000);
  }
  const $ewms = $('.form .ewm');
  for (let i = 0; i < $ewms.length; i++) {
    $ewms[i].addEventListener('click', success);
  }
  $id_ewm.click(success);
})();

const $container = $('.container').eq(0);
const $signIn = $('#sign-in');
const $signUp = $('#sign-up');
// 显示二维码，进行扫码登录
$signUp.click(function () {
  $container.addClass('active');
  clearInterval(timerId);
  $('.ewm-box').addClass('no-show');
  const $forms = $('.form');
  for (let i = 0; i < $forms.length; i++) {
    $forms.eq(i).removeClass('no-show');
  }
});
$signIn.click(function () {
  $container.removeClass('active');
  clearInterval(timerId);
  $('.ewm-box').addClass('no-show');
  const $forms = $('.form');
  for (let i = 0; i < $forms.length; i++) {
    $forms[i].classList.remove('no-show');
  }
});

// 表单验证
(() => {
  const regs = [/^[0-9a-zA-Z_\u3E00-\u9FA5]{3,15}$/, /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/, /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/];
  const errors = ['请输入4-16长度数字、字母、下划线', '请输入正确的邮箱格式', '必须包含字母、数字、特称字符，至少8个字符', '请输入正确的邮箱格式', '必须包含字母、数字、特称字符，至少8个字符'];
  const $spans = $('.form span');
  const $inputs = $('.form input');
  // 验证格式是否正确
  function verify(idx) {
    if (!regs[idx].test($inputs.eq(idx).val())) {
      $spans.eq(idx).text(errors[idx]);
      return false;
    }
    $spans.eq(idx).text('');
    return true;
  }
  // 将input表单绑定change事件，值改变进行验证
  for (let i = 0; i < $inputs.length; i++) {
    $inputs.eq(i).change({ idx: i }, (event) => {
      verify(event.data.idx);
    });
  }

  const $signIn = $('.signIn');
  const $signUp = $('.signUp');

  // 点击登录
  $signIn.click(() => {
    let t = true;
    for (let i = 3; i < $inputs.length; i++) {
      if (!verify(i)) {
        t = false;
        $spans.eq(i).text(errors[i]);
      }
    }
    if (t) {
      let userInfo = { userName: '0x3f3f3f3f' };
      localStorage.setItem('userinfo', JSON.stringify(userInfo));
      window.location.href = '../../templates/index.html';
    }
  });

  // 点击注册
  $signUp.click(() => {
    let t = true;
    for (let i = 0; i < 3; i++) {
      if (!verify(i)) {
        t = false;
        $spans.eq(i).text(errors[i]);
      }
    }
    if (t) {
      alert('注册成功!');
      for (let i = 0; i < 3; i++) {
        $inputs.eq(i).val('');
      }
      $('#sign-in').click();
    }
  });
})();