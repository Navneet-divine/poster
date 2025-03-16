import jwt from 'jsonwebtoken';


export const signJwt = (payload: any) => {
    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
        expiresIn: "1d"
    })
    return token
}

export const verifyJWT = (token: any) => {
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!)
    return decoded.userId;
};