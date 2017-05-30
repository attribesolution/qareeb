var maps = [];

function initialize() {
  getAllExistingMaps();
  document.getElementById("add_clinic").onclick = getNewMap;
}

function getNewMap() {
  setTimeout(function(){
    temp = document.getElementById("mapnew_clinics");
    temp.id = 'map' + maps.length;
    initMap(temp);
  }, 100);
}

function getAllExistingMaps() {
  var divs = document.getElementsByTagName("div"), item;
  for (var i = 0, len = divs.length; i < len; i++) {
    item = divs[i];
    if (item.id && item.id.indexOf("map") == 0) {
      initMap(item);
    }
  }
}

function initMap(element) {
  lng = parseFloat(element.previousSibling.previousSibling.value);
  lat = parseFloat(element.previousSibling.previousSibling.previousSibling.value);
  if (isNaN(lng)) {
    lng = 67.0099;
    lat = 24.8615;
    zoom = 13;
  }
  else {
    zoom = 15;
  }
  var map = new google.maps.Map(element, {
    zoom: zoom,
    center: {
      lat: lat,
      lng: lng
    },
    mapTypeId: 'terrain'
  });
  maps.push(map);
}

function Autocomplete(element){
  var options = {
    componentRestrictions: {country: "pk"}
  };
  var nearby = new google.maps.places.Autocomplete(element, options, {types: ['geocode']} );
  nearby.addListener('place_changed', function(){
    var place = this.getPlace();
    element.parentNode.nextSibling.value = place.geometry.location.lat();
    element.parentNode.nextSibling.nextSibling.value = place.geometry.location.lng();
  });
  nearby.addListener('place_changed', function(){
    var id = parseInt(element.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.id.split("map")[1]);
    var place = this.getPlace();
    if (place.geometry.viewport) {
      maps[id].fitBounds(place.geometry.viewport);
    } else {
      maps[id].setCenter(place.geometry.location);
      maps[id].setZoom(17);
    }
  });
}
