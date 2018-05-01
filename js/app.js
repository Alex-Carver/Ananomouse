

//Sticky Back to Top button
$(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 800) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
});



$('#gotonew').click(function(){
  $('a[href="#whatsNew"]').click();
   $("html, body").animate({ scrollTop: 0 }, 600); 
    return false; 
  console.log($('a[href="#whatsNew"]').text() + ' click triggered');
});


$('.nav-tabs1 a').click(function(){
    $(this).tab('show');
      $("html, body").animate({ scrollTop: 0 }, 600); 
    return false; 
})





$('#video').click(function(){
   document.getElementById('video').play();
});

wow = new WOW({
    boxClass: 'wow', // default
    animateClass: 'animated', // default
    offset: 0, // default
    mobile: true, // default
    live: true // default
})
wow.init();
        
