/*global jgpe:true, jQuery:true, $:true*/
/*jslint browser: true, white: true, vars: true, devel: true, bitwise: true, debug: true, nomen: true, sloppy: false, indent: 2*/


(function ($) {
  "use strict";
  window.jgpe = window.jgpe || {};
  window.jgpe.corrupt = {
    myVariable: "foo",

    initialize: function () {
      // your initialization code here
    },

    LoadImageFileReader: function (file, selector, callback) {
      var imageType = /image.*/, img, reader, ui8a, $image, image;

      if (!file.type.match(imageType)) {
        return false;
      }

      $image = $(selector);
      img = $image[0];
      img.file = file;

      reader = new FileReader();
      reader.onload = function(e) {
        //img.src = e.target.result
        ui8a = new Uint8Array(e.target.result);
        image = new jgpe.JgpeImage($image, ui8a, file.type);
        $image.data("jgpe", image);

        if (callback) {
          return callback(image);
        } else {
          return image;
        }

      };
      reader.readAsArrayBuffer(file);
    },

    loadImageAjax: function (selector, callback) {
      var image,
          $image = $(selector),
          source = $image.attr("src");

      $.ajax({
        url: source,
        beforeSend: function (xhr) {
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        },
        success: function (textResponse, whatever, jqXHR) {
          var data = [], i;
          for (i = 0; i < textResponse.length -1; i++) {
            data.push(textResponse.charCodeAt(i) & 0xFF); //converting to 0-255
          }

          image = new jgpe.JgpeImage($image, data);

          //save jpgeImage to element's data store
          $image.data("jgpe", image);

          if (callback) {
            return callback(image);
          } else {
            return image;
          }
        }
      });
    },

    randomiseByteValues: function (data, repeats) {
      var start, end, index, newvalue, i;
      start = 5;
      end = data.length - 10;
      repeats = repeats || 1;

      for (i = 0; i < repeats; i++) {
        index = jgpe.corrupt.getRandom(start, end);
        newvalue = jgpe.corrupt.getRandom(0, 255);
        data[index] = newvalue;
      }

      return data;
    },

    swapBytePositions: function (data, repeats) {
      var start, end, length, index1, index2, temp, i;
      start = 5;
      end = data.length - 10;
      repeats = repeats || 1;

      for (i = 0; i < repeats; i++) {
        index1 = jgpe.corrupt.getRandom(start, end);
        index2 = jgpe.corrupt.getRandom(start, end);

        //single array entry swapping
        temp = data[index1];
        data[index1] = data[index2];
        data[index2] = temp;
      }
      return data;
    },

    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    encode: function (data) {
      var i, str = "";
      for (i = 0; i < data.length; i++) {
        str += String.fromCharCode(data[i]);
      }

      return btoa(str).split(/(.{75})/).join("\n").replace(/\n+/g, "\n").trim();
    }

  };

  window.jgpe.JgpeImage = (function ($) {
    "use strict";

    var $image;
    var originalData;
    var data;

    var corruptionScheme;

    function JgpeImage(image, data, type) {
      this.corruptionScheme = jgpe.corrupt.randomiseByteValues;

      //set up image data
      this.$image = image;
      this.data = new Uint8Array(data);
      this.originalData = new Uint8Array(data);
      this.type = type || "image/jpeg"

      this.setImage();
    };

    JgpeImage.prototype.height = function () {
      return this.$image.height();
    };

    JgpeImage.prototype.width = function () {
      return this.$image.width();
    };

    JgpeImage.prototype.setScheme = function (scheme) {
      this.corruptionScheme = scheme;
    }

    JgpeImage.prototype.setImage = function () {
      this.$image.attr("src", "data:"+this.type+";base64," + jgpe.corrupt.encode(this.data));
    };

    JgpeImage.prototype.corrupt = function (repeats) {
      this.data = this.corruptionScheme(this.data, repeats);
      this.setImage(this.data);
    };

    //TODO: this.data is empty when the image gets set
    JgpeImage.prototype.reset = function () {
      // this.data = this.originalData.slice(0);
      this.data = new Uint8Array(this.originalData);
      this.setImage(this.data);
    };

    return JgpeImage;
  })(jQuery);

})(jQuery);
