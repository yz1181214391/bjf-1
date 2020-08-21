$(function(){
  // 左侧导航栏
  $.ajax({
      url: "http://192.168.0.124:8989/homePage/getTree",
      type: "GET",
      datatype:"json",
      success: function(data) {
        var str = '';
        for(var i = 0; i < data.length; i++){
            var str1 = '';
            for(var i = 0; t < data[i].next.length; t++){
                var str2 = '';
                var cgid = data[i].cgId;
                for(var j = 0; j < data[i].next[t].length; j++){ 
                    var cgid2 = data[i].next[j].cgId;
                    str2 += '<li ><a  class="navType" data-id="'+cgid2+'">'+data[i].next[t].next[j].cgName+'</a></li>';
                };
                str1 += '<div>'+
                            '<div>'+data[i].next[j].cgName+'</div>'+
                            '<div>'+str2+'</div>'+
                        '</div>'
            }
            str  += '<li class="nav-list">'+
                        '<a class="navType" data-id="'+cgid+'">'+data[i].cgName+'</a>'+
                        '<div class="hide-box"><ul class="hide-list-box">'+str1+'</ul></div>'+
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
      url: "192.168.0.124:8989/homePage/slideshow",
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
                delay: 5000,
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
    let Data = [
        {
            image: "./images/tomato.png",
            ProductPrice: "¥12.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥13.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥14.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥15.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥16.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥17.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥18.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥19.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥20.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥21.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        }, {
            image: "./images/tomato.png",
            ProductPrice: "¥17.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥18.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥19.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥20.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },
        {
            image: "./images/tomato.png",
            ProductPrice: "¥21.00",
            ProductIntro: "圣女果新鲜千禧果樱桃小番茄水果当季5斤西红柿应季时令整箱蔬菜",
        },

    ]
    let project = "";
    for (const a of Data) {
        project += `<div class="product">
           <img src="${a.image}">
            <div class="text">
            <span class="texta">${a.ProductPrice}</span>
            <br><span class="textb">${a.ProductIntro}</span></div>
<!--            <button>加入购物车</button>-->
<!--            <button>立即购买</button>-->
        </div>`;
        $(".middle").empty().append(project);
    }
})
//今日推荐图片
$(function () {
    let Data = [
        {
            image: "./images/推荐1.jpg"
        }, {
            image: "./images/推荐2.jpg"
        }, {
            image: "./images/推荐3.jpg"
        }, {
            image: "./images/推荐4.jpg"
        },
    ]
    let project="";
    for (const a of Data) {
        project += `<img src="${a.image}">`;
        $(".tuijian-box-2").empty().append(project);
    }

})


