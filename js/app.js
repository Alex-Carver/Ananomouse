

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
  console.log($('a[href="#whatsNew"]').text() + ' click triggered');
});


$('#video').click(function(){
   document.getElementById('video').play();
});
