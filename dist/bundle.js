/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/Components/Component.js":
/*!*********************************************!*\
  !*** ./src/scripts/Components/Component.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Component)\n/* harmony export */ });\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ \"./src/scripts/render.js\");\n\n// function createComponent(tag, [props], [...children]) {\n//   const element = document.createElement(`\"${tag}\"`)\n//   element.classList.add(props)\n// }\nclass Component {\n  constructor(tag) {\n    this.tag = tag\n    this.render = _render__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n    ;(0,_render__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(tag)\n  }\n}\n\n\n//# sourceURL=webpack://subway_shop/./src/scripts/Components/Component.js?");

/***/ }),

/***/ "./src/scripts/Components/Header.js":
/*!******************************************!*\
  !*** ./src/scripts/Components/Header.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Header)\n/* harmony export */ });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/scripts/Components/Component.js\");\n\n\nclass Header extends _Component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(tag, content) {\n    super(tag)\n    this.tag = '<header></header>'\n    this.content = content\n  }\n}\nconsole.log(Header)\n\n\n//# sourceURL=webpack://subway_shop/./src/scripts/Components/Header.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ \"./src/scripts/render.js\");\n/* harmony import */ var _Components_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/Component */ \"./src/scripts/Components/Component.js\");\n/* harmony import */ var _Components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/Header */ \"./src/scripts/Components/Header.js\");\n\n\n\nconst root = document.getElementById('root')\nconst template = `<div>Hellow world</div>`\nconst tags = {\n  div: '<div></div>',\n  header: '<header></header>',\n}\nroot.insertAdjacentHTML('beforeend', template)\nroot.insertAdjacentHTML('beforeend', template)\nroot.insertAdjacentHTML('beforeend', template)\n;(0,_render__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(template, root)\n;(0,_render__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(template, root)\n;(0,_render__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(template, root)\n\nconst App = new _Components_Component__WEBPACK_IMPORTED_MODULE_1__[\"default\"](tags.div)\nconsole.log(App)\nconst header = new _Components_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('<h1>Hello world from header</h1>')\nconsole.log(header)\n\n\n//# sourceURL=webpack://subway_shop/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/render.js":
/*!*******************************!*\
  !*** ./src/scripts/render.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ render)\n/* harmony export */ });\n// export default function render(component, position = document.getElementById('root')) {\n//   position.insertAdjacentHTML('beforeend', component)\n// }\nfunction render(\n  component,\n  position = document.getElementById('root'),\n  content = null\n) {\n  if (content != null) {\n    const tagBlock = position.insertAdjacentHTML('beforeend', component)\n  } else {\n    position.insertAdjacentHTML('beforeend', component)\n  }\n}\n\n\n//# sourceURL=webpack://subway_shop/./src/scripts/render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;