import { RequestHandler, Response } from "express";
import { checkIfFollows, findUserBySlug, follow, getUserFollowersCount, getUserFollowingNow, getUserTweetsCount, unfollow, updateUserInfo } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";
import { userTweetsSchema } from "../schemas/userTweet";
import { findTweetsByUser } from "../services/tweet";
import { error } from "console";
import { updateUserSchema } from "../schemas/updateUser";

export const getUser = async (req: ExtendedRequest, res: Response): Promise<any> => {
    const { slug } = req.params

    const user = await findUserBySlug(slug)

    if(!user)
        return res.send({ error: "Usuário inexistente" })


    //num de tweets, seguidores e seguindo
    const followingCount = await getUserFollowingNow(slug)
    const followersCount = await getUserFollowersCount(slug)
    const tweetsCount = await getUserTweetsCount(slug)

    res.json({ user, followingCount, followersCount, tweetsCount })
}


export const getUserTweets = async (req: ExtendedRequest, res: Response): Promise<any> => {
    const { slug } = req.params

    const validatedData = userTweetsSchema.safeParse(req.query)

    if(!validatedData.success)
        return res.status(400).send({ error: validatedData.error.flatten().fieldErrors })

    let perPage = 2
    let currentPage = validatedData.data.page ?? 0

    const tweets = await findTweetsByUser(
        slug, currentPage, perPage
    )

    res.json({ tweets, page: currentPage })
}



export const followToggle = async (req: ExtendedRequest, res: Response): Promise<any> => {
    const { slug } = req.params
    const me = String(req.userSlug)
 
    const hasUSerToBeFollowed = await findUserBySlug(slug)

    if(!hasUSerToBeFollowed)
        return res.json({ error: "Usuário inexistente" })

    const follows = await checkIfFollows(me, slug)

    if(follows == "Você não pode se seguir")
        return res.json({ error: follows })

    if(!follows)
        await follow(me, slug)
    else
        await unfollow(me, slug)

    res.json({ following: !follows })
}


export const updateUser: RequestHandler = async (req: ExtendedRequest, res): Promise<any> => {
    const userSlug = String(req.userSlug)

    const validatedData = updateUserSchema.safeParse(req.body)

    if(!validatedData.success)
        return res.status(400).send({ error: validatedData.error.flatten().fieldErrors })

    await updateUserInfo(userSlug, validatedData.data)

    res.json({})
}