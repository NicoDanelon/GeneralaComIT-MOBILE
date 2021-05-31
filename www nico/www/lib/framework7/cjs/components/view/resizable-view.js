"use strict";

exports.__esModule = true;
exports.default = void 0;

var _dom = _interopRequireDefault(require("../../shared/dom7"));

var _utils = require("../../shared/utils");

var _getSupport = require("../../shared/get-support");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resizableView(view) {
  var app = view.app;
  var support = (0, _getSupport.getSupport)();
  if (view.resizableInitialized) return;
  (0, _utils.extend)(view, {
    resizable: true,
    resizableWidth: null,
    resizableInitialized: true
  });
  var $htmlEl = (0, _dom.default)('html');
  var $el = view.$el;
  if (!$el) return;
  var $resizeHandlerEl;
  var isTouched;
  var isMoved;
  var touchesStart = {};
  var touchesDiff;
  var width;
  var minWidth;
  var maxWidth;

  function transformCSSWidth(v) {
    if (!v) return null;

    if (v.indexOf('%') >= 0 || v.indexOf('vw') >= 0) {
      return parseInt(v, 10) / 100 * app.width;
    }

    var newV = parseInt(v, 10);
    if (Number.isNaN(newV)) return null;
    return newV;
  }

  function isResizable() {
    return view.resizable && $el.hasClass('view-resizable') && $el.hasClass('view-master-detail');
  }

  function handleTouchStart(e) {
    if (!isResizable()) return;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    isMoved = false;
    isTouched = true;
    var $pageMasterEl = $el.children('.page-master');
    minWidth = transformCSSWidth($pageMasterEl.css('min-width'));
    maxWidth = transformCSSWidth($pageMasterEl.css('max-width'));
  }

  function handleTouchMove(e) {
    if (!isTouched) return;
    e.f7PreventSwipePanel = true;
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;

    if (!isMoved) {
      width = $resizeHandlerEl[0].offsetLeft + $resizeHandlerEl[0].offsetWidth;
      $el.addClass('view-resizing');
      $htmlEl.css('cursor', 'col-resize');
    }

    isMoved = true;
    e.preventDefault();
    touchesDiff = pageX - touchesStart.x;
    var newWidth = width + touchesDiff;

    if (minWidth && !Number.isNaN(minWidth)) {
      newWidth = Math.max(newWidth, minWidth);
    }

    if (maxWidth && !Number.isNaN(maxWidth)) {
      newWidth = Math.min(newWidth, maxWidth);
    }

    newWidth = Math.min(Math.max(newWidth, 0), app.width);
    view.resizableWidth = newWidth;
    $htmlEl[0].style.setProperty('--f7-page-master-width', newWidth + "px");
    $el.trigger('view:resize', newWidth);
    view.emit('local::resize viewResize', view, newWidth);
  }

  function handleTouchEnd() {
    (0, _dom.default)('html').css('cursor', '');

    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }

    isTouched = false;
    isMoved = false;
    $htmlEl[0].style.setProperty('--f7-page-master-width', view.resizableWidth + "px");
    $el.removeClass('view-resizing');
  }

  function handleResize() {
    if (!view.resizableWidth) return;
    minWidth = transformCSSWidth($resizeHandlerEl.css('min-width'));
    maxWidth = transformCSSWidth($resizeHandlerEl.css('max-width'));

    if (minWidth && !Number.isNaN(minWidth) && view.resizableWidth < minWidth) {
      view.resizableWidth = Math.max(view.resizableWidth, minWidth);
    }

    if (maxWidth && !Number.isNaN(maxWidth) && view.resizableWidth > maxWidth) {
      view.resizableWidth = Math.min(view.resizableWidth, maxWidth);
    }

    view.resizableWidth = Math.min(Math.max(view.resizableWidth, 0), app.width);
    $htmlEl[0].style.setProperty('--f7-page-master-width', view.resizableWidth + "px");
  }

  $resizeHandlerEl = view.$el.children('.view-resize-handler');

  if (!$resizeHandlerEl.length) {
    view.$el.append('<div class="view-resize-handler"></div>');
    $resizeHandlerEl = view.$el.children('.view-resize-handler');
  }

  view.$resizeHandlerEl = $resizeHandlerEl;
  $el.addClass('view-resizable'); // Add Events

  var passive = support.passiveListener ? {
    passive: true
  } : false;
  view.$el.on(app.touchEvents.start, '.view-resize-handler', handleTouchStart, passive);
  app.on('touchmove:active', handleTouchMove);
  app.on('touchend:passive', handleTouchEnd);
  app.on('resize', handleResize);
  view.on('beforeOpen', handleResize);
  view.once('viewDestroy', function () {
    $el.removeClass('view-resizable');
    view.$resizeHandlerEl.remove();
    view.$el.off(app.touchEvents.start, '.view-resize-handler', handleTouchStart, passive);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
    app.off('resize', handleResize);
    view.off('beforeOpen', handleResize);
  });
}

var _default = resizableView;
exports.default = _default;