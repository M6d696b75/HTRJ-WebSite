//�滻ҳ�Ű�Ȩ��Ϣ
//$("#gfooter").load("/static/etc/footer.ht");
//$("#gfooter").load("/public/footer.ht");
//id��ת
function zw_tj(ele){
    //eleΪָ����ת����λ�õ�DOM�ڵ�
    let bridge = ele;
    let root = document.body;
    let height = 0;
    do{
        height += bridge.offsetTop;
        bridge = bridge.offsetParent;
    }while(bridge !== root)
    window.scrollTo(0,height);
    //return height;
}
//���ض���
function zw_gtop(){
    window.scrollTo(0,0);
}
$(window).scroll(function(){
    var sc=$(window).scrollTop();
    //var rwidth=$(window).width()
    if(sc>1000){
     $(".backtop").css("display","block");
     //$(".backtop").css("left",(rwidth-36)+"px")
    }else{
    $(".backtop").css("display","none");
    }
})