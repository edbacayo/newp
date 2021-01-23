$( ".card" ).hover(
    function() {
      $(this).removeClass("shadow").css("cursor", "pointer"); 
    }, function() {
      $(this).addClass("shadow");
    }
  );