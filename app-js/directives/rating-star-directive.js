angular.module('ui.component', [])
  .directive("starRating", function ($compile) {
      function createStarList(title, rateMessage, value, max) {
        templ = "<div>" + title + "<b></b></div>\n" +
                "<ul>\n";
        
        for (var i = parseInt(max); i > 0; i--) {
            msg = formatMessage(rateMessage, i);
            templ += "<li><a href=\"#\" ng-click=\"value=" +i+ "\"><span>" + msg + "</span>" + ((i == value) ? "<b></b>" : '')+ "</a></li>"
        }
        templ += "</ul>\n";
        return templ;
      }

      function formatMessage(msg, count) {
        return (msg !== null) ? msg.replace("\$\$", count) : '';
      }

      return {
          restrict: "A",
          replace: true,
          scope: {
              value: "=",
              max: "="
          },

          link: function (scope, element, attrs) {
              var uuid = (Math.random() * 0x10000).toString(16)
              
              element.append(createStarList(attrs.title, attrs.rateMessage, scope.value, scope.max));
              $compile(element.contents())(scope);
          }
      }
  });