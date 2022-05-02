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
module.exports.setting = async (req, res, next) => {
    const {serviceType, serviceId} = req.params;
    try {
        res.status(200).json({
            serviceType,
            serviceId,
            hash: 'setting',
            data,
        })
    } catch (error) {
        res.status(402).json({
            status: 'BAD',
            error: 'Server error please try again later.'
        })
    }

}