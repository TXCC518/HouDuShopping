// 每一个商品的唯一标识符
let gid = location.href.split('=')[1];
$('title').html(data[gid].title);
// 店铺详细信息
(() => {
  console.log(data[gid].shop_image);
  $('.shop-detail .shopInfo .shop-name .image img').attr('src', data[gid].shop_image);
  $('.shop-detail .shopInfo .shop-name .shop-title .title').html(data[gid].shop_name);
})();

// 商品详细信息
(() => {
  // 左侧商品图片显示
  // 页面加载完成后，先显示li列表中的第一个图片，并显示样式
  const $shop_left = $('.shop-detail-info .shop-detail-info-top .shop-left');
  const $good_image = $shop_left.children('.good-image');
  const $ul = $shop_left.children('.good-detail-images').children('ul');
  $good_image.find('img').attr('src', data[gid].images[0]);
  for (let i = 0; i < data[gid].images.length; i++) {
    $ul.append(`
      <li><img src=${data[gid].images[i]} alt=""></li>
    `)
  }
  const $li_imgs = $ul.children('li');
  $li_imgs.eq(0).addClass('image-style');
  for (let i = 0; i < $li_imgs.length; i++) {
    $li_imgs.eq(i).mouseover(function () {
      $ul.children('.image-style').removeClass('image-style');
      $li_imgs.eq(i).addClass('image-style');
      $good_image.find('img').attr('src', data[gid].images[i]);
      $good_image.addClass('padding-show');
    });
  }

  // 左侧商品图放大
  const $middle = $good_image.children('div');
  const $large = $('.good-image-right');
  const $layer = $middle.children('.layer');
  // 经过商品图遮罩层显示，放大图片显示
  $middle.mouseenter(() => {
    $large.css('width', $middle.css('width'));
    $large.css('heigth', $middle.css('height'));
    $layer.css('display', 'block');
    $large.css('display', 'block');
    $large.css('backgroundImage', `url(${$good_image.find('img').attr('src')})`);
  });
  // 离开商品图遮罩层隐藏，放大图片隐藏
  $middle.mouseleave(() => {
    $layer.css('display', 'none');
    $large.css('display', 'none');
  });
  // 在商品图上移动触发事件,遮罩层移动，放大图片显示改变
  $middle.mousemove((e) => {
    // x、y为鼠标在商品图中的位置
    let x = e.offsetX;
    let y = e.offsetY;
    let mw = parseInt($middle.css('width')), mh = parseInt($middle.css('height'));
    $layer.css('width', mw / 2 + 'px');
    $layer.css('height', mh / 2 + 'px');
    $large.css('background-size', `${mw * 2}px ${mh * 2}px`);
    let width = mw / 2, height = mh / 2;
    if (x >= 0 && x <= mw && y >= 0 && y <= mh) {
      // mx、my表示遮罩层x轴、y轴移动的距离
      let mx = 0, my = 0;
      if (x < width / 2) mx = 0;
      else if (x > mw - width / 2) mx = mw - width;
      else mx = x - width / 2;

      if (y < height / 2) my = 0;
      else if (y > mh - height / 2) my = mh - height;
      else my = y - height / 2;
      // 改变遮罩层位置
      $layer.css('top', my + 'px');
      $layer.css('left', mx + 'px');
      // 放大图片
      $large.css('backgroundPositionX', -2 * mx + 'px');
      $large.css('backgroundPositionY', -2 * my + 'px');
    }

  })

  // 右侧商品各种属性显示
  let idx = 0;
  const $shop_right = $('.shop-detail-info .shop-detail-info-top .shop-right');
  $shop_right.children('.address').find('.city').html(`${data[gid].provice}${data[gid].city}`);
  const $many_attr = $shop_right.children('.many-attr');
  $.each(data[gid].sku, (key) => {
    $many_attr.append(`
    <div class="goods-attr">
      <div class="attr"><span>${key}：</span></div>
                  <div class="attribute">
                  </div>
    </div>`);
    const $attribute = $many_attr.children('.goods-attr').children('.attribute');
    for (let it = 0; it < data[gid].sku[key].length; it++) {
      $attribute.eq(idx).append(`<div class="goods-style">
                    <div>
                      <span>${data[gid].sku[key][it]}</span>
                    </div>
                  </div>`)
    }
    const $div = $attribute.children('.goods-style').children('div');
    if (data[gid].style_details.length > 0 && idx === 0) {
      for (let i = 0; i < $div.length; i++) {
        $div.eq(i).prepend(`
          <img src=${data[gid].style_details[i]}>
        `);
        // 点击商品样式，改变左侧商品图展示
        $div.eq(i).click(function () {
          $good_image.find('img').attr('src', $div.children('img').eq(i).attr('src'));
          $good_image.removeClass('padding-show');
        });
      }
    }

    // 点击商品样式，改变商品按钮外观
    const $goods_style = $(`.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr:nth-child(${idx + 1}) .attribute .goods-style`);
    for (let i = 0; i < $goods_style.length; i++) {
      $goods_style.eq(i).click(() => {
        for (let j = 0; j < $goods_style.length; j++) {
          $goods_style.eq(j).removeClass('goods-show');
        }
        $goods_style.eq(i).addClass('goods-show');
      })
    }
    idx++;
  });
  $many_attr.append(`
    <div class="goods-attr">
                <div class="attr">
                  <span>数量：</span>
                </div>
                <div class="attribute end">
                  <div class="sub style-show">
                    <input type="submit" value="-">
                  </div>
                  <div class="number">
                    <input type="text" name="" id="" value="1">
                  </div>
                  <div class="add style-show">
                    <input type="submit" value="+">
                  </div>
                  <div class="sales"><span>有货</span></div>
                </div>
              </div>
  `)

  // 商品数量选择
  const $end = $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute.end');
  const $number = $end.children('.number').find('input');
  const $sub = $end.children('.sub').find('input');
  const $add = $end.children('.add').find('input');
  function sub_noShow() {
    if (Number($number.val()) === 1) {
      $sub.attr('disabled', true);
      $end.children('.sub').removeClass('style-show');
      $sub.css('cursor', 'not-allowed');
    } else {
      $sub.attr('disabled', false);
      $end.children('.sub').addClass('style-show');
      $sub.css('cursor', 'pointer');
    }
  }
  sub_noShow();
  $sub.click(() => {
    $number.val(Number($number.val()) - 1);
    sub_noShow();
  });

  $add.click(() => {
    $number.val(Number($number.val()) + 1);
    sub_noShow();
  });

  $number.change(() => {
    $number.attr("value", $number.val());
    console.log('text');
  });

  // 商品加入购物车，将当前商品存入到local storage中
  $shop_right.children('.buy-or-cart').find('.btn2').click(function () {
    if (!localStorage.getItem('userinfo')) {
      location.href = '../../templates/login.html';
    }
    const $success = $('.success-col');
    const $default = $('.default-col');
    const $goods_show = $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute .goods-style.goods-show');
    if ($goods_show.length !== Object.keys(data[gid].sku).length) {
      $default.removeClass('no-show');
      setTimeout(() => {
        $default.addClass('no-show');
      }, 3000);
      return;
    }
    $success.removeClass('no-show');
    setTimeout(() => {
      $success.addClass('no-show');
    }, 3000);
    let shopping_cart = JSON.parse(localStorage.getItem('shopping_cart'));
    if (!shopping_cart) {
      shopping_cart = [];
    }
    let skus = { sku: [], images: $good_image.find('img').attr('src'), id: gid, number: $number.val() };
    for (let i = 0; i < $goods_show.length; i++) {
      skus.sku.push($goods_show.eq(i).find('span').text());
    }
    shopping_cart.push(skus);
    localStorage.setItem('shopping_cart', JSON.stringify(shopping_cart));
  })

})();

// 商品详情图
(() => {
  for (let i = 0; i < data[gid].detail_images.length; i++) {
    $('.shop-detail-info .shop-detail-info-bottom .image-center').append(`
    <img
              src=${data[gid].detail_images[i]}
              alt="">
  `);
    console.log(data[gid].detail_images[i]);
  }
})();

