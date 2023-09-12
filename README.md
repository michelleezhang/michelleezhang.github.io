# michelleezhang.github.io
This is my personal website! 

# TODO
- Refactor
    - Separate header and footer
- Modification for mobile device compatibility 
- 404 design
- JS animations !! 
- Contact tweaks -> submit button font, make sure form clears on submit
- Project tweaks
- Organize all html and css into global and local

# Style Guide
** COLORS **
Cream: #fefdfa
Black: #232320
Purple: #e4ccfa
Purple (light): #EEDAFF

** FONTS **
* Titles: Ghibli by Eyad Al-Samman
* Body: ITC Avant Garde Gothic LT (Book, Demi, Extra Light)

# Conventions
** NAMING **
* Class: class-name
* Elements that depend on a class: class-name__dependant-name
* Modifier that change the style of a class: class-name--modifier-name

** UNITS **
* em instead of pixels -- allows for easier resizing

# Notes
An HTML document is divided into two main parts: head and body.

** HEAD **
The head is where we put metadata -- data that describes the data for a page.
Tags used include:
* Meta tags
- charset: tells the browser to use a certain character encoding (text to machine code), e.g. the UTF-8 encoding
- http-equiv: tells servers stuff about the page
- viewport: sets the viewport, e.g. it can be set so the width of the screen is always the full width of the device
- description: the summary of your page that shows up in search results
- keywords: keywords that help search engines know what your page is about
* Title tag: this is the title that appears on the webpage tab
* Links: links are external files that we can link to our page -- use "rel" (relation) to specify what the relationship is between the page and the linked file.
- preload: these are files (e.g. fonts) that will be loaded more immediately than others, which can help the page load quicker overall
- stylesheet: links an external stylesheet (external stylesheets allow us to change the style of many HTML pages at once, while internal stylesheets are specific to each page)
- icon: links to an image file for the web page's icon

** BODY **
* Header
- The header contains the navigation bar, which is formatted as an unordered list (ul) -- this is a nicer way to format things

* Padding syntax: top right bottom left OR top right/left bottom OR top/bottom right/left OR top/bottom/right/left