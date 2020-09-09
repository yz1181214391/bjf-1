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
        if (indentData[i].odStatus === 1 || indentData[i].odStatus === 9) {
          if (indentData[i].bjfOrderItems[j].oiSupport === 1) {
            if (indentData[i].bjfOrderItems[j].oiStatus === 6) {
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
            str3 = "<div class=\"evaluate\" data-odDelid=".concat(indentData[i].odDelid, " data-oiStatus=").concat(indentData[i].bjfOrderItems[j].oiStatus, " data-cmdId=").concat(indentData[i].bjfOrderItems[j].cmdId, ">\u672A\u8BC4\u4EF7</div>");
          } else if (indentData[i].bjfOrderItems[j].oiStatus === 4) {
            str3 = "<div class=\"evaluate\" data-odDelid=".concat(indentData[i].odDelid, "  data-oiStatus=").concat(indentData[i].bjfOrderItems[j].oiStatus, " data-cmdId=").concat(indentData[i].bjfOrderItems[j].cmdId, ">\u8FFD\u52A0\u8BC4\u4EF7</div>");
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

        str4 = "<div class=\"handle immediately-pay\"  data-odDelid=".concat(indentData[i].odDelid, ">\u7ACB\u5373\u4ED8\u6B3E</div>\n                            <div class=\"cancel\"  data-odDelid=").concat(indentData[i].odDelid, ">\u53D6\u6D88\u8BA2\u5355</div>");
      } else if (indentData[i].odStatus === 1) {
        //已付款
        str2 = "<span>\u5F85\u6536\u8D27</span>"; //订单状态

        str4 = "<div class=\"handle confirm-receipt\" data-odDelid=".concat(indentData[i].odDelid, ">\u786E\u8BA4\u6536\u8D27</div>"); //交易操作   
      } else if (indentData[i].odStatus === 2 || indentData[i].odStatus === 9) {
        //2或者9已完成
        str2 = "<span>\u5DF2\u5B8C\u6210</span>"; //订单状态    
      }

      str += "<div class=\"indent-list\" data-odDelid=".concat(indentData[i].odDelid, ">\n                        <div class=\"indent-detail-box same-flex\">\n                            <div class=\"same-flex\">\n                                <div class=\"indent-time\"> ").concat(indentData[i].odTimeStr, "</div>\n                                <div>\n                                    <span>\u8BA2\u5355\u7F16\u53F7:</span>\n                                    <span> ").concat(indentData[i].odDelid, "</span>   \n                                </div>\n                            </div>\n                            <div class=\"same-flex\">\n                                <div class=\"indent-details\" data-odDelid=").concat(indentData[i].odDelid, ">\u8BA2\u5355\u8BE6\u60C5</div>\n                                <div class=\"indent-delete\">\n                                    <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"  data-odDelid=").concat(indentData[i].odDelid, "></span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"same-flex indent-list-box\">\n                            <div class=\"commodity-banner\">").concat(str1, "</div>\n                            <div class=\"same-flex sa\">\n                                <div class=\"same-style gross-amount\">\n                                    <div>\uFFE5").concat(indentData[i].odTotalAmount, "</div>\n                                    <div>(\u542B\u8FD0\u8D39:\uFFE5").concat(indentData[i].mcDpfee, ")</div>\n                                </div>\n                                <div class=\"same-style state\">").concat(str2, "</div>\n                                <div class=\"same-style operation-btn\">").concat(str4, "</div>\n                            </div>\n                        </div>\n                    </div>");
    }

    ;
    $('#content').html(str); // 事件代理获取当前点击按钮所对应的订单数据

    var odDelid = ""; //订单编号

    var oiId = ""; //订单详情ID

    var cmdId = ""; //订单详情ID

    var oiStatus = ""; //判断是评论还是追评

    $('.indent-list').click(function (e) {
      var event = e || window.event; // 兼容性处理

      console.log(event.target.getAttribute('data-odDelid'), "订单编号");
      odDelid = event.target.getAttribute('data-odDelid');
      oiId = event.target.getAttribute('data-oiId');
      console.log(oiId, "订单详情id");
      cmdId = event.target.getAttribute('data-cmdId');
      console.log(cmdId, "商品id");
      oiStatus = event.target.getAttribute('data-oiStatus');
      console.log(oiStatus, "评论还是追评");
    }); //点击订单详情按钮跳转订单详情页

    $(".indent-details").on("click", function () {
      setTimeout(function () {// window.top.location.href = '../Order-details/details.html?id='+ odDelid; 
      }, 0);
    }); //删除订单事件

    $(".indent-delete").click(function () {
      setTimeout(function () {
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
      }, 0);
    }); //立即付款

    $('.immediately-pay').on("click", function () {
      setTimeout(function () {
        window.top.location.href = "";
      }, 0);
    }); //取消订单事件

    $(".cancel").click(function () {
      setTimeout(function () {
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
      }, 0);
    }); //确认收货事件

    $(".confirm-receipt").click(function () {
      setTimeout(function () {
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
      }, 0);
    }); //点击退款退货按钮跳转退款退货页面

    $(".sales-return").click(function () {
      setTimeout(function () {
        console.log(odDelid + ',' + oiId);
        window.top.location.href = '../refund/refund.html?id=' + odDelid + '=' + oiId;
      }, 0);
    }); //取消退货事件

    $(".cancel-return").click(function () {
      setTimeout(function () {
        console.log(odDelid, oiId);
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
      }, 0);
    }); //未评价/追加评价

    $('.evaluate').on("click", function (e) {
      //  userId /cmdId /oiStatus  
      setTimeout(function () {
        var test = $(e.target).parent().prevAll().eq(2).children();
        var Img = test.eq(0).attr("src");
        var Name = test.eq(1).children().eq(0).text();
        window.localStorage.setItem('oiImage', Img);
        window.localStorage.setItem('oiName', Name);
        window.localStorage.setItem('odDelid', odDelid); // console.log(Img)
        // console.log(oiName)
        // console.log(oiId,oiStatus)

        window.top.location.href = "../evaluate/evaluate.html?id=" + oiStatus + '=' + cmdId;
      }, 0);
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