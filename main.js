var add = document.getElementById('add');
add.onclick = makenewtask;

var olList = document.querySelector('ol');

var map;
// new task createor
function makenewtask() {

    // task name
    var name = document.getElementById('name').value;
    var liList = document.createElement('li');
    liList.textContent = name;
    // check box and delete button
    var box = document.createElement('input');
    box.setAttribute('type', 'checkbox');
    var del = document.createElement('button');

    del.textContent = "Delete";
    // onclick actions
    box.onclick = markascompleted;
    del.onclick = deletethistask;


    liList.prepend(box);
    liList.appendChild(del);
    olList.prepend(liList);

    // onclick functions to update and delete tasj
    function markascompleted(event) {
        if (event.target.checked) {
            event.target.parentNode.style.textDecoration = 'line-through';
            olList.appendChild(event.target.parentNode);
        } else {
            event.target.parentNode.style.textDecoration = 'none';
            olList.prepend(event.target.parentNode);
        }
    }

    function deletethistask(event) {
        olList.removeChild(event.target.parentNode);
    }
}


// map initialize

function initialize() {

    var myLatLng = {
        lat: 0,
        lng: 0
    };
    // google maps api
    map = new google.maps.Map(
        document.getElementsByClassName('map')[0], {
            zoom: 12,
            center: myLatLng
        })
}

// marker button
var mark = document.getElementById('marker');
mark.onclick = addmarker;

// method to get location and add marker at current location
function addmarker() {
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const myLatLng = {
            lat: latitude,
            lng: longitude
        };
        mark.textContent = 'Update My Location Marker';
        new google.maps.Marker({
            position: myLatLng,
            map,
            title: "Currently At"
        });

        map.setCenter(myLatLng);
    }

    function error() {
        mark.textContent = 'Unable to retrieve your location';
    }
    // geolocation browser api
    if (!navigator.geolocation) {
        mark.textContent = 'Geolocation is not supported by your browser';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}