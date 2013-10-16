lang = "eng"

$(document).ready(function() {
    // restart registration procedure after a long time out
    setTimeout(function(){
	// switch back to default language
	set_cookie("language", "eng", 0);
	// reload the main form page
	startover();
    }, 120*1000); // units are in milliseconds

    // called only when user selects a language from the drop-down list
    $("#lang" ).change(function() {
	lang = $(this).val();
	log("setting language to " + lang);
	set_cookie("language", lang, 0);
	replace_language();
    });

    // set language
    lang = get_cookie("language");
    if (lang === null) {
	log("didn't find language cookie. setting language to English");
	// default language (see token_data.js for alternate language keys)
	lang = "eng";
	set_cookie("language", "eng", 0);
    } else {
	log("got language cookie: " + lang);
	$("#lang").val(lang);
    }

    // replace all string tokens with those of current language
    replace_language();
});

function log(m) {
    // log messages to the javascript console for debugging
    if (navigator.appName != 'Microsoft Internet Explorer') {
	console.log(m)
    }
}

function printpage() {
    log("user attempting to print confirmation");
    window.print();
    window.onfocus=function(){
	// do something after returning from the print dialog
	// note: chrome doesn't execute this when using integrated print dialog
    }
    return false;
}

function startover() {
    // load a new registration form
    window.location = "selfreg.html"
}
