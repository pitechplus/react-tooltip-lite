"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollTop = getScrollTop;
exports.getScrollLeft = getScrollLeft;
exports.getTipMaxWidth = getTipMaxWidth;
exports.parseAlignMode = parseAlignMode;
exports.getArrowSpacing = getArrowSpacing;
exports.noArrowDistance = exports.minArrowPadding = void 0;
var minArrowPadding = 5;
exports.minArrowPadding = minArrowPadding;
var noArrowDistance = 3;
/**
 * cross browser scroll positions
 */

exports.noArrowDistance = noArrowDistance;

function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}
/**
 * Sets tip max width safely for mobile
 */


function getTipMaxWidth(bodyPadding) {
  return typeof document !== 'undefined' ? document.documentElement.clientWidth - bodyPadding * 2 : 1000;
}
/**
 * Parses align mode from direction if specified with hyphen, defaulting to middle if not -
 * e.g. 'left-start' is mode 'start' and 'left' would be the default of 'middle'
 */


function parseAlignMode(direction) {
  var directionArray = direction.split('-');

  if (directionArray.length > 1) {
    return directionArray[1];
  }

  return 'middle';
}

function getArrowSpacing(props) {
  var defaultArrowSpacing = props.arrow ? props.arrowSize : noArrowDistance;
  return typeof props.distance === 'number' ? props.distance : defaultArrowSpacing;
}