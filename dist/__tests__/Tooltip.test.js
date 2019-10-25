"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable comma-dangle */
jest.useFakeTimers();
describe('Tooltip', function () {
  afterEach(function () {
    (0, _reactTestingLibrary.cleanup)();
  });
  var targetContent = 'Hello world';
  var tipContent = 'Tip content';

  function assertTipHidden(getByText) {
    expect(getByText(tipContent).style.transform).toEqual('translateX(-10000000px)');
  }

  function assertTipVisible(getByText) {
    expect(getByText(tipContent).style.transform).toBeFalsy();
  }

  it('should render and open with hover', function () {
    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent
    }, targetContent)),
        getByText = _render.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    assertTipVisible(getByText);
  });
  it('should handle controlled state', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: false
    }, targetContent)),
        getByText = _render2.getByText,
        rerender = _render2.rerender,
        queryByText = _render2.queryByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    expect(queryByText(tipContent)).toBeNull();
    rerender(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: true
    }, targetContent));
    assertTipVisible(getByText);
  });
  it('should handle null as undefined for isOpen prop', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      isOpen: null
    }, targetContent)),
        getByText = _render3.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    assertTipVisible(getByText);
  });
  it('should handle eventOn prop and use mouseout', function () {
    var _render4 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      eventOn: "onClick"
    }, targetContent)),
        getByText = _render4.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.click(target);

    jest.runAllTimers();
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.mouseOut(target);

    jest.runAllTimers();
    assertTipHidden(getByText);
  });
  it('should handle eventOff prop and use mouseover', function () {
    var _render5 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      eventOff: "onClick"
    }, targetContent)),
        getByText = _render5.getByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.click(target);

    jest.runAllTimers();
    assertTipHidden(getByText);
  });
  it('should handle eventToggle prop', function () {
    var _render6 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      eventToggle: "onClick"
    }, targetContent)),
        getByText = _render6.getByText,
        queryByText = _render6.queryByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    jest.runAllTimers();
    expect(queryByText(tipContent)).toBeNull();

    _reactTestingLibrary.fireEvent.click(target);

    jest.runAllTimers();
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.click(target);

    jest.runAllTimers();
    assertTipHidden(getByText);
  });
  it('should use hoverDelay prop', function () {
    var hoverDelay = 1000;

    var _render7 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      hoverDelay: hoverDelay
    }, targetContent)),
        getByText = _render7.getByText,
        queryByText = _render7.queryByText,
        rerender = _render7.rerender;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    expect(queryByText(tipContent)).toBeNull();
    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText); // hoverDelay is not used on mouseout for tips without the tipContentHoverProp prop

    _reactTestingLibrary.fireEvent.mouseOut(target);

    assertTipHidden(getByText); // with the tipContentHoverProp hoverDelay should be used with mouseOut

    rerender(_react["default"].createElement(_index["default"], {
      content: tipContent,
      hoverDelay: hoverDelay,
      tipContentHover: true
    }, targetContent));

    _reactTestingLibrary.fireEvent.mouseOver(target);

    assertTipHidden(getByText);
    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.mouseOut(target);

    assertTipVisible(getByText);
    jest.advanceTimersByTime(hoverDelay);
    assertTipHidden(getByText);
  });
  it('should use mouseOutDelay prop', function () {
    var hoverDelay = 500;
    var mouseOutDelay = 1000;

    var _render8 = (0, _reactTestingLibrary.render)(_react["default"].createElement(_index["default"], {
      content: tipContent,
      hoverDelay: hoverDelay,
      mouseOutDelay: mouseOutDelay
    }, targetContent)),
        getByText = _render8.getByText,
        queryByText = _render8.queryByText;

    var target = getByText(targetContent);

    _reactTestingLibrary.fireEvent.mouseOver(target);

    expect(queryByText(tipContent)).toBeNull();
    jest.advanceTimersByTime(hoverDelay);
    assertTipVisible(getByText);

    _reactTestingLibrary.fireEvent.mouseOut(target);

    assertTipVisible(getByText);
    jest.advanceTimersByTime(mouseOutDelay);
    assertTipHidden(getByText);
  });
});