// 商品搜索
$(function () {
    $(".search-btn").click(function () {
        var res=$(".search-text").val()
        console.log(res);
        //button跳转链接传参
        location.href='../templates/a.html?key='+res;
    })
})

 // 左侧导航栏
$(function(){
    $.ajax({
        url: "http://192.168.0.106:8989/homePage/getTree",
        type: "GET",
        datatype:"json",
        success: function(data) {
          var str = '';
          for(var i = 0; i < data.length; i++){
            var str1 = '';
            var cgid = data[i].cgId;

            for(var t = 0; t < data[i].next.length; t++){
                var str2 = '';
                for(var j = 0; j < data[i].next[t].next.length; j++){ 
                    var cgid2 = data[i].next[t].next[j].cgId;
                    str2 += '<li ><a  class="navType" data-id="'+cgid2+'">'+data[i].next[t].next[j].cgName+'</a></li>';
                };

                str1 += '<ul class="navType-box">'+
                            '<li>'+data[i].next[t].cgName+'</li>'+
                            '<ul>'+str2+'</ul>'+
                        '</ul>'
            }
            str  += '<li class="nav-list">'+
                        '<a class="navType" data-id="'+cgid+'">'+data[i].cgName+'</a>'+
                        '<ul class="hide-box">'+str1+'</ul>'+
                    '</li>'    
            };

          $('.nav-item').html(str);
          $(".navType").on("click",function(){
              let Id = this.dataset.id;
              console.log(Id)
              var url = "../productList/SearchProduct.html?id="+Id;
              $('.navType').attr("href",url)
          });
  
          function showFunction(index, dpy, tp) {
            $('.nav-list').eq(index).find('.hide-box').css("display", dpy);
            // $(".nav-list").eq(index).find('.hide-box').stop().animate({top:tp+"px"},"fast");
            // $(".nav-list").eq(index).find('.hide-box').css('top', tp + "px");
          };
          let topArr = [0, 0, 0, 0, 0, 0, -40, -80, -120, -160, -200];
          $(".nav-list").hover(function () {
              index = $(this).index();
              showFunction(index, 'block', topArr[index]);
          }, function () {
              showFunction(index, 'none');
          });
        }
    });
  
    //轮播图   
    $.ajax({
        url: "http://192.168.0.106:8989/homePage/slideshow",
        type: "GET",
        datatype:"json",
        success: function (data){
            let project="";
            for (var i=0;i<data.length;i++) {
              var Img = data[i].slideImage;
              project = `<div class="banner banner1 swiper-slide"  style='background-image: url(${data[i].slideImage})'></div>`;
              $("#banner-img").append(project);
              // $('.banner').eq(i).css("background-image","url("+Img+")")
            };
  
            var swiper = new Swiper('.swiper-container', {
              spaceBetween: 0,
              centeredSlides: true,
              autoplay: {
                  delay: 2000,
                  disableOnInteraction: false,
              },
              navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
              },
              pagination: {
                  el: '.swiper-pagination',
                  bulletActiveClass: 'pagination-dot',
              },
          });
        }
    });
  });


// 商品数据传输
$(function () {
    $.ajax({
        //json地址的值
        url: "http://192.168.0.106:8989/homePage/shouzhan",
        type: "GET",
        datatype: "json",
        success: function (data) {
            let project = "";
            //循环遍历data的值
            for (const a of data) {
                //project存储遍历的值 data-id一种传参方式
                project = `<a class="product" data-id=${a.cmdId}>
                                   <img src="${a.cmdImage}">
                                    <div class="text">
                                        <span class="textb">商品详情：${a.cmdName}</span><br>
                                        <span class="texta">价格：${a.cmdPrice}￥</span>
                                    </div> 
                            </a>`;
                //字符串拼接追加到div中
                $(".middle").append(project);
            }
            //点击获取商品id传值给商品详情页
            $(".product").click(function () {
                //data-id取值方式
                var id = this.dataset.id;
                console.log(id);
                //往商品详情地址传商品的id
                var url = "../templates/a.html?id="+id;
                $(".product").attr("href",url);
            })
        }
    })
})
//今日推荐图片
$(function () {
    $.ajax({
        url: "http://192.168.0.106:8989/homePage/recommend",
        type: "GET",
        datatype: "json",
        success: function (data) {
            let project = "";
            for (const a of data) {
                project = `<a data-id=${a.cmdId}>
                            <img src="${a.cmdImage}"></a>`;
                $(".tuijian-box-2").append(project);

            }
            $(".tuijian-box-2 a").click(function () {
                //data-id取值方式
                var id = this.dataset.id;
                console.log(id);
                var url = "../templates/a.html?id="+id;
                $(".tuijian-box-2 a").attr("href",url);
            })
        }
    })
})
// 商品图片推荐（大小图）
$(function () {
    $.ajax({
        url: "http://192.168.0.124:8989/homePage/hot",
        type: "GET",
        datatype: "json",
        success: function (data) {
            let project = "";
            for (const a of data) {
                project = `<a data-id="${a.cmdId}"><img src="${a.cmdImage}"></a>`;
                $(".product-image").append(project);
            }
            $(".product-image a").click(function () {
                //data-id取值方式
                var id = this.dataset.id;
                console.log(id);
                var url = "../templates/a.html?id="+id;
                $(".product-image a").attr("href",url);
            })
        }
    })
})

