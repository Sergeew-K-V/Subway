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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Component)\n/* harmony export */ });\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ \"./src/scripts/render.js\");\n\r\n// function createComponent(tag, [props], [...children]) {\r\n//   const element = document.createElement(`\"${tag}\"`)\r\n//   element.classList.add(props)\r\n// }\r\nclass Component {\r\n  constructor(content) {\r\n    this.content = content\r\n    ;(0,_render__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(content, undefined)\r\n  }\r\n}\r\n// класс должен получать проп data={} и в компоненте сделать метод, который будет возвращать шаблон с html куда будут подставляться пропсы с даты\r\n\n\n//# sourceURL=webpack://subway_shop/./src/scripts/Components/Component.js?");

/***/ }),

/***/ "./src/scripts/Components/SubwayComponent.js":
/*!***************************************************!*\
  !*** ./src/scripts/Components/SubwayComponent.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SubwayComponent)\n/* harmony export */ });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/scripts/Components/Component.js\");\n\r\n\r\nclass SubwayComponent extends _Component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n  constructor(content) {\r\n    super(content)\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://subway_shop/./src/scripts/Components/SubwayComponent.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Components_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/Component */ \"./src/scripts/Components/Component.js\");\n/* harmony import */ var _Components_SubwayComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/SubwayComponent */ \"./src/scripts/Components/SubwayComponent.js\");\n\r\n\r\n\r\nconst subContent = `\r\n<div class=\"subway__block\">\r\n  <div class=\"subway__flex\">\r\n    <div class=\"flex__top\">\r\n      <div class=\"subway__logo\"></div>\r\n      <div class=\"subway__img-logo\"></div>\r\n      <div class=\"subway__title\">Овощной</div>\r\n    </div>\r\n    <div class=\"flex__middle\">\r\n      <div class=\"subway__link\">\r\n        <a href=\"#\">Соус и овощи на выбор</a>\r\n      </div>\r\n    </div>\r\n    <div class=\"flex__bottom\">\r\n      <div class=\"subway__price\">Цена: 110руб.</div>\r\n      <div class=\"subway__btn-block\">\r\n        <div class=\"btn-block__text\">Количество</div>\r\n        <div class=\"btn-block__btns-list\">\r\n          <button class=\"btns-list__btn\">-</button>\r\n          <button class=\"btns-list__btn\">1</button>\r\n          <button class=\"btns-list__btn\">+</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"subway__btn-to-basket\">\r\n        <button class=\"btn-to-basket__btn\">В корзину</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>`\r\n\r\nconst sub = new _Components_SubwayComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](subContent)\r\nconst sub2 = new _Components_SubwayComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](subContent)\r\nconst sub3 = new _Components_SubwayComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](subContent)\r\n\n\n//# sourceURL=webpack://subway_shop/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/render.js":
/*!*******************************!*\
  !*** ./src/scripts/render.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ render)\n/* harmony export */ });\nfunction render(component, position = document.getElementById('root')) {\r\n  position.insertAdjacentHTML('beforeend', component)\r\n}\r\n\r\n//////////////////// Решил убрать tags, ведь можно передавать полный компонент и оборачивающий тег не нужен\r\n\r\n// export default function render(\r\n//   component,\r\n//   position = document.getElementById('root'),\r\n//   tags = 'div'\r\n// ) {\r\n//   position.insertAdjacentHTML('beforeend', `<${tags}>${component}</${tags}>`)\r\n// }\r\n\r\n//////////////////////// изначальный вариант, который сделал в офисе, но отошел от этой логики(if все равно нужно будет реализовать)\r\n\r\n// export default function render(\r\n//   component,\r\n//   position = document.getElementById('root'),\r\n//   content = null\r\n// ) {\r\n//   if (content != null) {\r\n//     const tagBlock = position.insertAdjacentHTML('beforeend', component)\r\n\r\n//   } else {\r\n//     position.insertAdjacentHTML('beforeend', component)\r\n//   }\r\n// }\r\n\n\n//# sourceURL=webpack://subway_shop/./src/scripts/render.js?");

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