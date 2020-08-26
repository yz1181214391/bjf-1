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
    var str = "<div class=\"indent-list\">\n                    <div class=\"same-flex indent-list-box\">\n                        <div class=\"commodity-banner\">\n                            <div class=\"same-indent same-flex\">\n                                <div class=\"commodity-list same-flex\">\n                                    <img class=\"commodity-img\" src=".concat(indentData.oiImage, " alt=\"\">\n                                    <div class=\"commodity-content\">\n                                        <div>").concat(indentData.oiName, "</div>\n                                        <div>").concat(indentData.oiContent.substring(1, indentData.oiContent.length - 1), "</div>\n                                    </div>\n                                </div>\n                                <div class=\"same-style unit-price\" > ").concat(indentData.oiPrice, "</div>\n                                <div class=\"same-style quantity\"> ").concat(indentData.oiNum, "</div>\n                                <div class=\"same-style quantity\"><input  data-id=\"").concat(indentData.oiId, "\" class=\"checkbox\" type=\"checkbox\" value=\"checkbox\"/></div>\n                            </div>\n                        </div>\n                        <div class=\"same-flex sa\">\n                            <div class=\"same-style gross-amount\">").concat(indentData.backMoney, "</div>\n                        </div>\n                    </div>\n                </div>");
    $('#content').html(str);
  }

  ;

  function showGoods1(indentData) {// var str = '';
    // var str1 = '';
    // console.log(indentData.length)
    // for(var i = 0;i < indentData.length; i++){
    //     str1 +=`<div class="same-indent same-flex">
    //                 <div class="commodity-list same-flex">
    //                     <img class="commodity-img" src=${indentData[i].oiImage} alt="">
    //                     <div class="commodity-content">
    //                         <div>${indentData[i].oiName}</div>
    //                         <div>${indentData[i].oiContent.substring(1,indentData[i].oiContent.length-1)}</div>
    //                     </div>
    //                 </div>
    //                 <div class="same-style unit-price" id = price${i}> ${indentData[i].oiPrice}</div>
    //                 <div class="same-style quantity" id = num${i}> ${indentData[i].oiNum}</div>
    //                 <div class="same-style quantity"><input  data-id="${indentData[i].oiId}" class="checkbox" id = check${i} type="checkbox" value="checkbox"/></div>
    //             </div>`
    // };
    // str +='<div class="indent-list">'+
    //             '<div class="same-flex indent-list-box">'+
    //                 '<div class="commodity-banner">'+str1+'</div>'+
    //                 '<div class="same-flex sa">'+
    //                     '<div class="same-style gross-amount">退款金额</div>'+
    //                 '</div>'+
    //             '</div>'+
    //         '</div>'
    // $('#content').html(str);
  }

  ; //退货操作

  var sum = 0;

  function test() {
    var accSub = function accSub(num1, num2) {
      var r1, r2, m, n;

      try {
        r1 = num1.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }

      try {
        r2 = num2.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }

      m = Math.pow(10, Math.max(r1, r2));
      n = r1 >= r2 ? r1 : r2;
      return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
    };

    var numAdd = function numAdd(num1, num2) {
      var baseNum, baseNum1, baseNum2;

      try {
        baseNum1 = num1.toString().split('.')[1].length;
      } catch (e) {
        baseNum1 = 0;
      }

      try {
        baseNum2 = num2.toString().split('.')[1].length;
      } catch (e) {
        baseNum2 = 0;
      }

      baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
      return Math.round(num1 * baseNum + num2 * baseNum) / baseNum;
    };

    setTimeout(function () {
      var len = $(".checkbox").length; // let sum = 0;

      var _loop = function _loop(j) {
        $("#check".concat(j)).click(function () {
          var oiId = $("#check".concat(j)).data().id;
          console.log(oiId);
          console.log(odDelid);
          $.ajax({
            url: "http://192.168.0.118:8080/order/showBackMoney",
            type: "post",
            datatype: "json",
            data: {
              "odDelid": odDelid,
              "oiId": oiId
            },
            success: function success(data) {
              console.log(data);

              if ($("#check".concat(j)).is(":checked")) {
                sum = numAdd(sum, data);
                $('.gross-amount').text(parseFloat(sum));
              } else {
                sum = accSub(sum, data);
                $('.gross-amount').text(parseFloat(sum));
              }
            }
          });
        });
      };

      for (var j = 0; j < len; j++) {
        _loop(j);
      }
    }, 0); // setTimeout(()=>{
    //     let len = $(".checkbox").length;
    //     let sum = 0;
    //     for(let j = 0;j<len;j++){
    //         $(`#check${j}`).click(()=>{
    //             let price = $(`#price${j}`).text();
    //             let num = $(`#num${j}`).text();
    //             if($(`#check${j}`).is(":checked")){
    //                 sum = numAdd( sum,(price*num));
    //                 $('.gross-amount').text(parseFloat(sum));
    //             }else{
    //                 console.log(price*num);
    //                 sum =accSub(sum,(price*num));
    //                 $('.gross-amount').text(parseFloat(sum));
    //             }
    //         })
    //     }
    // },0)
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

  $('.evaluate-btn').click(function () {
    console.log('sum:' + sum);
    layer.confirm('确认提交吗？', {
      btn: ['确认', '取消'] //按钮

    }, function () {
      $('#refund-form').ajaxSubmit(function (data) {
        if (data == 1) {
          layer.msg('提交成功', {
            icon: 1
          }); // window.history.back();
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