;(function(factory){
if(typeof define == 'function' && define.amd){
    //seajs or requirejs environment
    define([], factory);
}else if(typeof module === 'object' && typeof module.exports == 'object'){
    module.exports = factory();
}else{
    this.util = this.util || {};
    this.util.object = factory();
}
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

});