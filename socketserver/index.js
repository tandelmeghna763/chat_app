const http = require('http');
const { Server } = require('socket.io');
const httpserver = http.createServer();
const io = new Server(httpserver, {
    cors: {
        origin: "*"
    }
});
io.on("connection", (socket) => {
    // console.log(socket);
    socket.on('connectToRoom', (room) => {
        console.log("room", room)
        socket.join(room)
    })
    socket.on("send_msg", (data) => {
        console.log(Array.from(socket.rooms.keys()), socket.id)
        // socket.broadcast.emit('get_msg', data);
        // let AllRooms = Array.from(socket.rooms.keys())
        // AllRooms.splice(AllRooms.indexOf(socket.id), 1)
        // console.log("meetingRoom", AllRooms)
        socket.to("m1").emit('get_msg', data);




        //     const sessionID = socket.id;
        //     console.log("soket id is", sessionID)
        //     //all sockets array
        //     //array.from = convert object to array
        //     console.log("keys", io.sockets.adapter.sids)
        //     console.log(io.sockets.adapter.sids.keys())
        //     const array_of = Array.from(io.sockets.adapter.sids.keys())
        //     console.log("List of keys", array_of)
        //     //remove current array from sesstion id
        //     const remove = array_of.splice(array_of.indexOf(sessionID), 1)
        //     console.log("remove socket id", remove)
        //     console.log("final array", array_of)
        //     //print all item from final array
        //     array_of.map((item) => {
        //         console.log(item)
        //         io.to(item).emit('get_msg', data);
        //     })
    });
});
httpserver.listen(5000, () => {
    console.log("server connected")
})