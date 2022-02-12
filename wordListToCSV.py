#!/usr/bin/env python 

import sys

fileName = sys.argv[1]

rFile = open(fileName)
rLines = rFile.readlines()

wFile = open("profanity_words.txt", "w")

count = 0
for line in rLines:
    count += 1
    wFile.write(line.strip())
    if count != len(rLines):
        wFile.write(",")

rFile.close()
wFile.close()

