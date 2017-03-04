/* eslint-disable */
export default function () {
  if (typeof window !== 'undefined') {

    (function (win, doc) {
      var getById = function (el) {
        return document.getElementById(el);
      };

      //from qwrap
      var getDocRect = function (doc) {
        doc = doc || document;
        var win = doc.defaultView || doc.parentWindow,
          mode = doc.compatMode,
          root = doc.documentElement,
          h = win.innerHeight || 0,
          w = win.innerWidth || 0,
          scrollX = win.pageXOffset || 0,
          scrollY = win.pageYOffset || 0,
          scrollW = root.scrollWidth,
          scrollH = root.scrollHeight;
        if (mode != 'CSS1Compat') { // Quirks
          root = doc.body;
          scrollW = root.scrollWidth;
          scrollH = root.scrollHeight;
        }
        if (mode) { // IE, Gecko
          w = root.clientWidth;
          h = root.clientHeight;
        }
        scrollW = Math.max(scrollW, w);
        scrollH = Math.max(scrollH, h);
        scrollX = Math.max(scrollX, doc.documentElement.scrollLeft, doc.body.scrollLeft);
        scrollY = Math.max(scrollY, doc.documentElement.scrollTop, doc.body.scrollTop);
        return {
          width: w,
          height: h,
          scrollWidth: scrollW,
          scrollHeight: scrollH,
          scrollX: scrollX,
          scrollY: scrollY
        };
      };

      var getXY = function (node) {
        var doc = node.ownerDocument,
          docRect = getDocRect(doc),
          scrollLeft = docRect.scrollX,
          scrollTop = docRect.scrollY,
          box = node.getBoundingClientRect(),
          xy = [box.left, box.top],
          mode,
          off1,
          off2;
        if (scrollTop || scrollLeft) {
          xy[0] += scrollLeft;
          xy[1] += scrollTop;
        }
        return xy;
      };

      var getRect = function (el) {
        var p = getXY(el);
        var x = p[0];
        var y = p[1];
        var w = el.offsetWidth;
        var h = el.offsetHeight;
        return {
          'width': w,
          'height': h,
          'left': x,
          'top': y,
          'bottom': y + h,
          'right': x + w
        };
      };

      var utils = {
        isMob: (function () {
          var ua = navigator.userAgent.toLowerCase();
          var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
          var result = false;
          for (var i = 0; i < agents.length; i++) {
            if (ua.indexOf(agents[i].toLowerCase()) > -1) {
              result = true;
            }
          }
          return result;
        })()
      }


      if (utils.isMob) {
        document.documentElement.className += ' mob';
      } else {
        document.documentElement.className += ' pc';
      }


      var Dom = {
        $sidebar: document.querySelector('#sidebar'),
        $main: document.querySelector('#main'),
        $sidebar_mask: document.querySelector('#sidebar-mask'),
        $body: document.body,
        $btn_side: document.querySelector('#header .btn-bar'),
        $article: document.querySelectorAll('.mob #page-index article')
      };

      Dom.bindEvent = function () {

        var _this = this,
          body_class_name = 'side',
          eventFirst = 'click',
          eventSecond = 'click';

        if (utils.isMob) {
          eventFirst = 'touchstart';
          eventSecond = 'touchend';
        }

        try {

          this.$btn_side.addEventListener(eventSecond, function () {

            if (_this.$body.className.indexOf(body_class_name) > -1) {
              _this.$body.className = _this.$body.className.replace(body_class_name, '');
              _this.$sidebar_mask.style.display = 'none';
            } else {
              _this.$body.className += (' ' + body_class_name);
              _this.$sidebar_mask.style.display = 'block';
            }

          }, false);

        } catch (err) {}

        try {

          this.$sidebar_mask.addEventListener(eventFirst, function (e) {
            _this.$body.className = _this.$body.className.replace(body_class_name, '');
            _this.$sidebar_mask.style.display = 'none';
            e.preventDefault();
          }, false);

        } catch (err) {}


        window.addEventListener('resize', function () {
          try {
            _this.$body.className = _this.$body.className.replace(body_class_name, '');
            _this.$sidebar_mask.style.display = 'none';
          } catch (err) {}
        }, false);
      }

      Dom.bindEvent();

    })(window, document);
  }
}