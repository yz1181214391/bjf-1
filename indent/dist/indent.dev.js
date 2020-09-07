"use strict";

$(function () {
  //全部订单循环部分
  function allOrderFunction() {
    $.ajax({
      url: "http://192.168.0.118:8080/order/showAllOrder",
      type: "GET",
      datatype: "json",
      data: {
        "uid": 1,
        "page": 1
      },
      success: function success(data) {
        console.log(data);
        showGoods(data.list);
        pageFunction(data, 'http://192.168.0.118:8080/order/showAllOrder');
      }
    });
  }

  ;
  allOrderFunction(); //左侧边栏按钮样式变换

  $(".indent").click(function () {
    $(".indent").removeClass("indent-focus");
    $(this).addClass("indent-focus");
    var index = $(this).index();
    console.log(index);
    var odStatus = '';

    if (index == 0) {
      allOrderFunction();
    } else if (index == 1) {
      odStatus = 0; //待付款
    } else if (index == 2) {
      odStatus = 1; //待收货
    } else if (index == 3) {
      odStatus = 8; //待评价
    }

    ;
    $.ajax({
      url: "http://192.168.0.118:8080/order/showOthers",
      type: "GET",
      datatype: "json",
      data: {
        "status": odStatus,
        "uid": 1,
        "page": 1
      },
      success: function success(data) {
        showGoods(data.list);
        pageFunction(data, 'http://192.168.0.118:8080/order/showOthers', odStatus);
      }
    });
  });

  function showGoods(indentData) {
    var str = '';
    var str2 = '';

    for (var i = 0; i < indentData.length; i++) {
      var str1 = '';
      var str3 = '';
      var str4 = '';

      for (var j = 0; j < indentData[i].bjfOrderItems.length; j++) {
        if (indentData[i].odStatus === (1 && 9)) {
          if (indentData[i].bjfOrderItems[j].oiSupport == 1) {
            if (indentData[i].bjfOrderItems[j].oiStatus === null) {
              str3 = '<div class="consignee sales-return"  data-refund=' + indentData[i].odDelid + ' data-oiId=' + indentData[i].bjfOrderItems[j].oiId + '>退款/退货</div>';
            } else if (indentData[i].bjfOrderItems[j].oiStatus === 0) {
              str3 = '<div class="consignee-box">' + '<div>退款中</div>' + '<div class="consignee cancel-return"  data-refund=' + indentData[i].odDelid + ' data-oiId=' + indentData[i].bjfOrderItems[j].oiId + '>取消退款</div>' + '</div>';
            } else if (indentData[i].bjfOrderItems[j].oiStatus === 1) {
              str3 = "<div>\u9000\u6B3E\u6210\u529F</div>";
            } else if (indentData[i].bjfOrderItems[j].oiStatus === 2) {
              str3 = '<div class="consignee-box">' + '<div>退款失败</div>' + '<div class="consignee sales-return"  data-refund=' + indentData[i].odDelid + ' data-oiId=' + indentData[i].bjfOrderItems[j].oiId + '>再次退款</div>' + '</div>';
            }
          } else if (indentData[i].bjfOrderItems[j].oiSupport === 0) {
            str3 = "<div>\u4E0D\u53EF\u9000\u5546\u54C1</div>";
          }
        } else if (indentData[i].odStatus === 2) {
          if (indentData[i].bjfOrderItems[j].oiStatus === 3) {
            str3 = '<div class="evaluate"  data-evaluate=' + indentData[i].odDelid + ' data-oiId=' + indentData[i].bjfOrderItems[j].oiId + '>未评价</div>';
          } else if (indentData[i].bjfOrderItems[j].oiStatus === 4) {
            str3 = '<div class="evaluate"  data-evaluate=' + indentData[i].odDelid + ' data-oiId=' + indentData[i].bjfOrderItems[j].oiId + '>追加评价</div>';
          } else if (indentData[i].bjfOrderItems[j].oiStatus === 5) {
            str3 = '<div>已评价</div>';
          }
        }

        ;
        str1 += '<div class="same-indent same-flex">' + '<div class="commodity-list same-flex">' + '<img class="commodity-img" src="' + indentData[i].bjfOrderItems[j].oiImage + '" alt="">' + '<div class="commodity-content">' + '<div>' + indentData[i].bjfOrderItems[j].oiName + '</div>' + '<div>' + indentData[i].bjfOrderItems[j].oiContent.substring(1, indentData[i].bjfOrderItems[j].oiContent.length - 1) + '</div>' + '</div>' + '</div>' + '<div class="same-style unit-price">' + indentData[i].bjfOrderItems[j].oiPrice + '</div>' + '<div class="same-style quantity">' + indentData[i].bjfOrderItems[j].oiNum + '</div>' + '<div class="same-style refund">' + str3 + '</div>' + '</div>';
      }

      ;

      if (indentData[i].odStatus == '0') {
        //未付款
        str2 = '<span>待付款</span>'; //订单状态

        str4 = '<div class="handle"  data-pay=' + indentData[i].odDelid + '>立即付款</div>' + '<div class="cancel"  data-cancel=' + indentData[i].odDelid + '>取消订单</div>';
      } else if (indentData[i].odStatus == '1') {
        //已付款
        str2 = '<span>待收货</span>'; //订单状态

        str4 = '<div class="handle confirm-receipt" data-confirm=' + indentData[i].odDelid + '>确认收货</div>'; //交易操作        
      } else if (indentData[i].odStatus == '2') {
        //2已完成
        str2 = '<span>已完成</span>'; //订单状态    
      }

      str += '<div class="indent-list" data-list=' + indentData[i].odDelid + '>' + '<div class="indent-detail-box same-flex">' + '<div class="same-flex">' + '<div class="indent-time">' + indentData[i].odTimeStr + '</div>' + '<div>' + '<span>订单编号:</span>' + '<span>' + indentData[i].odDelid + '</span>' + '</div>' + '</div>' + '<div class="same-flex">' + '<div class="indent-details" data-list=' + indentData[i].odDelid + '>订单详情</div>' + '<div class="indent-details1">' + '<span class="glyphicon glyphicon-trash" aria-hidden="true"  data-delete=' + indentData[i].odDelid + '></span>' + '</div>' + '</div>' + '</div>' + '<div class="same-flex indent-list-box">' + '<div class="commodity-banner">' + str1 + '</div>' + '<div class="same-flex sa">' + '<div class="same-style gross-amount">' + '<div>￥' + indentData[i].odTotalAmount + '</div>' + '<div>(含运费:￥' + indentData[i].mcDpfee + ')</div>' + '</div>' + '<div class="same-style state">' + str2 + '</div>' + //订单状态
      '<div class="same-style operation-btn">' + str4 + '</div>' + '</div>' + '</div>' + '</div>';
    }

    ;
    $('#content').html(str); // 事件代理获取当前点击按钮所对应的订单数据

    var payId = "";
    var listId = "";
    var refundId = "";
    var deleteId = "";
    var cancelId = "";
    var evaluateId = "";
    var confirmId = "";
    var cargoId = "";
    $('.indent-list').click(function (e) {
      var event = e || window.event; // 兼容性处理

      console.log(event.target.getAttribute('data-pay'), "立即付款");
      payId = event.target.getAttribute('data-pay');
      listId = event.target.getAttribute('data-list'); //订单详情

      console.log(event.target.getAttribute('data-refund'), "退款退货");
      refundId = event.target.getAttribute('data-refund');
      cargoId = event.target.getAttribute('data-oiId');
      console.log(cargoId, "退款oiId");
      console.log(event.target.getAttribute('data-delete'), "删除按钮");
      deleteId = event.target.getAttribute('data-delete');
      console.log(event.target.getAttribute('data-cancel'), "取消订单");
      cancelId = event.target.getAttribute('data-cancel');
      console.log(event.target.getAttribute('data-evaluate'), "评价");
      evaluateId = event.target.getAttribute('data-evaluate');
      console.log(event.target.getAttribute('data-confirm'), "确认收货");
      confirmId = event.target.getAttribute('data-confirm');
    }); //点击订单详情按钮跳转订单详情页

    $(".indent-details").on("click", function () {
      setTimeout(function () {
        console.log("listId:" + listId);
        var odDelid = listId;
        window.top.location.href = '../Order-details/details.html?id=' + odDelid;
      }, 0);
    }); //点击退款退货按钮跳转退款退货页面

    $(".sales-return").click(function () {
      setTimeout(function () {
        var odDelid = refundId;
        var oiId = cargoId;
        console.log("refundId:" + odDelid);
        console.log("oiId:" + oiId);
        window.top.location.href = '../refund/refund.html?id=' + odDelid + '=' + oiId;
      }, 0);
    }); //删除订单事件

    $(".indent-details1").click(function () {
      layer.confirm('您确定要删除该订单吗???', {
        btn: ['确认', '取消'] //按钮

      }, function () {
        $.ajax({
          url: "http://192.168.0.118:8080/order/operation",
          type: "GET",
          datatype: "json",
          data: {
            "odDelid": deleteId,
            "id": 1
          },
          success: function success(data) {
            console.log(data);

            if (data == 1) {
              layer.msg('删除成功', {
                icon: 1
              });
            } else {
              layer.msg('删除失败', {
                icon: 5
              });
            }
          }
        });
      });
    }); //确认收货事件

    $(".confirm-receipt").click(function () {
      layer.confirm('确认已收到货吗？', {
        btn: ['确认', '取消'] //按钮

      }, function () {
        $.ajax({
          url: "http://192.168.0.118:8080/order/operation",
          type: "GET",
          datatype: "json",
          data: {
            "odDelid": confirmId,
            "id": 2
          },
          success: function success(data) {
            console.log(data);

            if (data == 1) {
              layer.msg('确认收货成功', {
                icon: 1
              });
            } else {
              layer.msg('确认收货失败', {
                icon: 5
              });
            }
          }
        });
      });
    }); //取消订单事件

    $(".cancel").click(function () {
      layer.confirm('您确定要取消当前订单吗???', {
        btn: ['确认', '取消'] //按钮

      }, function () {
        $.ajax({
          url: "http://192.168.0.118:8080/order/operation",
          type: "GET",
          datatype: "json",
          data: {
            "odDelid": cancelId,
            "id": 3
          },
          success: function success(data) {
            console.log(data);

            if (data == 1) {
              layer.msg('取消成功', {
                icon: 1
              });
            } else {
              layer.msg('取消失败', {
                icon: 5
              });
            }
          }
        });
      });
    }); //取消退货事件

    $(".cancel-return").click(function () {
      layer.confirm('取消退货吗？', {
        btn: ['确认', '取消'] //按钮

      }, function () {
        $.ajax({
          url: "http://192.168.0.118:8080/order/notBack",
          type: "GET",
          datatype: "json",
          data: {
            "odDelid": confirmId
          },
          success: function success(data) {
            console.log(data);

            if (data == 1) {
              layer.msg('取消退货成功', {
                icon: 1
              });
            } else {
              layer.msg('取消退货失败', {
                icon: 5
              });
            }
          }
        });
      });
    }); //点击评价按钮弹出评价框

    $("#evaluate11").on("click", function (e) {
      var ev = e.target;
      var evp = $(ev).parents()[3];
      $(evp).after(txt);
      evaFunction();
    });
  }

  ; //分页符插件

  function pageFunction(data, url, odStatus) {
    $('#pageLimit').bootstrapPaginator({
      totalPages: data.totalPage,
      //共有多少页。
      currentPage: data.currentpage,
      //当前的请求页面。
      size: "normal",
      //分页符的大小
      bootstrapMajorVersion: 3,
      //bootstrap的版本要求。
      alignment: "left",
      numberOfPages: 6,
      //一页列出多少数据。
      itemTexts: function itemTexts(type, page, current) {
        //如下的代码是将页眉显示的中文显示我们自定义的中文。
        switch (type) {
          case "first":
            return "首页";

          case "prev":
            return "上一页";

          case "next":
            return "下一页";

          case "last":
            return "末页";

          case "page":
            return page;
        }
      },
      onPageClicked: function onPageClicked(event, originalEvent, type, page) {
        console.log("event:" + event);
        console.log("originalEvent:" + originalEvent);
        console.log("type:" + type);
        console.log("page:" + page);
        page1 = page;
        $.ajax({
          url: url,
          type: "GET",
          datatype: "json",
          data: {
            "status": odStatus,
            "uid": 1,
            "page": page1
          },
          success: function success(data) {
            console.log(data);
            showGoods(data.list);
          }
        });
      }
    });
  }
});