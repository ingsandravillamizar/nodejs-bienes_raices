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

/***/ "./src/js/showMap.js":
/*!***************************!*\
  !*** ./src/js/showMap.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n\r\n    const lat = document.querySelector('#lat').textContent\r\n    const lng = document.querySelector('#lng').textContent\r\n    const address = document.querySelector('#address').textContent\r\n\r\n    const mapa = L.map('Map').setView([lat, lng ], 16);\r\n    let marker;\r\n\r\n    //Utilizar provider y el geocoder\r\n    //const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    console.log(\"longitudes\",lat,lng)\r\n\r\n    //Icono\r\n    var myIcon = L.icon({\r\n        iconUrl: 'https://brsantander.com.co/wp-content/uploads/2023/04/pin-brsantander.png',\r\n        iconSize: [48, 48],  // Ajusta el tamaño del ícono (ancho, altura)\r\n        iconAnchor: [24, 48],  // Ajusta el punto de anclaje del ícono (horizontal, vertical)\r\n        popupAnchor: [0, -48],  // Ajusta el punto de anclaje del popup (horizontal, vertical)\r\n        shadowUrl: 'https://brsantander.com.co/wp-content/uploads/2023/04/pin-brsantander.png',\r\n        shadowSize: [50, 50],  // Ajusta el tamaño de la sombra (ancho, altura)\r\n        shadowAnchor: [24, 48]  // Ajusta el punto de anclaje de la sombra (horizontal, vertical)\r\n    });\r\n\r\n\r\n\r\n\r\n\r\n  // El Pin\r\nmarker = new L.marker([lat, lng], {\r\n    draggable: true,\r\n    autoPan: true,\r\n    icon: myIcon // Esta línea se ha movido dentro de las opciones del marcador\r\n}).addTo(mapa).bindPopup(address);\r\n\r\n\r\n \r\n\r\n\r\n    // // detectar el movimiento\r\n    // marker.on('moveend', function(event){\r\n    //     marker = event.target\r\n    //     const posicion = marker.getLatLng()\r\n    //     // console.log(marker);\r\n    //     mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))\r\n\r\n    //     //Obtener la información de las calles\r\n    //     geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){\r\n    //         console.log(\"Movieron el pin\" , resultado)\r\n\r\n\r\n    //         // Crear contenido HTML personalizado para la burbuja emergente\r\n    //         var popupContent = `\r\n    //             <div>\r\n    //                 <h3><strong style=\"color: #f4a21b;\">BIENES RAICES SANTANDER</strong></h3>\r\n    //                 <p>${resultado.address.LongLabel}</p>\r\n    //                 <p>País: ${resultado.address.CntryName}</p>\r\n    //                 <p>Regiòn: ${resultado.address.Region}  ${resultado.address.City}</p>\r\n    //                 <p>Dirección: ${resultado.address.Address}</p>\r\n    //             </div>\r\n    //         `;\r\n\r\n    //         marker.bindPopup(popupContent, {\r\n    //             closeButton: false,  // Opcional: Si deseas mostrar un botón de cierre en la burbuja emergente\r\n    //             minWidth: 300  // Opcional: Establecer el ancho mínimo de la burbuja emergente en píxeles\r\n    //         });\r\n    //         // marker.bindPopup(\"hol\" +  resultado.address.LongLabel)\r\n\r\n    //         //mostrar la dirección\r\n    //         document.querySelector('.calle').textContent = resultado.address.Address ?? ''\r\n\r\n    //         //llenar los campos\r\n    //         document.querySelector('#address').value = resultado?.address?.Address ?? ''\r\n    //         document.querySelector('#lat').value = resultado?.latlng?.lat\r\n    //         document.querySelector('#lng').value = resultado?.latlng?.lng\r\n\r\n    //     })\r\n    // })\r\n\r\n})()\n\n//# sourceURL=webpack://bienes_raices/./src/js/showMap.js?");

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
/******/ 	__webpack_modules__["./src/js/showMap.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;