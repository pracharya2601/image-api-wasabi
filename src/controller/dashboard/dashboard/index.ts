import { Request, Response } from "express";

export const dashboardGet = async (req: Request, res: Response) => {
    res.render("dashboard/index", {
        page: 'dashboard',
        imageApi: [
            {
                name: 'Image Api 1',
                id: 'image-api-1',
                details: {
                    apiKey: 'thisisapikeyencryptedsssds',
                    locationId:'thisislocationid'
                }
            },
            {
                name: 'Image Api 2',
                id: 'image-api-2',
                details: {
                    apiKey: 'thisisapikeyencryptedmmmm',
                    locationId:'thisislocationid'
                }
            },
        ],
        dataApi: [
            // {
            //     name: 'Data Api 1',
            //     id: 'data-api-1',
            //     details: {
            //         apiKey: 'thisisapikeyencrypted',
            //         locationId:'thisislocationid'
            //     }
            // },
            // {
            //     name: 'Data Api 2',
            //     id: 'data-api-2',
            //     details: {
            //         apiKey: 'thisisapikeyencrypted',
            //         locationId:'thisislocationid'
            //     }
            // }
        ]
    })
}