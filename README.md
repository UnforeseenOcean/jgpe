.jgpe
=====
fairly trivial javascript jpeg corrupter

Brought to you by William O'Neil - http://heywill.com

http://github.com/wjoneil/jgpe

Requires jQuery.

Details
-------

jgpe loads an image via ajax (or via drag-and-drop), corrupts the image by manipulating the byte array, and then displays the image by encoding the byte array data as base64 and setting it as the source for the image.

Because of cross-domain limitations inherent in ajax, images can only be loaded from the same domain.
