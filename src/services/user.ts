import { Request } from "express"
import { db } from "../lib/db"
import { getPublicUrl } from "../utils/url"
import { Prisma } from "@prisma/client"


export const getUserByEmail = async (email: string, req?: Request) => {
    const user = await db.user.findUnique({ where: { email } })

    if (!user)
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

    if (!user)
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


export const getUserFollowingNow = async (slug: string) => {
    const count = db.folow.count({
        where: { user1Slug: slug }
    })

    return count
}

export const getUserFollowersCount = async (slug: string) => {
    const count = db.folow.count({
        where: { user2Slug: slug }
    })

    return count
}

export const getUserTweetsCount = async (slug: string) => {
    const count = db.tweet.count({
        where: { userSlug: slug }
    })

    return count
}


export const checkIfFollows = async (user1Slug: string, user2Slug: string) => {
    if(user1Slug == user2Slug)
        return "Você não pode se seguir"
    
    const follows = await db.folow.findFirst({
        where: { user1Slug, user2Slug }
    })

    return !!follows
}



export const follow = async (user1Slug: string, user2Slug: string) => {
    await db.folow.create({
        data: { user1Slug, user2Slug }
    })
}

export const unfollow = async (user1Slug: string, user2Slug: string) => {
    await db.folow.deleteMany({
        where: { user1Slug, user2Slug }
    })
}


export const updateUserInfo = async (slug: string, data: Prisma.UserUpdateInput) => {
    console.log(slug)
    const newUser = await db.user.update({
        where: { slug },
        data
    })

    return !!newUser
}


export const getUserFollowing = async (slug: string) => {
    const following = []

    const reqFollow = await db.folow.findMany({
        select: { user2Slug: true },
        where: { user1Slug: slug }
    })

    for (let reqItem of reqFollow) {
        following.push(reqItem.user2Slug)
    }

    return following
} 



export const getUserSuggestions = async (userSlug: string) => {
    console.log(userSlug)
    const following = await getUserFollowing(userSlug)

    const followingAndMe = [...following, userSlug]

    console.log(followingAndMe)

    //100% do user (1 entrada)
    type ISuggestion = Pick<//do proprio ts
        Prisma.UserGetPayload<Prisma.UserDefaultArgs>,//full, o original
        "name" | "avatar" | "slug"
    >
    

    //pegar 2 aleatoriamente e que eu não sigo (followingAndME == toos que sigo + mim)
    const suggestions: ISuggestion[] = await db.$queryRaw`
        SELECT 
            name, avatar, slug
        FROM "User"
        WHERE
            slug NOT IN (${Prisma.join(followingAndMe)})
        ORDER BY RANDOM()
        LIMIT 2
    `


    for (let sugIndex in suggestions) {
        suggestions[sugIndex].avatar = getPublicUrl(suggestions[sugIndex].avatar)
    }

    return suggestions
}