jQuery(document).ready(function($) {
    var originalStyles = {};

    $(".gradient-button").each(function() {
        var $button = $(this);
        var buttonId = $button.attr('id');
        originalStyles[buttonId] = $button.attr('style');
    })
    
    $(document).on("mouseenter", ".gradient-button", function() {
      var $button = $(this);
      var hoveredStyles = JSON.parse($button.attr('data-custom'));
      var hoverOptions = $button.attr('data-hoverop');
    
      $button.css(hoveredStyles);
      $button.find("i").addClass(hoverOptions);
    });
    
    $(document).on("mouseleave", ".gradient-button", function() {
      var $button = $(this);
      var buttonId = $button.attr('id');
      var hoverOptions = $button.attr('data-hoverop');
     

      $button.attr('style', originalStyles[buttonId]);
      $button.find("i").removeClass(hoverOptions);
    });
});