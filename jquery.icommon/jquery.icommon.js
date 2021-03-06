/*
 * Copyright 2015 <a href="http://open.iwantclick.com">iWantClick</a> All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * 向jQuery添加常用的方法
 * 
 * @auther Tony Wong
 */

/**** 静态方法 ****/
$.extend({
	/**
	 * alias of console.log
	 * @return void
	 */
	log : function(msg)
	{
		 console.log(msg);
	},

	/**
	 * trim string
	 * @return string the trimmed string
	 */
	trimStr : function(str, trim) 
	{
		var trimLeft = eval('/^(\\'+trim+')+/');
		var trimRight = eval('/(\\'+trim+')+$/');
		return str == null ?
			"" :
			str.toString().replace(trimLeft, "").replace(trimRight, "");
	},
	
	/**
	 * count of properties of object or length of array|string|number
	 * @return number
	 */
	count : function(item) 
	{
		if(typeof item == 'undefined')
			return 0;
		
		if(typeof item == 'array' || typeof item == 'string')
			return item.length;

		if(typeof item == 'number')
			return item.toString().length;
		
		if(typeof item == 'object'){
			var counter = 0;
			for (var i in item)
				counter++;
			return counter;
		}
		
		return 0;
	},
	
	/**
	 * if the item is empty?
	 * @return boolean
	 */
	empty : function(item)
	{
		if($.count($.trim(item)) <= 0 || 
				(typeof item == 'number' && item == 0))
			return true;
		else 
			return false;
	}
});
