// 点击登录显示或隐藏二维码盒子
(() => {
  document.querySelector('.header .content .login').onclick = async () => {
    const ewm = document.querySelector('.header .content .erweima');
    ewm.classList.toggle('no-show');
    if (ewm.classList.contains('no-show')) return;
    // 请求生成二维码的参数
    let data1 = await axios({
      url: 'http://xiaochengxu.houdu.online/login/wx/saoma',
      method: 'post',
    })
    data1 = data1.data.data.data;
    console.log(data1);
    const id_ewm = document.querySelector('.header #ewm');
    id_ewm.innerHTML = '';
    // 生成二维码
    let qrcode = new QRCode(id_ewm, {
      text: data1.qrCodeReturnUrl,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    // 判断用户是否扫码登陆
    let timerId = setInterval(async () => {
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
    }, 3000);
  }
})()