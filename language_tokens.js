// <script>msg('header');</script>
function msg(id) {
    document.write(msgval(id));
}

function msgval(id) {
    return tdata[id][lang];
}

var lang = 'eng';
tdata = new Object();
tdata.header = {
    eng:"Online Library Card Registration Form",
    spa:"Formulario de Inscripción Card Library Online",
    chi:"在线图书馆卡登记表",
};
tdata.enter_birthdate = {
    eng:"Please Enter Your Birth Date",
    spa:"xxx",
    chi:"???",
};
tdata.header_adult = {
    eng:"Adult Library Card Registration (age 18 and above)",
    spa:"xxx",
    chi:"???",
};
tdata.header_teen = {
    eng:"Teen Library Card Registration (ages 13-17)",
    spa:"xxx",
    chi:"???",
};
tdata.header_child = {
    eng:"Child Library Card Registration (ages 5-12)",
    spa:"xxx",
    chi:"???",
};
tdata.month = {
    eng:"Month",
    spa:"xxx",
    chi:"???",
};
tdata.january = {
    eng:"January",
    spa:"xxx",
    chi:"???",
};
tdata.february = {
    eng:"February",
    spa:"xxx",
    chi:"???",
};
tdata.march = {
    eng:"March",
    spa:"xxx",
    chi:"???",
};
tdata.april = {
    eng:"April",
    spa:"xxx",
    chi:"???",
};
tdata.may = {
    eng:"May",
    spa:"xxx",
    chi:"???",
};
tdata.june = {
    eng:"June",
    spa:"xxx",
    chi:"???",
};
tdata.july = {
    eng:"July",
    spa:"xxx",
    chi:"???",
};
tdata.august = {
    eng:"August",
    spa:"xxx",
    chi:"???",
};
tdata.september = {
    eng:"September",
    spa:"xxx",
    chi:"???",
};
tdata.october = {
    eng:"October",
    spa:"xxx",
    chi:"???",
};
tdata.november = {
    eng:"November",
    spa:"xxx",
    chi:"???",
};
tdata.december = {
    eng:"December",
    spa:"xxx",
    chi:"???",
};
tdata.day = {
    eng:"Day",
    spa:"xxx",
    chi:"???",
};
tdata.year = {
    eng:"Year",
    spa:"xxx",
    chi:"???",
};
tdata.submit = {
    eng:"Submit",
    spa:"xxx",
    chi:"???",
};
tdata.start_over = {
    eng:"Start Over",
    spa:"xxx",
    chi:"???",
};
tdata.disability_note = {
    eng:"If you have a disability, ask Library staff for an Extended Services form.",
    spa:"xxx",
    chi:"???",
};
tdata.pickup_note_adult = {
    eng:"Pick up your library card in person from your nearest branch within 14 days of applying with the following documents:<ol><li>Photo ID</li><li>Proof of address</li></ol>",
    spa:"xxx",
    chi:"???",
};
tdata.pickup_note_teen = {
    eng:"Pick up your library card in person from your nearest library branch within 14 days of applying with your photo ID. Proof of address is required with ID for full access to our services, but we accept multiple forms of identification.  If no ID or proof of address is available, a parent/guardian signature on a <a href=\"http://www.oaklandlibrary.org/sites/default/files/uploads/OPL_Card_App_Eng_Teens_0.pdf\">paper application</a> is also acceptable.",
    spa:"xxx",
    chi:"???",
};
tdata.pickup_note_child = {
    eng:"Parent/Legal Guardian and child must both present themselves for the child to receive the card within 14 days of applying. Alternatively, you may print and fill out a <a href=\"http://www.oaklandlibrary.org/sites/default/files/uploads/OPL_Card_App_Eng_Kids_0.pdf\">paper application</a> for the child to receive a card without parent/legal guardian present.",
    spa:"xxx",
    chi:"???",
};
tdata.required = {
    eng:"required field",
    spa:"xxx",
    chi:"???",
};
tdata.name = {
    eng:"Name",
    spa:"xxx",
    chi:"???",
};
tdata.last_name = {
    eng:"Last Name",
    spa:"xxx",
    chi:"???",
};
tdata.first_name = {
    eng:"First Name",
    spa:"xxx",
    chi:"???",
};
tdata.middle_initial = {
    eng:"Middle Initial",
    spa:"xxx",
    chi:"???",
};
tdata.home_address = {
    eng:"Home Address",
    spa:"xxx",
    chi:"???",
};
tdata.street = {
    eng:"Street",
    spa:"xxx",
    chi:"???",
};
tdata.apt = {
    eng:"Apt.#",
    spa:"xxx",
    chi:"???",
};
tdata.city = {
    eng:"City",
    spa:"xxx",
    chi:"???",
};
tdata.zip = {
    eng:"CA. Zip Code",
    spa:"xxx",
    chi:"???",
};
tdata.phone = {
    eng:"Telephone",
    spa:"xxx",
    chi:"???",
};
tdata.phone_note = {
    eng:"(including area code)",
    spa:"xxx",
    chi:"???",
};
tdata.mailing_address = {
    eng:"Mailing Address (if different from home address)",
    spa:"xxx",
    chi:"???",
};
tdata.email = {
    eng:"E-Mail Address",
    spa:"xxx",
    chi:"???",
};
tdata.pref_lang = {
    eng:"Preferred Language",
    spa:"xxx",
    chi:"???",
};
tdata.pref_lang_note = {
    eng:"If you prefer to read in a language other than English, please indicate that language here",
    spa:"xxx",
    chi:"???",
};
tdata.parent_info = {
    eng:"Parent/Guardian Identification",
    spa:"xxx",
    chi:"???",
};
tdata.school = {
    eng:"School",
    spa:"xxx",
    chi:"???",
};
tdata.parent_note = {
    eng:"You may register using one of several identification types. Please select an identification type by clicking one of the buttons below, and then enter the number shown on your ID. For more information about the accepted types of identification, please see &ldquo;<a href=\"#\" onclick=\"lightbox_open(acceptable_id());\">What forms of identification are accepted?</a>&rdquo;",
    spa:"xxx",
    chi:"???",
};
tdata.ident = {
    eng:"Identification",
    spa:"xxx",
    chi:"???",
};
tdata.ident_note = {
    eng:"You may register using one of several identification types. Please select an identification type by clicking one of the buttons below, and then enter the number shown on your ID. For more information about the accepted types of identification, please see &ldquo;<a href=\"#\" onclick=\"lightbox_open(acceptable_id());\">What forms of identification are accepted?</a>&rdquo; Please see staff if you have ID not listed here.",
    spa:"xxx",
    chi:"???",
};
tdata.drivers_license = {
    eng:"Driver's License",
    spa:"xxx",
    chi:"???",
};
tdata.resident_card = {
    eng:"Permanent Resident Card",
    spa:"xxx",
    chi:"???",
};
tdata.state_id = {
    eng:"State Issued ID Card",
    spa:"xxx",
    chi:"???",
};
tdata.matricula = {
    eng:"Matricula Consular ID Card",
    spa:"xxx",
    chi:"???",
};
tdata.city_id = {
    eng:"Oakland City ID/Municipal City ID",
    spa:"xxx",
    chi:"???",
};
tdata.student_id = {
    eng:"Student ID Card",
    spa:"xxx",
    chi:"???",
};
tdata.passport = {
    eng:"Passport",
    spa:"xxx",
    chi:"???",
};
tdata.ident_number = {
    eng:"ID Number",
    spa:"xxx",
    chi:"???",
};
tdata.agreement = {
    eng:"Online Agreement",
    spa:"xxx",
    chi:"???",
};
tdata.agreement_note_adult_teen_adult = {
    eng:"I agree to follow all library rules, pay all fines and fees, and give immediate notice of any change of address, phone number, or loss of library card. I understand that I am responsible for all items checked out on this card, that some items such as DVDs and videos have higher fines, and that I am the only authorized user of this card.",
    spa:"xxx",
    chi:"???",
};
tdata.agreement_note_child = {
    eng:"As parent/Legal Guardian, I understand and agree that:<br /><ul><li>The library may only give the card to my child.  Only my child may use his or her card.</li><li>The library allows my child to use any materials, from any section.   The library cannot limit the types of books or movies my child checks out, even if I ask.</li><li>My child’s library record (like mine) is private by law. The library cannot tell me what my child has checked out, except when a fine is owed.</li><li>Some materials have fines if they are returned late, and all lost or damaged materials have fines.  I am responsible for any fines on my child’s record.</li><li>My child can use computers at the library for up to one hour per day.  The library does not limit what children can look at, and does not supervise children on the computer.</li><li>If my child is younger than eight years old, he or she must be closely supervised by a parent or responsible caregiver, and may not be left unattended in the library.</li></ul>",
    spa:"xxx",
    chi:"???",
};
tdata.agree = {
    eng:"I agree to follow all library rules.",
    spa:"xxx",
    chi:"???",
};
tdata.submit_error = {
    eng:"Submission Error",
    spa:"xxx",
    chi:"???",
};
tdata.submit_error_note = {
    eng:"We were unable to process your form. Please contact a librarian for assistance.",
    spa:"xxx",
    chi:"???",
};
tdata.error_last_name = {
    eng:"Last name must not be empty.",
    spa:"xxx",
    chi:"???",
};
tdata.error_first_name = {
    eng:"First name must not be empty.",
    spa:"xxx",
    chi:"???",
};
tdata.error_phone = {
    eng:"Please enter a valid 10-digit phone number in the format: xxx-xxx-xxxx",
    spa:"xxx",
    chi:"???",
};
tdata.error_home_address = {
    eng:"Please enter your home street address.",
    spa:"xxx",
    chi:"???",
};
tdata.error_home_city = {
    eng:"Please enter your home city.",
    spa:"xxx",
    chi:"???",
};
tdata.error_home_zip = {
    eng:"Please enter a valid CA zip-code.",
    spa:"xxx",
    chi:"???",
};
tdata.error_email = {
    eng:"Please enter a valid email address.",
    spa:"xxx",
    chi:"???",
};
tdata.error_id_types = {
    eng:"Please select an identification type.",
    spa:"xxx",
    chi:"???",
};
tdata.error_id_number = {
    eng:"Please enter a valid identification number.",
    spa:"xxx",
    chi:"???",
};
tdata.error_guardian_last_name = {
    eng:"Please enter the parent/guardian's last name.",
    spa:"xxx",
    chi:"???",
};
tdata.error_guardian_first_name = {
    eng:"Please enter the parent/guardian's first name.",
    spa:"xxx",
    chi:"???",
};
tdata.error_guardian_id_types = {
    eng:"Please select an identification type.",
    spa:"xxx",
    chi:"???",
};
tdata.error_guardian_id_number = {
    eng:"Please enter a valid identification number.",
    spa:"xxx",
    chi:"???",
};
tdata.error_agreement_box = {
    eng:"You must read and agree to the library terms before submitting this form.",
    spa:"xxx",
    chi:"???",
};
tdata.error_problems = {
    eng:"One or more problems were found. Please check the highlited fields before clicking submit.",
    spa:"xxx",
    chi:"???",
};
tdata.confirm = {
    eng:"Online Registration Confirmation",
    spa:"xxx",
    chi:"???",
};
tdata.date_registered = {
    eng:"Date registered:",
    spa:"xxx",
    chi:"???",
};
tdata.thanks = {
    eng:"Thanks for registering!",
    spa:"xxx",
    chi:"???",
};
tdata.confirm_note = {
    eng:"<p>Please <strong>print this confirmation</strong> and bring it with the following documents to any Oakland Public Library within 14 days to pick up your card:</p><ul><li>Photo ID</li><li>Proof of address</li></ul><p> For children under 13, instead, a parent/Legal Guardian and child must both be present for the child to receive the card.</p>",
    spa:"xxx",
    chi:"???",
};
tdata.button_print = {
    eng:"Print Confirmation",
    spa:"xxx",
    chi:"???",
};
tdata.button_startover = {
    eng:"Close",
    spa:"xxx",
    chi:"???",
};
