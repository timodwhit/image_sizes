(function($) {
  // Clone the Breakpoints.
  $('.clone-fields').on('click', function(e) {
    e.preventDefault();
    var cloneClass = $(this).data('clone');
    var fields = $('.' + cloneClass + ':last').clone();
    $('.' + cloneClass + ':last').after(fields);
    $('.' + cloneClass + ':last input').val('');

    var wrapper = $(this).closest('.clone-wrapper');
    if($(wrapper).find('.clone-field').length > 1) {
      $(wrapper).find('.clone-field .declone').show();
    }

    // Remove clone
    $(fields).find('.declone').on('click', function(e) {
      e.preventDefault();
      declone($(this));
    });
  });

  function calculateAspect($width, $height, $new_width) {
    return Math.round((($new_width * $height) / $width));
  }

  function isEmpty(str) {
    return (!str || 0 === str.length || str > 0);
  }

  $('#image-size').submit(function (e) {
    $('.calculated--images').html('');
    var ogWidth = $.trim($('.og--width').val());
    var ogHeight = $.trim($('.og--height').val());
    console.log(ogWidth);
    console.log(ogHeight);
    if(ogWidth === '' || ogHeight === '') {
      alert('Orignal Width and Height are needed.');
    }
    if ($.trim($('.breakpoint:first-child input').val()) === '') {
      alert("Please put in a min-width");
    }

    $('.breakpoint').each(function() {
      var newWidth = $.trim($(this).find('input').val());
      if (newWidth === '') {
        return;
      }
      var newHeight = calculateAspect(ogWidth, ogHeight, newWidth);
      console.log(newHeight);
      $('.calculated--images').append('<img src="http://placehold.it/' + newWidth + 'x' +  newHeight + '/"/><div class="new-image">' + newWidth + 'x' +  newHeight + '</div>');
    });
    event.preventDefault();
  });

})(jQuery)
