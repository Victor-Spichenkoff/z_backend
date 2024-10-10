import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { searchSchema } from "../schemas/search";
import { findTweetsByBody } from "../services/tweet";

export const searchTweets = async (req: ExtendedRequest, res: Response): Promise<any> => {
    const validatedData = searchSchema.safeParse(req.query)

    if(!validatedData.success)
        return res.status(400).send({ error: validatedData.error.flatten().fieldErrors })


    let perPage = 2
    let currentPage = validatedData.data.page ?? 0

    const tweets = await findTweetsByBody(
        validatedData.data.q,
        currentPage,
        perPage
    )

    res.json({ tweets, page: currentPage })
}