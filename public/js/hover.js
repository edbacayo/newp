$( ".card" ).hover(
    function() {
      $(this).removeClass("shadow").addClass("m-1"); 
    }, function() {
      $(this).addClass("shadow").removeClass("m-1");
    }
  );