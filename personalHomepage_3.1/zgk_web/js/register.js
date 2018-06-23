(function(w, doc){
	// ���߷���
	function $(id){
		return doc.getElementById(id);
	}
	function hasClass(elem, cls){
		var reg = new RegExp('(^|\\s)' + cls + '($|\\s)');
		return reg.test(elem.className);
	}

	function removeClass(elem, cls){
		var reg = new RegExp('(^|\\s)' + cls + '($|\\s)', 'g');
		elem.className = elem.className.replace(reg, ' ');
	}

	function addClass(elem, cls){
		if(!hasClass(elem, cls)){
			elem.className += ' ' + cls;
		}
	}

	// ΪdomԪ�ذ��¼�
	var addEvent = doc.addEventListener ?
		function(elem, type, fn){
			elem.addEventListener(type, fn, false);
		} : function(elem, type, fn){
			elem.attachEvent('on' + type, fn);
		};
	// Ϊfn��thisָ��
	function bind(fn, context){
		return function(){
			fn.call(context);
		};
	}
	function utf8_to_b64(str){
		return w.btoa(w.encodeURIComponent(trim(str)));
	}
	function trim(str){
		return (!str) ? '' : str.toString().replace(/^\s+|\s+$/g, '');
	}
	
	function extend(obj1, obj2){
		for(var key in obj2){
			obj1[key] = obj2[key];
		}
	}
	function parseJSON(str){
		if(typeof(str) === 'object') {
			return str;
		} else {
			if(window.JSON){
				return JSON.parse(str);
			} else {
				return eval('(' + str + ')');
			}
		}
	}
	function encodeData(obj){
		var pairs = [];
		for(var key in obj){
			pairs.push(key + '=' + obj[key]);
		}
		return pairs.join('&');
	}
	// ���߷��� end
	
	
	var PASSWORD_BLACK_LIST = '000000,111111,11111111,112233,123123,123321,\
		123456,654321,666666,888888,abcdef,abcabc,\
		abc123,a1b2c3,aaa111,123qwe,qwerty,qweasd,admin,\
		password,p@ssword,passwd,iloveyou,5201314';
	
	var CHECK_USER_EXIST = '/signup/ajcheckuser';
	var REGISTER_URL = '/��ҳ.html';

	var SIGN_URL = '/signin/signin?username=';
	
		
	var CHINA_PHONE_REG = /^(13|14|15|17|18)[0-9]{8}[0-9]$/;
	var SBC_CASE_REG = /[\uFE30-\uFFA0]/gi;
	var EMAIL_REG = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
	
	// ����ȷ�����û������ֻ�����
	var ERROR_MSG_WRONG_PHONE = '&#x8BF7;&#x6B63;&#x786E;&#x8F93;&#x5165;&#x7528;&#x6237;&#x540D;&#x6216;&#x624B;&#x673A;&#x53F7;&#x7801;';
	// �����в��ܰ����ո�
	var BLANK_PASSWORD = '\u5BC6\u7801\u4E2D\u4E0D\u80FD\u5305\u542B\u7A7A\u683C';
	// �������û�����������
	var PASSWORD_IN_NAME = '\u5BC6\u7801\u4E0E\u7528\u6237\u540D\u8FC7\u4E8E\u76F8\u4F3C';
	// ������ڼ�
	var PASSWORD_IN_BLACK_LIST = '\u5BC6\u7801\u8FC7\u4E8E\u7B80\u5355';
	// ���볤�Ȳ�������6���ַ�
	var TOO_SHORT_PASSWORD = '\u5BC6\u7801\u957F\u5EA6\u4E0D\u5F97\u5C11\u4E8E6\u4E2A\u5B57\u7B26';
	// ���볤�Ȳ��ö���16���ַ�
	var TOO_LONG_PASSWORD = '\u5BC6\u7801\u957F\u5EA6\u4E0D\u5F97\u591A\u4E8E16\u4E2A\u5B57\u7B26';
	// ���벻�ܰ���ȫ���ַ�
	var WITH_SBC_PASSWORD = '\u5BC6\u7801\u4E0D\u80FD\u5305\u542B\u5168\u89D2\u5B57\u7B26';
	// ���벻��Ϊ��
	var ERROR_PASSWORD_EMPTY = '\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A';
	

	
	
	// ���ʺ���ע�ᣬ����ֱ��
	var ERROR_MSG_EXISTED = '\u8BE5\u5E10\u53F7\u5DF2\u6CE8\u518C\uFF0C\u60A8\u53EF\u76F4\u63A5';
	
	// ����ʹ��
	var ERROR_MSG_PLEASE_USE = '\u8BF7\u60A8\u4F7F\u7528';
	
	// ֱ��
	var ERROR_MSG_LOGIN_DIRECT = '\u76F4\u63A5';
	
	// ��¼
	var ERROR_MSG_LOGIN_TEXT = '\u767B\u5F55';
	
	
	
	// ����
	var Register = function(){
		// ����һ��������Ϣ����
		this.error = $('errorMessage');
	};
	Register.prototype = {
		// ���ñ���������ݣ���մ�����ʾ��
		reset: function(){
			removeClass(this.nameInput.parentNode, 'error');
			this.nameInput.value = '';
			removeClass(this.passwordInput.parentNode, 'error');
			this.passwordInput.value = '';
		
			this.togglePassword.style.display = 'none';
			this.hideError();
		},
		// ��ʾ������Ϣ
		showError: function(errorMsg){
			this.error.innerHTML = errorMsg;
			this.error.style.display = 'block';
		},
		// ���ش�����Ϣ
		hideError: function(){
			this.error.style.display = 'none';
		},
		
	
		// ��ʾ��ע��ģ��
		show: function(){
			this.dom.style.display = 'block';
		},
		// ���ظ�ע��ģ��
		hide: function(){
			this.dom.style.display = 'none';
		},
		// ������������ݵ�ʱ����ʾtogglePassword��ť
		checkPasswordLength: function(){
			if(trim(this.passwordInput.value).length == 0){
				this.togglePassword.style.display = 'none';
			} else {
				this.togglePassword.style.display = 'block';
			}
			
		},
		// ���������/���Ŀ���
		doTogglePassword: function(){
			if(this.togglePassword.className == 'toggle-password show'){
				this.togglePassword.className = 'toggle-password hide';
				this.passwordInput.type = 'password';
			} else {
				this.togglePassword.className = 'toggle-password show';
				this.passwordInput.type = 'text';
			}
			this.passwordInput.focus();
		},
		// ���ֻ�ע�������ע�ᶼ��Ҫ�����¼�
		bindCommenEvent: function(){
			
			
			// ����������ݸı�ʱ����������ݳ����������Ƿ���ʾtogglePassword��ť
			addEvent(this.passwordInput, 'keyup', bind(this.checkPasswordLength, this));
			// �����togglePassword��ťʱ������password������/��������
			addEvent(this.togglePassword, 'click', bind(this.doTogglePassword, this));
			
			// ���û�������������ֻ��ţ��������֮�󣬽���У��
			addEvent(this.nameInput, 'blur', bind(this.onNameInputBlur, this));
			// ���û�������������ֻ��ţ����ݸı�ʱ������У��
			addEvent(this.nameInput, 'keyup', bind(this.onNameInputChange, this));
			
			// �������ʼ����ʱ������ϴ��������벻�Ϲ淶�����ÿ������
			addEvent(this.passwordInput, 'focus', bind(this.onPasswordInputFocus, this));
		},
		isPasswordValid: function(){
			// check whether ' ' is in the password
			var number = trim(this.nameInput.value);
			var password = this.passwordInput.value;
			if(password.indexOf(' ') >= 0){
				addClass(this.passwordInput.parentNode, 'error');
				this.showError(BLANK_PASSWORD);
				return false;
			} else {
				// check whether the password is in the number
				if(password.length == 0){
					addClass(this.passwordInput.parentNode, 'error');
					this.showError(ERROR_PASSWORD_EMPTY);
					return false;
				}
				if(number.indexOf(password) >= 0){
					addClass(this.passwordInput.parentNode, 'error');
					this.showError(PASSWORD_IN_NAME);
					return false;
				} else {
					// check whether the password is in the black list
					if(PASSWORD_BLACK_LIST.indexOf(password) >= 0){
						addClass(this.passwordInput.parentNode, 'error');
						this.showError(PASSWORD_IN_BLACK_LIST);
						return false;
					} else {	
						// check the password's length
						if(password.length < 6){
							addClass(this.passwordInput.parentNode, 'error');
							this.showError(TOO_SHORT_PASSWORD);
							return false;
						} else if(password.length > 16){
							addClass(this.passwordInput.parentNode, 'error');
							this.showError(TOO_LONG_PASSWORD);
							return false;
						} else {
							// check the password's SBC
							if(SBC_CASE_REG.test(password)){
								addClass(this.passwordInput.parentNode, 'error');
								this.showError(WITH_SBC_PASSWORD);
								return false;
							}
							
							removeClass(this.passwordInput.parentNode, 'error');
							this.hideError();
							return true;
						}
					}
				}
			}
		},
		onPasswordInputFocus: function(){
			if(hasClass(this.passwordInput.parentNode, 'error')){
				removeClass(this.passwordInput.parentNode, 'error');
				this.hideError();
				this.togglePassword.style.display = 'none';
				this.passwordInput.value = '';
			}
		},
		checkUsernameExist: function(){
			var that = this;
			ajax({
				url: CHECK_USER_EXIST,
				type: 'POST',
				data: {
					user: trim(that.nameInput.value),
					r: that.hiddenRValue,
					entry: that.hiddenEntryValue
				},
				onsuccess: function(ret){
					var result = parseJSON(ret);
					if(result.retcode != 20000000){
						switch(result.retcode){
							case 50011001:
								var url = SIGN_URL + trim(that.nameInput.value);
								that.showError(ERROR_MSG_EXISTED + '<a href="' + url + '">' + ERROR_MSG_LOGIN_TEXT + '</a>');
								break;
							case 50011002:
								var url = SIGN_URL + trim(that.nameInput.value);
								that.showError(ERROR_MSG_PLEASE_USE + trim(that.nameInput.value) + ERROR_MSG_LOGIN_DIRECT + '<a href="' + url + '">' + ERROR_MSG_LOGIN_TEXT + '</a>');
								break;
							default:
								that.showError(result.msg);
						}
						addClass(that.nameInput.parentNode, 'error');
					}
				}
			});
		}
	};
	
	var PhoneRegister = function(){
		// �ֻ�ע�������
		this.dom = $('phoneRegister');
		
		
		// �ֻ��������
		this.nameInput = $('pr-nameInput');
		// ���������
		this.passwordInput = $('pr-passwordInput');
		// ����password ��/�� �İ�ť
		this.togglePassword = $('pr-togglePassword');
		
		this.hiddenRValue = $('pr-hiddenR').value;
		this.hiddenEntryValue = $('pr-hiddenEntry').value;
		
		this.init();
	};
	
	// �̳� Register
	PhoneRegister.prototype = new Register();
	
	extend(PhoneRegister.prototype,{
		init: function(){
			this.bindCommenEvent();
			
			// ���¼�
			this.bindEvent();
		},
		bindEvent: function(){
			// �ύ��ť����¼�����
			addEvent($('pr-submit'), 'click', bind(this.onSubmit, this));
			addEvent(this.nameInput, 'focus', bind(this.onPhoneFocus, this));
		},
		onPhoneFocus: function(){
			this.nameInput.type = 'tel';
		},
		onNameInputBlur: function(){
			this.nameInput.type = 'text';
			// ���ֻ����������֮�󣬼���ʽ
			if(CHINA_PHONE_REG.test(trim(this.nameInput.value))){
				removeClass(this.nameInput.parentNode, 'error');
				this.hideError();
				
				this.checkUsernameExist();
			} else {
				addClass(this.nameInput.parentNode, 'error');
				this.showError(ERROR_MSG_WRONG_PHONE);
			}
		},
		onNameInputChange: function(){
			// ���ֻ������������ʱ�򣬼���ʽ
			if(CHINA_PHONE_REG.test(trim(this.nameInput.value))){
				removeClass(this.nameInput.parentNode, 'error');
				this.hideError();
			}
		},
		onSubmit: function(){
			var that = this;
			if(that.validate()){
				this.hideError();
				ajax({
					url: REGISTER_URL,
					data: {
						user: trim(that.nameInput.value),
						password: that.passwordInput.value,
						r: that.hiddenRValue,
						entry: that.hiddenEntryValue,
						way: 'phone'
					},
					type: 'POST',
					onsuccess: function(ret){
						var result = parseJSON(ret);
						if(result.retcode != 20000000){
							switch(result.retcode){
								case 50011001:
									var url = SIGN_URL + trim(that.nameInput.value);
									that.showError(ERROR_MSG_EXISTED + '<a href="' + url + '">' + ERROR_MSG_LOGIN_TEXT + '</a>');
									break;
								case 50011002:
									var url = SIGN_URL + trim(that.nameInput.value);
									that.showError(ERROR_MSG_PLEASE_USE + trim(that.nameInput.value) + ERROR_MSG_LOGIN_DIRECT + '<a href="' + url + '">' + ERROR_MSG_LOGIN_TEXT + '</a>');
									break;
								default:
									that.showError(result.msg);
							}
							addClass(that.nameInput.parentNode, 'error');
						} else {
							w.location.href = result.data.url + '?' + encodeData(result.data);
						}
					}
				});
			}
		},
		validate: function(){
			var number = trim(this.nameInput.value);
			
			// check the number
			if(CHINA_PHONE_REG.test(number)){
				
				// check the password
				if(this.isPasswordValid()){
					
					if(this.isReadRule()){
						return true;
					} else {
						this.showError(READ_RULE_UN);
						return false;
					}
				}
				
				return false;
			} else {
				addClass(this.nameInput.parentNode, 'error');
				this.showError(ERROR_MSG_WRONG_PHONE);
				return false;
			}
		}
	});
	
	var EmailRegister = function(){
		this.dom = $('emailRegister');
		
		this.readRule = $('er-readRule');
		
		this.nameInput = $('er-nameInput');
		this.passwordInput = $('er-passwordInput');
		this.togglePassword = $('er-togglePassword');
		
		this.hiddenRValue = $('pr-hiddenR').value;
		this.hiddenEntryValue = $('pr-hiddenEntry').value;
		
		this.init();
	};
	
	EmailRegister.prototype = new Register();
	
	extend(EmailRegister.prototype,{
		init: function(){
			this.bindCommenEvent();
			this.bindEvent();
		},
		bindEvent: function(){
			addEvent($('er-submit'), 'click', bind(this.onSubmit, this));
		},
		
		onNameInputBlur: function(){
			var email = trim(this.nameInput.value);
			if(EMAIL_REG.test(email)){
				removeClass(this.nameInput.parentNode, 'error');
				this.hideError();
				
				this.checkUsernameExist();
			} else {
				addClass(this.nameInput.parentNode, 'error');
				this.showError(ERROR_MSG_WRONG_EMAIL);
			}
		},
		onNameInputChange: function(){
			var email = trim(this.nameInput.value);
			if(EMAIL_REG.test(email)){
				removeClass(this.nameInput.parentNode, 'error');
				this.hideError();
			}
		},
		onSubmit: function(){
			var that = this;
			if(this.validate()){
				this.hideError();
				ajax({
					url: REGISTER_URL,
					data: {
						user: trim(that.nameInput.value),
						password: that.passwordInput.value,
						r: that.hiddenRValue,
						entry: that.hiddenEntryValue,
						way: 'email'
					},
					type: 'POST',
					onsuccess: function(ret){
						var result = parseJSON(ret);
						if(result.retcode != 20000000){
							switch(result.retcode){
								case 50011001:
									var url = SIGN_URL + trim(that.nameInput.value);
									that.showError(ERROR_MSG_EXISTED + '<a href="' + url + '">' + ERROR_MSG_LOGIN_TEXT + '</a>');
									break;
								case 50011002:
									var url = SIGN_URL + trim(that.nameInput.value);
									that.showError(ERROR_MSG_PLEASE_USE + trim(that.nameInput.value) + ERROR_MSG_LOGIN_DIRECT + '<a href="' + url + '">' + ERROR_MSG_LOGIN_TEXT + '</a>');
									break;
								default:
									that.showError(result.msg);
							}
							addClass(that.nameInput.parentNode, 'error');
						} else {
							w.location.href = result.data.url + '?' + encodeData(result.data);
						}
					}
				});
			}
		},
		validate: function(){
			var email = trim(this.nameInput.value);
			
			// check the email
			if(EMAIL_REG.test(email)){
				
				// check the password
				if(this.isPasswordValid()){
					
					if(this.isReadRule()){
						return true;
					} else {
						this.showError(READ_RULE_UN);
						return false;
					}
				}
				
				return false;
			} else {
				addClass(this.nameInput.parentNode, 'error');
				this.showError(ERROR_MSG_WRONG_EMAIL);
				return false;
			}
		}
	});
	
	
	var phoneRegister = new PhoneRegister();
	var emailRegister = new EmailRegister();
	
	
	var segment = $('segment');
	addEvent(segment, 'click', function(){
		if(hasClass(segment, 'segment-c1')){
			segment.className = 'segment segment-c2';
			phoneRegister.hide();
			emailRegister.reset();
			emailRegister.show();
		} else {
			segment.className = 'segment segment-c1';
			phoneRegister.reset();
			phoneRegister.show();
			emailRegister.hide();
		}
	});
	
	addEvent(doc, 'keydown', function(e){
		e = e || window.event;
		if(e.keyCode == 13){
			if(hasClass(segment, 'segment-c1')){
				phoneRegister.onSubmit();
			} else {
				segment.className = 'segment segment-c1';
				emailRegister.onSubmit();
			}
		}
	});
})(window, document);