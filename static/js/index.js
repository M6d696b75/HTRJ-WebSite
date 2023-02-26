function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

var topage = GetQueryString("topart");
console.log(topage);
if (topage) {
    $("html,body ").animate({
        scrollTop: ($('#' + topage).offset().top + 20)
    }, 500);
};



//��������
fillNews.setDefault({
    type: 'iTag',
    gameID: 273, // ��ͬ��Ϸ��һ������Ҫ��ѯ�ڲ��ع�
    source: 'web_pc' //�����ϱ��õģ�������ҳ������pc�����ƶ�����gicp�����������ƶ�������web_m ��PC������ web_pc
})
var chanelName = ['&nbsp[����]&nbsp', '&nbsp[����]&nbsp', '&nbsp[�]&nbsp', '&nbsp[����]&nbsp', '&nbsp[����]&nbsp'];

//	part1
var swiper1 = new Swiper('.swiper-container1', {
    pagination: '.swiper-pagination1',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
});

var swiper = new Swiper('.swiper-container2', {
    autoplay: 3000,
    speed: 1000,
    autoplayDisableOnInteraction: false,
    loop: true,
    centeredSlides: true,
    slidesPerView: 2,
    paginationClickable: true,
    prevButton: '.swiper-button-prev2',
    nextButton: '.swiper-button-next2',
    onInit: function(swiper) {
        swiper.slides[2].className = "swiper-slide swiper-slide-active"; //��һ�δ򿪲�Ҫ����
    },
    breakpoints: {
        668: {
            slidesPerView: 1,
        }
    }
});

//���λ
var newsList = fillNews.list({
    id: '110858',
    newsType: 'news',
    pageSize: 5,
    detailURL: '/news',
    tpl: '<div class="swiper-slide"><a href="{url}" target="_blank"><img src="{sCoverMap.One}" alt="{sTitle}"></a></div>',
    wrap: '#adSwiper .swiper-wrapper',
    callback: function(result) {
        swiper1.update();
        for (let i = 0; i < result.data.items.length; i++) {
            var idlist = result.data.items[i].iNewsId;
            /*PTTSendReport({
                action: 'pop',
                targetid: idlist, //֧�������ϱ���targetid��Ӣ�Ķ��ŷָ�
                targettype: "news",
                from: 'v4'
            });*/
        }
    }
});
//	�����б�
var newsList21 = fillNews.list({
    id: '110865',
    newsType: 'news',
    pageSize: 5,
    detailURL: '/news',
    tpl: '<a href="{url}" target="_blank" onclick=""><em>&hearts;</em><span>&nbsp[����]&nbsp</span><p class="ti">{sTitle}</p><p class="time">{sIdxTimeShort}</p></a>',
    wrap: '.news2',
    callback: function(result) {
        for (let i = 0; i < result.data.items.length; i++) {
            var idlist = result.data.items[i].iNewsId;
            /*PTTSendReport({
                action: 'pop',
                targetid: idlist, //֧�������ϱ���targetid��Ӣ�Ķ��ŷָ�
                targettype: "news",
                from: 'v4'
            });*/
        }
    }
});

$('.part4-a').click(function() {
        if ($(this).index() == 1) {
            $('.part4-ti').addClass('on');
        } else {
            $('.part4-ti').removeClass('on');
        }
        $('.part4-con').eq($(this).index()).addClass('on').siblings().removeClass('on');
    })
    //	part4
var swiper = new Swiper('.swiper-container3', {
    nextButton: '.swiper-button-next3',
    prevButton: '.swiper-button-prev3',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    observer: true, // �޸�swiper�Լ�����Ԫ��ʱ���Զ���ʼ��swiper
    observeParents: true // �޸�swiper�ĸ�Ԫ��ʱ���Զ���ʼ��swiper
});
//	var newsList5 = fillNews.list({
//	    id: '115419',
//	    newsType: 'news',
//	    pageSize: 4,
//	    detailURL: '/news_detail.html',
//	    tpl: '<div class="part4-text"><h4><i></i>{sTitle}<i></i></h4><p>{sDesc}</p></div>',
//	    wrap: '.part4-one',
//	    callback: function(result) {
//	        for (let i = 0; i < result.data.items.length; i++) {
//	            var idlist = result.data.items[i].iNewsId;
//	            PTTSendReport({
//	                action: 'pop',
//	                targetid: idlist, //֧�������ϱ���targetid��Ӣ�Ķ��ŷָ�
//	                targettype: "news",
//	                from: 'v4'
//	            });
//	        }
//	    }
//	});


$('.news-tab a').click(function() {
    newsId = $(this).data('newsid');
    thistype = chanelName[$(this).index()];
    $(this).addClass('on').siblings().removeClass('on');
    newsList21.update({
        pageSize: 5,
        id: newsId,
        detailURL: '/news',
        tpl: '<a href="{url}" target="_blank" onclick=""><em>&hearts;</em><span>' + thistype + '</span><p class="ti">{sTitle}</p><p class="time">{sIdxTimeShort}</p></a>'
    })
    $('.news2').addClass('on').siblings().removeClass('on')

})


//	��������
$('.part5-btn a').click(function() {
    if ($(this).index() == 1) {
        $('.part5-btn').addClass('on');
    } else {
        $('.part5-btn').removeClass('on');
    }
    $('.part5-content').eq($(this).index()).addClass('on').siblings().removeClass('on');
})
var newsList3 = fillNews.list({
    id: '110869',
    newsType: 'video',
    pageSize: 3,
    detailURL: '/news',
    tpl: '<div><img src="{sCoverMap.One}" alt="{sTitle}"><a href="javascript:;" id="{sVID}" class="vid-btn"  onclick=""></a><p class="vid-ti">{sTitle}</p></div>',
    wrap: '#vid-con',
    callback: function(result) {
        //	    	console.log(result)
        for (let i = 0; i < result.data.items.length; i++) {
            var idlist = result.data.items[i].iNewsId;
            /*PTTSendReport({
                action: 'pop',
                targetid: idlist, //֧�������ϱ���targetid��Ӣ�Ķ��ŷָ�
                targettype: "news",
                from: 'v4'
            });*/
        }

    }
});
//	��Ƶ
$('.vid-con').on('click', '.vid-btn', function() {
        var vid = $(this).attr('id');
        $('.mod_player_box,.mod_layer').show();

        /*player = new Txplayer({
            containerId: 'mod_player',
            vid: vid,
            width: '100%',
            height: '100%',
            autoplay: true,
            poster: ''
        });*/

        player = new DPlayer({
            container: document.getElementById('mod_player'),
            autoplay: true,
            video: {
                url: '/static/api/vod/' + vid + '.mp4',
            },
        });

    })
    //��ֽ
var newsList4 = fillNews.list({
    id: '110871',
    newsType: 'news',
    pageSize: 2,
    detailURL: '/news',
    tpl: '<a href="{url}" target="_blank" onclick=""><img src="{sCoverMap.One}" alt="{sTitle}"><p class="ti">{sTitle}</p></a>',
    wrap: '.part5-news',
    callback: function(result) {
        for (let i = 0; i < result.data.items.length; i++) {
            var idlist = result.data.items[i].iNewsId;
            /*PTTSendReport({
                action: 'pop',
                targetid: idlist, //֧�������ϱ���targetid��Ӣ�Ķ��ŷָ�
                targettype: "news",
                from: 'v4'
            });*/
        }
    }
});




// ��Ѷ����
function openDialog(e) {
    showDialog.show(e);
}

function closeDialog() {
    showDialog.hide();
    /*PTTSendClick("btn", "pop-close", "�����رհ�ť");*/
}
//openDialog("pop1");

//��ҳ��Ƶ
$('.kv-video').click(function() {
    var vid = $(this).attr('id');
    $('.mod_player_box,.mod_layer').show();

    /*player = new Txplayer({
        containerId: 'mod_player',
        vid: 'h0639yczv8x',
        width: '100%',
        height: '100%',
        autoplay: true,
        poster: ''
    });

    player = new DPlayer({
        container: document.getElementById('mod_player'),
        autoplay: true,
        //lang: 'en',
        video: {
            url: vid,
        },
    });*/

})

$('.close_btn').click(function() {
    $('.mod_player_box,.mod_layer').hide();
    $('#mod_player').html('');
    //player.pause();
    player.destroy();
})

//����
var clipboard = new ClipboardJS('.btn-copy', {
    text: function() {
        return $(".copy").html();
    }
});
clipboard.on('success', function(e) {
    console.log(e);
    alert('���Ƴɹ�');
});

clipboard.on('error', function(e) {
    console.log(e);
});
// MP3

function MP3_Player(url, flag) {
    this.mobj = new Audio();
    this.mobj.src = url;
    this.enabled = true;
    if (flag) {
        this.mobj.loop = flag;
    }

}
MP3_Player.prototype.setEabled = function(flag) {
    this.enabled = flag;
    try {
        if (this.mobj.isplayed) {
            this.mobj.pause();
        }

    } catch (e) {
        console.error("����ֹͣ���Ŵ���!");
    }
}
MP3_Player.prototype.play = function() {
    try {
        this.mobj.play();

    } catch (e) {
        console.error("���ֲ��Ŵ���!");
    }
}
MP3_Player.prototype.pause = function() {
    try {
        this.mobj.pause();
    } catch (e) {
        console.error("����ֹͣ���Ŵ���!");
    }
}
MP3_Player.prototype.replay = function() {
    try {
        if (this.mobj.isplayed) {
            this.mobj.currentTime = 0;
        }
        this.mobj.play();
    } catch (e) {
        console.error("�����ظ����Ŵ���!");
        this.mobj.play();
    }
}
var mp3_news1 = new MP3_Player('/static/music/bgm1.mp3');
var mp3_news2 = new MP3_Player('/static/music/bgm2.mp3');
var mp3_news3 = new MP3_Player('/static/music/bgm3.mp3');
$('.part4-bgm').click(function() {
        if ($(this).hasClass('on')) {
            $('.part4-bgm').removeClass('on');
            mp3_news1.pause();
            mp3_news2.pause();
            mp3_news3.pause();
        } else {
            $('.part4-bgm').removeClass('on');
            $(this).addClass('on');
            var num = $(this).data("bgm");
            if (num == 1) {
                mp3_news1.play();
                mp3_news2.pause();
                mp3_news3.pause();
            }
            if (num == 2) {
                mp3_news1.pause();
                mp3_news2.play();
                mp3_news3.pause();
            }
            if (num == 3) {
                mp3_news1.pause();
                mp3_news2.pause();
                mp3_news3.play();
            }
        }


    })
