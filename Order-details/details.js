$(function(){
    var odDelid = window.location.href.split("=")[1];
    $.ajax({
        url: "http://192.168.0.118:8080/order/showItem",
        type: "GET",
        datatype: "json",
        data:{"odDelid" : odDelid},
        success: function (data) {
            console.log(data)
            showGoods(data);
            var odStatus = data[0].odStatus;
            $('.state').text(function(){
                if(odStatus == 0){
                    return "未付款"
                }else if(odStatus == 1){
                    return "已付款"
                }else if(odStatus == 2){
                    return "已完成"
                }else if(odStatus == 3){
                    return "已取消"
                }else if(odStatus == 4){
                    return "退款成功"
                }else if(odStatus == 5){
                    return "待退款"
                }else if(odStatus == 6){
                    return "退款失败"
                }
            });
            $('.courier').append('<span>配送员:'+data[0].odRecvName+'</span><span>电话:'+data[0].odRevcPhone+'</span>');
            $('.site').text(data[0].odRecvAddress);
            $('.number').text(data[0].odDelid);
            $('.order-time').text(data[0].odTimeStr);
            $('.pay-time').text(data[0].odPayTimeStr);
            $('.pay-way').text(function(){
                if(data[0].bjfPayment.payWay == 0){
                    return "支付宝"
                }else if(data[0].bjfPayment.payWay == 1){
                    return "微信"
                }
            });
            $('.orderTime').text(data[0].odTimeStr);
            $('.payTime').text(data[0].odPayTimeStr);
            $('.accomplishTime').text(data[0].odModifiedTimeStr);
            barFunction();
        }
    }); 

    function showGoods(indentData){
        var str = '';
        var str2 = '';
        for(var i = 0;i < indentData.length; i++){
            if(indentData[i].odStatus == '0'){     //未付款
                str2 = '<div class="same-style">'+
                            '<div class="consignee"></div>'+  //商品操作
                        '</div>'+
                        '<div class="same-style state">未付款</div>'+ //订单状态
                        '<div class="same-style operation-btn">'+  //交易操作
                            '<div class="handle"  data-pay='+ indentData[i].odDelid +'>立即付款</div>'+
                            '<div class="cancel"  data-cancel='+ indentData[i].odDelid +'>取消订单</div>'+
                        '</div>'
            }else if(indentData[i].odStatus == '1'){       //已付款
                str2 = '<div class="same-style">'+
                            '<div class="consignee" data-refund='+ indentData[i].odDelid +'>退款/退货</div>'+  //商品操作
                        '</div>'+
                        '<div class="same-style state">已支付</div>'+ //订单状态
                        '<div class="same-style operation-btn">'+  //交易操作
                            '<div class="handle confirm-receipt" data-confirm='+ indentData[i].odDelid +'>确认收货</div>'+
                        '</div>'
            }else if(indentData[i].odStatus == '2'){       //已完成
                str2 = '<div class="same-style">'+
                            '<div class="consignee"></div>'+  //商品操作
                        '</div>'+
                        '<div class="same-style state">已完成</div>'+ //订单状态
                        '<div class="same-style operation-btn">'+  //交易操作
                            '<div id="evaluate11" class="handle" data-evaluate='+ indentData[i].odDelid +'>评价</div>'+
                        '</div>'
            }else if(indentData[i].odStatus == '3'){         //已取消(取消的订单)
                str2 = '<div class="same-style">'+
                            '<div class="consignee">再次购买</div>'+  //商品操作
                        '</div>'+
                        '<div class="same-style state">已取消</div>'+ //订单状态
                        '<div class="same-style operation-btn">'+  //交易操作
                        '</div>'
            }else if(indentData[i].odStatus == '4'){       //退款成功
                str2 = '<div class="same-style">'+
                            '<div class="consignee"></div>'+  //商品操作
                        '</div>'+
                        '<div class="same-style state">退款成功</div>'+ //订单状态
                        '<div class="same-style operation-btn">'+  //交易操作
                        '</div>'
            }else if(indentData[i].odStatus == '5'){       //待退款
                str2 = '<div class="same-style">'+
                            '<div class="consignee"></div>'+  //商品操作
                        '</div>'+
                        '<div class="same-style state">待退款</div>'+ //订单状态
                        '<div class="same-style operation-btn">'+  //交易操作
                        '</div>'
            }else if(indentData[i].odStatus == '6'){       //退款失败
                str2 = '<div class="same-style">'+
                            '<div class="consignee"></div>'+  //商品操作
                        '</div>'+
                        '<div class="same-style state">退款失败</div>'+ //订单状态
                        '<div class="same-style operation-btn">'+  //交易操作
                        '</div>'
            };
            var str1 = '';
            for(var j=0;j<indentData[i].bjfOrderItems.length;j++){
                str1 +='<div class="same-indent same-flex">'+
                            '<div class="commodity-list same-flex">'+
                                '<img class="commodity-img" src="'+indentData[i].bjfOrderItems[j].oiImage+'" alt="">'+
                                '<div class="commodity-content">'+
                                     '<div>'+ indentData[i].bjfOrderItems[j].oiName+'</div>'+
                                     '<div>'+ indentData[i].bjfOrderItems[j].oiContent.substring(1,indentData[i].bjfOrderItems[j].oiContent.length-1)+'</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="same-style unit-price">'+ indentData[i].bjfOrderItems[j].oiPrice+'</div>'+
                            '<div class="same-style quantity">'+ indentData[i].bjfOrderItems[j].oiNum+'</div>'+
                        '</div>'
            };
            str +='<div class="indent-list" data-list='+ indentData[i].odDelid +'>'+
                        '<div class="indent-detail-box same-flex">'+

                            '<div class="same-flex">'+
                                '<div class="indent-time">'+ indentData[i].odTimeStr+'</div>'+
                                '<div>'+
                                    '<span>订单编号:</span>'+
                                    '<span>'+ indentData[i].odDelid+'</span>'+   
                                '</div>'+
                            '</div>'+
                            '<div class="same-flex">'+
                                '<div class="indent-details1">'+
                                    '<span class="glyphicon glyphicon-trash" aria-hidden="true"  data-delete='+ indentData[i].odDelid +'></span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="same-flex indent-list-box">'+
                            '<div class="commodity-banner">'+str1+'</div>'+
                            '<div class="same-flex sa">'+
                                '<div class="same-style gross-amount">'+ indentData[i].odTotalAmount+'</div>'+
                                str2+
                            '</div>'+
                        '</div>'+
                    '</div>'
        };
        $('#content').html(str);
       
        // 事件代理获取当前点击按钮所对应的订单数据
        var payId ="";
        var refundId ="";
        var deleteId ="";
        var cancelId ="";
        var evaluateId ="";
        var confirmId ="";
        $('.indent-list').click(function(e){
            var event = e || window.event;  // 兼容性处理
            console.log(event.target.getAttribute('data-pay'),"立即付款")
            payId = event.target.getAttribute('data-pay');
            console.log(event.target.getAttribute('data-refund'),"退款退货");
            refundId = event.target.getAttribute('data-refund');
            
            console.log(event.target.getAttribute('data-delete'),"删除按钮");
            deleteId = event.target.getAttribute('data-delete');

            console.log(event.target.getAttribute('data-cancel'),"取消订单");
            cancelId = event.target.getAttribute('data-cancel');

            console.log(event.target.getAttribute('data-evaluate'),"评价");
            evaluateId = event.target.getAttribute('data-evaluate');

            console.log(event.target.getAttribute('data-confirm'),"确认收货");
            confirmId = event.target.getAttribute('data-confirm');
        });

         //点击退款退货按钮跳转退款退货页面
         $(".consignee").click(function () {
            setTimeout(function(){
                var odDelid = refundId;
                console.log("refundId:"+refundId);
                window.top.location.href = '../refund/refund.html?id='+odDelid; 
            },0);
        });
        //确认收货事件
        $(".confirm-receipt").click(function () {
          layer.confirm('确认已收到货吗？', {
                btn: ['确认','取消'] //按钮
            }, function(){ 
                $.ajax({
                    url: "http://192.168.0.103:8080/order/operation",
                    type: "GET",
                    datatype: "json",
                    data:{"odDelid" : confirmId,
                            "id":2},
                    success: function (data) {
                        console.log(data)
                        if(data == 1){
                            layer.msg('确认收货成功', {icon: 1});
                        }else{
                            layer.msg('确认收货失败', {icon: 5});
                        }
                    }
                })  
            });
        });
        //删除订单事件
        $(".indent-details1").click(function () {
            layer.confirm('您确定要删除该订单吗???', {
                btn: ['确认','取消'] //按钮
            }, function(){ 
                $.ajax({
                    url: "http://192.168.0.118:8080/order/operation",
                    type: "GET",
                    datatype: "json",
                    data:{"odDelid" : deleteId,
                            "id":1},
                    success: function (data) {
                        console.log(data)
                        if(data == 1){
                            layer.msg('删除成功', {icon: 1});
                        }else{
                            layer.msg('删除失败', {icon: 5});
                        }
                    }
                })  
            });
        });
        //取消订单事件
        $(".cancel").click(function () {
            layer.confirm('您确定要取消当前订单吗???', {
                btn: ['确认','取消'] //按钮
            }, function(){ 
                $.ajax({
                    url: "http://192.168.0.118:8080/order/operation",
                    type: "GET",
                    datatype: "json",
                    data:{"odDelid" : cancelId,
                            "id":1},
                    success: function (data) {
                        console.log(data)
                        if(data == 1){
                            layer.msg('取消订单成功', {icon: 1});
                        }else{
                            layer.msg('取消订单失败', {icon: 5});
                        }
                    }
                })  
            });
        });

        //点击评价按钮弹出评价框
        $("#evaluate11").one("click",function(e){
                let ev = e.target;
                let evp = $(ev).parents()[3];
                $(evp).after(txt);
                evaFunction();
        });
    };

    function barFunction(){
        var obj1 = $('.details-list').find('.details-time').eq(0).text();
        var obj2 = $('.details-list').find('.details-time').eq(1).text();
        var obj3 = $('.details-list').find('.details-time').eq(2).text();
        function activeFunction(i){
            $('.details-list').find('.details-text-list1').eq(i).addClass('details-text-list1-1');
            $('.details-list').find('.details-text-list2').eq(i).addClass('details-text-list2-1');
            $('.details-list').find('.details-border').eq(i).addClass('details-border-1');
        };
        console.log(obj1);
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