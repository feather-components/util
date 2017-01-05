;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define([], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = factory();
}else{
    this.util = this.util || {};
    this.util.qs = factory();
}
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

});