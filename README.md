.jgpe
=====
fairly trivial javascript jpeg corrupter

* author:     William O'Neil, http://heywill.com
* github:     http://github.com/wjoneil/jgpe

Requires jQuery.

Details
-------

jgpe loads an image via ajax, corrupts the image by manipulating the byte array, and then displays the image by encoding the data as a base64 data uri and setting it as the source for the image.

Because of cross-domain limitations inherent in ajax, images can only be loaded from the same domain.

Usage
-----

Call `jgpe.corrupt.loadImage()`, which takes two arguments: a jquery-style css selector string, and a callback function to be executed once the data from the image has been loaded. This callback function is passed a newly created JgpeImage object, which is also stored in the jQuery data field for the image element.

Once you have the `JgpeImage` object, you'll probably want to `corrupt()` it. You can also `reset()` the image data back to its original state.

If you want to save images you've corrupted, your browser should support saving them like any other image. If the image you uploaded was greyscale, you may find that the newly corrupted image is different to the image in the browser.
