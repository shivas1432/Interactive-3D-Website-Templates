$(document).ready(function () {
    $(".off").hide();
    $("#play").click(function () {
      if ($(this).hasClass("active")) {
        $(".off").hide();
        $(".on").fadeIn();
        $("#powerOn")[0].pause();
        $("#powerOff")[0].play();
        $(this).toggleClass("active");
        $(
          ".machine-art-container, .machine-lights-container, .boon h1, .bane h1"
        ).toggleClass("active");
      } else {
        $(".on").hide();
        $(".off").fadeIn();
        $("#powerOn")[0].play();
        $("#powerOff")[0].pause();
        $("#powerOff")[0].currentTime = 0;
        $(this).toggleClass("active");
        $(
          ".machine-art-container, .machine-lights-container, .boon h1, .bane h1"
        ).toggleClass("active");
      }
    });
    $(".menu a").mouseover(function () {
      $("#hover")[0].play();
    });
    $(".menu a").mouseout(function () {
      $("#hover")[0].pause();
      $("#hover")[0].currentTime = 0;
    });
  });
  