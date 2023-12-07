let gid = location.href.split('=')[1];
// 店铺详细信息
(() => {
  console.log(data[gid].shop_image);
  $('.shop-detail .shopInfo .shop-name .image img').attr('src', data[gid].shop_image);
  $('.shop-detail .shopInfo .shop-name .shop-title .title').html(data[gid].shop_name);
})();

// 商品详细信息
(() => {
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
    })
  }
})();