var amsCommon={
	qqConfig: {
		appid: "1107876280" //��QAPPID
	},
	wxConfig:{
		appid: "wx8b048cb88ea98f1d", //�ҿ���ʹ���˹��ں�wx_txyxzs��΢�ŵ�¼���ù��ںŵ�΢��APPID
		ams_targetappid: "wxb99e30505fc0eda8", //ҵ���΢��APPID
		sServiceType: "htrj", //ҵ���д
		sAMSTrusteeship: 1 //���Ϊ1����΢��/QQ�йܣ�Ϊ0����΢��/QQ�йܡ�Ĭ��Ϊ0(�����й�)
	},
	sDataConfig: {},
	isLogin:false,
	isBind:false,
	loginType:'',
	iPlatId:'',
	isReceive:0,//�����Ƿ���ȡ
	loginByQQ:function(){
		need('biz.login', function (LoginManager) {
			LoginManager.login();
		})
	},
	//ע����¼
	loginOut:function(){
		LoginManager.logout(function () {
			window.location.reload();
		});
		return false;
	},
	loginByWX:function(){
		need('biz.login', function (LoginManager) {
			LoginManager.init({
				needReloadPage: true
			});
			LoginManager.loginByWx({
				gameDomain: 'awp.qq.com',
				appId: amsCommon.wxConfig.appid,
				serviceType: 'wx_txyxzs'
			});
		});
	},
	//��ȡ����
	getReward:function(){
		if (!amsCommon.isLogin) {
			openDialog('pop1');
			return false;
		}
		if(!amsCommon.isBind){
			openDialog('pop4')
			return false;
		}
		amsCfg_753786.sData=amsCommon.sDataConfig;
		amsCfg_753786.sData['sArea'] = amsCommon.loginType;
		amsCfg_753786.sData['sPlatId'] =  amsCommon.iPlatId;
		amsSubmit(371890,753786);
	},
	//��ѯ�����Ƿ���ȡ
	queryReward:function(){
		if (!amsCommon.isLogin) {
			openDialog('pop1');
			return false;
		}
		if(!amsCommon.isBind){
			openDialog('pop4')
			return false;
		}
		amsCfg_753787.sData=amsCommon.sDataConfig;
		amsCfg_753787.sData['sArea'] = amsCommon.loginType;
		amsCfg_753787.sData['sPlatId'] =amsCommon.iPlatId;
		amsSubmit(371890,753787);
	},
	//��ѯ�Ƿ��
	selectBind:function(){
		amsCfg_753895.sData = amsCommon.sDataConfig;
		amsInit(371890, 753895);
	},
	//��ʼ���󶨴���
	initPage: function () {
        need(["biz.roleselector"],function(Roleselector){
            var roleobj = cloneClass(Roleselector);
			var openToOpen = {
				"ams_targetappid": amsCommon.wxConfig.ams_targetappid,   //Ҫת����Ϸҵ��appid
				"ams_appname": "wx_txyxzs",
				"sAMSTrusteeship": 1 ,// ���Ϊ1����΢��/QQ�йܣ�Ϊ0����΢��/QQ�йܡ�Ĭ��Ϊ0(�����й�)
				"oGopenidParams":{
					needGopenid:1
				}
			};
			roleobj.init({
				'type': 'html', //��ѡֵ:float?? html
				'gameId': 'htrj',
				'isQueryRole': true,
				'systemContentId': 'ulinkSystemSelect', // ϵͳandroid��ios
				'channelContentId': 'ulinkChannelSelect', // ���� ��Q��΢��
				'areaContentId': 'ulinkAreaSelect', // ������
				'area1ContentId': 'sel_area1', //�����õ��Ķ�������
				'roleContentId': 'ulinkRoleSelect', // ��ɫ
				'confirmButtonId': 'ulinkConfirmBtn', //ȷ�ϰ�ť���ᴥ��submitEvent
				// 'openToOpen': amsCommon.loginType==1?openToOpen:null,
				'openToOpen': openToOpen,
				'submitEvent': function (roleObj) {
					closeDialog();
					amsCommon.iPlatId=roleObj.submitData.sPlatId;
					// �󶨽�ɫ
					amsCfg_753894.roleInfo = roleObj.submitData;
					amsCfg_753894.sData = amsCommon.sDataConfig;
					amsInit(371890, 753894);
				}
			})
			roleobj.show();
		})
	},
	//�󶨴���
	bindArea:function(){
		if (!amsCommon.isLogin) {
			openDialog('pop1')
			return false;
		}
		openDialog('pop2');
		return
	},
	checkLogin:function(){
		need("biz.login", function (LoginManager) {
			LoginManager.checkLogin(function (userinfo) {
					if (userinfo.logtype == 'wx') {
						milo.cookie.clear('p_skey', 'qq.com', '/');
						milo.cookie.clear('p_uin', 'qq.com', '/');
						milo.cookie.clear('uin', 'qq.com', '/');
						milo.cookie.clear('skey', 'qq.com', '/');
						milo.cookie.clear("IED_LOG_INFO2");
						milo.cookie.clear('IED_LOG_INFO2', 'qq.com', '/');
						milo.cookie.clear('lg_source', 'qq.com', '/');
						milo.cookie.clear('ams_game_appid', 'qq.com', '/');
						// wx
						openid = milo.cookie.get('openid');
						LoginManager.getUserInfoByWxOpenId({
							"openid": openid,
							'access_token': milo.cookie.get('access_token')
						}, function (data) {
							amsCommon.sDataConfig = amsCommon.wxConfig;
							amsCommon.loginType = 1;
							var nickName = data.nickname;
							$('#login_qq_span').html(decodeURIComponent(nickName));

						});
					} else {
						milo.cookie.clear("openid");
						milo.cookie.clear("access_token");
						milo.cookie.clear("acctype");
						milo.cookie.clear("appid");
						milo.cookie.clear("openid", 'qq.com', '/');
						milo.cookie.clear("access_token", 'qq.com', '/');
						milo.cookie.clear("acctype", 'qq.com', '/');
						milo.cookie.clear("appid", 'qq.com', '/');
						var nickName = userinfo.nickname == '' ? LoginManager.getUserUin() : userinfo.nickname;
						amsCommon.sDataConfig = amsCommon.qqConfig;
						amsCommon.loginType = 2;
						$('#login_qq_span').html(decodeURIComponent(nickName));
					}
					amsCommon.selectBind();
					amsCommon.isLogin = true;
					$('#unlogin').hide();
					$('#logined').show();
				},
				function () {
					amsCommon.isLogin = false;
					// openDialog('pop1');
				}
			);
		})

	},
}
//��ѯ�Ƿ�󶨵�����
amsCfg_753895={
	type : "query",
	iQueryFlowID:753894,
	'_everyRead':true,
	'sData': {},
	success : function(bindedInfo){
		//�Ѱ�ʱ����չ����
		amsCommon.iPlatId=bindedInfo.jData.data.FplatId;
		amsCommon.isBind = true;
	},
	failure : function(){
		//δ��ʱ����չ����
		// amsCommon.bindArea();
		amsCommon.isBind=false;
	}
};
//�ύ�󶨵�����
amsCfg_753894={
	type : "comit",
	needPopupRole:false,//�Ƿ�Ĭ�Ͻ�ɫ��ѡ��ɫ
	roleInfo:null,//���needPopupRoleΪfalse����Ҫ�Զ��崫���ɫ��Ϣ��roleInfo��Ҫ����ɫ��Ϣ����
	iQueryFlowID:753895,
	service:"htrj",
	'_everyRead':true,
	'sData': {},
	success : function(bindedInfo){
		//�Ѱ�ʱ����չ����
		amsCommon.isBind = true;
	},
	failure : function(){
		//δ��ʱ����չ����
		amsCommon.bindArea();
	}
};
/**
 * ��ѯ�����Ƿ���ȡ
 * @type {{fFlowSubmitFailed: amsCfg_753787.fFlowSubmitFailed, iFlowId: number, fFlowSubmitEnd: amsCfg_753787.fFlowSubmitEnd, iActivityId: number, _everyRead: boolean}}
 */
amsCfg_753787 = {
	"_everyRead":true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	"iActivityId": 371890, //�id
	"iFlowId":    753787, //����id
	"fFlowSubmitEnd": function(res){
		if(+res.sOutValue1===1){
			alert("���Ѿ���ȡ���ý�����Ŷ���벻Ҫ�ظ���ȡ")
		}else{
			amsCommon.getReward();
		}
	},
	"fFlowSubmitFailed":function(res){
		//ʧ�ܻ��ߵ��������
		//���������㣬ame���ش���0�Ǻ��ߵ�����
		alert(res.sMsg);
	}
};
/**
 * ��ȡ����
 * @type {{activityId: string, iAMSActivityId: string, onGetGiftSuccessEvent: amsCfg_753786.onGetGiftSuccessEvent, onGetGiftFailureEvent: amsCfg_753786.onGetGiftFailureEvent, onBeginGetGiftEvent: (function(): number)}}
 */
amsCfg_753786 = {
	"_everyRead":true,//_everyRead�������ڿ��ƻ��棬��Ϊtrue��ʾÿ�η����󶼻��ȡamsCfg������ֵ���������
	'iAMSActivityId' : '371890', // AMS���
	'activityId' : '400777', // ģ��ʵ����
	"sData":{},
	'onBeginGetGiftEvent' : function(){
		return 0; // �齱ǰ�¼�������0��ʾ�ɹ�
	},
	'onGetGiftFailureEvent' : function(callbackObj){// �齱ʧ���¼�
		if(callbackObj.sMsg=='����ȡ'){
			alert("���Ѿ���ȡ���ý�����Ŷ���벻Ҫ�ظ���ȡ")
			return;
		}else{
			alert(callbackObj.sMsg);
			return
		}
	},
	'onGetGiftSuccessEvent' : function(callbackObj){// �齱�ɹ��¼�
		openDialog('pop3')
		return;
	}
};

milo.ready(function () {
	amsCommon.checkLogin();
	amsCommon.initPage();
});