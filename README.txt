DuplicateDocument Report

Small utility that scans your filesystem looking for duplicate files.  A report is created and in an html file and opened with the default browser.

Requirements:
Internet connection is required because the generated report references an external React library
xdg-open is used to open the report with the default browser 
NodeJS - Version 15.0 is required because earlier versions don't have a "replaceAll" function



Usage:
cd into the root directory (which contains DocCleaner.js)
run this command
node DocCleaner.js dir=<directory>
<directory> is the directory to search for example:
node DocCleaner.js dir=~/Documents/


TODOs:

Get rid of react so an internet connection is not needed.
Currently the characters (') and (\) are just removed so the JSON works, figure out how to escape those
Format the Readme file into a README.md file
replace xdg-open with something that works more universally 
add option to ignore hidden files
look nicer
make progress bar
add code coments
