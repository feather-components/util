;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define(['./string'], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = factory(
        require('./string')
    );
}else{
    this.util = this.util || {};
    this.util.date = factory(this.util.string);
}
})(function(string){
var pad = string.pad;

return {
    //获取当前时间戳
    time: function(time){
        switch(typeof time){
            case 'object':
                return time.getTime();

            case 'number':
                return time;

            default:
                return (new Date(time)).getTime();
        }
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

        date.setTime(this.time(time));

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
    },

    getMaxDateInMonth: function(year, month){
        return (new Date(year, month, 0)).getDate();
    },

    getFirstWeekInMonth: function(year, month){
        return (new Date(year, month, 1)).getDay();
    }
};
});
