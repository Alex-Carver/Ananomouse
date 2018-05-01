//Sticky Back to Top button
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 800) {
      $("#scroll").fadeIn();
    } else {
      $("#scroll").fadeOut();
    }
  });
  $("#scroll").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});


//Features btn click function to What's New page
$("#gotonew").click(function() {
  $('a[href="#whatsNew"]').click();
  $("html, body").animate({ scrollTop: 0 }, 600);
  return false;
  console.log($('a[href="#whatsNew"]').text() + " click triggered");
});

//Nav tabs return to top on click function
$(".nav-tabs1 a").click(function() {
  $(this).tab("show");
  $("html, body").animate({ scrollTop: 0 }, 600);
  return false;
});

//Video play function
$("#video").click(function() {
  document.getElementById("video").play();
});



        
