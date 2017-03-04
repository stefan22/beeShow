(function($) {
    function loadAndParseFile(e, t) {
        $.ajax({
            url: e,
            async: false,
            cache: t.cache,
            contentType: "text/plain;charset=" + t.encoding,
            dataType: "text",
            success: function(e, n) {
                parseData(e, t.mode)
            }
        })
    }
    function parseData(data, mode) {
        var parsed = "";
        var parameters = data.split(/\n/);
        var regPlaceHolder = /(\{\d+\})/g;
        var regRepPlaceHolder = /\{(\d+)\}/g;
        var unicodeRE = /(\\u.{4})/ig;
        for (var i = 0; i < parameters.length; i++) {
            parameters[i] = parameters[i].replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            if (parameters[i].length > 0 && parameters[i].match("^#") != "#") {
                var pair = parameters[i].split("=");
                if (pair.length > 0) {
                    var name = unescape(pair[0]).replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                    var value = pair.length == 1 ? "" : pair[1];
                    while (value.match(/\\$/) == "\\") {
                        value = value.substring(0, value.length - 1);
                        value += parameters[++i].replace(/\s\s*$/, "")
                    }
                    for (var s = 2; s < pair.length; s++) {
                        value += "=" + pair[s]
                    }
                    value = value.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
                    if (mode == "map" || mode == "both") {
                        var unicodeMatches = value.match(unicodeRE);
                        if (unicodeMatches) {
                            for (var u = 0; u < unicodeMatches.length; u++) {
                                value = value.replace(unicodeMatches[u], unescapeUnicode(unicodeMatches[u]))
                            }
                        }
                        $.i18n.map[name] = value
                    }
                    if (mode == "vars" || mode == "both") {
                        value = value.replace(/"/g, '\\"');
                        checkKeyNamespace(name);
                        if (regPlaceHolder.test(value)) {
                            var parts = value.split(regPlaceHolder);
                            var first = true;
                            var fnArgs = "";
                            var usedArgs = [];
                            for (var p = 0; p < parts.length; p++) {
                                if (regPlaceHolder.test(parts[p]) && (usedArgs.length == 0 || usedArgs.indexOf(parts[p]) == -1)) {
                                    if (!first) {
                                        fnArgs += ","
                                    }
                                    fnArgs += parts[p].replace(regRepPlaceHolder, "v$1");
                                    usedArgs.push(parts[p]);
                                    first = false
                                }
                            }
                            parsed += name + "=function(" + fnArgs + "){";
                            var fnExpr = '"' + value.replace(regRepPlaceHolder, '"+v$1+"') + '"';
                            parsed += "return " + fnExpr + ";" + "};"
                        } else {
                            parsed += name + '="' + value + '";'
                        }
                    }
                }
            }
        }
        eval(parsed)
    }
    function checkKeyNamespace(key) {
        var regDot = /\./;
        if (regDot.test(key)) {
            var fullname = "";
            var names = key.split(/\./);
            for (var i = 0; i < names.length; i++) {
                if (i > 0) {
                    fullname += "."
                }
                fullname += names[i];
                if (eval("typeof " + fullname + ' == "undefined"')) {
                    eval(fullname + "={};")
                }
            }
        }
    }
    function getFiles(e) {
        return e && e.constructor == Array ? e : [e]
    }
    function normaliseLanguageCode(e) {
        e = e.toLowerCase();
        if (e.length > 3) {
            e = e.substring(0, 3) + e.substring(3).toUpperCase()
        }
        return e
    }
    function unescapeUnicode(e) {
        var t = [];
        var n = parseInt(e.substr(2), 16);
        if (n >= 0 && n < Math.pow(2, 16)) {
            t.push(n)
        }
        var r = "";
        for (var i = 0; i < t.length; ++i) {
            r += String.fromCharCode(t[i])
        }
        return r
    }
    $.i18n = {};
    $.i18n.map = {};
    $.i18n.properties = function(e) {
        var t = {
            name: "Messages",
            language: "",
            path: "",
            mode: "vars",
            cache: false,
            encoding: "UTF-8",
            callback: null
        };
        e = $.extend(t, e);
        if (e.language === null || e.language == "") {
            e.language = $.i18n.browserLang()
        }
        if (e.language === null) {
            e.language = ""
        }
        var n = getFiles(e.name);
        for (i = 0; i < n.length; i++) {
            loadAndParseFile(e.path + n[i] + ".properties", e);
            if (e.language.length >= 2) {
                loadAndParseFile(e.path + n[i] + "_" + e.language.substring(0, 2) + ".properties", e)
            }
            if (e.language.length >= 5) {
                loadAndParseFile(e.path + n[i] + "_" + e.language.substring(0, 5) + ".properties", e)
            }
        }
        if (e.callback) {
            e.callback()
        }
    }
    ;
    $.i18n.prop = function(e) {
        var t = $.i18n.map[e];
        if (t == null)
            return "[" + e + "]";
        var n;
        if (arguments.length == 2 && $.isArray(arguments[1]))
            n = arguments[1];
        var r;
        if (typeof t == "string") {
            r = 0;
            while ((r = t.indexOf("\\", r)) != -1) {
                if (t.charAt(r + 1) == "t")
                    t = t.substring(0, r) + "	" + t.substring(r++ + 2);
                else if (t.charAt(r + 1) == "r")
                    t = t.substring(0, r) + "\r" + t.substring(r++ + 2);
                else if (t.charAt(r + 1) == "n")
                    t = t.substring(0, r) + "\n" + t.substring(r++ + 2);
                else if (t.charAt(r + 1) == "f")
                    t = t.substring(0, r) + "\f" + t.substring(r++ + 2);
                else if (t.charAt(r + 1) == "\\")
                    t = t.substring(0, r) + "\\" + t.substring(r++ + 2);
                else
                    t = t.substring(0, r) + t.substring(r + 1)
            }
            var i = [], s, o;
            r = 0;
            while (r < t.length) {
                if (t.charAt(r) == "'") {
                    if (r == t.length - 1)
                        t = t.substring(0, r);
                    else if (t.charAt(r + 1) == "'")
                        t = t.substring(0, r) + t.substring(++r);
                    else {
                        s = r + 2;
                        while ((s = t.indexOf("'", s)) != -1) {
                            if (s == t.length - 1 || t.charAt(s + 1) != "'") {
                                t = t.substring(0, r) + t.substring(r + 1, s) + t.substring(s + 1);
                                r = s - 1;
                                break
                            } else {
                                t = t.substring(0, s) + t.substring(++s)
                            }
                        }
                        if (s == -1) {
                            t = t.substring(0, r) + t.substring(r + 1)
                        }
                    }
                } else if (t.charAt(r) == "{") {
                    s = t.indexOf("}", r + 1);
                    if (s == -1)
                        r++;
                    else {
                        o = parseInt(t.substring(r + 1, s));
                        if (!isNaN(o) && o >= 0) {
                            var u = t.substring(0, r);
                            if (u != "")
                                i.push(u);
                            i.push(o);
                            r = 0;
                            t = t.substring(s + 1)
                        } else
                            r = s + 1
                    }
                } else
                    r++
            }
            if (t != "")
                i.push(t);
            t = i;
            $.i18n.map[e] = i
        }
        if (t.length == 0)
            return "";
        if (t.lengh == 1 && typeof t[0] == "string")
            return t[0];
        var u = "";
        for (r = 0; r < t.length; r++) {
            if (typeof t[r] == "string")
                u += t[r];
            else if (n && t[r] < n.length)
                u += n[t[r]];
            else if (!n && t[r] + 1 < arguments.length)
                u += arguments[t[r] + 1];
            else
                u += "{" + t[r] + "}"
        }
        return u
    }
    ;
    $.i18n.browserLang = function() {
        return normaliseLanguageCode(navigator.language || navigator.userLanguage)
    }
    ;
    var cbSplit;
    if (!cbSplit) {
        cbSplit = function(e, t, n) {
            if (Object.prototype.toString.call(t) !== "[object RegExp]") {
                if (typeof cbSplit._nativeSplit == "undefined")
                    return e.split(t, n);
                else
                    return cbSplit._nativeSplit.call(e, t, n)
            }
            var r = [], i = 0, s = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.sticky ? "y" : ""), t = RegExp(t.source, s + "g"), o, u, a, f;
            e = e + "";
            if (!cbSplit._compliantExecNpcg) {
                o = RegExp("^" + t.source + "$(?!\\s)", s)
            }
            if (n === undefined || +n < 0) {
                n = Infinity
            } else {
                n = Math.floor(+n);
                if (!n) {
                    return []
                }
            }
            while (u = t.exec(e)) {
                a = u.index + u[0].length;
                if (a > i) {
                    r.push(e.slice(i, u.index));
                    if (!cbSplit._compliantExecNpcg && u.length > 1) {
                        u[0].replace(o, function() {
                            for (var e = 1; e < arguments.length - 2; e++) {
                                if (arguments[e] === undefined) {
                                    u[e] = undefined
                                }
                            }
                        })
                    }
                    if (u.length > 1 && u.index < e.length) {
                        Array.prototype.push.apply(r, u.slice(1))
                    }
                    f = u[0].length;
                    i = a;
                    if (r.length >= n) {
                        break
                    }
                }
                if (t.lastIndex === u.index) {
                    t.lastIndex++
                }
            }
            if (i === e.length) {
                if (f || !t.test("")) {
                    r.push("")
                }
            } else {
                r.push(e.slice(i))
            }
            return r.length > n ? r.slice(0, n) : r
        }
        ;
        cbSplit._compliantExecNpcg = /()??/.exec("")[1] === undefined;
        cbSplit._nativeSplit = String.prototype.split
    }
    String.prototype.split = function(e, t) {
        return cbSplit(this, e, t)
    }
})(jQuery)
