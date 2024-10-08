/* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextApiRequest } from "next";
import * as z from 'zod';
import {sign, verify} from 'jsonwebtoken';
import { createToken } from '../utils/tokens';

export const userDataExample = {
    email : "vinn1864.s@gmail.com",
    password : "a",
}

export async function POST(req : Request) {

    const user = z.object({
        email : z.string().email().includes("@"),
        password : z.string(),
    }).refine((data) => (data.email === userDataExample.email && data.password === userDataExample.password))

    const requestData = await req.json()

    try{
        user.parse(requestData)

        return new Response(JSON.stringify({
            accessToken : createToken({email : requestData.email, role : "member"}, "ACCESS_TOKEN"),
            refreshToken : createToken({email : requestData.email, role : "member"}, "REFRESH_TOKEN"),
        }), {status : 200})
    }
    catch (err) {
        return new Response(JSON.stringify({message : "Server Error"}), {status : 400})
    }

  

}

export async function GET(req : Request , res : Response){

}