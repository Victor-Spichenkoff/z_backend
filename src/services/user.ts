import { Request } from "express"
import { db } from "../lib/db"
import { getPublicUrl } from "../utils/url"
import { Prisma } from "@prisma/client"


export const getUserByEmail = async (email: string, req?: Request) => {
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


export const createUser = async (userData: Prisma.UserCreateInput) => {
    try {
        const createdUser = await db.user.create({
            data: { ...userData }
        })

        return {
            ...createdUser,
            avatar: getPublicUrl(createdUser.avatar),
            cover: getPublicUrl(createdUser.cover)
        }
    } catch {
        return null
    }
}