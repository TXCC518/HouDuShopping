
/* 展示主页商品信息 */
(() => {
  let i = 0;
  function getShopList() {
    let num = 0;
    for (; i < data.length; i++) {
      if (num === 8) return;
      $('.shop-background .shop-list').append(`
    <div class="shop-item" onclick="getShopDetail(${i})">
        <div class="img">
          <img src="${data[i].img}" alt="">
        </div>
        <div class="tittle">${data[i].title}</div>
        <div class="shop-detail">
          <div class="price">
            ￥ <b>${Number(data[i].price).toFixed(2)}</b>
          </div>
          <div class="people-location">
            <span class="people">${data[i].people}+人付款</span>
            <span class="provice">${data[i].provice}</span>
          </div>
        </div>
        <div class="shop-label">
          <span>赠运费险</span>
          <span>包邮</span>
        </div>
        <div class="shopname-detail">
          <div class="image">
            <img src="${data[i].shop_image}">
          </div>
          <div class="shop-name">${data[i].shop_name}</div>
        </div>
        <img class="index" src="../static/images/index.png">
      </div>
    `);
      num++;
    }
  }
  getShopList();
  /* 商品翻页功能 */
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