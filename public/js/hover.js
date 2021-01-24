$( ".card" ).hover(
    function() {
      $(this).removeClass("shadow").addClass("mt-n1"); 
    }, function() {
      $(this).addClass("shadow").removeClass("mt-n1");
    }
  );