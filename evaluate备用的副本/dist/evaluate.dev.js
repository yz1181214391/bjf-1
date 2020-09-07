"use strict";

$(function () {
  var evaluateData = [{
    Id: '11',
    commodityImg: '../Img/mmexport1580082042896.jpg',
    commodityName: 'MacBook Pro 2019款 倒计时看不见哈丝丝',
    initialContent: '',
    initialImg: [{
      Img: '../Img/mmexport1580082034804.jpg'
    }, {
      Img: '../Img/mmexport1580082034804.jpg'
    }],
    merchantContent: ''
  }, {
    Id: '12',
    commodityImg: '../Img/mmexport1580082042896.jpg',
    commodityName: 'MacBook Pro 2019款 倒计时看不见哈丝丝',
    initialContent: '电闪雷鸣如科幻大片，随后景象更是引人尖叫9月4日，山东上空出现一大块形状像蘑菇的巨型云朵，电闪雷鸣如科幻大片，随后景象更是引人尖叫',
    initialImg: [{
      Img: '../Img/mmexport1580082034804.jpg'
    }, {
      Img: '../Img/mmexport1580082034804.jpg'
    }, {
      Img: '../Img/mmexport1580082034804.jpg'
    }],
    merchantContent: '敢倒计时看不见哈丝丝哦啊发我号钓位'
  }];
  var str = '';

  for (var i = 0; i < evaluateData.length; i++) {
    var str2 = '';

    for (var j = 0; j < evaluateData[i].initialImg.length; j++) {
      str2 += "<img src=".concat(evaluateData[i].initialImg[j].Img, " alt=\"\">");
    }

    ;
    str += "<div class=\"same-flex evaluate-list-box\">\n                    <div class=\"item-box\">\n                        <img src=".concat(evaluateData[i].commodityImg, " alt=\"\">\n                        <div>").concat(evaluateData[i].commodityName, "</div>\n                    </div>\n                    <div class=\"item-list-box\">\n                        <div style=\"display:none\" class=\"initial-box\">\n                            <div class=\"initial-talk-box\"><span>\u521D\u6B21\u8BC4\u8BBA\uFF1A</span><span>").concat(evaluateData[i].initialContent == '' ? '未写初评，可以在下面补充哦~' : evaluateData[i].initialContent, "</span></div>\n                            <div class=\"initial-img-box\">").concat(str2, " </div>\n                            <div class=\"initial-talk-box\"><span>\u5546\u5BB6\u56DE\u590D\uFF1A</span><span>").concat(evaluateData[i].merchantContent == '' ? '商家未回复' : evaluateData[i].merchantContent, "</span></div>\n                        </div>\n                        <div class=\"evaluate-box\">\n                            <textarea class=\"text-content\" placeholder=\"\u8BF7\u8F93\u5165\u4F7F\u7528\u611F\u53D7\" name=\"reasion\"></textarea>\n                            <div class=\"same-flex add-img-box\">\n                                <input type=\"file\" name=\"images\" style=\"display:none\" class=\"uploadfile\" accept=\"image/*\"/>\n                                <div class=\"same-flex img-box\">\n                                    <img src=\"../Img/addimg.jpeg\" style=\"width: 52px; height: 52px;\" data-leaves=").concat(i, " class=\"image\"/>\n                                </div>\n                                <span>(\u6700\u591A\u6DFB\u52A03\u5F20\u56FE\u7247)</span>\n                            </div>\n                            <div class=\"choose-evaluate\">\u8BC4\u4EF7:\n                                <label><input type=\"radio\" name=\"sex\" value=\"\u597D\u8BC4\" checked=\"checked\">\u597D\u8BC4</label>\n                                <label><input type=\"radio\" name=\"sex\" value=\"\u5DEE\u8BC4\">\u5DEE\u8BC4</label>\n                            </div>  \n                        </div> \n                    </div>\n                </div> "); // $('.initial-img-box').html(str2);

    $('.ya-box').html(str);
  }

  ; // 判断是评价还是追加评价
  // let sick = 0 ;
  // if(sick == 0){
  //     $('.initial-box').hide()
  // }
  // 退款退货框上传图片

  var index = '';
  $(function () {
    var num = 0;
    $(".image").on("click", function () {
      index = this.dataset.leaves;
      num = $('.img-box').eq(index).children().length - 1;
      $(".uploadfile").eq(index).click();
    });
    $(".uploadfile").change(function () {
      var files = $(this)[0].files[0]; //获取文件信息

      if (files) {
        var reader = new FileReader(); //调用FileReader

        reader.onload = function (evt) {
          //读取操作完成时触发。
          if ($('.img-box').eq(index).children().length < 4) {
            $(".image").eq(index).before('<img src="" style="width:50px;height:50px;margin-right:6px;"/>').siblings().eq(num).attr('src', evt.target.result);
            console.log(num);
          }

          if ($('.img-box').eq(index).children().length === 4) {
            $('.image').eq(index).hide();
          }
        };

        reader.readAsDataURL(files); //将文件读取为 DataURL(base64)
      } else {
        alert("上传失败");
      }
    });
  });
  $('.submit-btn').click(function () {
    var text = $('.text-content');
    var Img = $('.img-box').eq(index).children();

    for (var t = 0; t < evaluateData.length; t++) {
      var evaluateText = $('.text-content').eq(t).val();
      var evaluatImg = Img.eq(t).attr('src');
      evaluateData[t].comment = evaluateText;
      evaluateData[t].images = evaluatImg;
    }

    console.log(evaluateData); // console.log(text)
    // console.log(text[0].value)
    // console.log(text[1].value)
    // console.log(Img)
  });
});