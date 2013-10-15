lang = "eng"

$(document).ready(function() {
    // restart registration procedure after a long time out
    setTimeout(function(){
	startover();
    }, 120*1000); // units are in milliseconds

    // called only when user selects a language from the drop-down list
    $("#lang" ).change(function() {
	lang = $(this).val();
	log("setting language to " + lang);
	replace_language();
    });

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
