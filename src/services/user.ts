import { Request } from "express"
import { db } from "../lib/db"
import { getPublicUrl } from "../utils/url"


export const getUserByEmail = async (email: string, req: Request) => {
    const user = await db.user.findUnique({ where: { email } })

    if(!user)
        return null


    return {
        ...user,
        avatar: getPublicUrl(user.avatar, req),
        cover: getPublicUrl(user.cover, req)
    }
}


export const findUserBySlug = async (slug: string) => {
    const user = await db.user.findUnique({ 
        where: { slug },
        select: {
            avatar: true,
            cover: true,
            slug: true,
            link: true,
            name: true,
            bio: true
        }

    })

    if(!user)
        return null


    return {
        ...user,
        avatar: getPublicUrl(user.avatar),
        cover: getPublicUrl(user.cover)
    }
}