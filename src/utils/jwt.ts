import jwt from "jsonwebtoken"

export const createJWT = (slug: string) =>  (
    jwt.sign(
        {//payload
            slug
        },
        String(process.env.SECRET)  
    )
)