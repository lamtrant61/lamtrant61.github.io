


console.log(curTime)

function checkNumber(number){
	number = parseInt(number)
	if (number<10){
		number="00"+number.toString();
	}
	else if (number >=10 && number <100){
		number="0"+number.toString();
	}
	else {number=number.toString()}
	return number;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

map_layer = L.layerGroup()
L.tileLayer('https://tiles.windy.com/tiles/v10.0/darkmap/{z}/{x}/{y}.png', {
 	attribution: ' <a href="http://amo.gov.vn/about/">&copy; AMO_VN </a>',
maxZoom: 6,
minZoom: 6,
}).addTo(map_layer);

bounds = new L.LatLngBounds(new L.LatLng(5, 98), new L.LatLng(27, 115));
var map = L.map('map', {
center: bounds.getCenter(),
maxBounds: bounds,
maxBoundsViscosity: 0.75,
layers: [map_layer],
minZoom: 6,
}).setView([15.834536, 107.655273], 0); 


var Lightning_Icon = L.icon({
    iconUrl: 'icon/l.png',
    iconSize:     [10, 10], // size of the icon
    popupAnchor: [0,-12],
});

var the_marker = []
function onMapClick(e) {
    lon = String(e.latlng).split(" ")[1].slice(0,8);
    lat = String(e.latlng).split(" ")[0].slice(7,14);
 	the_marker = L.marker([lat, lon], {icon: Lightning_Icon, opacity: 1}).addTo(map);
 	the_marker.bindPopup('Lat: ' + lat + ', Lon:' + lon).openPopup();
	}
map.on('click', onMapClick);

var allCmax = ['./data/f10.png', './data/f20.png', './data/f30.png', './data/f40.png', './data/f50.png', './data/f60.png']
var fTime_ = ['+10 min', '+20 min', '+30 min', '+40 min', '+50 min', '+60 min'];
var imageBounds = [ [7.2, 97], [25.2, 115]];

var allSet = ['set_f10', 'set_f20', 'set_f30', 'set_f40', 'set_f50', 'set_f60'];
var var_name;
var currentSet = 0;
var polygon_layer = L.layerGroup();
var loop = false;


function updatePolygon(){
	for (let i = 0; i < window[allSet[currentSet]]; i++) {
		var_name = allSet[currentSet] + "_" + checkNumber(i)
		L.polygon(window[var_name], {fill:'url(./image/icon_set1.png)', color: '#434954', stroke:false, weight:0.2, fillOpacity:0.8, fillRule: "nonzero"}).addTo(polygon_layer);
		//L.imageOverlay(allCmax[currentSet], imageBounds,{opacity: 0.2}).addTo(polygon_layer);
	}
}

async function updateImg(){
	for (let i = 0; i < window[allSet[currentSet]]; i++) {
		L.imageOverlay(allCmax[currentSet], imageBounds,{opacity: 0.2}).addTo(polygon_layer);
		document.getElementById("cTime").innerText = String(curTime)+" UTC\n"+String(fTime_[currentSet]);
	}
	polygon_layer.addTo(map);
	await sleep(50);
	updatePolygon();
	Loop();
}

function clearPolygon(){
	polygon_layer.clearLayers();
}

async function Loop(){
	if (loop){
		if (currentSet==allSet.length-1){
			currentSet=0;
		} else{
			currentSet+=1;
		}
		await sleep(1500);
		clearPolygon();
		await sleep(400);
		updateImg();

	}	
}
updateImg();

function playPause(){
	if (loop) {loop=false}
	else {
		loop=true;
		updateImg();
	}
}

// while (true){
// 	if (currentSet==allSet.length-1){
// 		currentSet=0;
// 	} else{
// 		currentSet+=1;
// 	}
// 	clearPolygon();
// 	updatePolygon();
// }




// setTimeout(() => {  console.log("World!"); }, 5000);
// polygon_layer.clearLayers();
// for (let i = 0; i < set_f20; i++) {
// 	var_name = "set_f20_" + checkNumber(i)
// 	//console.log(window[var_name])
// 	L.polygon(window[var_name], {fill:'url(./image/icon_set1.png)', color: '#434954', stroke:false, weight:0.2, fillOpacity:0.8, fillRule: "nonzero"}).addTo(polygon_layer);
// }
// polygon_layer.addTo(map);

// setTimeout(() => {  console.log("World!"); }, 5000);
// polygon_layer.clearLayers();
// for (let i = 0; i < set_f30; i++) {
// 	var_name = "set_f30_" + checkNumber(i)
// 	//console.log(window[var_name])
// 	L.polygon(window[var_name], {fill:'url(./image/icon_set1.png)', color: '#434954', stroke:false, weight:0.2, fillOpacity:0.8, fillRule: "nonzero"}).addTo(polygon_layer);
// }
// polygon_layer.addTo(map);

// setTimeout(() => {  console.log("World!"); }, 5000);
// polygon_layer.clearLayers();
// for (let i = 0; i < set_f40; i++) {
// 	var_name = "set_f40_" + checkNumber(i)
// 	//console.log(window[var_name])
// 	L.polygon(window[var_name], {fill:'url(./image/icon_set1.png)', color: '#434954', stroke:false, weight:0.2, fillOpacity:0.8, fillRule: "nonzero"}).addTo(polygon_layer);
// }
// polygon_layer.addTo(map);

// setTimeout(() => {  console.log("World!"); }, 5000);
// polygon_layer.clearLayers();
// for (let i = 0; i < set_f50; i++) {
// 	var_name = "set_f50_" + checkNumber(i)
// 	//console.log(window[var_name])
// 	L.polygon(window[var_name], {fill:'url(./image/icon_set1.png)', color: '#434954', stroke:false, weight:0.2, fillOpacity:0.8, fillRule: "nonzero"}).addTo(polygon_layer);
// }
// polygon_layer.addTo(map);


// setTimeout(() => {  console.log("World!"); }, 5000);
// polygon_layer.clearLayers();
// for (let i = 0; i < set_f60; i++) {
// 	var_name = "set_f60_" + checkNumber(i)
// 	//console.log(window[var_name])
// 	L.polygon(window[var_name], {fill:'url(./image/icon_set1.png)', color: '#434954', stroke:false, weight:0.2, fillOpacity:0.8, fillRule: "nonzero"}).addTo(polygon_layer);
// }
// polygon_layer.addTo(map);

