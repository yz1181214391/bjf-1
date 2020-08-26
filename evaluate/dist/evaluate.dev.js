"use strict";

$(function () {
  // 退款退货框上传图片
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
  });
});