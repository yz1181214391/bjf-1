//封装的弹出框
function confirm(callback,content) {
    // content = content || '您确定要删除吗？';
    // callback = callback || common.alertMsg;
    var confirmModal =
        $('<div class="modal fade  hint-position">'+
            '<div class="modal-dialog modal-sm">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<h4 class="modal-title" style="display: inline-block;">温馨提示</h4>'+
                        '<button type="button" class="close" data-dismiss="modal">×</button>'+
                    '</div>'+
                    '<div class="modal-body">' + content + '</div>'+
                    '<div class="modal-footer">'+
                        '<button id="okButton" type="button" class="btn btn-success">确认</button>'+
                        '<button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>');
    //点击确认的操作
    confirmModal.find('#okButton').click(function(event) {
        //todo eval将字符串转化为函数执行
        // eval(callback);
        confirmModal.modal('hide');

        console.log(1213)
    });
    //显示model框
    confirmModal.modal('show');
}


 //转换时间格式
 function myFunction(time){
    var dateee = new Date(time).toJSON();
    var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
    console.log("时间2==="+date);
}
