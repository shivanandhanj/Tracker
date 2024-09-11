
const socket=io()
if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
    },
    (error)=>{
        console.log(error);
    },
    {
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0
    }
        
    );
}
let map=L.map("map").setView([0,0],20)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'shiva'
}).addTo(map);
const marker={};

socket.on("rec-location",(data)=>{
    const{id,latitude,longitude}=data;
    map.setView([latitude,longitude]);
    if(marker[id]){
        marker[id].setLatlng([latitude,longitude])
    }else{
        marker[id] = L.marker([latitude, longitude]).addTo(map)
    }
})
socket.on("user-dconnect",(id)=>{
    if(marker[id]){
        map.removeLayer(marker[id]);
        delete marker[id]
    }
})
