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

/***/ "./src/js/configMap.js":
/*!*****************************!*\
  !*** ./src/js/configMap.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    // const lat = 7.05143;\n    // const lng = -73.1110784;\n\n\n     //const lat = 7.0533453;\n     //const lng = -73.0940321;\n\n\n    const lat = document.querySelector('#lat').value || 7.0533453;\n    const lng = document.querySelector('#lng').value || -73.0940321;\n\n    // console.log(lat);\n\n    const mapa = L.map('showMap').setView([lat, lng ], 16);\n    let marker;\n\n    //Utilizar provider y el geocoder\n    const geocodeService = L.esri.Geocoding.geocodeService();\n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    //Icono\n    var myIcon = L.icon({\n        iconUrl: 'https://brsantander.com.co/wp-content/uploads/2023/04/pin-brsantander.png',\n        iconSize: [48, 48],  // Ajusta el tamaño del ícono (ancho, altura)\n        iconAnchor: [24, 48],  // Ajusta el punto de anclaje del ícono (horizontal, vertical)\n        popupAnchor: [0, -48],  // Ajusta el punto de anclaje del popup (horizontal, vertical)\n        shadowUrl: 'https://brsantander.com.co/wp-content/uploads/2023/04/pin-brsantander.png',\n        shadowSize: [50, 50],  // Ajusta el tamaño de la sombra (ancho, altura)\n        shadowAnchor: [24, 48]  // Ajusta el punto de anclaje de la sombra (horizontal, vertical)\n    });\n\n\n\n\n\n  // El Pin\nmarker = new L.marker([lat, lng], {\n    draggable: true,\n    autoPan: true,\n    icon: myIcon // Esta línea se ha movido dentro de las opciones del marcador\n}).addTo(mapa);\n\n\n \n\n\n    // detectar el movimiento\n    marker.on('moveend', function(event){\n        marker = event.target\n        const posicion = marker.getLatLng()\n        // console.log(marker);\n        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))\n\n        //Obtener la información de las calles\n        geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){\n            console.log(\"Movieron el pin\" , resultado)\n\n\n            // Crear contenido HTML personalizado para la burbuja emergente\n            var popupContent = `\n                <div>\n                    <h3><strong style=\"color: #f4a21b;\">BIENES RAICES SANTANDER</strong></h3>\n                    <p>${resultado.address.LongLabel}</p>\n                    <p>País: ${resultado.address.CntryName}</p>\n                    <p>Regiòn: ${resultado.address.Region}  ${resultado.address.City}</p>\n                    <p>Dirección: ${resultado.address.Address}</p>\n                </div>\n            `;\n\n            marker.bindPopup(popupContent, {\n                closeButton: false,  // Opcional: Si deseas mostrar un botón de cierre en la burbuja emergente\n                minWidth: 300  // Opcional: Establecer el ancho mínimo de la burbuja emergente en píxeles\n            });\n            // marker.bindPopup(\"hol\" +  resultado.address.LongLabel)\n\n            //mostrar la dirección\n            document.querySelector('.calle').textContent = resultado.address.Address ?? ''\n\n            //llenar los campos\n            document.querySelector('#address').value = resultado?.address?.Address ?? ''\n            document.querySelector('#lat').value = resultado?.latlng?.lat\n            document.querySelector('#lng').value = resultado?.latlng?.lng\n\n        })\n    })\n\n})()\n\n//# sourceURL=webpack://bienes_raices/./src/js/configMap.js?");

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
/******/ 	__webpack_modules__["./src/js/configMap.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;