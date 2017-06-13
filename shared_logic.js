var lang = "chi";
tdata = new Object();

function msg(id) {
    document.write(msgval(id));
}

function msgval(id) {
    return tdata[id][lang];
}

function setlang(n) {
    switch (n) {
	case "eng":
	lang = "eng";
	log("changing language to English");
	window.location.href = location.href + "&lang=" + n;
	break;
	case "spa":
	log("changing language to Spanish");
	window.location.href = location.href + "&lang=" + n;
	break;
	case "chi":
	lang = "chi";
	log("changing language to Chinese");
	break;
	default:
	log("unknown language");
	break;
    }
}

// replace all string tokens with strings in the current language
function replace_language() {
    for(var p in tdata) {
	key = "#msg_" + p;
	if ($(key).is("input")) {
	    // button labels
	    $(key).prop('value', msgval(p));
	    // the is likely a better way to do this with, perhaps, classes
	    // I want to have a unique id in selfreg.html, but reuse some
	    // string tokens. so, if an id ends with 'xxx_child', then perform
	    // a replacement as if the id was only 'xxx'
	    $(key + "_child").prop('value', msgval(p));
	} else {
	    // all other strings
	    $(key).html(msgval(p));
	    $(key + "_child").html(msgval(p));
	}
    }
}

function set_cookie(name, value, expires, path, domain) {
    var cookie = name + "=" + escape(value) + ";";
    if (expires) {
	// If it's a date
	if(expires instanceof Date) {
	    // If it isn't a valid date
	    if (isNaN(expires.getTime()))
		expires = new Date();
	}
	else
	    expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
	cookie += "expires=" + expires.toGMTString() + ";";
    }
    if (path)
	cookie += "path=" + path + ";";
    if (domain)
	cookie += "domain=" + domain + ";";
    document.cookie = cookie;
}

function get_cookie(name) {
    var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
    var result = regexp.exec(document.cookie);
    return (result === null) ? null : result[1];
}
