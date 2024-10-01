/* eslint-disable @typescript-eslint/no-unused-vars */
// import { NextApiRequest } from "next";


export async function POST(req : Request) {
    console.log(req.json())

    return new Response(JSON.stringify("Hi"), {status:200})
}

export async function GET(req : Request , res : Response){

}