import { Request } from "express"


export const getPublicUrl = (fileName: string, req?: Request) => {
    // return `${req.protocol}://${req.get('host')}/static/${fileName}`

    return `${process.env.BASE_URL}/static/${fileName}`
}
