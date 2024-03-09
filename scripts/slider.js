$(document).ready(function () {
  var images = []; // array to hold image paths
  var currentIndex = 0; // current index of the image being displayed
  var interval = 6000; // interval between slide changes in milliseconds

  // Function to load images from a folder
  function loadImagesFromFolder(folderPath) {
    $.ajax({
      url: folderPath,
      success: function (data) {
        $(data)
          .find("a")
          .attr("href", function (i, val) {
            if (val.match(/\.(jpe?g|png|gif)$/)) {
              images.push(folderPath + val); // push image path to the array
            }
          });
        showImage(currentIndex); // display the first image
        setInterval(nextImage, interval); // set interval to switch images automatically
      },
    });
  }

  // Function to display an image at the specified index
  function showImage(index) {
    $("#slider img").attr("src", images[index]);
  }

  // Function to show the next image in the slider
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; // loop back to the beginning if at the end
    showImage(currentIndex);
  }
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // loop back to the beginning if at the end
    showImage(currentIndex);
  }
  // Call the function to load images from a folder
  loadImagesFromFolder("./images/slider/");

  $(".prev").click(function () {
    prevImage();
  });

  $(".next").click(function () {
    nextImage();
  });
});
