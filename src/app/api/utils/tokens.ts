import { randomUUID } from 'crypto';
import * as jwt from 'jsonwebtoken'

const SECRET_KEY = "H926BklaoU672TT21mlsg";

export function createToken (payload : {
    email : string,
    role : string
}, types : string) : string {    

    const newToken = types == "ACCESS_TOKEN" ? 

    jwt.sign({...payload, id : randomUUID()}, SECRET_KEY, {expiresIn : '5m', notBefore : Date.now() }) :
    jwt.sign({...payload, id : randomUUID()}, SECRET_KEY, {expiresIn : '20m', notBefore : Date.now() })

    return newToken
}

export function verifyToken(token : string) : boolean{
    jwt.verify(token, SECRET_KEY, {}, (err, decoded ) => {
        return err? false : true
    })
    
    return false
}