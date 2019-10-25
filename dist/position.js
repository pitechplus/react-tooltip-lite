"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollLeft = getScrollLeft;
exports.getArrowSpacing = getArrowSpacing;
exports["default"] = positions;
exports.minArrowPadding = void 0;

var _getDirection = _interopRequireDefault(require("./getDirection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var minArrowPadding = 5;
exports.minArrowPadding = minArrowPadding;
var bodyPadding = 10;
var noArrowDistance = 3;
/**
 * cross browser scroll positions
 */

function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}
/**
 * Sets tip max width safely for mobile
 */


function getTipMaxWidth() {
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
/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */


function getUpDownPosition(tip, target, state, direction, alignMode, props) {
  var left = -10000000;
  var top;
  var transform = state.showTip ? undefined : 'translateX(-10000000px)';
  var arrowSpacing = getArrowSpacing(props);

  if (tip) {
    // get wrapper left position
    var scrollLeft = getScrollLeft();
    var targetRect = target.getBoundingClientRect();
    var targetLeft = targetRect.left + scrollLeft;
    var halfTargetWidth = Math.round(target.offsetWidth / 2);
    var tipWidth = Math.min(getTipMaxWidth(), tip.offsetWidth);
    var arrowCenter = targetLeft + halfTargetWidth;
    var arrowLeft = arrowCenter - props.arrowSize;
    var arrowRight = arrowCenter + props.arrowSize;

    if (alignMode === 'start') {
      left = props.arrow ? Math.min(arrowLeft, targetLeft) : targetLeft;
    } else if (alignMode === 'end') {
      var rightWithArrow = Math.max(arrowRight, targetLeft + target.offsetWidth);
      var rightEdge = props.arrow ? rightWithArrow : targetLeft + target.offsetWidth;
      left = Math.max(rightEdge - tipWidth, bodyPadding + scrollLeft);
    } else {
      var centeredLeft = targetLeft + halfTargetWidth - Math.round(tipWidth / 2);
      var availableSpaceOnLeft = bodyPadding + scrollLeft;
      left = Math.max(centeredLeft, availableSpaceOnLeft);
    } // check for right overhang


    var rightOfTip = left + tipWidth;
    var rightOfScreen = scrollLeft + document.documentElement.clientWidth - bodyPadding;
    var rightOverhang = rightOfTip - rightOfScreen;

    if (rightOverhang > 0) {
      left -= rightOverhang;
    }

    if (direction === 'up') {
      top = targetRect.top + getScrollTop() - (tip.offsetHeight + arrowSpacing);
    } else {
      top = targetRect.bottom + getScrollTop() + arrowSpacing;
    }
  }

  return {
    left: left,
    top: top,
    transform: transform
  };
}
/**
 * gets top position for left/right arrows
 */


function getLeftRightPosition(tip, target, state, direction, alignMode, props) {
  var left = -10000000;
  var top = 0;
  var transform = state.showTip ? undefined : 'translateX(-10000000px)';
  var arrowSpacing = getArrowSpacing(props);
  var arrowPadding = props.arrow ? minArrowPadding : 0;

  if (tip) {
    var scrollTop = getScrollTop();
    var scrollLeft = getScrollLeft();
    var targetRect = target.getBoundingClientRect();
    var targetTop = targetRect.top + scrollTop;
    var halfTargetHeight = Math.round(target.offsetHeight / 2);
    var arrowTop = targetTop + halfTargetHeight - props.arrowSize;
    var arrowBottom = targetRect.top + scrollTop + halfTargetHeight + props.arrowSize; // TODO: handle close to edges better

    if (alignMode === 'start') {
      top = props.arrow ? Math.min(targetTop, arrowTop) : targetTop;
    } else if (alignMode === 'end') {
      var topForBottomAlign = targetRect.bottom + scrollTop - tip.offsetHeight;
      top = props.arrow ? Math.max(topForBottomAlign, arrowBottom - tip.offsetHeight) : topForBottomAlign;
    } else {
      // default to middle, but don't go below body
      var centeredTop = Math.max(targetTop + halfTargetHeight - Math.round(tip.offsetHeight / 2), bodyPadding + scrollTop); // make sure it doesn't go below the arrow

      top = Math.min(centeredTop, arrowTop - arrowPadding);
    } // check for bottom overhang


    var bottomOverhang = top - scrollTop + tip.offsetHeight + bodyPadding - window.innerHeight;

    if (bottomOverhang > 0) {
      // try to add the body padding below the tip, but don't offset too far from the arrow
      top = Math.max(top - bottomOverhang, arrowBottom + arrowPadding - tip.offsetHeight);
    }

    if (direction === 'right') {
      left = targetRect.right + arrowSpacing + scrollLeft;
    } else {
      left = targetRect.left - arrowSpacing - tip.offsetWidth + scrollLeft;
    }
  }

  return {
    left: left,
    top: top,
    transform: transform
  };
}
/**
 * sets the Arrow styles based on direction
 */


function getArrowStyles(target, tip, direction, state, props) {
  if (!target || !props.arrow) {
    return {
      top: '0',
      left: '-10000000px'
    };
  }

  var targetRect = target.getBoundingClientRect();
  var halfTargetHeight = Math.round(target.offsetHeight / 2);
  var halfTargetWidth = Math.round(target.offsetWidth / 2);
  var scrollTop = getScrollTop();
  var scrollLeft = getScrollLeft();
  var arrowSpacing = getArrowSpacing(props);
  var borderStyles = {};

  switch (direction) {
    case 'right':
      borderStyles.borderTop = "".concat(props.arrowSize, "px solid transparent");
      borderStyles.borderBottom = "".concat(props.arrowSize, "px solid transparent");

      if (props.background) {
        borderStyles.borderRight = "".concat(props.arrowSize, "px solid ").concat(props.background);
      } else {
        borderStyles.borderRightWidth = "".concat(props.arrowSize, "px");
        borderStyles.borderRightStyle = 'solid';
      }

      return _objectSpread({}, borderStyles, {
        top: state.showTip && tip ? targetRect.top + scrollTop + halfTargetHeight - props.arrowSize : '-10000000px',
        left: targetRect.right + scrollLeft + arrowSpacing - props.arrowSize
      });

    case 'left':
      borderStyles.borderTop = "".concat(props.arrowSize, "px solid transparent");
      borderStyles.borderBottom = "".concat(props.arrowSize, "px solid transparent");

      if (props.background) {
        borderStyles.borderLeft = "".concat(props.arrowSize, "px solid ").concat(props.background);
      } else {
        borderStyles.borderLeftWidth = "".concat(props.arrowSize, "px");
        borderStyles.borderLeftStyle = 'solid';
      }

      return _objectSpread({}, borderStyles, {
        top: state.showTip && tip ? targetRect.top + scrollTop + halfTargetHeight - props.arrowSize : '-10000000px',
        left: targetRect.left + scrollLeft - arrowSpacing - 1
      });

    case 'up':
      borderStyles.borderLeft = "".concat(props.arrowSize, "px solid transparent");
      borderStyles.borderRight = "".concat(props.arrowSize, "px solid transparent"); // if color is styled with css, we need everything except border-color, if styled with props, we add entire border rule

      if (props.background) {
        borderStyles.borderTop = "".concat(props.arrowSize, "px solid ").concat(props.background);
      } else {
        borderStyles.borderTopWidth = "".concat(props.arrowSize, "px");
        borderStyles.borderTopStyle = 'solid';
      }

      return _objectSpread({}, borderStyles, {
        left: state.showTip && tip ? targetRect.left + scrollLeft + halfTargetWidth - props.arrowSize : '-10000000px',
        top: targetRect.top + scrollTop - arrowSpacing
      });

    case 'down':
    default:
      borderStyles.borderLeft = "".concat(props.arrowSize, "px solid transparent");
      borderStyles.borderRight = "".concat(props.arrowSize, "px solid transparent");

      if (props.background) {
        borderStyles.borderBottom = "10px solid ".concat(props.background);
      } else {
        borderStyles.borderBottomWidth = "".concat(props.arrowSize, "px");
        borderStyles.borderBottomStyle = 'solid';
      }

      return _objectSpread({}, borderStyles, {
        left: state.showTip && tip ? targetRect.left + scrollLeft + halfTargetWidth - props.arrowSize : '-10000000px',
        top: targetRect.bottom + scrollTop + arrowSpacing - props.arrowSize
      });
  }
}
/**
 * Returns the positions style rules
 */


function positions(direction, forceDirection, tip, target, state, props) {
  var alignMode = parseAlignMode(direction);
  var trimmedDirection = direction.split('-')[0];
  var realDirection = trimmedDirection;

  if (!forceDirection && tip) {
    var testArrowStyles = props.arrow && getArrowStyles(target, tip, trimmedDirection, state, props);
    realDirection = (0, _getDirection["default"])(trimmedDirection, tip, target, props, bodyPadding, testArrowStyles);
  }

  var maxWidth = getTipMaxWidth(); // force the tip to display the width we measured everything at when visible

  var width;

  if (tip) {
    // adding the exact width on the first render forces a bogus line break, so add 1px the first time
    var spacer = tip.style.width ? 0 : 1;
    width = Math.min(tip.offsetWidth, maxWidth) + spacer;
  }

  var tipPosition = realDirection === 'up' || realDirection === 'down' ? getUpDownPosition(tip, target, state, realDirection, alignMode, props) : getLeftRightPosition(tip, target, state, realDirection, alignMode, props);
  return {
    tip: _objectSpread({}, tipPosition, {
      maxWidth: maxWidth,
      width: width
    }),
    arrow: getArrowStyles(target, tip, realDirection, state, props),
    realDirection: realDirection
  };
}