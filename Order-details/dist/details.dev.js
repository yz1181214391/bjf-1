"use strict";

$(function () {
  var odDelid = window.location.href.split("=")[1];
  $.ajax({
    url: "http://192.168.0.118:8080/order/showItem",
    type: "GET",
    datatype: "json",
    data: {
      "odDelid": odDelid
    },
    success: function success(data) {
      console.log(data);
      showGoods(data);
      var odStatus = data[0].odStatus;
      $('.state').text(function () {
        if (odStatus == 0) {
          return "未付款";
        } else if (odStatus == 1) {
          return "已付款";
        } else if (odStatus == 2) {
          return "已完成";
        } else if (odStatus == 9) {
          return "退款中";
        }
      });
      $('.courier').append('<span>配送员:' + data[0].odRecvName + '</span><span>电话:' + data[0].odRevcPhone + '</span>');
      $('.site').text(data[0].odRecvAddress);
      $('.number').text(data[0].odDelid);
      $('.order-time').text(data[0].odTimeStr);
      $('.pay-time').text(data[0].odPayTimeStr);
      $('.pay-way').text(function () {
        if (data[0].bjfPayment.payWay === 0) {
          return "支付宝";
        } else if (data[0].bjfPayment.payWay === 1) {
          return "微信";
        }
      });
      $('.orderTime').text(data[0].odTimeStr);
      $('.payTime').text(data[0].odPayTimeStr);
      $('.accomplishTime').text(data[0].odModifiedTimeStr);
      barFunction();
    }
  }); // function showGoods(indentData){
  //     var str = '';
  //     var str2 = '';
  //     for(var i = 0;i < indentData.length; i++){
  //         if(indentData[i].odStatus == '0'){     //未付款
  //             str2 = '<div class="same-style">'+
  //                         '<div class="consignee"></div>'+  //商品操作
  //                     '</div>'+
  //                     '<div class="same-style state">未付款</div>'+ //订单状态
  //                     '<div class="same-style operation-btn">'+  //交易操作
  //                         '<div class="handle"  data-pay='+ indentData[i].odDelid +'>立即付款</div>'+
  //                         '<div class="cancel"  data-cancel='+ indentData[i].odDelid +'>取消订单</div>'+
  //                     '</div>'
  //         }else if(indentData[i].odStatus == '1'){       //已付款
  //             str2 = '<div class="same-style">'+
  //                         '<div class="consignee" data-refund='+ indentData[i].odDelid +'>退款/退货</div>'+  //商品操作
  //                     '</div>'+
  //                     '<div class="same-style state">已支付</div>'+ //订单状态
  //                     '<div class="same-style operation-btn">'+  //交易操作
  //                         '<div class="handle confirm-receipt" data-confirm='+ indentData[i].odDelid +'>确认收货</div>'+
  //                     '</div>'
  //         }else if(indentData[i].odStatus == '2'){       //已完成
  //             str2 = '<div class="same-style">'+
  //                         '<div class="consignee"></div>'+  //商品操作
  //                     '</div>'+
  //                     '<div class="same-style state">已完成</div>'+ //订单状态
  //                     '<div class="same-style operation-btn">'+  //交易操作
  //                         '<div id="evaluate11" class="handle" data-evaluate='+ indentData[i].odDelid +'>评价</div>'+
  //                     '</div>'
  //         }else if(indentData[i].odStatus == '3'){         //已取消(取消的订单)
  //             str2 = '<div class="same-style">'+
  //                         '<div class="consignee">再次购买</div>'+  //商品操作
  //                     '</div>'+
  //                     '<div class="same-style state">已取消</div>'+ //订单状态
  //                     '<div class="same-style operation-btn">'+  //交易操作
  //                     '</div>'
  //         }else if(indentData[i].odStatus == '4'){       //退款成功
  //             str2 = '<div class="same-style">'+
  //                         '<div class="consignee"></div>'+  //商品操作
  //                     '</div>'+
  //                     '<div class="same-style state">退款成功</div>'+ //订单状态
  //                     '<div class="same-style operation-btn">'+  //交易操作
  //                     '</div>'
  //         }else if(indentData[i].odStatus == '5'){       //待退款
  //             str2 = '<div class="same-style">'+
  //                         '<div class="consignee"></div>'+  //商品操作
  //                     '</div>'+
  //                     '<div class="same-style state">待退款</div>'+ //订单状态
  //                     '<div class="same-style operation-btn">'+  //交易操作
  //                     '</div>'
  //         }else if(indentData[i].odStatus == '6'){       //退款失败
  //             str2 = '<div class="same-style">'+
  //                         '<div class="consignee"></div>'+  //商品操作
  //                     '</div>'+
  //                     '<div class="same-style state">退款失败</div>'+ //订单状态
  //                     '<div class="same-style operation-btn">'+  //交易操作
  //                     '</div>'
  //         };
  //         var str1 = '';
  //         for(var j=0;j<indentData[i].bjfOrderItems.length;j++){
  //             str1 +='<div class="same-indent same-flex">'+
  //                         '<div class="commodity-list same-flex">'+
  //                             '<img class="commodity-img" src="'+indentData[i].bjfOrderItems[j].oiImage+'" alt="">'+
  //                             '<div class="commodity-content">'+
  //                                  '<div>'+ indentData[i].bjfOrderItems[j].oiName+'</div>'+
  //                                  '<div>'+ indentData[i].bjfOrderItems[j].oiContent.substring(1,indentData[i].bjfOrderItems[j].oiContent.length-1)+'</div>'+
  //                             '</div>'+
  //                         '</div>'+
  //                         '<div class="same-style unit-price">'+ indentData[i].bjfOrderItems[j].oiPrice+'</div>'+
  //                         '<div class="same-style quantity">'+ indentData[i].bjfOrderItems[j].oiNum+'</div>'+
  //                     '</div>'
  //         };
  //         str +='<div class="indent-list" data-list='+ indentData[i].odDelid +'>'+
  //                     '<div class="indent-detail-box same-flex">'+
  //                         '<div class="same-flex">'+
  //                             '<div class="indent-time">'+ indentData[i].odTimeStr+'</div>'+
  //                             '<div>'+
  //                                 '<span>订单编号:</span>'+
  //                                 '<span>'+ indentData[i].odDelid+'</span>'+   
  //                             '</div>'+
  //                         '</div>'+
  //                         '<div class="same-flex">'+
  //                             '<div class="indent-details1">'+
  //                                 '<span class="glyphicon glyphicon-trash" aria-hidden="true"  data-delete='+ indentData[i].odDelid +'></span>'+
  //                             '</div>'+
  //                         '</div>'+
  //                     '</div>'+
  //                     '<div class="same-flex indent-list-box">'+
  //                         '<div class="commodity-banner">'+str1+'</div>'+
  //                         '<div class="same-flex sa">'+
  //                             '<div class="same-style gross-amount">'+ 
  //                                     '<div>￥'+ indentData[i].odTotalAmount+'</div>'+
  //                                     '<div>(含运费:￥'+ indentData[i].mcDpfee+')</div>'+
  //                             '</div>'+
  //                             str2+
  //                         '</div>'+
  //                     '</div>'+
  //                 '</div>'
  //     };
  //     $('#content').html(str);
  //     // 事件代理获取当前点击按钮所对应的订单数据
  //     var payId ="";
  //     var refundId ="";
  //     var deleteId ="";
  //     var cancelId ="";
  //     var evaluateId ="";
  //     var confirmId ="";
  //     $('.indent-list').click(function(e){
  //         var event = e || window.event;  // 兼容性处理
  //         console.log(event.target.getAttribute('data-pay'),"立即付款")
  //         payId = event.target.getAttribute('data-pay');
  //         console.log(event.target.getAttribute('data-refund'),"退款退货");
  //         refundId = event.target.getAttribute('data-refund');
  //         console.log(event.target.getAttribute('data-delete'),"删除按钮");
  //         deleteId = event.target.getAttribute('data-delete');
  //         console.log(event.target.getAttribute('data-cancel'),"取消订单");
  //         cancelId = event.target.getAttribute('data-cancel');
  //         console.log(event.target.getAttribute('data-evaluate'),"评价");
  //         evaluateId = event.target.getAttribute('data-evaluate');
  //         console.log(event.target.getAttribute('data-confirm'),"确认收货");
  //         confirmId = event.target.getAttribute('data-confirm');
  //     });
  //      //点击退款退货按钮跳转退款退货页面
  //      $(".consignee").click(function () {
  //         setTimeout(function(){
  //             var odDelid = refundId;
  //             console.log("refundId:"+refundId);
  //             window.top.location.href = '../refund/refund.html?id='+odDelid; 
  //         },0);
  //     });
  //     //确认收货事件
  //     $(".confirm-receipt").click(function () {
  //       layer.confirm('确认已收到货吗？', {
  //             btn: ['确认','取消'] //按钮
  //         }, function(){ 
  //             $.ajax({
  //                 url: "http://192.168.0.103:8080/order/operation",
  //                 type: "GET",
  //                 datatype: "json",
  //                 data:{"odDelid" : confirmId,
  //                         "id":2},
  //                 success: function (data) {
  //                     console.log(data)
  //                     if(data == 1){
  //                         layer.msg('确认收货成功', {icon: 1});
  //                     }else{
  //                         layer.msg('确认收货失败', {icon: 5});
  //                     }
  //                 }
  //             })  
  //         });
  //     });
  //     //删除订单事件
  //     $(".indent-details1").click(function () {
  //         layer.confirm('您确定要删除该订单吗???', {
  //             btn: ['确认','取消'] //按钮
  //         }, function(){ 
  //             $.ajax({
  //                 url: "http://192.168.0.118:8080/order/operation",
  //                 type: "GET",
  //                 datatype: "json",
  //                 data:{"odDelid" : deleteId,
  //                         "id":1},
  //                 success: function (data) {
  //                     console.log(data)
  //                     if(data == 1){
  //                         layer.msg('删除成功', {icon: 1});
  //                     }else{
  //                         layer.msg('删除失败', {icon: 5});
  //                     }
  //                 }
  //             })  
  //         });
  //     });
  //     //取消订单事件
  //     $(".cancel").click(function () {
  //         layer.confirm('您确定要取消当前订单吗???', {
  //             btn: ['确认','取消'] //按钮
  //         }, function(){ 
  //             $.ajax({
  //                 url: "http://192.168.0.118:8080/order/operation",
  //                 type: "GET",
  //                 datatype: "json",
  //                 data:{"odDelid" : cancelId,
  //                         "id":1},
  //                 success: function (data) {
  //                     console.log(data)
  //                     if(data == 1){
  //                         layer.msg('取消订单成功', {icon: 1});
  //                     }else{
  //                         layer.msg('取消订单失败', {icon: 5});
  //                     }
  //                 }
  //             })  
  //         });
  //     });
  //     //点击评价按钮弹出评价框
  //     $("#evaluate11").one("click",function(e){
  //             let ev = e.target;
  //             let evp = $(ev).parents()[3];
  //             $(evp).after(txt);
  //             evaFunction();
  //     });
  // };

  function showGoods(indentData) {
    var str = '';
    var str2 = '';

    for (var i = 0; i < indentData.length; i++) {
      var str1 = '';
      var str3 = '';
      var str4 = '';

      for (var j = 0; j < indentData[i].bjfOrderItems.length; j++) {
        if (indentData[i].odStatus === 1 || indentData[i].odStatus === 9) {
          if (indentData[i].bjfOrderItems[j].oiSupport === 1) {
            if (indentData[i].bjfOrderItems[j].oiStatus === null) {
              str3 = "<div class=\"consignee sales-return\"  data-odDelid=".concat(indentData[i].odDelid, " data-oiId=").concat(indentData[i].bjfOrderItems[j].oiId, ">\u9000\u6B3E/\u9000\u8D27</div>");
            } else if (indentData[i].bjfOrderItems[j].oiStatus === 0) {
              str3 = "<div class=\"consignee-box\">\n                                        <div>\u9000\u6B3E\u4E2D</div>\n                                        <div class=\"consignee cancel-return\"  data-odDelid=".concat(indentData[i].odDelid, " data-oiId=").concat(indentData[i].bjfOrderItems[j].oiId, ">\u53D6\u6D88\u9000\u6B3E</div>\n                                    </div>");
            } else if (indentData[i].bjfOrderItems[j].oiStatus === 1) {
              str3 = "<div>\u9000\u6B3E\u6210\u529F</div>";
            } else if (indentData[i].bjfOrderItems[j].oiStatus === 2) {
              str3 = "<div class=\"consignee-box\">\n                                        <div>\u9000\u6B3E\u5931\u8D25</div>\n                                        <div class=\"consignee sales-return\"  data-odDelid=".concat(indentData[i].odDelid, " data-oiId=").concat(indentData[i].bjfOrderItems[j].oiId, ">\u518D\u6B21\u9000\u6B3E</div>\n                                    </div>");
            }
          } else if (indentData[i].bjfOrderItems[j].oiSupport === 0) {
            str3 = "<div>\u4E0D\u53EF\u9000\u5546\u54C1</div>";
          }
        } else if (indentData[i].odStatus === 2) {
          if (indentData[i].bjfOrderItems[j].oiStatus === 3) {
            str3 = "<div class=\"evaluate\"  data-odDelid=".concat(indentData[i].odDelid, " data-oiId=").concat(indentData[i].bjfOrderItems[j].oiId, ">\u672A\u8BC4\u4EF7</div>");
          } else if (indentData[i].bjfOrderItems[j].oiStatus === 4) {
            str3 = "<div class=\"evaluate\"  data-odDelid=".concat(indentData[i].odDelid, " data-oiId=").concat(indentData[i].bjfOrderItems[j].oiId, ">\u8FFD\u52A0\u8BC4\u4EF7</div>");
          } else if (indentData[i].bjfOrderItems[j].oiStatus === 5) {
            str3 = "<div>\u5DF2\u8BC4\u4EF7</div>";
          }
        }

        ; //商品

        str1 += "<div class=\"same-indent same-flex\">\n                            <div class=\"commodity-list same-flex\">\n                                <img class=\"commodity-img\" src=\"".concat(indentData[i].bjfOrderItems[j].oiImage, "\" alt=\"\">\n                                <div class=\"commodity-content\">\n                                     <div>").concat(indentData[i].bjfOrderItems[j].oiName, "</div>\n                                     <div>").concat(indentData[i].bjfOrderItems[j].oiContent.substring(1, indentData[i].bjfOrderItems[j].oiContent.length - 1), "</div>\n                                </div>\n                            </div>\n                            <div class=\"same-style unit-price\">").concat(indentData[i].bjfOrderItems[j].oiPrice, "</div>\n                            <div class=\"same-style quantity\">").concat(indentData[i].bjfOrderItems[j].oiNum, "</div>\n                            <div class=\"same-style refund\">").concat(str3, "</div>\n                        </div>");
      }

      ;

      if (indentData[i].odStatus === 0) {
        //未付款
        str2 = "<span>\u5F85\u4ED8\u6B3E</span>"; //订单状态

        str4 = "<div class=\"handle\"  data-odDelid=".concat(indentData[i].odDelid, ">\u7ACB\u5373\u4ED8\u6B3E</div>\n                            <div class=\"cancel\"  data-odDelid=").concat(indentData[i].odDelid, ">\u53D6\u6D88\u8BA2\u5355</div>");
      } else if (indentData[i].odStatus === 1) {
        //已付款
        str2 = "<span>\u5F85\u6536\u8D27</span>"; //订单状态

        str4 = "<div class=\"handle confirm-receipt\" data-odDelid=".concat(indentData[i].odDelid, ">\u786E\u8BA4\u6536\u8D27</div>"); //交易操作        
      } else if (indentData[i].odStatus === 2) {
        //2已完成
        str2 = "<span>\u5DF2\u5B8C\u6210</span>"; //订单状态    
      }

      str += "<div class=\"indent-list\" data-odDelid=".concat(indentData[i].odDelid, ">\n                        <div class=\"indent-detail-box same-flex\">\n                            <div class=\"same-flex\">\n                                <div class=\"indent-time\"> ").concat(indentData[i].odTimeStr, "</div>\n                                <div>\n                                    <span>\u8BA2\u5355\u7F16\u53F7:</span>\n                                    <span> ").concat(indentData[i].odDelid, "</span>   \n                                </div>\n                            </div>\n                            <div class=\"same-flex\">\n                                <div class=\"indent-details1\">\n                                    <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"  data-odDelid=").concat(indentData[i].odDelid, "></span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"same-flex indent-list-box\">\n                            <div class=\"commodity-banner\">").concat(str1, "</div>\n                            <div class=\"same-flex sa\">\n                                <div class=\"same-style gross-amount\">\n                                        <div>\uFFE5 ").concat(indentData[i].odTotalAmount, "</div>\n                                        <div>(\u542B\u8FD0\u8D39:\uFFE5 ").concat(indentData[i].mcDpfee, ")</div>\n                                </div>\n                                \n                                <div class=\"same-style state\">").concat(str2, "</div>\n                                <div class=\"same-style operation-btn\">").concat(str4, "</div>\n\n                            </div>\n                        </div>\n                    </div>");
    }

    ;
    $('#content').html(str); // 事件代理获取当前点击按钮所对应的订单数据

    var odDelid = ""; //订单编号

    var oiId = ""; //商品ID

    $('.indent-list').click(function (e) {
      var event = e || window.event; // 兼容性处理

      console.log(event.target.getAttribute('data-odDelid'), "订单编号");
      odDelid = event.target.getAttribute('data-odDelid');
      oiId = event.target.getAttribute('data-oiId');
      console.log(oiId, "商品id");
    }); //点击退款退货按钮跳转退款退货页面

    $(".sales-return").click(function () {
      setTimeout(function () {
        var odDelid = odDelid;
        var oiId = oiId;
        window.top.location.href = '../refund/refund.html?id=' + odDelid + '=' + oiId;
      }, 0);
    }); //删除订单事件

    $(".indent-details1").click(function () {
      var odDelid = odDelid;
      layer.confirm('您确定要删除该订单吗???', {
        btn: ['确认', '取消'] //按钮

      }, function () {
        $.ajax({
          url: "http://192.168.0.118:8080/order/operation",
          type: "GET",
          datatype: "json",
          data: {
            "odDelid": odDelid,
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
      var odDelid = odDelid;
      layer.confirm('确认已收到货吗？', {
        btn: ['确认', '取消'] //按钮

      }, function () {
        $.ajax({
          url: "http://192.168.0.118:8080/order/operation",
          type: "GET",
          datatype: "json",
          data: {
            "odDelid": odDelid,
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
      var odDelid = odDelid;
      layer.confirm('您确定要取消当前订单吗???', {
        btn: ['确认', '取消'] //按钮

      }, function () {
        $.ajax({
          url: "http://192.168.0.118:8080/order/operation",
          type: "GET",
          datatype: "json",
          data: {
            "odDelid": odDelid,
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
      var odDelid = odDelid;
      var oiId = oiId;
      layer.confirm('取消退货吗？', {
        btn: ['确认', '取消'] //按钮

      }, function () {
        $.ajax({
          url: "http://192.168.0.118:8080/order/notBack",
          type: "GET",
          datatype: "json",
          data: {
            "odDelid": odDelid,
            "oiId": oiId
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
    });
  }

  ;

  function barFunction() {
    var obj1 = $('.details-list').find('.details-time').eq(0).text();
    var obj2 = $('.details-list').find('.details-time').eq(1).text();
    var obj3 = $('.details-list').find('.details-time').eq(2).text();

    function activeFunction(i) {
      $('.details-list').find('.details-text-list1').eq(i).addClass('details-text-list1-1');
      $('.details-list').find('.details-text-list2').eq(i).addClass('details-text-list2-1');
      $('.details-list').find('.details-border').eq(i).addClass('details-border-1');
    }

    ;
    console.log(obj1);

    if (obj1 != '' && obj2 == '') {
      activeFunction(0);
    } else if (obj1 != '' && obj2 != '' && obj3 == '') {
      activeFunction(0);
      activeFunction(1);
    } else if (obj1 != '' && obj2 != '' && obj3 != '') {
      activeFunction(0);
      activeFunction(1);
      activeFunction(2);
    }
  }

  ;
});