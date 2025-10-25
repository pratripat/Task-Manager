import { MongoClient } from "mongodb";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Lucia } from "lucia";
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MONGO_URI, process.env.MONGO_DB);

const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
const db = client.db(process.env.MONGO_DB);

// You need separate collections for users and sessions
const adapter = new MongodbAdapter(
    db.collection("sessions"),
    db.collection("users")
);

// export const authLucia = new Lucia(adapter, {
//     sessionCookie: {
//         name: 'auth_session',
//         expires: false,
//         attributes: {
//             secure: process.env.NODE_ENV === 'production'
//         }
//     },
//     getUserAttributes: (attributes) => {
//         return {
//             email: attributes.email
//         };
//     }
// });
export const authLucia = new Lucia(adapter, {
    sessionCookie: {
        name: "auth_session",
        expires: false,
        attributes: {
            secure: false,
            sameSite: "lax", // ⚠️ Back to lax since same origin now
            path: "/"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            email: attributes.email
        };
    }
});