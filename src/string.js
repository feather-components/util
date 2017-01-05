;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define([], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = factory();
}else{
    this.util = this.util || {};
    this.util.string = factory();
}
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

});