/*
    20201214.mct.play.v2.js 
    Author:dereksu
    kimi:20191204&20201019&20201211&20210406
    not included 2021-02-26 & 2021-03-01 & 2021-03-02
 */
    var _id = function (id) { //��ȡdom
        return document.getElementById(id);
    }

    //��ȡurl����
    function getUrlParam(param) {
        var m = new RegExp("(?:&|/?)" + param + "=([^&$]+)").exec(window.location.search);
        return m ? m[1] : "";
    }

    var loadScript = function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.onload = function () {
            typeof callback == 'function' && callback();
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    //У��back�����Ϸ���
    function VaildURL(sUrl){
        return (/^(https?:\/\/)?[\w\-.]+\.(qq|taotao)\.com($|\/|\\)/i).test(sUrl)||(/^[\w][\w\/\.\-_%]+$/i).test(sUrl)||(/^[\/\\][^\/\\]/i).test(sUrl) ? true : false;
    }
    if (getUrlParam("turn_off_lowercase").toLowerCase() != "true") { 
        //���ر�Сд
        var isBack = getUrlParam("back").toLowerCase(); //������ɵķ��ص�ַ,Ĭ�Ϸ��ع�����ҳ
    } else {
        var isBack = getUrlParam("back"); //������ɵķ��ص�ַ,Ĭ�Ϸ��ع�����ҳ
    }

    var TGMediaId = getUrlParam("media") ? getUrlParam("media") : 0; //url������������id
    window.TGMediaList = typeof TGMediaList == 'undefined' ? {} : TGMediaList;
    window.TGMediaProjectName = (typeof TGMediaProjectName == 'undefined' ? 'proj0' : TGMediaProjectName).replace(/\_/g, '');

    //ԭ��url����
    var deviceType = getUrlParam("device").toLowerCase(); //ָ��ϵͳ��ֱ�����أ�������autoΪ�Զ�ʶ��ǰ�ֻ�ϵͳ���ء�
    var homePageJump = getUrlParam("jump").toLowerCase(); //�Ƿ�������/���غ���ת������תҳ��
    var iosSchemeParameter = getUrlParam('ios_scheme_parameter'); //iOS��ҳ����Scheme ����
    var otherBrowser = getUrlParam("browser").toLowerCase(); //������������Ƿ���������auto����
    var mqqParams = getUrlParam("mqq").toLowerCase(); //��Q������ select�����������ѡ��ť
    var androidSchemeParameter = getUrlParam('android_scheme_parameter'); //Android��ҳ���� Scheme ����
    var iosWechatAppIdParameter = getUrlParam('ios_wechat_appid_parameter'); //ios��΢��ͨ��appid������Ϸʱ���ݸ�������app�Ĳ���
    var androidWechatAppIdParameter = getUrlParam('android_wechat_appid_parameter'); //android��΢��ͨ��appid������Ϸʱ���ݸ�������app�Ĳ���
    var iosmqqp = getUrlParam("iosmqqp"); //iOS����Q���𴫵ݸ�������app�Ĳ���
    var jumpToHome = getUrlParam("jumpToHome"); //��ת��ҳ��ز���
    var noDownloadAlert = getUrlParam("noDownloadAlert"); //��ֹ������������alert

    //ģ������Զ���
    window.TGMediaProjectCfg = typeof TGMediaProjectCfg !== 'undefined' ? TGMediaProjectCfg : {};
    if(TGMediaProjectCfg.is_show_mqq_tpl_dialog === 1){
        mqqParams = 'select';
    }

    //����
    var gameName = MCTCFG.gameName; //��Ϸ����
    var iosURL = MCTCFG.iosURL; //iOS���ص�ַ
    var androidURL = MCTCFG.androidURL; //��׿���ص�ַ
    var androidWechatURL = MCTCFG.androidWechatURL; //Android΢�����ص�ַ
    var androidMqqURL = MCTCFG.androidMqqURL; //Android��Q���ص�ַ
    var wechatGameCenterURL = MCTCFG.wechatGameCenterURL; //΢����Ϸ���ģ���д������iOS����Android��ֻҪ��΢�ţ����ض���������
    var iosScheme = MCTCFG.iosScheme.replace(/\s/g, ''); //��ҳ������Ϸscheme��IOS��
    var androidScheme = MCTCFG.androidScheme; //��ҳ������Ϸscheme����׿��
    var homePage = VaildURL(isBack) ? isBack : "/"; //��תҳ��Ĭ�����ع���
    var appID = MCTCFG.appID; //΢�ſ���ƽ̨��appID
    var scheme = MCTCFG.scheme; //��Q������Ϸscheme��iOS��
    var packageName = MCTCFG.packageName; //��Q������Ϸscheme����׿��

    //���ײ�������������滻���ص�ַ
    if (TGMediaList.hasOwnProperty(TGMediaId)) {
        console.log("ײ����������:" + TGMediaId);
        //��ת��ԭ�������ҳ
        if(homePage == 'cururl'){
            homePage = MCTCFG.protocol + '://' + window.location.hostname + ((window.location.pathname).replace(/download\.shtml/g, 'index.shtml')) + '?media=' + TGMediaId;
        }
        if(TGMediaList[TGMediaId].ios){
            iosURL = TGMediaList[TGMediaId].ios;
        }
        if(TGMediaList[TGMediaId].android){
            androidURL = TGMediaList[TGMediaId].android;
        }
        if((typeof TGMediaList[TGMediaId].android_wx !== 'undefined') && TGMediaList[TGMediaId].android_wx){
            androidWechatURL = TGMediaList[TGMediaId].android_wx;
        }
        if((typeof TGMediaList[TGMediaId].android_qq !== 'undefined') && TGMediaList[TGMediaId].android_qq){
            androidMqqURL = TGMediaList[TGMediaId].android_qq;
        }
        var mediaType = ''+TGMediaId;
    } else {
        var mediaType = '';//��������
    }

    //PTT��ʼ��
    var setSite = {
        siteType: TGMediaProjectName,
        pageType: 'play' + (mediaType ? ('-' + mediaType) : ''),
        pageName: "������������ҳ" + (mediaType ? ('-' + mediaType) : ''),
        project: 'mct'
    };
    if (typeof (pgvMain) == 'function') pgvMain();

    //ͳ��������������ҳ��pv
    //PTTSendClick("page", "pv", "������������ҳ������");
    
    var platform;
    var platformChinese;

    function getPlatform(cb) {
      //��ȡƽ̨
      var ua = window.navigator.userAgent.toLowerCase();
      platform = "other";
      platformChinese = "����ƽ̨";
      if (ua.indexOf("micromessenger") != -1 && ua.indexOf("wxwork") == -1) {
        platform = "wechat";
        platformChinese = "΢��";
      } else if (ua.indexOf("weibo") != -1) {
        platform = "weibo";
        platformChinese = "΢��";
      } else if (ua.indexOf("qqmusic") != -1) {
        platform = "qqmusic";
        platformChinese = "QQ����";
      }
      mqq.device.isMobileQQ(function (result) {
        if (result == true) {
          platform = "mqq";
          platformChinese = "��Q";
        }
        typeof cb == 'function' && cb();
      });
    }    

    var jumpToHomePage = function () { // ��ת��HomePage
        if (jumpToHome == "back") {
            window.history.back();
            return;
        }
        if (homePageJump != "false") {
            PTTSendClick("jump", "jumpToHomePage", "��ת����ҳ");
            window.location.href = homePage || window.location.origin;
        }
    }

    var system = function () { //ϵͳ
        var re = 'pc';
        if (/iphone|ipod|ipad/i.test(navigator.userAgent)) {
            re = 'iOS';
        } else if (/android/i.test(navigator.userAgent)) {
            re = 'Android';
        }
        return re;
    }();

    var pageStatus = { //����ҳ��״̬
        sto: false,
        other: function () { //����ƽ̨
            _id("w_dialog").style.display = "block";
        },
        disableStart: function () {
            _id("start").className = "start disable";
            _id("w_dialog").style.display = "block";
            _id("downloadPrompt").style.display = "block";
        },
        dialogShow: function () { //ѡ����ʾ���
            _id('w_dialog').style.display = 'block';
        },
        dialogHide: function () { //ѡ����ʾ��ر�
            _id('w_dialog').style.display = 'none';
        },
        startUp: function () {
            _id("tips-ctx").innerHTML = "����������Ϸ����";
            this.sto = setTimeout(function () {
                jumpToHomePage();
            }, 2000);
        },
        download: function () { //�Ѿ���ʼ����
            clearTimeout(this.sto);
            if (system == 'iOS') {
                _id("tips-ctx").innerHTML = "������ת App Store����";
            } else if (system == 'Android') {
                _id("tips-ctx").innerHTML = '�Ѿ���ʼ�����������Ժ򡭡�<span class="tip">��û�з������ؽ��ȣ���ע��鿴����֪ͨ������<a href="javascript:uniformDownload();">���</a>�ٴγ���</span>';
            }
        },
        browserOpen: function () {
            _id("w_browserOpen").style.display = 'block';
        }
    };

    var getWechatVer = function () {
      //��ȡ΢�Ű汾
      var re = false;
      if (platform == "wechat") {
        var MicroMessenger = navigator.userAgent.match(
          /MicroMessenger\/([\d\.]+)/i
        );
        if (MicroMessenger) {
          var verSsource = MicroMessenger[1].split(/\./);
          var num_place = ["", "0", "00", "000", "0000"];
          var r = num_place.reverse();
          for (var i = 0; i < verSsource.length; i++) {
            var len = verSsource[i].length;
            verSsource[i] = r[len] + verSsource[i];
          }
          var curVer = verSsource.join("");
          var ver = curVer > "000600050006";
          re = ver;
        }
      }
      return re;
    };

    var wechatReady = function (callback) {
      //΢�Žӿ�׼�����
      if (
        typeof WeixinJSBridge == "object" &&
        typeof WeixinJSBridge.invoke == "function"
      ) {
        callback();
      } else {
        if (document.addEventListener) {
          document.addEventListener("WeixinJSBridgeReady", callback, false);
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", callback);
          document.attachEvent("onWeixinJSBridgeReady", callback);
        }
      }
    };

    var patternStr = /^(https?:\/\/|\/\/)/;//�Ϸ�url http https
    var patternStr2 = /^(itms-apps?:\/\/|\/\/)/;//�Ϸ�url itms-apps
    var defaultTips = 'SYSTEM �汾��δ���ţ������ڴ���';//Ĭ����ʾ�İ�

    var uniformDownload = function (options) { //ͳһ����
        options = options || {};
        var sys = options.system || system;
        if (!options.url) { //����ú���û�д������ص�ַ
            if (sys == "iOS") { //ios���ص�ַ
              options.url = iosURL;
            } else { //android���ص�ַ
              if (platform == "wechat" && androidWechatURL) { //android΢�����ص�ַ
                options.url = androidWechatURL;
              } else if (platform == "mqq" && androidMqqURL) { //android��Q���ص�ַ
                options.url = androidMqqURL;
              } else { //����android���ص�ַ����android΢�ŵ���û��android΢��ר�õ�ַҲ������
                options.url = androidURL;
              }
            }
            if (platform == "wechat" && wechatGameCenterURL) { //�����΢��ƽ̨����д��΢����Ϸ���ģ������ȼ����ߣ�ʹ����Ϸ���ĵ�ַ
              options.url = wechatGameCenterURL;
            }
        }
        var pf = options.platform || platform;
        var pfc = options.platformChinese || platformChinese;
        //�ж�url�Ƿ���Ч��http:// �� https:// �� // �� itms-apps ��ͷ
        if(patternStr.test(options.url) || patternStr2.test(options.url)){
            //���ص�ַ��Ч
            if(options.passive){//��������ͳ��
                PTTSendClick("passive_download", sys + "_" + pf, "��������_" + sys + "_" + pfc);
            }else{//��������
                PTTSendClick("download", sys + "_" + pf, "����_" + sys + "_" + pfc);
            }
            pageStatus.download(); //��ʾ��ʼ�����İ�
            if (system == "pc" && patternStr2.test(options.url)) {
                options.url = options.url.replace("itms-apps", "https"); //��PC������ios���������Ϊitms-appsЭ�����滻ΪhttpsЭ��
            }
            if (options.download) { //�Ƿ��Զ��������ط�ʽ
                options.download(options);
            } else {
                if(pf == 'pc_browser'){
                    window.open(options.url); //���´���
                }else{
                    window.location.href = options.url;
                }               
            }
            setTimeout(function () {
                if(pf != 'pc_browser'){
                    jumpToHomePage();
                }
            }, 3500);
        }else{
            if (options.url == '' || options.url == '#') {
                //δ��URL
                PTTSendClick("download", sys + "_" + pf + "_nourl", "����_" + sys + "_" + pfc + "_δ��url");
                if (noDownloadAlert != "true") {
                    alert(defaultTips.replace(/SYSTEM/g, sys));
                }
                if(pf != 'pc_browser'){
                    jumpToHomePage();
                }
            }else{
                //URLдΪ��ʾ���
                PTTSendClick("download", sys + "_" + pf + "_chineseurl", "����_" + sys + "_" + pfc + "_����url");
                alert(options.url);
                if(pf != 'pc_browser'){
                    jumpToHomePage();
                }
            }
        }
    }


    var platform_wechat = function () { //΢��ƽ̨
        var ver = getWechatVer();

        var launchApplication_ok = function () { //����ɹ�
            PTTSendClick("play", system + "_wechat", "����_" + system + "_΢��");
            pageStatus.startUp(); //��ʾ�����İ�
        }

        var launchApplication_fail = function () {
            uniformDownload();
        }

        var callback = function () {
            if (ver) { //�汾���ڵ���6.5.6
                WeixinJSBridge.invoke('launchApplication', { //������ӿ�
                    'appID': appID,
                    'parameter': iosWechatAppIdParameter,
                    'extInfo': androidWechatAppIdParameter
                }, function (res) {
                    if (res.err_msg.indexOf("launchApplication:fail") != -1) {
                        //����ʧ��
                        launchApplication_fail();
                    } else if (res.err_msg.indexOf("launchApplication:ok") != -1) {
                        //����ɹ�
                        launchApplication_ok();
                    }
                });
            } else { //�汾С�ڵ���6.5.6
                PTTSendClick('ver', 'min_6_5_6', '΢�Ű汾����6_5_6'); //�ϱ��Ͱ汾΢��
                WeixinJSBridge.invoke("launch3rdApp", { //����������Ϸ
                    "appID": appID
                }, function (res) {
                    if (res.err_msg.indexOf("launch_3rdApp:fail") != -1) {
                        //����ʧ��
                        launchApplication_fail();
                    } else {
                        //����ɹ�
                        launchApplication_ok();
                    }
                });
            }
        }

        wechatReady(callback);
    }


    var platform_mqq = function () { //��Qƽ̨
        var identifier = system == 'iOS' ? scheme : packageName;

        var launchApplication_ok = function (cb) {
            PTTSendClick("play", system + "_mqq", "����_" + system + "_��Q");
            // mqq.app.launchApp({
            //     name: identifier
            // });
            var iosMqqParams = {};
            if (iosmqqp) {
              var arr = iosmqqp.split("|");
              for (var i = 0; i < arr.length; i++) {
                var t = arr[i].split(":");
                iosMqqParams[t[0]] = t[1];
              }
            }
            mqq.app.launchApp(identifier, iosMqqParams);
            if (cb) {//���iosĬ�����ش���
                cb();
            } else {
                pageStatus.dialogHide(); //���ضԻ���
                pageStatus.startUp(); //��ʾ�����İ�
            }
        }

        var launchApplication_fail = function (passiveDownload) {
            uniformDownload({ //����
                passive:passiveDownload,//�Ƿ��Ǳ�������
                download: function (p) {
                    pageStatus.dialogHide();//���ضԻ���
                    window.location.href = p.url;
                }
            });
        }

        var isAppInstalled = function () {
            if (system == 'iOS') { //iOSֱ�������ж��Ƿ�װ
                launchApplication_ok(function () {
                    setTimeout(function () {
                        launchApplication_fail(true);
                    }, 2000);
                });
            } else {
                mqq.app.isAppInstalled(identifier, function (result) { //�ж��Ƿ�װ
                    if (result) { //�Ѱ�װ
                        launchApplication_ok();
                    } else { //δ��װ
                        launchApplication_fail();
                    }
                });
            }
        }

        //�Ƿ񵯲�ѡ��
        if (mqqParams == "select") {
            if (identifier) {
                pageStatus.dialogShow(); //��ʾ�Ի���
                _id('start').addEventListener('touchend', function (e) { //���������Ϸ
                    isAppInstalled();
                    e.preventDefault();
                });
                _id('download').addEventListener('touchend', function (e) { //���������Ϸ
                    launchApplication_fail();
                    e.preventDefault();
                });
            } else {
                launchApplication_fail();
            }
        } else {
            if (identifier) {
                isAppInstalled();
            } else {
                launchApplication_fail();
            }
        }        
    }


    var platform_weibo = function () { //΢��ƽ̨
        var startScheme = system == 'iOS' ? iosScheme : androidScheme;
        var downloadUrl = system == 'iOS' ? iosURL : androidURL;
        var iosDownloadTime = 10;
        if (system == 'iOS' && downloadUrl) { //�����ios���������ص�ַ
            iosDownloadTime = 1500;
        }
        if (startScheme) {
            PTTSendClick("play", system + "_weibo", "����_" + system + "_΢��");
            window.location.href = startScheme;
        }
        setTimeout(function () {
            if (iosDownloadTime != 10) { //�����ios���������ص�ַ
                PTTSendClick("download", system + "_weibo", "����_" + system + "_΢��");
                window.location.href = downloadUrl;
            }
            setTimeout(function () {
                PTTSendClick("browserOpen", system + "_weibo", "��ʾ�����������_" + system + "_΢��");
                pageStatus.browserOpen();
            }, 1500);
        }, iosDownloadTime);
    }


    var platform_qqmusic = function () { //QQ����ƽ̨
        var launchApplication_ok = function () {
            PTTSendClick("play", system + "_qqmusic", "����_" + system + "_QQ����");
            pageStatus.startUp();
        }

        var launchApplication_fail = function () {
            uniformDownload({ //����
                download: function (p) {
                    if (system == 'iOS') {
                        M.client.open('ui', 'openUrl', {
                            url: p.url.replace(/^https?:/i, 'itms-apps:'),
                            target: 'app'
                        });
                    } else if (system == 'Android') {
                        window.location.href = p.url;
                    }
                }
            });
        }

        var startScheme, pn;
        if (system == 'iOS') {
            startScheme = iosScheme;
            pn = true;
        } else if (system == 'Android') {
            startScheme = androidScheme;
            pn = packageName;
        }
        if (startScheme && pn) {
            loadScript('//y.gtimg.cn/music/h5/lib/js/zepto-1.0.min.js?max_age=604800', function () {
                loadScript('//y.gtimg.cn/music/h5/lib/js/music-1.0.min.js?max_age=604800', function () {
                    switch (system) {
                        case 'iOS':
                            M.client.open('ui', 'openUrl', {
                                url: startScheme,
                                target: 'app'
                            }, function (e) {
                                if (e.code == 0) { //����ɹ�
                                    launchApplication_ok();
                                } else { //����ʧ�ܻ���������
                                    launchApplication_fail();
                                }
                            });
                            break;
                        case 'Android':
                            M.client.open("app", "isInstalled", {
                                'android': [packageName]
                            }, function (e) {
                                if (e.data.installed[0] == 1) { //�Ѱ�װ
                                    launchApplication_ok();
                                    window.location.href = startScheme;
                                } else { //δ��װ
                                    launchApplication_fail();
                                }
                            });
                            break;
                    }
                });
            });
        } else { //δ��д������ز���
            if (system == 'iOS') {
                loadScript('//y.gtimg.cn/music/h5/lib/js/zepto-1.0.min.js?max_age=604800', function () {
                    loadScript('//y.gtimg.cn/music/h5/lib/js/music-1.0.min.js?max_age=604800', function () {
                        launchApplication_fail();
                    });
                });
            } else {
                launchApplication_fail();
            }
        }
    }


    var platform_other = function () { //����ƽ̨
        // var startScheme = system == 'iOS' ? iosScheme : androidScheme;

        var startEv = function () { //�������
            // if (system == 'iOS' && iosSchemeParameter.length > 0) { //��������Զ������
            //     startScheme += ('?' + iosSchemeParameter.replace(/\|/g, '&'));
            // }
            // if (system == 'Android' && androidSchemeParameter.length > 0) {
            //     startScheme += ('?' + androidSchemeParameter.replace(/\|/g, '&'));
            // }
            pageStatus.dialogHide(); //���ضԻ���
            pageStatus.startUp(); //��ʾ�����İ�
            PTTSendClick("play", system + "_other", "����_" + system + "_����ƽ̨");
            window.location.href = startScheme;
        }

        var downloadEv = function () { //�������
            uniformDownload({ //����
                download: function (p) {
                    pageStatus.dialogHide(); //���ضԻ���
                    window.location.href = p.url;
                }
            });
        }

        var getStartScheme = function () { //ƴ��������ַ
            var scheme = false;
            system == "iOS" ? (scheme = iosScheme) : (scheme = androidScheme);
            if (scheme) {
              if (iosSchemeParameter.length > 0) { //��������Զ������
                scheme = scheme + "?" + iosSchemeParameter.replace(/\|/g, "&");
              }
              if (androidSchemeParameter.length > 0) {
                scheme = scheme + "?" + androidSchemeParameter.replace(/\|/g, "&");
              }
            }
            return scheme;
        }

        var startScheme = getStartScheme();

        if (otherBrowser == "auto") {
            if (startScheme) { //�����ǰ�û�ϵͳ������ҳ�������
                pageStatus.dialogShow(); //��ʾ�Ի���
                _id('start').addEventListener('touchend', function (e) { //���������Ϸ
                    startEv();
                    e.preventDefault();
                });
                _id('download').addEventListener('touchend', function (e) { //���������Ϸ
                    downloadEv();
                    e.preventDefault();
                });
            } else {
                downloadEv();
            }
        } else if (otherBrowser == "start") { //��������
            if (startScheme) {
              startEv();
              setTimeout(function () {
                downloadEv();
              }, 2000)
            } else {
              downloadEv();
            }
        } else {
            downloadEv();
        }        
    }

    var source = function () { //ͳ����Դ
        var from = getUrlParam('from');
        if (from) {
            PTTSendClick("from", from, "��Դ" + from);
        }
    }


    var setPageCode = function () { //��ҳ����д��һЩ����
        if (gameName) { //д����Ϸ����
            _id('gameName').innerHTML = '��' + gameName + '��';
            _id('title').innerHTML = gameName + ' ' + _id('title').innerHTML;
        }
    }


    var deviceJudgment = function (cb) { //�ж��û�ָ�����豸��Ϣ
        var downloadUrl;
        switch (deviceType) {
            case 'ios':
            case 'iphone':
            case 'ipod':
            case 'ipad':
                downloadUrl = iosURL;
                break;
            case 'android':
                downloadUrl = androidURL;
                break;
            case "androidWechat":
                downloadUrl = androidWechatURL;
                break;
            case "wechatGameCenter":
                downloadUrl = wechatGameCenterURL;
                break;
            case 'auto':
                downloadUrl = null; //autoʱΪnull�����Զ�����ϵͳ��ȡ��Ӧ���ص�ַ
                break;
            default: //�û�ָ���˴�����豸
                cb ? cb() : null;
                return false;
        }
        uniformDownload({ //����
            platform: platform + '_device_' + deviceType, //�п�����ios΢���������ذ�׿������������deviceType
            platformChinese: platformChinese + '_�豸����_' + deviceType,
            url: downloadUrl
        });
    }


    var platformJudgment = function () {
      //�ж�ƽ̨
      switch (platform) {
        case "wechat":
          platform_wechat();
          break;
        case "mqq":
          platform_mqq();
          break;
        case "weibo":
          platform_weibo();
          break;
        case "qqmusic":
          platform_qqmusic();
          break;
        case "other":
          platform_other();
          break;
      }
    };

    
    var init = function () {
        getPlatform(function () {
            source(); //ͳ����Դfrom
            setPageCode(); //д��meta
            if (deviceType.length > 0) { //�û�ָ��ǿ�����ز�����
                deviceJudgment(platformJudgment);
            } else if (system == 'pc') {
                loadScript('//ossweb-img.qq.com/images/js/qrcode/qrcode.min.js', function () {
                    var qrcode = new QRCode(_id("pcQrcode"), {
                        text: window.location.href,//ɨ����������
                        width: 250,
                        height: 250,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                    //PC�˶�ά���������
                    PTTSendClick("qrcodeShow", 'pc_browser', "��ʾ��ά��_PC�������");
                    _id("w_pc").style.display = "block";
                });
            } else {
                platformJudgment();
            }
        });
    }

    window.onload = function () {
        setTimeout(function () {
            init();
        }, 100);
    };