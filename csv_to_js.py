#!/usr/bin/env python2
import csv

def unicode_csv_reader(utf8_data, dialect=csv.excel, **kwargs):
    csv_reader = csv.reader(utf8_data, dialect=dialect, **kwargs)
    for row in csv_reader:
        yield [unicode(cell, 'utf-8') for cell in row]

filename = 'token_data.csv'
reader = unicode_csv_reader(open(filename))
f = open('token_data.js', 'w')
for field in reader:
    f.write("tdata."+field[0].replace('"', '\\"').encode("utf-8")+" = {\n")
    f.write("    eng:\""+field[1].replace('"', '\\"').encode("utf-8")+"\",\n")
    f.write("    spa:\""+field[2].replace('"', '\\"').encode("utf-8")+"\",\n")
    f.write("    chi:\""+field[3].replace('"', '\\"').encode("utf-8")+"\"\n")
    f.write("};".encode("utf-8")+"\n")
