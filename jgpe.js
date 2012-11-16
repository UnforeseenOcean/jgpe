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

    anotherMethod: function () {
      this.myVariable = "foobar";
    },

    loadImage: function(selector, callback) {
      var image,
          $image = $(selector),
          source = $image.attr("src");

      $.ajax({
        url: source,
        beforeSend: function ( xhr ) {
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        },
        success: function(textResponse, whatever, jqXHR) {
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

    // corruptImage: function (data) {
    //   data = shuffle(data);
    //   $("#image").attr("src", "data:image/jpeg;base64," + encode(data));
    //   return data;
    // },

    // repeat: function (data, repeats, speed) {
    //   speed = speed || 200;
    //   setTimeout(function() {

    //     data = corruptImage(data);

    //     if (repeats > 0) {
    //       repeat(data, repeats-1);
    //     }
    //   }
    //   , speed);
    // },

    shuffle: function (data) {
      var start, end, length, index1, index2, temp;
      start = 5;
      end = data.length - 10;
      index1 = jgpe.corrupt.getRandom(start, end);
      index2 = jgpe.corrupt.getRandom(start, end);

      //single array entry swapping
      temp = data[index1];
      data[index1] = data[index2];
      data[index2] = temp;

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

    function JgpeImage(image, data) {
      this.$image = image;
      this.data = data.slice(0);
      this.originalData = data.slice(0);
      this.originalSource = this.$image.attr('src');
    };

    var $image;
    var originalSource;
    var originalData;
    var data;

    JgpeImage.prototype.setImage = function () {
      this.$image.attr("src", "data:image/jpeg;base64," + jgpe.corrupt.encode(this.data));
    };

    JgpeImage.prototype.corrupt = function () {
      this.data = jgpe.corrupt.shuffle(this.data);
      this.setImage(this.data);
    };

    //TODO: this.data is empty when the image gets set
    JgpeImage.prototype.reset = function () {
      this.data = this.originalData.slice(0);
      this.setImage(this.data);
    };

    return JgpeImage;
  })(jQuery);

})(jQuery);
