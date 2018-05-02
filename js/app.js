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

var selectBody = $('body');
var selectNavbarCollapse = $('.navbar-collapse');

var heightNavbarCollapsed = $('.navbar').outerHeight(true);
var heightNavbarExpanded = 0;

paddingSmall();

selectNavbarCollapse.on('show.bs.collapse', function () {
  if (heightNavbarExpanded == 0 ) heightNavbarExpanded = heightNavbarCollapsed + $(this).outerHeight(true);
  paddingGreat();
})
selectNavbarCollapse.on('hide.bs.collapse', function () {
  paddingSmall();
})

$(window).resize( function () {
  if (( document.documentElement.clientWidth > 767 ) && selectNavbarCollapse.hasClass('in') ) {
    selectNavbarCollapse.removeClass('in').attr('aria-expanded','false');
    paddingSmall();
  }
});

function paddingSmall() {
  selectBody.css('padding-top', heightNavbarCollapsed + 'px');
}
function paddingGreat() {
  selectBody.css('padding-top', heightNavbarExpanded + 'px');
}



        
