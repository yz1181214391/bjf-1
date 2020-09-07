$(function(){

    let  evaluateData = [
        {   Id:'11',
            commodityImg:'../Img/mmexport1580082042896.jpg',
            commodityName:'MacBook Pro 2019款 倒计时看不见哈丝丝',
            initialContent:'',
            initialImg :[
                {Img:'../Img/mmexport1580082034804.jpg' },
                {Img:'../Img/mmexport1580082034804.jpg' },
            ],
            merchantContent:''
        },
        {   
            Id:'12',
            commodityImg:'../Img/mmexport1580082042896.jpg',
            commodityName:'MacBook Pro 2019款 倒计时看不见哈丝丝',
            initialContent:'电闪雷鸣如科幻大片，随后景象更是引人尖叫9月4日，山东上空出现一大块形状像蘑菇的巨型云朵，电闪雷鸣如科幻大片，随后景象更是引人尖叫',
            initialImg :[
                {Img:'../Img/mmexport1580082034804.jpg' },
                {Img:'../Img/mmexport1580082034804.jpg' },
                {Img:'../Img/mmexport1580082034804.jpg' },
            ],
            merchantContent:'敢倒计时看不见哈丝丝哦啊发我号钓位'
        } 
    ];
   
    let str = '';
    for(var i = 0; i < evaluateData.length; i++){
        let str2 = '';
        for(var j = 0;j < evaluateData[i].initialImg.length; j++){
            str2 += `<img src=${evaluateData[i].initialImg[j].Img} alt="">`
        };

        str += `<div class="same-flex evaluate-list-box">
                    <div class="item-box">
                        <img src=${evaluateData[i].commodityImg} alt="">
                        <div>${evaluateData[i].commodityName}</div>
                    </div>
                    <div class="item-list-box">
                        <div  class="initial-box">
                            <div class="initial-talk-box"><span>初次评论：</span><span>${ evaluateData[i].initialContent == '' ? '未写初评，可以在下面补充哦~' : evaluateData[i].initialContent}</span></div>
                            <div class="initial-img-box">${str2} </div>
                            <div class="initial-talk-box"><span>商家回复：</span><span>${evaluateData[i].merchantContent == '' ? '商家未回复' : evaluateData[i].merchantContent}</span></div>
                        </div>
                        <div class="evaluate-box">
                            <textarea class="text-content" placeholder="请输入使用感受" name="reasion"></textarea>
                            <div class="same-flex add-img-box">
                                <input type="file" name="images" style="display:none" class="uploadfile" accept="image/*"/>
                                <div class="same-flex img-box">
                                    <img src="../Img/addimg.jpeg" style="width: 52px; height: 52px;" data-leaves=${i} class="image"/>
                                </div>
                                <span>(最多添加3张图片)</span>
                            </div>
                        </div> 
                    </div>
                </div> `; 
        $('.initial-img-box').html(str2);
        $('.ya-box').html(str);

    };

    // 判断是评价还是追加评价
    // let sick = 0 ;
    // if(sick == 0){
    //     $('.initial-box').hide()
    // }



      // 退款退货框上传图片
      let index = ''
      $(function(){
          
          let num =0
          $(".image").on("click",function(){
                index = this.dataset.leaves;
                num=$('.img-box').eq(index).children().length-1
                $(".uploadfile").eq(index).click();
          });
          $(".uploadfile").change(function(){
              var files=$(this)[0].files[0];    //获取文件信息
              if(files)
              {   
                  var reader=new FileReader();  //调用FileReader
                  reader.onload=function(evt){   //读取操作完成时触发。
                      if($('.img-box').eq(index).children().length<4){

                        $(".image").eq(index).before('<img src="" style="width:50px;height:50px;margin-right:6px;"/>')
                        .siblings().eq(num).attr('src',evt.target.result);                     
                        console.log(num)
                      }
                      if($('.img-box').eq(index).children().length===4){
                        $('.image').eq(index).hide()
                      }
                  }
                  reader.readAsDataURL(files); //将文件读取为 DataURL(base64)
              }
              else{
                  alert("上传失败");
              }
          })
      });


    var evaluateData2 = [
        {textVal:'',Img:''}
    ]
    $('.submit-btn').click(function(){
        let text = $('.text-content');
        let Img = $('.img-box').eq(index).children();
        console.log(Img.eq(0)[0].src)
        // console.log(Img.eq(1)[0])
        // console.log(Img.eq(2)[0])
        console.log()
        for(var t = 0;t<evaluateData.length; t++){
            
          var  evaluateText = $('.text-content').eq(t).val();
        //   var  evaluatImg = Img.eq(t).value;
          evaluateData[t].comment = evaluateText
        //   evaluateData[t].images = evaluatImg
          

        }
        console.log(evaluateData)
        
        // console.log(text)
        // console.log(text[0].value)
        // console.log(text[1].value)
        // console.log(Img)
    })
       
})