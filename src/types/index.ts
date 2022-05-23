import { RedisClientType } from '@node-redis/client';
import {User} from './User';


declare global {
  var redis: RedisClientType;
  var mongo: any;
  var message: any;
  var error: any;
}

declare module 'express-session' {
 interface Session {
    user: string;
  }
}

declare module 'express' {
    interface Request {
        user? : User;
    }
}
