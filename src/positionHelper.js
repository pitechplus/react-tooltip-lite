export const minArrowPadding = 5;
export const noArrowDistance = 3;
/**
 * cross browser scroll positions
 */
export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
}

/**
 * Sets tip max width safely for mobile
 */
export function getTipMaxWidth(bodyPadding) {
  return (typeof document !== 'undefined') ? document.documentElement.clientWidth - (bodyPadding * 2) : 1000;
}

/**
 * Parses align mode from direction if specified with hyphen, defaulting to middle if not -
 * e.g. 'left-start' is mode 'start' and 'left' would be the default of 'middle'
 */
export function parseAlignMode(direction) {
  const directionArray = direction.split('-');
  if (directionArray.length > 1) {
    return directionArray[1];
  }
  return 'middle';
}

export function getArrowSpacing(props) {
  const defaultArrowSpacing = props.arrow ? props.arrowSize : noArrowDistance;
  return typeof props.distance === 'number' ? props.distance : defaultArrowSpacing;
}
