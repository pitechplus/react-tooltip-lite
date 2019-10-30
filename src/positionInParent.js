/**
 * @file positions.js
 * @description some functions for position calculation
 */

import { getArrowSpacing, getTipMaxWidth, parseAlignMode } from './positionHelper';

const bodyPadding = 10;

/**
 * Gets wrapper's left position for top/bottom tooltips as well as needed width restriction
 */
function getUpDownPosition(tip, target, state, direction, alignMode, props) {
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  let left = -10000000;
  let top;

  const transform = state.showTip ? undefined : 'translateX(-10000000px)';

  const arrowSpacing = getArrowSpacing(props);

  if (tip) {

    // get wrapper left position
    const targetLeft = 0;
    const targetHeight = target.offsetHeight;
    const targetWidth = target.offsetWidth;
    const targetRect = target.getBoundingClientRect();
    const targetLeftInPage = targetRect.left;
    const halfTargetWidth = Math.round(targetWidth / 2);
    const tipWidth = tip.offsetWidth;
    const tipHeight = tip.offsetHeight;
    const halfTipWidth = Math.round(tipWidth / 2);
    const arrowCenter = targetLeft + halfTargetWidth;
    const arrowLeft = arrowCenter - props.arrowSize;
    let rightOfTip;
    let leftOfTip;

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
    }

    // check for right overhang
    const rightOverhang = rightOfTip - windowWidth;
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
    left,
    top,
    transform,
  };
}


/**
 * gets top position for left/right arrows
 */
function getLeftRightPosition(tip, target, state, direction, alignMode, props) {
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  let left = -10000000;
  let top = 0;

  const transform = state.showTip ? undefined : 'translateX(-10000000px)';

  const arrowSpacing = getArrowSpacing(props);

  if (tip) {
    const targetHeight = target.offsetHeight;
    const targetWidth = target.offsetWidth;
    const halfTargetHeight = Math.round(targetHeight / 2);
    const tipHeight = tip.offsetHeight;
    const tipWidth = tip.offsetWidth;
    const halfTipHeight = Math.round(tipHeight / 2);
    const targetRect = target.getBoundingClientRect();
    const targetTopInPage = targetRect.top;
    let bottomOfTip;

    // TODO: handle close to edges better
    if (alignMode === 'start') {
      top = 0;
      bottomOfTip = tipHeight + targetTopInPage;
    } else if (alignMode === 'end') {
      top = targetHeight - tipHeight;
    } else {
      top = halfTargetHeight - halfTipHeight;
    }

    // check for bottom overhang
    const bottomOverhang = bottomOfTip - windowHeight;
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
    left,
    top,
    transform,
  };
}

/**
 * sets the Arrow styles based on direction
 */
function getArrowStyles(target, tip, direction, state, props) {
  if (!target || !props.arrow) {
    return {
      top: '0',
      left: '-10000000px',
    };
  }

  const halfTargetHeight = Math.round(target.offsetHeight / 2);
  const halfTargetWidth = Math.round(target.offsetWidth / 2);
  const arrowSpacing = getArrowSpacing(props);
  const borderStyles = {};

  switch (direction) {
    case 'right':
      borderStyles.borderTop = `${props.arrowSize}px solid transparent`;
      borderStyles.borderBottom = `${props.arrowSize}px solid transparent`;

      if (props.background) {
        borderStyles.borderRight = `${props.arrowSize}px solid ${props.background}`;
      } else {
        borderStyles.borderRightWidth = `${props.arrowSize}px`;
        borderStyles.borderRightStyle = 'solid';
      }

      return {
        ...borderStyles,
        top: (state.showTip && tip) ? halfTargetHeight - props.arrowSize : '-10000000px',
        left: (target.offsetWidth + arrowSpacing) - props.arrowSize,
      };

    case 'left':
      borderStyles.borderTop = `${props.arrowSize}px solid transparent`;
      borderStyles.borderBottom = `${props.arrowSize}px solid transparent`;

      if (props.background) {
        borderStyles.borderLeft = `${props.arrowSize}px solid ${props.background}`;
      } else {
        borderStyles.borderLeftWidth = `${props.arrowSize}px`;
        borderStyles.borderLeftStyle = 'solid';
      }

      return {
        ...borderStyles,
        top: (state.showTip && tip) ? halfTargetHeight - props.arrowSize : '-10000000px',
        left: 0 - arrowSpacing - 1,
      };

    case 'up':
      borderStyles.borderLeft = `${props.arrowSize}px solid transparent`;
      borderStyles.borderRight = `${props.arrowSize}px solid transparent`;

      // if color is styled with css, we need everything except border-color, if styled with props, we add entire border rule
      if (props.background) {
        borderStyles.borderTop = `${props.arrowSize}px solid ${props.background}`;
      } else {
        borderStyles.borderTopWidth = `${props.arrowSize}px`;
        borderStyles.borderTopStyle = 'solid';
      }

      return {
        ...borderStyles,
        left: (state.showTip && tip) ? halfTargetWidth - props.arrowSize : '-10000000px',
        top: 0 - arrowSpacing,
      };

    case 'down':
    default:
      borderStyles.borderLeft = `${props.arrowSize}px solid transparent`;
      borderStyles.borderRight = `${props.arrowSize}px solid transparent`;

      if (props.background) {
        borderStyles.borderBottom = `10px solid ${props.background}`;
      } else {
        borderStyles.borderBottomWidth = `${props.arrowSize}px`;
        borderStyles.borderBottomStyle = 'solid';
      }

      return {
        ...borderStyles,
        left: (state.showTip && tip) ? halfTargetWidth - props.arrowSize : '-10000000px',
        top: target.offsetHeight,
      };
  }
}

/**
 * Returns the positions style rules
 */
export default function positions(direction, forceDirection, tip, target, state, props) {
  const alignMode = parseAlignMode(direction);
  const realDirection = direction.split('-')[0];

  const maxWidth = getTipMaxWidth(bodyPadding);

  // force the tip to display the width we measured everything at when visible
  let width;
  if (tip) {
    // adding the exact width on the first render forces a bogus line break, so add 1px the first time
    const spacer = tip.style.width ? 0 : 1;
    width = Math.min(tip.offsetWidth, maxWidth) + spacer;
  }

  const tipPosition = (realDirection === 'up' || realDirection === 'down')
    ? getUpDownPosition(tip, target, state, realDirection, alignMode, props)
    : getLeftRightPosition(tip, target, state, realDirection, alignMode, props);

  return {
    tip: {
      ...tipPosition,
      maxWidth,
      width,
    },
    arrow: getArrowStyles(target, tip, realDirection, state, props),
    realDirection,
  };
}
