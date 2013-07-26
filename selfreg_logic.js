// program flow:
//
// 1. user picks age, clicks submit
// 2. show appropriate form based on age (or error)
// 3. user fills out form, clicks submit
// 4. user_submit() is called in response to submit button click, which then:
//    - determines which form is filled out
//    - calls validate_form() to validate form data
//    - calls postproc_form() to transform data to iii field format
//    - returns true to allow http POST, otherwise fails

window.document.onkeydown = function (e) {
    if (!e) {
        e = event;
    } else if (e.keyCode == 27) {
        lightbox_close();
    }
}

$(document).keypress(function(event) {
    if (event.which == '13') {
        event.preventDefault();
    }
});

$(document).ready(function() {
    window.age_range = 0; // global used to show appropriate form fields
    var monthnames = [ "January", "February", "March", "April",
		       "May", "June","July", "August",
		       "September", "October", "November", "December" ];
    $("div").hide();
    $("#intro_header").show();
    $("#form_wrapper").show();
    if (window.submit_error == true) {
	$("#submit_error").show();
    } else {
	$("#age_input").show();
    }
});

// validate user input in age fields when user clicks submit
function try_birthdate() {
    var birth_date = [ $("#selfreg input[name=birth_year]").val(),
		       $("#selfreg select[name=birth_month]").val(),
		       $("#selfreg input[name=birth_day]").val() ];
    if ((birth_date[0] == "") || (birth_date[2] == "")) {
	log("birth date fields not filled");
	return false;
    }
    window.age_range = classify_age(birth_date);
    switch (window.age_range) {
    case 0:
	// couldn't parse. TODO: direct patron to staff
	break;
    case 1:
	// too young. TODO: direct patron to staff
	break;
    case 2:
	show_form("#child_form");
	break;
    case 3:
	show_form("#teen_form");
	break;
    case 4:
	show_form("#adult_form");
	break;
    }
}

// set global variable based on patron age
function classify_age(birth_date) {
    // ages ranges
    // 2 : child
    // 3 : teen
    // 4 : adult
    var today = date_to_ymd(new Date());
    var age = calc_age(today, birth_date);
    log("patron age: " + age);
    if (isNaN(age)) {
	log("error: couldn't parse age");
	return 0;
    } else if (age < 0) {
	log("patron age negative? treat as parsing error");
	alert("Date entered is in the future. Are you a time traveler?");
	return 0;
    } else if (age < 5) {
	log("not old enough to register");
	alert("Applicants must be at least 5 years old to register for a library card. Please check the date or seek assistance from a librarian.");
	return 1;
    } else if (age < 13) {
	log("classified as a child patron");
	return 2;
    } else if (age < 18) {
	log("classified as a teen patron");
	return 3;
    } else if (age > 200) {
	log("patron age over 200? treat as parsing error");
	return 0;
    } else {
	log("classified as an adult patron");
	return 4;
    }
}

// called when user clicks form submit button
function try_submit() {
    log("user attempting to submit form");
    if (validate_form(window.age_range)) {
	log("form validated ok");
    } else {
	log("unable to validate form");
	return false;
    }
    if (postproc_form()) {
	log("form postprocessed ok");
    } else {
	// shouldn't ever get here, check validation logic
	log("unable to postprocess form");
	return false;
    }
    debug_print_form();
    log("submitting form");
    return true; // returning true sends form to server
}

// validate form fields
function validate_form() {
    // remove any errors from a previous submission
    window.errors = [];
    $("*").toggleClass("error", false);
    $("#errors").text("");
    // build up global array of error objects, attached to window object
    log("validating form");
    // last name
    s = $('input[name=last_name]').val()
    if (s.length == 0) {
	add_error("#last_name", "Last name must not be empty.");
    }
    // first name
    s = $('input[name=first_name]').val()
    if (s.length == 0) {
	add_error("#first_name", "First name must not be empty.");
    }
    // phone number
    var r = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!r.test(($('input[name=phone]').val()))) {
	add_error("#phone", "Please enter a valid 10-digit phone number in the format: xxx-xxx-xxxx");
    }
    // street address
    s = $('input[name=home_address]').val()
    if (s.length == 0) {
	add_error("#home_address", "Please enter your home street address.");
    }
    // city
    s = $('input[name=home_city]').val()
    if (s.length == 0) {
	add_error("#home_city", "Please enter your home city.");
    }
    // zip code
    s = $('input[name=home_zip]').val().replace(/\s+/g, '');
    if ((s.length != 5)|(s[0] != '9')) {
	add_error("#home_zip", "Please enter a valid CA zip-code.");
    }
    // teens / adults only
    if ((window.age_range == 3)|(window.age_range == 4)) {
	// email address
	var r = /\S+@\S+\.\S+/;
	if (!r.test($('input[name=email]').val())) {
	    add_error("#email", "Please enter a valid email address.");
	}
	// identification
	s = $('input:radio[name=id_type]:checked').val();
	if (!s) {
	    add_error("#id_types", "Please select an identification type.");
	}
	s = $('input[name=id_number]').val()
	if (s.length == 0) {
	    add_error("#id_number", "Please enter a valid identification number.");
	}
    }
    // children only
    if (window.age_range == 2) {
	// guardian last name
	s = $('input[name=guardian_last_name]').val()
	if (s.length == 0) {
	    add_error("#guardian_last_name", "Please enter the parent/guardian's last name.");
	}
	// guardian first name
	s = $('input[name=guardian_first_name]').val()
	if (s.length == 0) {
	    add_error("#guardian_first_name", "Please enter the parent/guardian's first name.");
	}
    }
    // agreement
    if (!$('input[name=agreement]').is(':checked')) {
	add_error("#agreement_box", "You must read and agree to the library terms before submitting this form.");
    }
    // if no errors, returns true and page is submitted
    return show_errors();
}

// when validating fields, build a list of errors found. this function adds an
// error to the list, including a reference to the field id used to highlight it
function add_error(error_id, error_msg) {
    window.errors.push({id:error_id, msg:error_msg});
}

// display error messages and highlight associated fields
function show_errors() {
    if (window.errors.length > 0) {
	$("html, body").animate({ scrollTop: 0 }, "fast");
	log(window.errors.length + " validation errors found");
	$("#errors").toggleClass("error");
	$("#errors").append("One or more problems were found. " +
			    "Please check the highlited fields " +
			    "before clicking submit.<ul>");
	for (var i = 0; i < window.errors.length; i++) {
	    log(window.errors[i].id + ": " + window.errors[i].msg);
	    $("#errors").append("<li>" + window.errors[i].msg + "</li>");
	    $(window.errors[i].id).addClass("error");
	    $(".error").animate({
		opacity: 1
	    }, 250);
	}
	$("#errors").append("</ul>");
	return false;
    } else {
	log("no errors found");
	return true;
    }
}

// called after validation to transform field data to hidden fields used by
// millennium self-registration (pulled from HTTP POST data)
function postproc_form() {
    log("prostprocessing form");
    var form = document.getElementById("selfreg");
    // transform birth date (format MM-DD-YYYY)
    var field = document.createElement("input");
    year = form.elements["birth_year"].value;
    month = form.elements["birth_month"].value;
    day = form.elements["birth_day"].value;
    field.name = "F051birthdate";
    field.type = "hidden";
    field.value = pad(month, 2, 0) + "-" + pad(day, 2, 0) + "-" + year;
    form.appendChild(field);
    // transform name
    var field = document.createElement("input");
    field.name = "nfirst";
    field.type = "hidden";
    field.value = form.elements["first_name"].value.toUpperCase();
    form.appendChild(field);
    if (form.elements["middle_initial"].value != "") {
	var field = document.createElement("input");
	field.name = "nmiddle";
	field.type = "hidden";
	field.value = form.elements["middle_initial"].value.toUpperCase();
	form.appendChild(field);
    }
    var field = document.createElement("input");
    field.name = "nlast";
    field.type = "hidden";
    field.value = form.elements["last_name"].value.toUpperCase();
    form.appendChild(field);
    // transform home address (overload city field with state and zip also)
    var field = document.createElement("input");
    field.name = "stre_aaddress";
    field.type = "hidden";
    address = form.elements["home_address"].value;
    apt = form.elements["home_apt"].value;
    if (apt != "") {
	tempstring = address +  " APT " + apt;
    } else {
	tempstring = address;
    }
    field.value = tempstring.toUpperCase();
    form.appendChild(field);
    var field = document.createElement("input");
    field.name = "city_aaddress";
    field.type = "hidden";
    city = form.elements["home_city"].value;
    zip = form.elements["home_zip"].value;
    tempstring = city + ", CA " + zip;
    field.value = tempstring.toUpperCase();
    form.appendChild(field);
    // transform mailing address
    log("mailing: " + form.elements["mailing_address"].value);
    if (form.elements["mailing_address"].value != "") {
	var field = document.createElement("input");
	field.name = "stre_haddress2";
	field.type = "hidden";
	address = form.elements["mailing_address"].value;
	apt = form.elements["mailing_apt"].value;
	if (apt != "") {
	    tempstring = address +  " APT " + apt;
	} else {
	    tempstring = address;
	}
	field.value = tempstring.toUpperCase();
	form.appendChild(field);
	var field = document.createElement("input");
	field.name = "city_haddress2";
	field.type = "hidden";
	city = form.elements["mailing_city"].value;
	zip = form.elements["mailing_zip"].value;
	tempstring = city + ", CA " + zip;
	field.value = tempstring.toUpperCase();
	form.appendChild(field);
    }
    // get library jurisdiction code from city
    var field = document.createElement("input");
    field.name = "F046pcode3";
    field.type = "hidden";
    field.value = get_jurisdiction_code(form.elements["home_city"].value);
    form.appendChild(field);
    // transform phone number: strip and reapply format xxx-xxx-xxxx
    var field = document.createElement("input");
    field.name = "tphone1";
    field.type = "hidden";
    tempstring = form.elements["phone"].value;
    tempstring = tempstring.replace(/[()\- ]/g, '');
    tempstring = tempstring.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    field.value = tempstring.toUpperCase();
    form.appendChild(field);
    // transform email address
    var field = document.createElement("input");
    field.name = "zemailaddr";
    field.type = "hidden";
    tempstring = form.elements["email"].value;
    field.value = tempstring.toLowerCase();
    form.appendChild(field);
    // teens / adults only: transform identification
    if ((window.age_range == 3)|(window.age_range == 4)) {
	var field = document.createElement("input");
	field.name = "uuniversityID";
	field.type = "hidden";
	tempstring = form.elements["id_number"].value;
	field.value = tempstring.toUpperCase();
	form.appendChild(field);
    }
    // store extra info in overloaded department/org-id field...
    var field = document.createElement("input");
    field.name = "ddepartment";
    field.type = "hidden";
    // all patrons: type of id used to populate uuniversityID field
    t = $('input:radio[name=id_type]:checked').val().toUpperCase() + " ";
    field.value = "|t " + t;
    // children only: transform parent/guardian info
    if (window.age_range == 2) {
	// guardian identification #
	i = "|i " + form.elements["guardian_id_number"].value.toUpperCase() + " ";
	field.value = field.value + i;
	// school
	if (form.elements["school"].value != "") {
	    s = "|s " + form.elements["school"].value.toUpperCase() + " ";
	    field.value = field.value + s;
	}
	// guardian name
	nf = form.elements["guardian_first_name"].value.toUpperCase();
	nl = form.elements["guardian_last_name"].value.toUpperCase();
	nm = form.elements["guardian_middle_initial"].value.toUpperCase();
	n = "|n " + nl + ", " + nf + " " + nm + " ";
	field.value = field.value + n;
    }
    // transform language preference
    if (!(form.elements["language"].value.toUpperCase() in {"ENGLISH":"", "":""})) {
	l = "|l " + form.elements["language"].value.toUpperCase();
	field.value = field.value + l;
    }
    form.appendChild(field); // should now contain everything in department field
    // set pcode1 based on patron age range
    var form = document.getElementById("selfreg");
    var field = document.createElement("input");
    field.name = "F044pcode1";
    field.type = "hidden";
    switch(window.age_range) {
    case 2:
	field.value = "3"; // child
	break;
    case 3:
	field.value = "2"; // teen
	break;
    case 4:
	field.value = "1"; // adult
	break;
    }
    form.appendChild(field);
    // template name
    var form = document.getElementById("selfreg");
    var field = document.createElement("input");
    field.name = "TemplateName";
    field.type = "hidden";
    field.value = "patregtest";
    form.appendChild(field);
    return true;
}

// display appropriate sections of the form based on patron age
function show_form(form_id) {
    transition = 'fast'
    $("div").hide();
    $("#intro_header").show();
    $("#form_wrapper").show();
    $("#form_common").show();
    $("#form_common").children().show();
    $("#agreement").show();
    $("#agreement_box").show();
    $("#footer").show();
    switch (window.age_range) {
    case 2:
	log("displaying child form");
	$("#header_child").show();
	$("#form_child").show();
	$("#form_child").children().show();
	$("#agreement_child").show();
	$("#guardian_wrapper").show();
	$("#guardian_wrapper").children().show();
	set_required(["#last_name", "#first_name",
		      "#home_address", "#home_city", "#home_zip", "#phone",
		      "#guardian_last_name", "#guardian_first_name",
		      "#agreement_box"]);
	break;
    case 3:
	log("displaying teen form");
	$("#header_teen").show();
	$("#form_teen_adult").show();
	$("#form_teen_adult").children().show();
	$("#agreement_teen_adult").show();
	set_required(["#last_name", "#first_name",
		      "#home_address", "#home_city", "#home_zip", "#phone",
		      "#guardian_last_name", "#guardian_first_name",
		      "#email", "#id_number", "#agreement_box"]);
	break;
    case 4:
	log("displaying adult form");
	$("#header_adult").show();
	$("#form_teen_adult").show();
	$("#form_teen_adult").children().show();
	$("#agreement_teen_adult").show();
	set_required(["#last_name", "#first_name",
		      "#home_address", "#home_city", "#home_zip", "#phone",
		      "#guardian_last_name", "#guardian_first_name",
		      "#email", "#id_number", "#agreement_box"]);
	break;
    }
    $(".required").show(250);
}

// add a star symbol to the beginning of an id
function set_required(required) {
    for (i=0; i<required.length; i++) {
	$(required[i]).prepend("<span class=\"required\">&#9733;</span>");
    }
}

// show transformed fields (picked up by iii) in javascript console
function debug_print_form() {
    var form = document.getElementById("selfreg");
    log("F051birthdate: " + form.elements["F051birthdate"].value);
    log("nfirst: " + form.elements["nfirst"].value);
    // middle name optional
    if(document.getElementById("nmiddle")) {
	log("nmiddle: " + form.elements["nmiddle"].value);
    }
    log("nlast: " + form.elements["nlast"].value);
    log("stre_aaddress: " + form.elements["stre_aaddress"].value);
    log("city_aaddress: " + form.elements["city_aaddress"].value);
    // mailing address optional
    if(form.elements["stre_haddress2"].value != "") {
	log("stre_haddress2: " + form.elements["stre_haddress2"].value);
    }
    // mailing address optional
    if(form.elements["city_haddress2"].value != "") {
	log("city_haddress2: " + form.elements["city_haddress2"].value);
    }
    log("F046pcode3: " + form.elements["F046pcode3"].value);
    log("tphone1: " + form.elements["tphone1"].value);
    // teens / adults only
    if(form.elements["uuniversityID"].value != "") {
	log("uuniversityID: " + form.elements["uuniversityID"].value);
    }
    log("zemailaddr: " + form.elements["zemailaddr"].value);
    log("ddepartment: " + form.elements["ddepartment"].value);
    log("F044pcode1: " + form.elements["F044pcode1"].value);
}

function reset_form() {
    log("resetting form");
    location.reload();
}

function calc_age(today, birthday) {
    var age = today[0] - birthday[0]
    if (today[1] < birthday[1]) {
	age = age-1
    } else if (today[1] == birthday[1]) {
	if (today[2] < birthday[2]) {
	    age = age-1
	}
    }
    return age;
}

function date_to_ymd(date) {
    var ymd = new Array(3);
    ymd[0] = date.getFullYear()
    ymd[1] = date.getMonth() + 1
    ymd[2] = date.getDate()
    return ymd;
}

function date_diff(d1, d2) {
    return (d1[0]-d2[0]) - (d1[1]*100 + d1[2] < d2[1]*100 + d2[2])
}

function get_ymd(date) {
    var ymd = new Array(3);
    ymd[0] = date.getFullYear()
    ymd[1] = date.getMonth() + 1
    ymd[2] = date.getDate()
    return ymd;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function log(m) {
    if (typeof console != "undefined") {
	console.log(m)
    }
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function acceptable_id() {
    a = ["Driver's License",
	 "State Issued ID Card",
	 "Student ID Card",
	 "Permanent Resident Card",
	 "Matricula Consular ID Card",
	 "Oakland City ID/Municipal City ID",
	 "Passport"];
    if (window.age_range == 2) {
	who = "children";
    }
    if (window.age_range == 3) {
	who = "teenagers";
    }
    if (window.age_range == 4) {
	who = "adults";
    }
    s = "<div><h3>Acceptable I.D. for " + who + " includes:</h3><ul>";
    for (i=0; i<a.length; i++) {
	s = s + "<li>" + a[i] + "</li>";
    }
    s = s + "</ul><br /></div><div style=\"text-align:center\">" +
	"<button onclick=\"lightbox_close();\">Close</button></div>";
    return s;
}

function lightbox_open(s) {
    $("#light").empty().append(s);
    window.scrollTo(0,0);
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
}

function lightbox_close() {
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
}

function get_jurisdiction_code(s) {
    s = toTitleCase(s)
    if (s == "Berkeley") t = "7";
    else if (s == "Alameda") t = "4";
    else if (s == "San Francisco") t = "26";
    else if (s == "Oakland") t = "1";
    else if (s == "Emeryville") t = "0";
    else if (s == "Piedmont") t = "2";
    else if (s == "Hayward") t = "11";
    else if (s == "Richmond") t = "22";
    else if (s == "San Jose") t = "27";
    else if (s == "San Leandro") t = "28";
    else if (s == "Marin") t = "14";
    else if (s == "Livermore") t = "13";
    else if (s == "Stockton") t = "36";
    else if (s == "Sacramento") t = "23";
    else if (s == "Sunnyvale") t = "37";
    else if (s == "San Rafael") t = "31";
    else if (s == "Sonoma") t = "34";
    else if (s == "Sausalito") t = "32";
    else if (s == "Mill Valley") t = "16";
    else if (s == "San Mateo") t = "29";
    else if (s == "Palo Alto") t = "19";
    else if (s == "Redwood City") t = "21";
    else if (s == "Mountain View") t = "17";
    else if (s == "Albany") t = "3";
    else if (s == "Dublin") t = "3";
    else if (s == "Fremont") t = "3";
    else if (s == "Newark") t = "3";
    else if (s == "Pleasanton") t = "3";
    else if (s == "San Lorenzo") t = "3";
    else if (s == "Sunol") t = "3";
    else if (s == "Union City") t = "3";
    else if (s == "Warm Springs") t = "3";
    else if (s == "Alamo") t = "9";
    else if (s == "Antioch") t = "9";
    else if (s == "Baypoint") t = "9";
    else if (s == "Clayton") t = "9";
    else if (s == "Concord") t = "9";
    else if (s == "Crockett") t = "9";
    else if (s == "Danville") t = "9";
    else if (s == "El Cerrito") t = "9";
    else if (s == "El Sobrante") t = "9";
    else if (s == "Hercules") t = "9";
    else if (s == "Kensington") t = "9";
    else if (s == "Lafayette") t = "9";
    else if (s == "Martinez") t = "9";
    else if (s == "Moraga") t = "9";
    else if (s == "Oakley") t = "9";
    else if (s == "Orinda") t = "9";
    else if (s == "Pinole") t = "9";
    else if (s == "Pittsburg") t = "9";
    else if (s == "Pleasant Hill") t = "9";
    else if (s == "Rodeo") t = "9";
    else if (s == "San Pablo") t = "9";
    else if (s == "San Ramon") t = "9";
    else if (s == "Walnut Creek") t = "9";
    else if (s == "Belvedere") t = "14";
    else if (s == "Corte Madera") t = "14";
    else if (s == "Fairfax") t = "14";
    else if (s == "Kentfield") t = "14";
    else if (s == "Larkspur") t = "14";
    else if (s == "Marin City") t = "14";
    else if (s == "Novato") t = "14";
    else if (s == "Ross") t = "14";
    else if (s == "San Anselmo") t = "14";
    else if (s == "San Quentin") t = "14";
    else if (s == "San Rafael") t = "14";
    else if (s == "Tiburon") t = "14";
    else if (s == "Atherton") t = "29";
    else if (s == "Belmont") t = "29";
    else if (s == "Brisbane") t = "29";
    else if (s == "Burlingame") t = "29";
    else if (s == "Colma") t = "29";
    else if (s == "Daily City") t = "29";
    else if (s == "East Palo Alto") t = "29";
    else if (s == "Foster City") t = "29";
    else if (s == "Half Moon Bay") t = "29";
    else if (s == "Hillsborough") t = "29";
    else if (s == "Menlo Park") t = "29";
    else if (s == "Millbrae") t = "29";
    else if (s == "Pacifica") t = "29";
    else if (s == "Portola Valley") t = "29";
    else if (s == "San Bruno") t = "29";
    else if (s == "San Carlos") t = "29";
    else if (s == "San Mateo") t = "29";
    else if (s == "South San Francisco") t = "29";
    else if (s == "Woodside") t = "29";
    else if (s == "Alviso") t = "150";
    else if (s == "Campbell") t = "150";
    else if (s == "Cupertino") t = "150";
    else if (s == "Los Altos") t = "150";
    else if (s == "Los Gatos") t = "150";
    else if (s == "Menlo Park") t = "150";
    else if (s == "Milpitas") t = "150";
    else if (s == "Moffett Field") t = "150";
    else if (s == "Monte Vista") t = "150";
    else if (s == "Morgan Hill") t = "150";
    else if (s == "New Almaden") t = "150";
    else if (s == "San Martin") t = "150";
    else if (s == "Santa Clara") t = "150";
    else if (s == "Saratoga") t = "150";
    else if (s == "Stanford") t = "150";
    else if (s == "Benicia") t = "33";
    else if (s == "Fairfield") t = "33";
    else if (s == "Suisun") t = "33";
    else if (s == "Vacaville") t = "33";
    else if (s == "Vallejo") t = "33";
    else t = "192";
    return t;
}
