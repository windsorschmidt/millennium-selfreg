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
