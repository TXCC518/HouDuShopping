// 从localStorage中取出数据放进购物车中
(() => {
  const $cart_top = $('.cart-top');
  const $cart_middle = $('.cart-middle');
  const $cart_bottom = $('.cart-bottom');
  const $ul = $cart_middle.find('.total-items');
  let shopping_cart = JSON.parse(localStorage.getItem('shopping_cart'));
  $cart_top.children('.title').find('b').text(shopping_cart.length);
  for (let i = 0; i < shopping_cart.length; i++) {
    let id = Number(shopping_cart[i].id);
    let price = Number(data[id].price);
    let number = Number(shopping_cart[i].number);
    let sku = shopping_cart[i].sku;
    $ul.append(`<li class="every-item">
                <div class="shopping-top">
                  <span class="checkbox"><input type="checkbox" name="" id="check">
                    <label></label>
                  </span>
                  <span class="img"><img src="../static/images/index.png" alt=""></span>
                  <span class="shop-title">店铺：${data[id].shop_name}</span >
                </div >
            <div class="shopping-bottom">
              <ul class="item-content">
                <li class="td-chk">
                  <div class="checkbox">
                  <input type="checkbox" name="" id="check">
                  <label></label>
                  </div>
                </li>
                <li class="td-item">
                  <div class="img">
                    <img
                      src=${shopping_cart[i].images}
                      alt="">
                  </div>
                  <div class="info">
                    <div class="title"><span>${data[id].title}</span></div>
                    <div class="index">
                      <img src="../static/images/cart1.png" alt="">
                        <img src="../static/images/cart2.png" alt="">
                        </div>
                    </div>
                </li>
                <li class="td-info">
                  <div class="many-attr">
                    <div class="attr"></div>
                  </div>
                </li>
                <li class="td-price">
                  <div class="every-price"><span>￥${price.toFixed(2)}</span></div>
                </li>
                <li class="td-amount">
                  <div class="bottons">
                    <div class="btn-l">
                      <button>-</button>
                    </div>
                    <div class="input">
                      <input type="text" name="" id="" value="${number}">
                    </div>
                    <div class="btn-r">
                      <button>+</button>
                    </div>
                  </div>
                </li>
                <li class="td-sum">
                  <div class="total-price">
                    ￥<span>${(price * number).toFixed(2)}</span>
                  </div>
                </li>
                <li class="td-op">
                  <div class="op">
                    <span class="remove-a">删除</span>
                  </div>
                </li>
              </ul>
            </div>
              </li > `);
    const $li = $ul.children('.every-item');
    let k = 0;
    for (let key in data[id].sku) {
      $li.eq(i).find('.many-attr').find('.attr').append(`
      <p class="sku">${key}：${sku[k]}</p>
      `);
      k++;
    }
  }

  // 更新总金额和选中商品数量
  function getTotalMoney() {
    let sum_money = 0;
    let num = 0;
    const $res_button = $('.button #res-button');
    const $every_goods = $('.every-item');
    const $every_price = $('.td-sum span');
    const $num = $('.nums .num');
    for (let i = 0; i < $every_goods.length; i++) {
      if ($every_goods.eq(i).find('.td-chk').hasClass('bgurl')) {
        sum_money += Number($every_price.eq(i).text());
        num++;
      }
    }
    $('#total-price').text(sum_money.toFixed(2));
    $('.total-price #total-price').text(sum_money.toFixed(2));
    $num.text(num);
    if (num === 0) {
      for (let i = 0; i < $res_button.length; i++) {
        $res_button.eq(i).removeClass('is-button');
      }
    } else {
      for (let i = 0; i < $res_button.length; i++) {
        $res_button.eq(i).addClass('is-button');
      }
    }
  }
  // 检查当前选中了多少商品，是否应该全选或不全选
  function is_sum() {
    const $th_chk = $('.sum-check');
    const $top_check = $('.every-item').children('.shopping-top').find('.checkbox');
    for (let i = 0; i < $top_check.length; i++) {
      if (!$top_check.eq(i).hasClass('bgurl')) {
        for (let j = 0; j < $th_chk.length; j++) {
          $th_chk.eq(j).removeClass('bgurl');
        }
        return;
      }
    }
    for (let j = 0; j < $th_chk.length; j++) {
      $th_chk.eq(j).addClass('bgurl');
    }
  }
  // 给复选框绑定点击事件
  const $th_chk = $('.sum-check');
  const $every_item = $('.every-item');
  const $item_content = $('.shopping-bottom .item-content');
  for (let i = 0; i < $every_item.length; i++) {
    const $top_check = $every_item.eq(i).children('.shopping-top').find('.checkbox');
    const $td_chk = $every_item.eq(i).find('.td-chk');
    $top_check.click(() => {
      $top_check.find('input').prop('checked', false);
      $td_chk.find('input').prop('checked', false);
      if ($top_check.hasClass('bgurl')) {
        $item_content.eq(i).removeClass('is-ok');
        $top_check.removeClass('bgurl');
        $td_chk.removeClass('bgurl');
      } else {
        $item_content.eq(i).addClass('is-ok');
        $top_check.addClass('bgurl');
        $td_chk.addClass('bgurl');
      }
      is_sum();
      getTotalMoney();
    });
    $td_chk.click(() => {
      $top_check.find('input').prop('checked', false);
      $td_chk.find('input').prop('checked', false);
      if ($td_chk.hasClass('bgurl')) {
        $item_content.eq(i).removeClass('is-ok');
        $top_check.removeClass('bgurl');
        $td_chk.removeClass('bgurl');
      } else {
        $item_content.eq(i).addClass('is-ok');
        $top_check.addClass('bgurl');
        $td_chk.addClass('bgurl');
      }
      is_sum();
      getTotalMoney();
    });
  }
  // 点击全选，选中每一个商品
  for (let i = 0; i < $th_chk.length; i++) {
    $th_chk.eq(i).click(() => {
      $th_chk.find('input').prop('checked', false);
      if ($th_chk.hasClass('bgurl')) {
        $th_chk.removeClass('bgurl');
        for (let i = 0; i < $every_item.length; i++) {
          const $top_check = $every_item.eq(i).children('.shopping-top').find('.checkbox');
          const $td_chk = $every_item.eq(i).find('.td-chk');
          $top_check.removeClass('bgurl');
          $td_chk.removeClass('bgurl');
          $item_content.eq(i).removeClass('is-ok');
        }
      } else {
        $th_chk.addClass('bgurl');
        for (let i = 0; i < $every_item.length; i++) {
          const $top_check = $every_item.eq(i).children('.shopping-top').find('.checkbox');
          const $td_chk = $every_item.eq(i).find('.td-chk');
          $top_check.addClass('bgurl');
          $td_chk.addClass('bgurl');
          $item_content.eq(i).addClass('is-ok');
        }
      }
      getTotalMoney();
    });
  }

  // 改变商品数量
  function subs_noShow(j) {
    if (Number($input.eq(j).val()) === 1) {
      $('.btn-l button').eq(j).attr('disabled', true);
    } else {
      $('.btn-l button').eq(j).attr('disabled', false);
    }
  }
  const $input = $('.td-amount').find('input');
  const $every_price = $('.td-sum span');
  for (let j = 0; j < $input.length; j++) {
    let id = Number(shopping_cart[j].id);
    let price = Number(data[id].price);
    subs_noShow(j);
    $('.btn-l').eq(j).click(() => {
      $input.eq(j).val(Number($input.eq(j).val()) - 1);
      $every_price.eq(j).text((Number($every_price.eq(j).text()) - price).toFixed(2))
      shopping_cart[j].number = $input.eq(j).val();
      localStorage.setItem('shopping_cart', JSON.stringify(shopping_cart));
      subs_noShow(j);
      getTotalMoney();
    });

    $('.btn-r').eq(j).click(() => {
      $input.eq(j).val(Number($input.eq(j).val()) + 1);
      $every_price.eq(j).text((Number($every_price.eq(j).text()) + price).toFixed(2))
      subs_noShow(j);
      shopping_cart[j].number = $input.eq(j).val();
      localStorage.setItem('shopping_cart', JSON.stringify(shopping_cart));
      getTotalMoney();
    });
  }
  // 删除按钮，删除当前商品
  const $remove = $('.td-op .op span');
  for (let i = 0; i < $remove.length; i++) {
    $remove.eq(i).click(() => {
      shopping_cart.splice(i, 1);
      localStorage.setItem('shopping_cart', JSON.stringify(shopping_cart));
      location.reload();
    })
  }
  // 总的删除按钮，删除选中的商品
  $('.remove span').click(() => {
    const $every_item = $('.every-item');
    for (let i = 0; i < $every_item.length; i++) {
      if ($every_item.eq(i).find('.td-chk').hasClass('bgurl')) {
        delete shopping_cart[i];
      }
    }
    let temp = [];
    for (let i = 0; i < shopping_cart.length; i++) {
      if (shopping_cart[i]) {
        temp.push(shopping_cart[i]);
      }
    }
    shopping_cart = temp;
    localStorage.setItem('shopping_cart', JSON.stringify(shopping_cart));
    location.reload();
  })
})();