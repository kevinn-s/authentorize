import { verifyToken , createToken} from "../utils/tokens";

export async function POST(req : Request, res : Response){

    const {access_token, ...payload} = await req.json();

    // if (verifyToken(access_token)){

    //     return new Response(
    //         JSON.stringify({refresh_token : createToken(payload, "REFRESH_TOKEN")})
    //     )

    // } 
        console.log("refresh error")
    // else {
        return new Response(JSON.stringify({message : "Unauthorized"}), {status : 400})
    // }
}