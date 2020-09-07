$(function(){
    var odDelid = 1597886410483508
    var oiId = 59
    $('.refundId').val(odDelid);
    $('.oiId').val(oiId);


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
         
    ];
   
    let str = '';
    for(var i = 0; i < evaluateData.length; i++){
        let str2 = '';
        for(var j = 0;j < evaluateData[i].initialImg.length; j++){
            str2 += `<img src=${evaluateData[i].initialImg[j].Img} alt="">`
        };

        $('.initial-img-box').html(str2);
    };


 
    // 退款退货框上传图片
    let num = 0;
    $(function(){
        $("#image").click(function(){
            $("#uploadfile").click();
        });
        $("#uploadfile").change(function(){
            var files=$(this)[0].files[0];    //获取文件信息
            if(files)
            {
                var reader=new FileReader();  //调用FileReader
                reader.onload=function(evt){   //读取操作完成时触发。
                    if(num<3){
                       $("#image").before('<img src="" style="width:50px;height:50px;margin-right:6px;"/>').siblings().eq(num).attr('src',evt.target.result);
                        num++; 
                    };
                    if(num == 3){
                        $('#image').hide()
                    }
                }
                reader.readAsDataURL(files); //将文件读取为 DataURL(base64)
            }
            else{
                alert("上传失败");
            }
        })
    });

    // 提交退款理由和照片
    $('.submit-btn').click(function(){
        layer.confirm('确认提交吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){ 
            $('#refund-form').ajaxSubmit(function(data){
                console.log(data)
                if(data == 1){
                    layer.msg('提交成功', {icon: 1});
                    window.history.back();
                }else{
                    layer.msg('提交失败', {icon: 5});
                }
            });
        }); 
    })

       
})