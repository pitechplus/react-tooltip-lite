"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = positions;

var _positionHelper = require("./positionHelper");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bodyPadding = 5;
var windowWidth = window.innerWidth || document.documentElement.clientWidth;
var windowHeight = window.innerHeight || document.documentElement.clientHeight;
/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */

function getUpDownPosition(tip, target, state, direction, alignMode, props) {
  var left = -10000000;
  var top;
  var transform = state.showTip ? undefined : 'translateX(-10000000px)';
  var arrowSpacing = (0, _positionHelper.getArrowSpacing)(props);

  if (tip) {
    // get wrapper left position
    var targetLeft = 0;
    var targetHeight = target.offsetHeight;
    var targetWidth = target.offsetWidth;
    var targetRect = target.getBoundingClientRect();
    var targetLeftInPage = targetRect.left;
    var halfTargetWidth = Math.round(targetWidth / 2);
    var tipWidth = tip.offsetWidth;
    var tipHeight = tip.offsetHeight;
    var halfTipWidth = Math.round(tipWidth / 2);
    var arrowCenter = targetLeft + halfTargetWidth;
    var arrowLeft = arrowCenter - props.arrowSize;
    var rightOfTip;
    var leftOfTip;

    if (alignMode === 'start') {
      left = props.arrow ? Math.min(arrowLeft, targetLeft) : targetLeft;
      rightOfTip = targetLeftInPage + tipWidth;
      leftOfTip = targetLeftInPage;
    } else if (alignMode === 'end') {
      left = targetWidth - tipWidth;
      rightOfTip = targetLeftInPage + targetWidth;
      leftOfTip = 0;
    } else {
      rightOfTip = targetLeftInPage + halfTargetWidth + halfTipWidth;
      leftOfTip = targetLeftInPage + halfTargetWidth - halfTipWidth;
      left = halfTipWidth * -1 + halfTargetWidth;
    } // check for right overhang


    var rightOverhang = rightOfTip - windowWidth;

    if (rightOverhang > 0) {
      left -= rightOverhang;
    }

    if (leftOfTip < 0) {
      left += 0 - leftOfTip;
    }

    if (direction === 'up') {
      top = tipHeight * -1 - arrowSpacing;
    } else {
      top = targetHeight + arrowSpacing;
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
  var arrowSpacing = (0, _positionHelper.getArrowSpacing)(props);

  if (tip) {
    var targetHeight = target.offsetHeight;
    var targetWidth = target.offsetWidth;
    var halfTargetHeight = Math.round(targetHeight / 2);
    var tipHeight = tip.offsetHeight;
    var tipWidth = tip.offsetWidth;
    var halfTipHeight = Math.round(tipHeight / 2);
    var targetRect = target.getBoundingClientRect();
    var targetTopInPage = targetRect.top;
    var bottomOfTip; // TODO: handle close to edges better

    if (alignMode === 'start') {
      top = 0;
      bottomOfTip = tipHeight + targetTopInPage;
    } else if (alignMode === 'end') {
      top = targetHeight - tipHeight;
    } else {
      top = halfTargetHeight - halfTipHeight;
    } // check for bottom overhang


    var bottomOverhang = bottomOfTip - windowHeight;

    if (bottomOverhang > 0) {
      top -= bottomOverhang;
    }

    if (direction === 'right') {
      left = targetWidth + arrowSpacing;
    } else {
      left = -1 * arrowSpacing - tipWidth;
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

  var halfTargetHeight = Math.round(target.offsetHeight / 2);
  var halfTargetWidth = Math.round(target.offsetWidth / 2);
  var arrowSpacing = (0, _positionHelper.getArrowSpacing)(props);
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
        top: state.showTip && tip ? halfTargetHeight - props.arrowSize : '-10000000px',
        left: target.offsetWidth + arrowSpacing - props.arrowSize
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
        top: state.showTip && tip ? halfTargetHeight - props.arrowSize : '-10000000px',
        left: 0 - arrowSpacing - 1
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
        left: state.showTip && tip ? halfTargetWidth - props.arrowSize : '-10000000px',
        top: 0 - arrowSpacing
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
        left: state.showTip && tip ? halfTargetWidth - props.arrowSize : '-10000000px',
        top: target.offsetHeight
      });
  }
}
/**
 * Returns the positions style rules
 */


function positions(direction, forceDirection, tip, target, state, props) {
  var alignMode = (0, _positionHelper.parseAlignMode)(direction);
  var realDirection = direction.split('-')[0];
  var maxWidth = (0, _positionHelper.getTipMaxWidth)(bodyPadding); // force the tip to display the width we measured everything at when visible

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