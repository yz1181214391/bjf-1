"use strict";

$(function () {
  var uId = 12;
  var oiStatus = window.location.href.split("=")[1];
  var cmdId = window.location.href.split("=")[2];
  var oiImage = window.localStorage.getItem('oiImage');
  var oiName = window.localStorage.getItem('oiName');
  var odDelid = window.localStorage.getItem('odDelid');
  $('.cmdId').val(cmdId);
  $('.uId').val(uId);
  $('.odDelid').val(odDelid);
  $('.item-box').children().eq(0).attr("src", oiImage);
  $('.item-box').children().eq(1).text(oiName);

  if (oiStatus === '3') {
    $('.initial-box').hide();
    $('.text-content').attr("name", 'eContent');
    $('.evaluate-Img').attr("name", 'eImage');
    $('.from-action').attr('action', 'http://192.168.0.106:8989/toBeEvaluated');
  } else if (oiStatus === '4') {
    $('.initial-box').show();
    $('.choose-evaluate').hide();
    $('.text-content').attr("name", 'eUback');
    $('.evaluate-Img').attr("name", 'eBackImages');
    $.ajax({
      url: "http://192.168.0.106:8989/additionalComments",
      type: "GET",
      datatype: "json",
      data: {
        "cmdId": cmdId,
        "uId": uId
      },
      success: function success(data) {
        $(".comment-first").text(data.econtent);
        $(".merchant").text(data.emback);
        var dataImg = data.eimage.split("#");
        evaluateImg(dataImg);
      }
    });
    $('.from-action').attr('action', 'http://192.168.0.106:8989/additionalCommentsSubmit');
  }

  function evaluateImg(evaluateData) {
    var str = '';

    for (var j = 0; j < evaluateData.length; j++) {
      str += "<img src=".concat(evaluateData[j], " alt=\"\">");
    }

    ;
    $('.initial-img-box').html(str);
  } // 退款退货框上传图片


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

  $('.submit-btn').click(function () {
    layer.confirm('确认提交吗？', {
      btn: ['确认', '取消'] //按钮

    }, function () {
      $('#refund-form').ajaxSubmit(function (data) {
        console.log(data);

        if (data == 'success') {
          layer.msg('提交成功', {
            icon: 1
          }); // window.history.back();
        } else {
          layer.msg('提交失败,评论包含敏感字符,请注意文明', {
            icon: 5
          });
        }
      });
    });
  });
});