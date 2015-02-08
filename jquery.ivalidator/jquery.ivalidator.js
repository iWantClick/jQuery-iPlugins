/**
 * Copyright &copy; 2015 <a href="http://open.iwantclick.com">iWantClick</a> All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

/**
 * 表单验证, jQuery插件
 * 	Require: jquery.common.js
 * 
 * @auther tony
 */
;(function($, window, document, undefined){
	var Validator = function(){
		this.value = '';
		this.items = {};	//contains jQuery objects
		this.errorMsgs = {};
	}
	
	Validator.prototype = {
		trim: function($item) {
			this.value = $.trim(this.value);
			$item.val(this.value);
		},
		
		require: function($item) {
			if (this.value == '') {
				this.errorMsgs[$item.attr('name')] = '不能为空';
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		minLength: function($item, len) {
			if (this.value.length < len) {
				this.errorMsgs[$item.attr('name')] = '必须超过' + len
						+ '个字';
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		maxLength: function($item, len) {
			if (this.value.length > len) {
				this.errorMsgs[$item.attr('name')] = '不能超过' + len + '个字';
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		matches: function($item, filed){
			var v = $("input[name='" + filed + "']:visible").val();
			if (v != this.value) {
				this.errorMsg[$item.attr('name')] = '两次输入的'
						+ this.label[filed] + '不一致 :(';
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		email: function($item){
			var reg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (!reg.test(this.value)) {
				this.errorMsg[$item.attr('name')] = "格式不正确呀，请检查一下";
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		qq: function($item){
			var reg = /^[0-9]{5,11}$/;
			if (!reg.test(this.value)) {
				this.errorMsg[$item.attr('name')] = "格式不正确呀，请检查一下";
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		vcode: function($item){
			var reg = /^\d{4}$/;
			if (!reg.test(this.value)) {
				this.errorMsg[$item.attr('name')] = "验证码错误";
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		idcard: function($item){
			var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
			if (!reg.test(this.value)) {
				this.errorMsgs[$item.attr('name')] = "请输入正确的身份证号";
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			} 
		},
		
		username: function($item) {
			var reg = /^[a-z0-9]{6,20}$/;
			this.trim($item);
			if (!reg.test($item.val())) {
				this.errorMsgs[$item.attr('name')] = '用户名至少6-20位，且只能是小写字母和数字的组合';
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		//@todo
		real_name: function($item) {
			var reg = /^([\u4E00-\u9FA5])+$/;
			this.trim($item);
			if (!reg.test($item.val())) {
				this.errorMsgs[$item.attr('name')] = '请输入与身份证一致的简体汉字';
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		pattern: function($item, pattern, msg){
			this.trim($item);
			if (!pattern.test($item.val())) {
				this.errorMsgs[$item.attr('name')] = msg;
				return false;
			} else {
				this.errorMsgs[$item.attr('name')] = '';
				return true;
			}
		},
		
		ajaxUsernameExist: function($item){
			var _stat = true;
			var _this = this;
			$.ajax({
				async : false,
				type : 'POST',
				url : '/ajax/checkusername',
				data : "username=" + this.value,
				dataType : 'text',
				success : function(rs) {
					if (rs == 1 || rs == 9) {
						this.errorMsgs[$item.attr('name')] = '';
						_stat = true;
					} else {
						_this.errorMsg[$item.attr('name')] = '帐号不存在';
						_stat = false;
					}
				}
			});
			return _stat;
		},
		
		noExistFn: function($item, fn){
			this.errorMsgs[$item.attr('name')] = '不存在验证方法: ' + fn;
			return false;
		},
		
		showMsg: function($item) {
			this.clearMsg($item);
			//success
			if(typeof this.errorMsgs[$item.attr('name')] == 'undefined' ||
					this.errorMsgs[$item.attr('name')].length <= 0){
				msg = '<span class="auto-added success">'
					+ '<img width="15px" height="15px" src="' + ad.baseUrl + '/resources/images/icon-success.png"/>'
					+ '</span>';
				$(msg).insertAfter($item);				
			}
			//error
			else{
				msg = '<span class="auto-added error">'
					+ '<img width="15px" height="15px" src="' + ad.baseUrl + '/resources/images/icon-error.png"/> <label>' 
					+ this.errorMsgs[$item.attr('name')] 
					+ '</label></span>';
				$(msg).insertAfter($item);
			}
		},
		
		clearMsg: function($item) {
			if($item.next().hasClass('auto-added'))
				$item.next().remove();
		},
		
		validate: function($item) {
			var valid = $item.attr('valid');
			valid = $.trimStr(valid, '|');

			if (typeof (valid) != 'undefined') {
				this.items[$item.attr('name')] = $item;
				this.value = $item.val();
				var fns = valid.split('|');

				for (var i in fns) {
					var fn = fns[i];
					var lengthReg = /(.*)\[(.*[^\]])\]$/;
					var patternReg = /^(pattern)\((.+),\s*(.+)\)$/;
					
					if (patternReg.test(fn)) {		// as: pattern(/^[0-9]+$/,必须是数字)
						var tmp = fn.match(patternReg);
						if (typeof this[tmp[1]] == 'function'){
							if(this[tmp[1]]($item, eval(tmp[2]), tmp[3]) == false)	//call the function
								break;
						}else{
							this.noExistFn($item, tmp[1]);
							break;
						}
					} else if (lengthReg.test(fn)) {	// as: min_length[3]
						var tmp = fn.match(lengthReg);
						if (typeof this[tmp[1]] == 'function'){
							if(this[tmp[1]]($item, tmp[2]) == false)	
								break;
						}else{
							this.noExistFn($item, tmp[1]);
							break;
						}
					} else {
						if (typeof (this[fn]) == 'function'){
							if(this[fn]($item) == false)
								break;
						}else{
							this.noExistFn($item, fn);
							break;
						}
					}
				}

				this.showMsg($item);
				if(typeof this.errorMsgs[$item.attr('name')] == 'undefined' ||
						this.errorMsgs[$item.attr('name')].length > 0){
					return false;
				} else {
					return true;
				}
			}
		}
	}
	
	$.fn.validate = function(withSubmit){
		withSubmit = (typeof(reValue) == "undefined") ? true : false;
		var validator = new Validator();
		
		// 失去焦点时提示
		this.find("[valid]").blur(function(){
			validator.validate($(this));
		});
		
		// 提交表单
		if (withSubmit) {
			this.submit(function(e){
				var isValid = true;
				$(this).find("[valid]").each(function(){
					if (!validator.validate($(this))){
						isValid = false;
					}
				});
				if(!isValid){
					e.preventDefault(e);	
				}
			});
		}
		
		return validator;
	}
})(jQuery, window, document);

