$(function(){
    var odDelid = window.location.href.split("=")[1];
    $('.refundId').val(odDelid);
    $.ajax({
        url: "http://192.168.0.118:8080/order/showBack",
        type: "GET",
        datatype: "json",
        data:{"odDelid" : odDelid},
        success: function (data) {
            console.log(data)
            showGoods(data);
            $('.orderTime').text(data[0].odTimeStr);
            $('.payTime').text(data[0].odPayTimeStr);
            $('.accomplishTime').text(data[0].odModifiedTimeStr);
            barFunction();
        }
    })  

    function showGoods(indentData){
        var str = '';
        for(var i = 0;i < indentData.length; i++){
            var str1 = '';
            // for(var j=0;j<indentData[i].bjfOrderItems.length;j++){
            //     str1 +='<div class="same-indent same-flex">'+
            //                 '<div class="commodity-list same-flex">'+
            //                     '<img class="commodity-img" src="'+indentData[i].bjfOrderItems[j].oiImage+'" alt="">'+
            //                     '<div class="commodity-content">'+
            //                          '<div>'+ indentData[i].bjfOrderItems[j].oiName+'</div>'+
            //                          '<div>'+ indentData[i].bjfOrderItems[j].oiContent.substring(1,indentData[i].bjfOrderItems[j].oiContent.length-1)+'</div>'+
            //                     '</div>'+
            //                 '</div>'+
            //                 '<div class="same-style unit-price">'+ indentData[i].bjfOrderItems[j].oiPrice+'</div>'+
            //                 '<div class="same-style quantity">'+ indentData[i].bjfOrderItems[j].oiNum+'</div>'+
            //             '</div>'
            // };

            str1 +='<div class="same-indent same-flex">'+
                        '<div class="commodity-list same-flex">'+
                            '<img class="commodity-img" src="'+indentData[i].oiImage+'" alt="">'+
                            '<div class="commodity-content">'+
                                '<div>'+ indentData[i].oiName+'</div>'+
                                '<div>'+ indentData[i].oiContent.substring(1,indentData[i].oiContent.length-1)+'</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="same-style unit-price">'+ indentData[i].oiPrice+'</div>'+
                        '<div class="same-style quantity">'+ indentData[i].oiNum+'</div>'+
                    '</div>'
            str +='<div class="indent-list" data-list='+ indentData[i].odDelid +'>'+
                        '<div class="indent-detail-box same-flex">'+

                            '<div class="same-flex">'+
                                '<div class="indent-time">'+ indentData[i].odTimeStr+'</div>'+
                                '<div>'+
                                    '<span>订单编号:</span>'+
                                    '<span>'+ indentData[i].odDelid+'</span>'+   
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="same-flex indent-list-box">'+
                            '<div class="commodity-banner">'+str1+'</div>'+
                            '<div class="same-flex sa">'+
                                '<div class="same-style gross-amount">'+ indentData[i].odTotalAmount+'</div>'+
                                '<div class="same-style"></div>'+//商品操作
                                '<div class="same-style state">已支付</div>'+ //订单状态
                                '<div class="same-style operation-btn">'+  //交易操作
                                    // '<div class="handle confirm-receipt" data-confirm='+ indentData[i].odDelid +'>取消退货</div>'+
                                '</div>'
                            '</div>'+
                        '</div>'+
                    '</div>'
        };
        $('#content').html(str);
       
        // //取消退货事件
        // $(".confirm-receipt").click(function () {
        //   layer.confirm('确认取消退款退货？', {
        //         btn: ['确认','取消'] //按钮
        //     }, function(){ 
        //         $.ajax({
        //             url: "http://192.168.0.118:8080/order/notBack",
        //             type: "GET",
        //             datatype: "json",
        //             data:{"odDelid" : odDelid},
        //             success: function (data) {
        //                 console.log(data)
        //                 if(data == 1){
        //                     layer.msg('取消成功', {icon: 1});
        //                 }else{
        //                     layer.msg('删除失败', {icon: 5});
        //                 }
        //             }
        //         })  
        //     });
        // });

        //点击评价按钮弹出评价框
        $("#evaluate11").one("click",function(e){
                let ev = e.target;
                let evp = $(ev).parents()[3];
                $(evp).after(txt);
                evaFunction();
        });
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
    $('.evaluate-btn').click(function(){
        layer.confirm('确认提交吗？', {
            btn: ['确认','取消'] //按钮
        }, function(){ 
            $('#refund-form').ajaxSubmit(function(data){
                if(data == 1){
                    layer.msg('提交成功', {icon: 1});
                    window.history.back();
                }else{
                    layer.msg('提交失败', {icon: 5});
                }
            })
        }); 
    })

    // 退货详情进度条
    function barFunction(){
        var obj1 = $('.details-list').find('.details-time').eq(0).text();
        var obj2 = $('.details-list').find('.details-time').eq(1).text();
        var obj3 = $('.details-list').find('.details-time').eq(2).text();
        function activeFunction(i){
            $('.details-list').find('.details-text-list1').eq(i).addClass('details-text-list1-1');
            $('.details-list').find('.details-text-list2').eq(i).addClass('details-text-list2-1');
            $('.details-list').find('.details-border').eq(i).addClass('details-border-1');
        };
        if(obj1 != '' && obj2 == ''){
            activeFunction(0);
        }else if(obj1 != '' &&  obj2 != ''  && obj3 == ''){
            activeFunction(0);
            activeFunction(1);
        }else if(obj1 != '' &&  obj2 != '' && obj3 != ''){
            activeFunction(0);
            activeFunction(1);
            activeFunction(2);
        } 
    };
})
