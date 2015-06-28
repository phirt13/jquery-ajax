$(function() {

  var $flickrSearch = $('#flickrFilter');
  var $photoContainer = $('#photoContainer');

  $flickrSearch.submit(function(e) {
    e.preventDefault();
    var $inputVal = $('#tagSearch').val();
    var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    $.ajax({
      type: "GET",
      url: flickrAPI,
      data: {tags: $inputVal, format:'json'},
      dataType: 'json',
      beforeSend: function clearPrev() {
        $('.flickr-photo').each(function() {
          $(this).remove();
        });
      },
      success: function showPhotos(data) {
        var photoList = '';
        $.each(data.items, function(i, photo) {
          photoList += '<section class="flickr-photo grid-5">';
          photoList += '<a href="' + photo.link + '">';
          photoList += '<img src="' + photo.media.m + '"></a>';
          photoList += '</section>'
        });

        $photoContainer.append(photoList);
      },
      fail: function searchFail() {
        $photoContainer.append('<h2>Sorry, Please try again soon.</h2>')
      }
    });

  });

});
