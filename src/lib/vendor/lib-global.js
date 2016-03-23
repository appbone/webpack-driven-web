// 全局模块
(function(global) {
    global.libGlobal = {
        sayHello: function() {
            console.log('mod', 'local global module');
        }
    };
})(this);