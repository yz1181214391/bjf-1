//实例化vue对象
new Vue({
 el:"#vue-box",
 data:{
    changeColor:false,
    changeLength:'changeLength',
 },
 methods:{

 },
 computed:{
    compClass:function(){
        console.log({
            changeColor:this.changeColor,
            changeLength:this.changeLength
        })
        return {
            changeColor:this.changeColor,
            changeLength:this.changeLength
        }
        
    }
 }
})