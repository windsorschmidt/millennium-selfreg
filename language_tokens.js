var lang = "eng";
tdata = new Object();

// <script>msg('header');</script>
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

tdata.header = {
    eng:"Online Library Card Registration Form",
    spa:"Formulario de Inscripción Card Library Online",
    chi:"網上圖書証申請表",
};
tdata.enter_birthdate = {
    eng:"Please Enter Your Birth Date",
    spa:"?",
    chi:"請填寫你的出生日期",
};
tdata.header_adult = {
    eng:"Adult Library Card Registration (age 18 and above)",
    spa:"Registró para tarjetas de la biblioteca para adultos (personas de 18 años o más)",
    chi:"成人圖書証申請表 (十八歲或以上)",
};
tdata.header_teen = {
    eng:"Teen Library Card Registration (ages 13-17)",
    spa:"Registro para tarjetas del la biblioteca para adolescentes",
    chi:"青少年圖書証申請表",
};
tdata.header_child = {
    eng:"Child Library Card Registration (ages 5-12)",
    spa:"Registro para tarjeta infantil de la biblioteca",
    chi:"兒童圖書証申請表  ( 5 - 12 歲)",
};
tdata.month = {
    eng:"Month",
    spa:"Mes",
    chi:"?",
};
tdata.january = {
    eng:"January",
    spa:"Enero",
    chi:"?",
};
tdata.february = {
    eng:"February",
    spa:"Febrero",
    chi:"?",
};
tdata.march = {
    eng:"March",
    spa:"Marzo",
    chi:"?",
};
tdata.april = {
    eng:"April",
    spa:"Abril",
    chi:"?",
};
tdata.may = {
    eng:"May",
    spa:"Mayo",
    chi:"?",
};
tdata.june = {
    eng:"June",
    spa:"Junio",
    chi:"?",
};
tdata.july = {
    eng:"July",
    spa:"Julio",
    chi:"?",
};
tdata.august = {
    eng:"August",
    spa:"Agosto",
    chi:"?",
};
tdata.september = {
    eng:"September",
    spa:"Septiembre",
    chi:"?",
};
tdata.october = {
    eng:"October",
    spa:"Octubre",
    chi:"?",
};
tdata.november = {
    eng:"November",
    spa:"Noviembre",
    chi:"?",
};
tdata.december = {
    eng:"December",
    spa:"Diciembre",
    chi:"?",
};
tdata.day = {
    eng:"Day",
    spa:"Día",
    chi:"?",
};
tdata.year = {
    eng:"Year",
    spa:"Año",
    chi:"?",
};
tdata.submit = {
    eng:"Submit",
    spa:"Continúe",
    chi:"提交  ",
};
tdata.start_over = {
    eng:"Start Over",
    spa:"Empezar de nuevo",
    chi:"重新開始",
};
tdata.disability_note = {
    eng:"If you have a disability, ask Library staff for an Extended Services form.",
    spa:"Si usted es una persona con discapacidades, pida  la SOLICITUD de Servicios Extra Para Usuarios con Discapacidades.",
    chi:"如果你是殘障人士，請向圖書館職員索取殘障讀者專用特別服務申請表。",
};
tdata.pickup_note_adult = {
    eng:"Pick up your library card in person from your nearest branch within 14 days of applying with the following documents:<ol><li>Photo ID</li><li>Proof of address</li></ol>",
    spa:"Recoja su tarjeta de la biblioteca en persona en su sucursal más cercano en los próximos 14 días y traiga los siguientes documentos:<br /><ul><li>Identificación fotográfica</li><li>Prueba de su dirección actual</li></ul>",
    chi:"請在填寫表格後十四日內，由本人帶同以下文件到附近圖書館分館領取你的圖書証:<ol><li>附有照片的身份証</li><li>地址証明</li></ol>",
};
tdata.pickup_note_teen = {
    eng:"Pick up your library card in person from your nearest library branch within 14 days of applying with your photo ID. Proof of address is required with ID for full access to our services, but we accept multiple forms of identification.  If no ID or proof of address is available, a parent/guardian signature on a <a href=\"http://www.oaklandlibrary.org/sites/default/files/uploads/OPL_Card_App_Eng_Teens_0.pdf\">paper application</a> is also acceptable.",
    spa:"Recoja su tarjeta de la biblioteca en persona en su sucursal más cercano en los próximos 14 días y traiga identificación fotográfica.",
    chi:"請在填寫表格後十四日內，帶同附有照片的身份証到附近圖書館分館領取你的圖書証。若不能提供身份証明文件，請填寫由家長/法定監護人簽名的書面申請表格。",
};
tdata.pickup_note_child = {
    eng:"Parent/Legal Guardian and child must both present themselves for the child to receive the card within 14 days of applying. Alternatively, you may print and fill out a <a href=\"http://www.oaklandlibrary.org/sites/default/files/uploads/OPL_Card_App_Eng_Kids_0.pdf\">paper application</a> for the child to receive a card without parent/legal guardian present.",
    spa:"Padres de familia/ guardián y el niño tiene que presentase para recibir la tarjeta en los próximos 14 días. O, pueden imprimir y completar la solicitud y el niño puede recibir su tarjecta sin que estén presente los padres/ guardián.",
    chi:"家長/法定監護人和孩子在填寫申請表格後十四日內，必須一同前往圖書館領取孩子的圖書証。家長/法定監護人亦可預先填寫書面申請表格，讓孩子在沒有家表的陪同下仍可辨理申請手續。",
};
tdata.required = {
    eng:"required field",
    spa:"información necesaria",
    chi:"必須填寫項目",
};
tdata.name = {
    eng:"Name",
    spa:"Nombre",
    chi:"姓名",
};
tdata.last_name = {
    eng:"Last Name",
    spa:"Apellido",
    chi:"姓",
};
tdata.first_name = {
    eng:"First Name",
    spa:"Nombre ",
    chi:"名",
};
tdata.middle_initial = {
    eng:"Middle Initial",
    spa:"Inicial media",
    chi:"中間名簡寫",
};
tdata.home_address = {
    eng:"Home Address",
    spa:"Dirección",
    chi:"住所地址",
};
tdata.street = {
    eng:"Street",
    spa:"Calle con número ",
    chi:"街名",
};
tdata.apt = {
    eng:"Apt.#",
    spa:"Apt. #",
    chi:"房號",
};
tdata.city = {
    eng:"City",
    spa:"Ciudad ",
    chi:"巿名",
};
tdata.zip = {
    eng:"CA. Zip Code",
    spa:"CA Código postal",
    chi:"郵區號碼",
};
tdata.phone = {
    eng:"Telephone",
    spa:"Teléfono",
    chi:"電話",
};
tdata.phone_note = {
    eng:"(including area code)",
    spa:"(incluya código de área)",
    chi:"包括地區號碼",
};
tdata.mailing_address = {
    eng:"Mailing Address (if different from home address)",
    spa:"Dirección para correspondencia (solo si se diferente al de su casa)",
    chi:"通信地址 (若與住所地址不同)",
};
tdata.email = {
    eng:"E-Mail Address",
    spa:"Correo electrónico",
    chi:"電郵地址",
};
tdata.pref_lang = {
    eng:"Preferred Language",
    spa:"Idioma preferido ",
    chi:"首選語言",
};
tdata.pref_lang_note = {
    eng:"If you prefer to read in a language other than English, please indicate that language here",
    spa:"Si usted prefiere leer en otro idioma que no sea inglés, favor de indicarlo",
    chi:"若你選擇閱讀英文以外的語文，請在這裏填寫",
};
tdata.parent_info = {
    eng:"Parent/Guardian Identification",
    spa:"Padre / guardia",
    chi:"家長/法定監護人資料",
};
tdata.school = {
    eng:"School",
    spa:"Escuela",
    chi:"學校",
};
tdata.ident = {
    eng:"Identification",
    spa:"Número de su identificación",
    chi:"個人識別號碼",
};
tdata.ident_note = {
    eng:"You may register using one of several identification types. Please select an identification type by clicking one of the buttons below, and then enter the number shown on your ID. For more information about the accepted types of identification, please see &ldquo;<a href=\"#\" onclick=\"lightbox_open(acceptable_id());\">What forms of identification are accepted?</a>&rdquo; Please see staff if you have ID not listed here.",
    spa:"Usted se puede registrar usando uno de varios tipos de identificación. Favor de indicar cual tipo de identificación desea usar y ponga el numero abajo. Para más información acerca de cuales tipos de identificación son aceptados vea &ldquo;<a href=\"#\" onclick=\"lightbox_open(acceptable_id());\">What forms of identification are accepted?</a>&rdquo;",
    chi:"你可選擇使用任何一種身份証明文件申請圖書証。請點擊以下按鈕，然後輸入証件上的號碼。有關可接受的身份証種類詳情，請參閱 ",
};
tdata.drivers_license = {
    eng:"Driver's License",
    spa:"Licencia de conducir",
    chi:"駕駛執照 ",
};
tdata.resident_card = {
    eng:"Permanent Resident Card",
    spa:"Tarjeta verde ( Tarjeta de residencia permanente)",
    chi:"永久居民身份証 ",
};
tdata.state_id = {
    eng:"State Issued ID Card",
    spa:"Identificación estatal",
    chi:"州政府簽發身份証  ",
};
tdata.matricula = {
    eng:"Matricula Consular ID Card",
    spa:"Matricula consular",
    chi:"駐美墨西哥領事館簽發身份証  ",
};
tdata.city_id = {
    eng:"Oakland City ID/Municipal City ID",
    spa:"Identificación de la Ciudad de Oakland",
    chi:"屋崙市/或其他市政府簽發身份証  ",
};
tdata.student_id = {
    eng:"Student ID Card",
    spa:"Identificación escolar",
    chi:"學生証 ",
};
tdata.passport = {
    eng:"Passport",
    spa:"Pasaporte",
    chi:"護照 ",
};
tdata.ident_number = {
    eng:"ID Number",
    spa:"Numero de su identificación ",
    chi:"証件號碼",
};
tdata.agreement = {
    eng:"Online Agreement",
    spa:"Acuerdo en línea",
    chi:"網上同意書",
};
tdata.agreement_note_teen_adult = {
    eng:"I agree to follow all library rules, pay all fines and fees, and give immediate notice of any change of address, phone number, or loss of library card. I understand that I am responsible for all items checked out on this card, that some items such as DVDs and videos have higher fines, and that I am the only authorized user of this card.",
    spa:"Acepto seguir todas las reglas de la biblioteca, pagar todos los cargos y multas y notificar cambios de domicilio, teléfono o si se extravía me tarjeta.  Entiendo que soy responsable por todos los materiales que se prestan con mi tarjeta, que algunos materiales tales como videos y DVD tienen multas más altas y que yo soy la única persona autorizada para usar esta tarjeta.",
    chi:"本人同意遵守圖書館的規定，支付所有遺失及受損物件的費用。若我的地址、電話有任何變動，或遺失圖書証時會立刻通知館方。我本人了解必須為所有這張圖書証借出的物件負責，包括罰款較高的錄影帶及DVD。而且明白本人是這張圖書証的唯一授權使用人。",
};
tdata.agreement_note_child = {
    eng:"As parent/Legal Guardian, I understand and agree that:<br /><ul><li>The library may only give the card to my child.  Only my child may use his or her card.</li><li>The library allows my child to use any materials, from any section. The library cannot limit the types of books or movies my child checks out, even if I ask.</li><li>My child's library record (like mine) is private by law. The library cannot tell me what my child has checked out, except when a fine is owed.</li><li>Some materials have fines if they are returned late, and all lost or damaged materials have fines. I am responsible for any fines on my child's record.</li><li>My child can use computers at the library for up to one hour per day. The library does not limit what children can look at, and does not supervise children on the computer.</li><li>If my child is younger than eight years old, he or she must be closely supervised by a parent or responsible caregiver, and may not be left unattended in the library.</li></ul>",
    spa:"Como padre de familia/ guardián acepto las siguientes responsabilidades:<br/><ul><li>La biblioteca puede darle solamente a mi niño la tarjecta. Solo mi niño puede usar su tarjects.</li><li>La biblioteca permite que mi niño use cualquier material de cualquier sección.  La biblioteca no puede limitar el tipo de libros o películas que mi niño puede sacar aun si yo lo pido</li><li>La cuenta de mi niño (al igual que la mía) es privada bajo la ley. La biblioteca no me puede dar información acerca de lo que esta prestado a mi niño a menos que sea acerca de las multas.</li><li>Algunos materiales tiene multas si se regresan tarde y siempre hay cargos si material se pierde o regresa dañado. Yo soy responsable de todos cargos en la cuenta de mi niño.</li><li>Mi niño puede usar la computadora en la biblioteca hasta el máximo de una hora por día. La biblioteca no limita lo que los niños pueden ver y no supervisan a los niños en la computadora.</li><li>Si mi niño es menor de 8 años debe de tener supervisión de parte de un padre u otro adulto responsable, y no puede  estar en la biblioteca solo.</li></ul>",
    chi:"作為家長/監護人我明白及同意<br/><ul><li>圖書館只發証給我的孩子，只有我的孩子才能使用這張圖書証。</li><li>圖書館容許孩子從任何部份借出任何物件。即使在本人的要求下，圖書館不能限制孩子借出書本及電影的種類。</li><li>孩子的資料保密與本人一樣是受加州私隱權法例保障的。圖書館不可向我透露孩子借出的任何資料，除物件有罰款以外。</li><li>某些圖書館物件是有過期罰款的。所有遺失及損壞物件均需繳付費用。本人同意對孩子借出的一切物件負責，並擔負所有過期罰款及任何損壞費用。</li><li>我的孩子每天只可在圖書館內使用不超過一小時的電腦 圖書館不會監察孩子在網上查閱的任何資料。</li><li>若我的孩子年齡是八歲以下，必須時刻由家長或保姆監督，絶不可以單獨逗留在圖書館內。</li></ul>",
};
tdata.agree = {
    eng:"I agree to follow all library rules.",
    spa:"Yo acepto seguir todas las reglas.",
    chi:"本人同意遵守所有圖書館的規定",
};
tdata.submit_error = {
    eng:"Error Submitting Form",
    spa:"?",
    chi:"?",
};
tdata.submit_error_note = {
    eng:"We were unable to process your form. Please contact a librarian for assistance.",
    spa:"?",
    chi:"?",
};
tdata.error_last_name = {
    eng:"Last name must not be empty.",
    spa:"?",
    chi:"?",
};
tdata.error_first_name = {
    eng:"First name must not be empty.",
    spa:"?",
    chi:"?",
};
tdata.error_phone = {
    eng:"Please enter a valid 10-digit phone number in the format: xxx-xxx-xxxx",
    spa:"?",
    chi:"?",
};
tdata.error_home_address = {
    eng:"Please enter your home street address.",
    spa:"?",
    chi:"?",
};
tdata.error_home_city = {
    eng:"Please enter your home city.",
    spa:"?",
    chi:"?",
};
tdata.error_home_zip = {
    eng:"Please enter a valid CA zip-code.",
    spa:"?",
    chi:"?",
};
tdata.error_email = {
    eng:"Please enter a valid email address.",
    spa:"?",
    chi:"?",
};
tdata.error_id_types = {
    eng:"Please select an identification type.",
    spa:"?",
    chi:"?",
};
tdata.error_id_number = {
    eng:"Please enter a valid identification number.",
    spa:"?",
    chi:"?",
};
tdata.error_guardian_last_name = {
    eng:"Please enter the parent/guardian's last name.",
    spa:"?",
    chi:"?",
};
tdata.error_guardian_first_name = {
    eng:"Please enter the parent/guardian's first name.",
    spa:"?",
    chi:"?",
};
tdata.error_guardian_id_types = {
    eng:"Please select an identification type.",
    spa:"?",
    chi:"?",
};
tdata.error_guardian_id_number = {
    eng:"Please enter a valid identification number.",
    spa:"?",
    chi:"?",
};
tdata.error_agreement_box = {
    eng:"You must read and agree to the library terms before submitting this form.",
    spa:"?",
    chi:"?",
};
tdata.error_problems = {
    eng:"One or more problems were found. Please check the highlited fields before clicking submit.",
    spa:"?",
    chi:"?",
};
tdata.confirm = {
    eng:"Online Registration Confirmation",
    spa:"?",
    chi:"?",
};
tdata.date_registered = {
    eng:"Date registered:",
    spa:"?",
    chi:"?",
};
tdata.thanks = {
    eng:"Thanks for registering!",
    spa:"?",
    chi:"?",
};
tdata.confirm_note = {
    eng:"<p>Please <strong>print this confirmation</strong> and bring it with the following documents to any Oakland Public Library within 14 days to pick up your card:</p><ul><li>Photo ID</li><li>Proof of address</li></ul><p> For children under 13, a parent or legal guardian must be present with the child to receive the card. No ID or proof of address is required. </p>",
    spa:"?",
    chi:"?",
};
tdata.button_print = {
    eng:"Print Confirmation",
    spa:"?",
    chi:"?",
};
tdata.button_close = {
    eng:"Close",
    spa:"?",
    chi:"?",
};

