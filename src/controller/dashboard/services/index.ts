import { connectToDB } from "@mongo/index";
import HttpException from "@utils/Error";
import { Request, Response } from "express";
import {randomUUID} from 'crypto';
import { encrypt } from "@utils/crypto";

let mmmmm:any = [];

export const servicesGet = async (req: Request, res: Response) => {
    const {serviceType, serviceId} = req.params;
    console.log(randomUUID())
    res.render(`dashboard/services/${serviceType}/index`, {
        page: 'dashboard',
        serviceType: serviceType,
        serviceId: serviceId,
        data: mmmmm[0],
    })
}

export const serviceCreateGet = async (req: Request, res: Response) => {
    const {serviceType} = req.params;
    //get url from access point
    // for redirectUrl = req.originalUrl
    //console.log(req.protocol + '://' + req.get('host'))
    res.render(`dashboard/services/${serviceType}/createnew`, {
        page: 'dashboard',
        serviceType: serviceType,
        locationOptions: [
            {name:'name1', value: 'name1'},{name:'name2', value: 'name2'}
        ]
    })
}
export const serviceCreatePost = async (req: Request, res: Response) => {
    const {serviceType} = req.params;
    const data = req.body;
    //validate data 
    console.log('data', data);
    const newDate = new Date().toISOString();
    const serviceId = randomUUID();
    const apiKey = randomUUID();
    const userDetail = {
        userId: req.user?._id,
        email: req.user?.email,
        name: req.user?.name,
        isAdmin: true,
    }
    /**
        name: 'Prakash Acharya',
        accessURLDevelopment: 'http://localhost:3000',
        accessURLStaging: 'https://staging.myhost.com',
        accessURLProduction: '',
        location: 'us-west-1'

     */
    /**
     * apikey - encryption
     * apisecret- encryption
     */
    const apiSecret = encrypt(apiKey);

    const newData = {
        ...data,
        serviceId,
        createdBy: userDetail,
        createdAt: newDate,
        apiKey,
        apiSecret,
        isActive: true,

        isProduction: false,
        users: [
            userDetail,
        ]
    }
    const readWriteCount = {
        serviceId: 'thisisserviceid',
        apiKey: 'thisisapikey',
        month: "01",
        day: '01-10-2022',
        data: {
            read: 100,
            write: 100,
            delete: 100,
        }
        
    }

    mmmmm[0] = newData;
    
    try {
        // const {db} = await connectToDB();
        // const {insertedId} = await db.collection(serviceType).insertOne(newData);
        // if(!insertedId) {
        //     new HttpException(500, 'Something went wrong please try again later')
        //     res.render(`dashboard/services/${serviceType}/createnew`, {
        //         page: 'dashboard',
        //         serviceType: serviceType,
        //     })
        // }
        const insertedId = 'image-api-1'
        res.redirect(`/dashboard/services/${serviceType}/${insertedId}#setting`);

    } catch (error) {
        res.render(`dashboard/services/${serviceType}/createnew`, {
            page: 'dashboard',
            serviceType: serviceType,
        })
    }
    //contain name, location
    //can update later after creating the services
    //update user list -- users, 
    //once data created redirect to the serviceId dashboard.
    //upload to database
    //things to do
    /**
     * check name and location is there or not
     * add createdBy { userId, userName, userEmail} createdAt, updatedAt
     * add users [
     *  {userId, userName, userEmail}
     * ]
     * 
     */
}