function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { compose } from 'recompose';
import { getNewContainer } from '../../utils';
import { withTheme } from '../hocs';
import { LayerContainer } from './LayerContainer';

var Layer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Layer, _Component);

  function Layer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "originalFocusedElement", document.activeElement);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "layerContainer", getNewContainer());

    return _this;
  }

  var _proto = Layer.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this2 = this;

    if (this.originalFocusedElement) {
      if (this.originalFocusedElement.focus) {
        // wait for the fixed positioning to come back to normal
        // see layer styling for reference
        setTimeout(function () {
          _this2.originalFocusedElement.focus();
        }, 0);
      } else if (this.originalFocusedElement.parentNode && this.originalFocusedElement.parentNode.focus) {
        // required for IE11 and Edge
        this.originalFocusedElement.parentNode.focus();
      }
    }

    document.body.removeChild(this.layerContainer);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["theme"]);

    return createPortal(React.createElement(LayerContainer, rest), this.layerContainer);
  };

  return Layer;
}(Component);

_defineProperty(Layer, "defaultProps", {
  full: false,
  margin: 'none',
  modal: true,
  position: 'center',
  responsive: true
});

var LayerDoc;

if (process.env.NODE_ENV !== 'production') {
  LayerDoc = require('./doc').doc(Layer); // eslint-disable-line global-require
}

var LayerWrapper = compose(withTheme)(LayerDoc || Layer);
export { LayerWrapper as Layer };