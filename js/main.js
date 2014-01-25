var $ = function(selector) {
    return document.querySelectorAll(selector);
};
var values = function(object) {
    var arr = [];
    for(var key in object) {
      arr.push(object[key])
    };
    return arr;
};
var nodes = Array.prototype.slice.call($('[data-fonts]'));
nodes.forEach(function(node) {
    var fonts = node.dataset.fonts.split(',');
    window.fontDetect(fonts, function(result) {
        var test = values(result).filter(function(elem) {
            return elem;
        });
        if(test.length > 0) {
            var fontName = node.dataset.name;
            $("[data-name='"+fontName+"']")[0].className = "available";
        }
    });
});