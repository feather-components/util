;(function(factory){
	this.util = this.util || {};
    this.util.string = factory();
})(function(){
return  {
    pad: function(str, pad, length, leftmode){
        var temp = '';

        str = String(str);
        pad = String(pad);

        length = length - str.length;

        while(length-- > 0){
            temp += pad;
        }

        return leftmode == true ? (temp + str) : (str + temp);
    },
    
    /**
     * 将string中的换行符替换为 html换行
     */
    nl2br: function(str){
        return String(str || '').replace(/[\r\n]/g, '<br />');
    },
    
    /**
     * 检查一个字符串是否为空
     */
    empty: function(str){
        return /^\s*$/.test(str);
    },

    reverse: function(string){
        return String(string).split('').reverse().join('');
    }
};

});;;(function(factory){
	this.util = this.util || {};
    this.util.date = factory(this.util.string);
})(function(string){
var pad = string.pad;

return {
    //获取当前时间戳
    time: function(){
        return (new Date).getTime();
    },

    //返回和php一样的时间格式
    //如Date.date('Y-m-d H:i:s'); 2012-09-10 11:10:00
    //Y 4位年
    //y 2位年
    //m 2位月
    //n 不加0的月
    //d 2位 当前多少日
    //j 不加0的日
    //D 星期几
    //h 不加0的小时
    //H 2位小时
    //i 2位分
    //s 2位秒
    //a am或者pm
    //A AM或者PM
    //t 当前月有多少天
    date: function(str, time){
        if(!str) return;

        var date = new Date,
            temp = [];

        if(time) date.setTime(time);

        for (var i = 0, j = str.length; i < j; i++){
            var value = str.charAt(i);

            switch (value){
                case 'Y':
                    value = date.getFullYear();
                    break;
                case 'y':
                    value = String(date.getFullYear()).substring(0, 2);
                    break;
                case 'm':
                    value = pad(date.getMonth() + 1, 0, 2, true);
                    break;
                case 'n':
                    value = date.getMonth() + 1;
                    break;
                case 'd':
                    value = pad(date.getDate(), 0, 2, true);
                    break;
                case 'j':
                    value = date.getDate();
                    break;
                case 'D':
                    value = date.getDay();
                    break;
                case 'h':
                    value = pad(date.getHours() % 12, 0, 2, true);
                    break;
                case 'H':
                    value = pad(date.getHours(), 0, 2, true);
                    break;
                case 'i':
                    value = pad(date.getMinutes(), 0, 2, true);
                    break;
                case 's':
                    value = pad(date.getSeconds(), 0, 2, true);
                    break;
                case 'a':
                    value = date.getHours() - 12 < 0 ? 'am' : 'pm';
                    break;
                case 'A':
                    value = date.getHours() - 12 < 0 ? 'AM' : 'PM';
                    break;
                case 't':
                    value = (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
                    break;

                default:
                    ;
            };

            temp.push(value);
        }

        return temp.join('');
    },
    
    compareDate: function(a, b){
        //input a&b in date format,see Date.parse()
        var MS_PER_DAY = 24 * 60 * 60 * 1000,
            offset;
        var timea = Date.parse(a),
            timeb = Date.parse(b);

        if(isNaN(timea) || isNaN(timeb)) return;
        offset = (timea - timeb) / MS_PER_DAY;

        return Math.floor(offset);
    }
};
});
;;(function(factory){
	this.util = this.util || {};
    this.util.number = factory(this.util.string);
})(function(string){

return {
    //给数字加千分位XX
    format: function(num){
        if(!num) return 0;
        return string.reverse(string.reverse(num).replace(/\d{3}/g, '$&,')).replace(/^,/, '');
    },

    toInt: function(number){
        number = parseInt(number);
        return isNaN(number) ? 0 : number;
    }
};

});;;(function(factory){
	this.util = this.util || {};
    this.util.object = factory();
})(function(){

return {
    get: function(data, name){
        if(data[name]){
            return data[name];
        }

        name = name.split('.');

        var i = 0, len = name.length, tmp = data;

        for(; i < len; i++){
            tmp = tmp[name[i]];

            if(tmp == null) return null;
        }

        return tmp;
    },

    set: function(data, name, value){
        if(typeof value == 'undefined'){
            data = name;
        }else{
            name = name.split('.');

            var i = 0, len = name.length - 1, tmp = data;

            for(; i < len; i++){
                var tmpName = name[i];

                if(typeof tmp[tmpName] != 'object' || !tmp[tmpName]){
                    tmp[tmpName] = {};
                }

                tmp = tmp[tmpName];
            }

            tmp[name[i]] = value;
        }
    }
};

});;;(function(factory){
	this.util = this.util || {};
    this.util.qs = factory();
})(function(){
var decode = decodeURIComponent, encode = encodeURIComponent;

return {
    remove: function(name){
        this.set(name, null);
    },

    set: function(name, value){
        var params = this.get();

        if(typeof name == 'object'){
            for(var i in name){
                if(name.hasOwnProperty(i)){
                    params[i] = name[i];
                }
            }
        }else{
            params[name] = value;
        }

        location.search = '?' + this.make(params);
    },

    make: function(params){
        var arr = [];

        for(var name in params){
            if(params.hasOwnProperty(name) && params[name] != null){
                arr.push(encode(name) + '=' + encode(params[name]));
            }
        }

        return arr.join('&');
    },

    get: function(name, _default){
        var search = location.search;

        if(name){
            if(search.substr(-name.length) == name){
                return _default;
            }else{
                var res = search.match(new RegExp('[?&]' + name + '=([^&]*)(?:(?!&' + name + '[=&]).)*$', 'i'));
                return res ? res[1] || _default : _default;
            }
        }else{
            var arr = search.substring(1).split('&'), params = {};

            for(var i = 0, j = arr.length; i < j; i++){
                var temp = arr[i].split('=');
                params[decode(temp[0])] = temp[1] ? decode(temp[1]) : '';
            }

            return params;
        }
    }
};

});;
if(typeof define == 'function' && define.amd){
    define([], this.util);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = this.util;
}