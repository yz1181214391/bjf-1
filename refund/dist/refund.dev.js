"use strict";

$(function () {
  var odDelid = window.location.href.split("=")[1];
  var oiId = window.location.href.split("=")[2];
  $('.refundId').val(odDelid);
  $('.oiId').val(oiId);
  $.ajax({
    url: "http://192.168.0.118:8080/order/showBack",
    type: "GET",
    datatype: "json",
    async: false,
    data: {
      "odDelid": odDelid,
      "oiId": oiId
    },
    success: function success(data) {
      console.log(data);
      $('.order-id').text(data.odDelid); //订单编号

      showGoods(data);
    }
  });

  function showGoods(indentData) {
    var str = "<div class=\"indent-list\">\n                    <div class=\"same-flex indent-list-box\">\n                        <div class=\"commodity-banner\">\n                            <div class=\"same-indent same-flex\">\n                                <div class=\"commodity-list same-flex\">\n                                    <img class=\"commodity-img\" src=".concat(indentData.oiImage, " alt=\"\">\n                                    <div class=\"commodity-content\">\n                                        <div>").concat(indentData.oiName, "</div>\n                                        <div>").concat(indentData.oiContent.substring(1, indentData.oiContent.length - 1), "</div>\n                                    </div>\n                                </div>\n                                <div class=\"same-style unit-price\" > ").concat(indentData.oiPrice, "</div>\n                                <div class=\"same-style quantity\"> ").concat(indentData.oiNum, "</div>\n                                <div class=\"same-style quantity\"></div>\n                            </div>\n                        </div>\n                        <div class=\"same-flex sa\">\n                            <div class=\"same-style gross-amount\">").concat(indentData.backMoney, "</div>\n                        </div>\n                    </div>\n                </div>");
    $('#content').html(str);
  }

  ; // 退款退货框上传图片

  var num = 0;
  $(function () {
    $("#image").click(function () {
      $("#uploadfile").click();
    });
    $("#uploadfile").change(function () {
      var files = $(this)[0].files[0]; //获取文件信息

      if (files) {
        var reader = new FileReader(); //调用FileReader

        reader.onload = function (evt) {
          //读取操作完成时触发。
          if (num < 3) {
            $("#image").before('<img src="" style="width:50px;height:50px;margin-right:6px;"/>').siblings().eq(num).attr('src', evt.target.result);
            num++;
          }

          ;

          if (num == 3) {
            $('#image').hide();
          }
        };

        reader.readAsDataURL(files); //将文件读取为 DataURL(base64)
      } else {
        alert("上传失败");
      }
    });
  }); // 提交退款理由和照片

  $('.evaluate-btn').click(function () {
    layer.confirm('确认提交吗？', {
      btn: ['确认', '取消'] //按钮

    }, function () {
      $('#refund-form').ajaxSubmit(function (data) {
        console.log(data);

        if (data == 1) {
          layer.msg('提交成功', {
            icon: 1
          });
          window.history.back();
        } else {
          layer.msg('提交失败', {
            icon: 5
          });
        }
      });
    });
  }); // 退货详情进度条

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