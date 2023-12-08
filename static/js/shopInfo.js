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
  const $good_image = $('.shop-detail-info .shop-detail-info-top .shop-left .good-image img');
  $good_image.attr('src', data[gid].images[0]);
  for (let i = 0; i < data[gid].images.length; i++) {
    $('.shop-detail-info .shop-detail-info-top .shop-left .good-detail-images ul').append(`
      <li><img src=${data[gid].images[i]} alt=""></li>
    `)
  }
  const $li_imgs = $('.shop-detail-info .shop-detail-info-top .shop-left .good-detail-images ul li');
  $li_imgs.eq(0).addClass('image-style');
  for (let i = 0; i < $li_imgs.length; i++) {
    $li_imgs.eq(i).mouseover(function () {
      $('.shop-detail-info .shop-detail-info-top .shop-left .good-detail-images ul .image-style').removeClass('image-style');
      $li_imgs.eq(i).addClass('image-style');
      $good_image.attr('src', data[gid].images[i]);
    });
  }

  // 右侧商品各种属性显示
  let idx = 0;
  const $many_attr = $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr');
  $.each(data[gid].sku, (key) => {
    $many_attr.append(`
    <div class="goods-attr">
      <div class="attr"><span>${key}：</span></div>
                  <div class="attribute">
                  </div>
    </div>`);
    const $attribute = $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute');
    for (let it = 0; it < data[gid].sku[key].length; it++) {
      $attribute.eq(idx).append(`<div class="goods-style">
                    <div>
                      <span>${data[gid].sku[key][it]}</span>
                    </div>
                  </div>`)
    }
    const $div = $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute .goods-style div');
    if (data[gid].style_details.length > 0 && idx === 0) {
      for (let i = 0; i < $div.length; i++) {
        $div.eq(i).prepend(`
          <img src=${data[gid].style_details[i]}>
        `);
        // 点击商品样式，改变左侧商品图展示
        $div.eq(i).click(function () {
          $good_image.attr('src', $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute .goods-style div img').eq(i).attr('src'))
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
  const $number = $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute.end .number input');
  const $sub = $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute.end .sub input');
  const $add = $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute.end .add input');
  function sub_noShow() {
    if (Number($number.val()) === 1) {
      $sub.attr('disabled', true);
      $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute.end .sub').removeClass('style-show');
      $sub.css('cursor', 'not-allowed');
    } else {
      $sub.attr('disabled', false);
      $('.shop-detail-info .shop-detail-info-top .shop-right .many-attr .goods-attr .attribute.end .sub').addClass('style-show');
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
  })

  $number.change(() => {
    $number.attr("value", $number.val());
    console.log('text');
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

