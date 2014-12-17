angular.module('ionic.ion.headerShrink', [])

.directive('headerShrink', function($document) {
  function shrink(header, amt, max) {
    ionic.requestAnimationFrame(function() {
      var amt = Math.min(max, amt);
      var fadeAmt = 1 - amt / max;
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var y = 0;
      var scrollDelay = 0.4;
      var header = $document[0].body.querySelector('.bar-header');
      var headerHeight = header.offsetHeight;
      
      function onScroll(e) {
        var scrollTop = e.detail.scrollTop;

        if (scrollTop >= 0) {
          y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
        } else {
          y = 0;
        }
        console.log(scrollTop);

        shrink(header, y, headerHeight);
      }
      $element.bind('scroll', onScroll);
    }
  }
})
