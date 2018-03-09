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

// require teens and adults to submit an ID card number?
var require_id_teen_adult = false;

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
})

$(document).ready(function() {
    // global, used to represent user's age category and show appropriate fields
    window.age_range = 0;

    // called only when user selects a language from the drop-down list
    $("#lang" ).change(function() {
        lang = $(this).val();
        log("setting language to " + lang);
        set_cookie("language", lang, 0);
        replace_language();

        $("*").toggleClass("error", false);
        $("#errors").text("");
        show_errors();
    });

    // show page elements
    $("div").hide();
    $("#intro_header").show();
    $("#lang_select").show();
    $("#form_wrapper").show();
    if (window.submit_error == true) {
        $("#submit_error").show();
    } else {
        $("#age_input").show();
    }

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
        alert("Applicants must be at least 5 years old to register for a library card online. If your child is under 5 but is in Kindergarten or TK, please seek assistance from library staff.");
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
        add_error("#last_name", "error_last_name");
    }
    // first name
    s = $('input[name=first_name]').val()
    if (s.length == 0) {
        add_error("#first_name", "error_first_name");
    }
    // phone number
    var r = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!r.test(($('input[name=phone]').val()))) {
        // Defer action if we don't have a valid phone number, since we allow
        // at least one of { phone, email address } on teen/adult forms.
        var has_phone = false;
        log("warning: no valid phone number");
        // add_error("#phone", "phone");
    }
    // street address
    s = $('input[name=home_address]').val()
    if (s.length == 0) {
        add_error("#home_address", "error_home_address");
    }
    // city
    s = $('input[name=home_city]').val()
    if (s.length == 0) {
        add_error("#home_city", "error_home_city");
    }
    // zip code
    s = $('input[name=home_zip]').val().replace(/\s+/g, '');
    if ((s.length != 5)|(s.charAt(0) != '9')) {
        add_error("#home_zip", "error_home_zip");
    }
    // teens / adults only
    if ((window.age_range == 3)|(window.age_range == 4)) {
        // email address
        var r = /\S+@\S+\.\S+/;
        if (!r.test($('input[name=email]').val())) {
            // If a teen/adult has entered a phone number, then we don't need
            // a valid email address to validate the form
            if (has_phone == false) {
                add_error("#phone", "error_phone");
                add_error("#email", "error_email");
            }
        }
        // identification
        if (require_id_teen_adult == true) {
            s = $('input:radio[name=id_type]:checked').val();
            if (!s) {
                add_error("#id_types", "error_id_types");
            }
            s = $('input[name=id_number]').val()
            if (s.length == 0) {
                add_error("#id_number", "error_id_number");
            }
        }
    }
    // children only
    if (window.age_range == 2) {
        if (has_phone == false) {
            // Children aren't asked for email, so without a phone number
            // entered, the form is invalid
            add_error("#phone", "phone");
        }
    }
    // agreement
    if (!$('input[name=agreement]').is(':checked')) {
        add_error("#agreement_box", "error_agreement_box");
    }
    // if no errors, returns true and page is submitted
    return show_errors();
}

// when validating fields, build a list of errors found. this function adds an
// error to the list, including a reference to the field id used to highlight it
function add_error(error_id, error_msg_id) {
    window.errors.push({id:error_id, msg:error_msg_id});
}

// display error messages and highlight associated fields
function show_errors() {
    if (window.errors.length > 0) {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        log(window.errors.length + " validation errors found");
        $("#errors").toggleClass("error");
        $("#errors").append(msgval("error_problems") + "<ul>");
        for (var i = 0; i < window.errors.length; i++) {
            log(window.errors[i].id + ": " + window.errors[i].msg);
            $("#errors").append("<li>" + msgval(window.errors[i].msg) + "</li>");
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
    if (document.getElementById("mailing_address")) {
        if (form.elements["mailing_address"].value != "") {
            log("mailing: " + form.elements["mailing_address"].value);
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
    // children only: transform identification
    if (window.age_range == 2) {
        // no unique ID is gathered from a child's user info, but since
        // millennium still needs a unique value if duplicate ID checking
        // is enabled, we create a dummy value based on a timestamp
        var field = document.createElement("input");
        field.name = "uuniversityID";
        field.type = "hidden";
        field.value = "NOT_AN_ID_" + new Date().getTime();
        form.appendChild(field);
    }
    // store extra info in overloaded department/org-id field...
    var field = document.createElement("input");
    field.name = "ddepartment";
    field.type = "hidden";
    // type of identification given (guardian's ID for child patrons)
    if ($('input:radio[name=id_type]:checked').val() != undefined) {
        t = $('input:radio[name=id_type]:checked').val().toUpperCase() + " ";
        field.value = "|t " + t;
    }
    // children only: transform parent/guardian info
    if (window.age_range == 2) {
        // school
        if (form.elements["school"].value != "") {
            s = "|s " + form.elements["school"].value.toUpperCase() + " ";
            field.value = field.value + s;
        }
    }
    // transform language preference
    if (!(form.elements["language"].value.toUpperCase() in {"ENGLISH":"", "":""})) {
        l = "|l " + form.elements["language"].value.toUpperCase();
        field.value = field.value + l;
    }
    form.appendChild(field); // done with ddepartment field
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
    $("#lang_select").show();
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
    if (document.getElementById("middle_initial")) {
        if (form.elements["middle_initial"].value != "") {
            log("nmiddle: " + form.elements["nmiddle"].value);
        }
    }
    log("nlast: " + form.elements["nlast"].value);
    log("stre_aaddress: " + form.elements["stre_aaddress"].value);
    log("city_aaddress: " + form.elements["city_aaddress"].value);
    // mailing address optional
    if (document.getElementById("mailing_address")) {
        if (form.elements["mailing_address"].value != "") {
            log("stre_haddress2: " + form.elements["stre_haddress2"].value);
            log("city_haddress2: " + form.elements["city_haddress2"].value);
        }
    }
    log("F046pcode3: " + form.elements["F046pcode3"].value);
    log("tphone1: " + form.elements["tphone1"].value);
    log("uuniversityID: " + form.elements["uuniversityID"].value);
    log("zemailaddr: " + form.elements["zemailaddr"].value);
    log("ddepartment: " + form.elements["ddepartment"].value);
    log("F044pcode1: " + form.elements["F044pcode1"].value);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
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
