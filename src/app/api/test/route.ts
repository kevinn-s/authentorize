

export async function POST(req : Request, res : Response) {
    console.log(await req.json())
    return new Response(JSON.stringify({message : "Hi"}), {status:200})
}