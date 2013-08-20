#!/usr/bin/env python2
import csv

def unicode_csv_reader(utf8_data, dialect=csv.excel, **kwargs):
    csv_reader = csv.reader(utf8_data, dialect=dialect, **kwargs)
    for row in csv_reader:
        yield [unicode(cell, 'utf-8') for cell in row]

filename = 'token_data.csv'
reader = unicode_csv_reader(open(filename))
for field in reader:
    print "tdata." + field[0] + " = {"
    print "    eng:\"" + field[1].replace('"', '\\"') + "\","
    print "    spa:\"" + field[2] + "\","
    print "    chi:\"" + field[3] + "\""
    print "};"
