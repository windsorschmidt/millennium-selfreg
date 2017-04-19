# millennium-selfreg

Customized Javascript/CSS Patron Self Registration Form for use with Innovative Millennium

This form was created to suit the needs of the [Oakland Public Library](http://www.oaklandlibrary.org). The sample form distributed by Innovative does not provide much in the way of input validation, and their use of token-replacement to generate html form elements wasn't very customizable. I've put this code up on github in case any other Innovative customers can benefit from it.

Features:

- Highlighting on empty/unacceptable fields with accompanying help messages
- Display different form fields based on patron age using CSS
- Calculate age based on birth date
- Printer-friendly confirmation page using CSS
- Validation of format for email and phone number fields
- Convert city name to library jurisdiction code

### Importing Language Strings from Excel

To help collect translated language strings, the python script `csv_to_js.py` will convert a CSV file to a snippet of javascript code that can be used in `language_tokens.js`. CSV files exported by Microsoft Excel may need to be converted to UNIX style line endings and/or ISO codeset. After exporting `token_data.xlsx` to `token_data.csv`, try the following to generate the required snippet:

    dos2unix -c iso token_data.csv
    ./csv_to_js.py

### Email Confirmation Message

Confirmation messages sent via email by the Millenium/Sierra server use content from the live/screens file `newpat.html` and is not handled by this script.
