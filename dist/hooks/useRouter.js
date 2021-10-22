"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRouter = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.search.js");

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _queryString = _interopRequireDefault(require("query-string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Hook
const useRouter = () => {
  const params = (0, _reactRouterDom.useParams)();
  const location = (0, _reactRouterDom.useLocation)();
  const history = (0, _reactRouterDom.useHistory)();
  const match = (0, _reactRouterDom.useRouteMatch)();
  const {
    pathname
  } = location; // define urlEndpoint by substring pathname
  // case 1: pathname == ["/en/xxx", "/ja/xxx"]
  // case 2: pathname == ["/xxx"]
  // endpoint = /xxx
  // Return our custom router object
  // Memoize so that a new object is only returned if something changes

  return (0, _react.useMemo)(() => ({
    // For convenience add push(), replace(), pathname at top level
    push: history.push,
    replace: history.replace,
    pathname,
    // Merge params and parsed query string into single "query" object
    // so that they can be used interchangeably.
    // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
    query: _objectSpread(_objectSpread({}, _queryString.default.parse(location.search)), params),
    // Include match, location, history objects so we have
    // access to extra React Router functionality if needed.
    match,
    location,
    history
  }), [params, match, location, history, pathname]);
};

exports.useRouter = useRouter;