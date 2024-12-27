import { Response } from "express";
import { feedSchema } from "../schemas/feed";
import { getUserFollowing } from "../services/user";
import { ExtendedRequest } from "../types/extended-request";
import { findTweetFeed } from "../services/tweet";

export const getFeed = async (req: ExtendedRequest, res: Response): Promise<any> => {
    const validatedData = feedSchema.safeParse(req.query)

    if(!validatedData.success)
        return res.status(400).send({ error: validatedData.error.flatten().fieldErrors })

    
    let perPage = 2
    let currentPage = validatedData.data.page ?? 0

    const following = await getUserFollowing(String(req.userSlug))

 
    const tweets = await findTweetFeed(following, currentPage, perPage)

    console.log(tweets[1])

    res.json({ tweets, page: currentPage })
}

