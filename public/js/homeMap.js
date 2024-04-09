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

/***/ "./src/js/homeMap.js":
/*!***************************!*\
  !*** ./src/js/homeMap.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n\r\n    const lat =   6.9673419\r\n    const lng = -73.7232909 \r\n\r\n    const mapa = L.map('home-map').setView([lat, lng ], 8);\r\n   \r\n\r\n\r\n\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    //console.log(\"longitudes\",lat,lng)\r\n\r\n    \r\n\r\n\r\n\r\n    // Icono\r\n    var myIcon = L.icon({\r\n        iconUrl: 'https://brsantander.com.co/wp-content/uploads/2023/04/pin-brsantander.png',\r\n        iconSize: [48, 48],  // Ajusta el tamaño del ícono (ancho, altura)\r\n        iconAnchor: [24, 48],  // Ajusta el punto de anclaje del ícono (horizontal, vertical)\r\n        popupAnchor: [0, -48],  // Ajusta el punto de anclaje del popup (horizontal, vertical)\r\n        shadowUrl: 'https://brsantander.com.co/wp-content/uploads/2023/04/pin-brsantander.png',\r\n        shadowSize: [50, 50],  // Ajusta el tamaño de la sombra (ancho, altura)\r\n        shadowAnchor: [24, 48]  // Ajusta el punto de anclaje de la sombra (horizontal, vertical)\r\n    });\r\n\r\n\r\n\r\n\r\n\r\n  // El Pin\r\nlet marker = new L.marker([lat, lng], {\r\n     draggable: true,\r\n     autoPan: true,\r\n     icon: myIcon // Esta línea se ha movido dentro de las opciones del marcador\r\n  }).addTo(mapa);  //.bindPopup(address);\r\n\r\n\r\n  \r\n\r\n\r\n\r\n\r\n let markers = new L.FeatureGroup().addTo(mapa);\r\n\r\n\r\nconst consultaPropiedades = async () => {\r\n    try {\r\n        const url = '/api/propiedades'\r\n        const respuesta = await fetch(url)\r\n        const propiedades = await respuesta.json()\r\n        console.log(propiedades);\r\n\r\n   \r\n     \r\n         mostrarPropiedades(propiedades)\r\n    } catch(error) {\r\n        console.log(error);\r\n    }\r\n};\r\n\r\nconst mostrarPropiedades = propiedades =>{\r\n    \r\n    propiedades.forEach(propiedad => {\r\n        const mark = new L.marker([propiedad?.lat , propiedad?.lng], {\r\n            autoPan: true,\r\n            // icon: myIcon // Esta línea se ha movido dentro de las opciones del marcador\r\n        }).addTo(mapa).bindPopup(`\r\n        <div  style=\"  max-width: 200px; padding: 5px; \">\r\n        <h1   style=\"font-size: 15px; font-weight: bold; margin-bottom: 10px;\">${propiedad.category.name}</h1>\r\n        <div  style=\"margin-bottom: 5px;\">\r\n            <img src=\"/uploads/${propiedad.image}\" alt=\"${propiedad.image}\" style=\"max-width: 150px; height: auto;\">\r\n        </div>\r\n        <div style=\"margin-bottom: 5px;\">${propiedad.title}</div>\r\n        <div style=\"margin-bottom: 5px; color: #4338ca;\"> ${propiedad.price.name}\r\n\r\n    </div>`);\r\n        markers.addLayer(mark)\r\n    });\r\n    \r\n};\r\nconsultaPropiedades()\r\n\r\n\r\n\r\n})()\n\n//# sourceURL=webpack://bienes_raices/./src/js/homeMap.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/homeMap.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;