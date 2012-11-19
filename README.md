.jgpe
=====
silly little javascript jpeg corrupter

* demo - http://files.heywill.com/jgpe/

* github - http://github.com/wjoneil/jgpe

Requires jQuery.

Details
-------

jgpe loads an image via ajax (or via drag-and-drop), corrupts the image by manipulating the byte array, and then displays the image by encoding the byte array data as base64 and setting it as the source for the image.

Because you're corrupting the file, corrupted .jpegs you save may appear different to how they appear in the browser, depending on the system used to decode the image.

License
-------

MIT. See LICENSE for more details.
