$(function() {
  const gallery = $(".gallery");
  const url =
    "https://api.nasa.gov/planetary/apod?api_key=XKt89WvnGhWLfRCPZH4ob5sUbTfzrHl37mQPes7k";
  const date = $("#start");
  const form = $(".form");
  const submit = $(".form-search-btn");

  function renderGallery(image) {
    let image_element = $(`<a href="${image.url}" class="gallery-element">
          <img class="gallery-img" src="${image.url}" alt="">
          <div class="gallery-description">
          <h2>Author : ${image.copyright}</h2>
          <h1>Title : ${image.title}</h1> 
          <p> ${image.explanation}</p>
          </div> 
          </a>`);
    gallery.append($(image_element));
  }

  function loadImages(day) {
    function doneCallback(response) {
      console.log(response);
      renderGallery(response);
    }

    function failCallback(error) {
      alert(
        "You place wrongly date, please made it once again by 'year-month-day' for example '2016-02-18'."
      );
      console.log(error);
    }

    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      data: {
        date: day
      }
    })
      .done(function(response) {
        doneCallback(response);
      })
      .fail(function(error) {
        failCallback(error);
      });
  }
  submit.on("click", e => {
    e.preventDefault();

    loadImages(date.val());
  });
});
