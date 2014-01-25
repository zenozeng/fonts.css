(function() {
    var factory = (function() {

        var insertRule = function(rule) {
            document.body.innerHTML += '<style>'+rule+'</style>';
        }

        // Init, append Font & CSS
        var isInit = false;
        var init = function() {
            insertRule("@font-face{font-family: font-detect-0-woff;src:url(data:font/woff;charset=utf-8;base64,d09GRk9UVE8AAAQYAAoAAAAABlwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAAMQAAADSEQga8UZGVE0AAAG4AAAAGwAAABxqQJGNT1MvMgAAAdQAAABDAAAAYFYPXfBjbWFwAAACGAAAADcAAAFCAA0D1mhlYWQAAAJQAAAAKQAAADb9ITBXaGhlYQAAAnwAAAAZAAAAJAN7/ztobXR4AAACmAAAAAgAAAAIAfQAAG1heHAAAAKgAAAABgAAAAYAAlAAbmFtZQAAAqgAAAFZAAACjkaWZeZwb3N0AAAEBAAAABMAAAAg/4YAMnicY2RgYWFgZGTkCs0rySzJSU0xZGBkYmBk0PjBz/BDmvGHDNMPWeYf4izdQMAqw7CIX4aBQUCGYamgDAO7DMNpIQZmkGoXBl+GMOei1MSS1BSFpEqFqtS8fCBO19HRUSjPLMlQcMvPK3HLL0pPVTDSM1DQyCgpKbDS108DiqaBRPWK0/TyUks04Y5AuAYIBBmYGBkVFLv3/nDdy7h37++Yvcx7xdR/rHzPtvdPuegP198xf1zZ+fi6RbpFu3m4ANybP/V4nGNgYGBkAIIztovOg+jzjOV2ULoeAEMOBccAeJxjYGH8wviFgZWBgamLaQ8DA0MPhGZ8wGDIyAQUZWBjZoABRgYkEJDmmsJwgMGAwYBZ4b8FQxSGGgUgZAQAfmQKqgB4nGNgYGBmgGAZBkYGELAB8hjBfBYGBSDNAoQgvsH//xDy/0WoSgZGNgYYk2hAqvrBDgBrAQbjAHicY2BkYGAA4pys3ox4fpuvDNzML4AiDOcZy3ci01DAwcAEogAU4ghtAAAAeJxjYGRgYFb4b8EQxQADjAyogAkAMlIBuQAAAAH0AAAAAAAAAABQAAACAAB4nIWQzUoDMRSFT+wPFESkT5CNUGEmzZRuOluhC8Wl3bdMph2omTpNKe1eceebCL6Ca9euXfsE7vTMNBREsBOS+92TMzc3AXCCZwjsvgs8ehZo4cPzEZr48lzDmbjyXEdL3Htu4FS8eG5Sf6dT1FvMHqq/ShZo483zEY7x6bmGS3x7rqMt7jw3IMWT5yb1V/ZXwGAMxzWBxAQbrltmFrmPUwTVkFgjo3NGGnLXkstY0GGo9aCgGTt0OI4FYnQ5Uu9N916FJTNF1VA/5zMVZuxMIicbuTU255wGQSDXmZvJYW7dMC+mRvaUlp2Zc4u4202ppqWqlqmyxrHITXVK2eG8uk1EybrMzU1CvK60DCvcMjFJtmL87xox59+SOz3CACHXkG7N2GepX23Gcn80ORqEUdjTUf9QkyNqBR8nq/qSrF1WV1Use8LIFMsst1LrSGmt5YGCP/yzcc0AAAB4nGNgZgCD/80MRgxYAAAoRAG4AA==) format('woff');}");
            // set basic CSS and hide it
            insertRule("#font-detect-test-block{display:inline-block;font-family:font-detect-0-woff;position:fixed;left:-100%;}");

            document.body.innerHTML += '<div id="font-detect-test-block">0</div>';
            isInit = true;
        };

        var isFontLoaded = false;
        var fontLoadedTesting = false;
        var fontLoadedCallbacks = [];
        var fontLoaded = function(callback) {
            if(isFontLoaded) {
                callback();
            } else {
                fontLoadedCallbacks.push(callback);
                if(!fontLoadedTesting) {
                    fontLoadedTesting = true;
                    var elem = document.getElementById('font-detect-test-block');
                    var iter = function() {
                        if(elem.clientWidth == 0) {
                            isFontLoaded = true;
                            fontLoadedTesting = false;
                            for(var i = 0; i < fontLoadedCallbacks.length; i++) {
                                fontLoadedCallbacks[i]();
                            }
                        } else {
                            setTimeout(iter, 10);
                        }
                    };
                    iter();
                }
            }
        };

        var detect = function(fontNameorList, callback) {
            if(!isInit) {
                init();
            }
            fontLoaded(function() {
                var elem = document.getElementById('font-detect-test-block');
                var detectFont = function(fontName) {
                    elem.style.fontFamily = '"'+fontName+'"'+', '+'font-detect-0-woff';
                    return elem.clientWidth > 0;
                };
                var detectFonts= function(fontsArray) {
                    var fonts = {};
                    for(var i = 0; i < fontsArray.length; i++) {
                        var font = fontsArray[i];
                        fonts[font] = detectFont(font);
                    }
                    return fonts;
                };
                if(typeof fontNameorList === "string") {
                    callback(detectFont(fontNameorList));
                } else {
                    callback(detectFonts(fontNameorList));
                }
            });
        };


        return detect;
    })();

    if(typeof define === "function" && define.amd) {
        // AMD
        define("fontDetect", function(require, exports, module) {
            return factory;
        });
    } else {
        window.fontDetect = factory;
    }

})();