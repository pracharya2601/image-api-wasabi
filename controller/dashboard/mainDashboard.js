module.exports.mainDashboardGet = async (req, res, next) => {
    res.render('dashboard/index', {
        page: 'dashboard',
        imageApi: [
            {
                name: 'Image Api 1',
                id: 'image-api-1',
                details: {
                    apiKey: 'thisisapikeyencrypted',
                    locationId:'thisislocationid'
                }
            },
            {
                name: 'Image Api 2',
                id: 'image-api-2',
                details: {
                    apiKey: 'thisisapikeyencrypted',
                    locationId:'thisislocationid'
                }
            },
        ],
        dataApi: [
            {
                name: 'Data Api 1',
                id: 'data-api-1',
                details: {
                    apiKey: 'thisisapikeyencrypted',
                    locationId:'thisislocationid'
                }
            },
            {
                name: 'Data Api 2',
                id: 'data-api-2',
                details: {
                    apiKey: 'thisisapikeyencrypted',
                    locationId:'thisislocationid'
                }
            }
        ]

    })
}

module.exports.serviceEditGet = async (req, res, next) => {
    const {serviceType, serviceId} =  req.params;
    res.render(`dashboard/services/${serviceType}/edit`, {
        page: 'dashboard',
        serviceType: serviceType,
    })
}


module.exports.serviceGet = async (req, res, next) => {
    const {serviceType, serviceId} =  req.params;
    //this is literally service dashboard
    console.log(req.headers)
    res.render(`dashboard/services/${serviceType}/index`, {
        page: 'dashboard',
        serviceType: serviceType,
        serviceId: serviceId,
        data: {
            name: 'Service Name',
            otherInfo: 'Other Info'
        },
    })
}
module.exports.serviceEditPost = async (req, res, next) => {
    const {serviceType, serviceId} =  req.params;
    // need to redirect
    res.render(`dashboard/services/${serviceType}`, {
        page: 'dashboard',
        data: {},
    })
}