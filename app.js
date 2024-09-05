const express=require("express")
const http=require("http")
const socketio=require("socket.io")
const path=require("path")



const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));


io.on("connection",(socket)=>{
    socket.on("send-location",function(data){
        io.emit("rec-location",{id:socket.id,...data});
    });
    socket.on("disconnect",function(){
        io.emit("user-dconnect",socket.id)
    })
})
app.get('/',(req,res)=>{
    res.render("index");
})
server.listen(4000,()=>{
    console.log('server listen on port 4000');
})