(function(w) {

    var storage = w.localStorage;
    var step = 5000;
    var divider = '__';

    $.storage = function(key, value) {
        if (typeof key !== 'undefined') {
            if (typeof value !== 'undefined') {
                set(key, value);
            } else {
                get(key);
            }
        }
    };

    $.removeStorage = function(key) {
        if (storage) {
            storage.removeItem(key);
        } else {
            $.removeCookie(key);
        }
    };

    function set(key, value) {
        if (storage) {
            return storage.setItem(key, value);
        } else {
            var length = value.length / step;
            if (length > 1) {
                for (var i = 0, l = length; i < l; i += 1) {
                    $.cookie((key + divider + i), value.substr(i * step, step));
                }

                return key + '=' + value;
            } else {
                return $.cookie((key + divider + 0), value);
            }
        }
    }

    function get(key) {
        if (storage) {
            return storage.getItem(key);
        } else {
            var data = '';
            var iterator = 0;
            var cookie = '';

            while ((cookie = $.cookie((key + divider + iterator))) !== null) {
                data += cookie;
                iterator++;
            }

            return key + '=' + data;
        }
    }
})(window);