const data = {
    "name": "This is Name",
    "email": "This is Email",
    "address": {
        "address": "123 Abc Street",
        "city": "San Pabloe",
        "state": "CALIFORNIA",
        "zip": "12345"
    },
    "friends": [
        {
            "name": "Friend One",
            "email": "friendone@email.com",
            "_id": "friendis_one",
            "address": {
                "fullAddress": "thisisfulladdress",
            },
            "hobby": [
                {name: "hobby Name 1", _id: 'thisishobby1'},
                {name: "hobby Name 2 ", _id: 'thisishobby2'},
            ]
        },
        {
            "name": "Friend Two",
            "email": "friendtwo@email.com",
            "_id": "friendis_Two",
            hobby: [],
        },
    ]
}

module.exports.socketHelper = async (socket) => {
    const dta = await cache.getAsync(`sess:${socket.request.session.id}`)

    socket.on("imageApi", (arg, callback) => {
        // console.log(socket?.user);
        // console.log(arg); // "world"
        callback(data);
    });
    socket.on("renewToken", (arg, callback) => {
        // console.log(socket?.user);
        console.log('renew TOken', arg); // "world"
        //genetate new TOken and all kind of stuff
        callback({
            token: 'thisisrenewedtoekn'
        });
    });
    socket.on('all_sessions', async (arg, callback) => {
        callback(JSON.parse(dta));
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}

