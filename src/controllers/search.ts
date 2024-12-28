import { Response } from "express";
import { ExtendedRequest } from "../types/extended-request";
import { searchSchema } from "../schemas/search";
import { findTweetsByBody } from "../services/tweet";

export const searchTweets = async (req: ExtendedRequest, res: Response): Promise<any> => {
    let { q, page } = req.query

    if(!page || !q)
        return res.status(400).send({ error: "Erro interno" })

    page = String(page)
    q = String(q)

    let perPage = 2
    let currentPage = page ?? 0


    let finalQuery = q

    if(finalQuery.includes("+"))
        finalQuery = finalQuery.split("+").filter(fq => fq != "").join(" ")

    const tweets = await findTweetsByBody(
        finalQuery,
        Number(currentPage),
        perPage
    )

    res.json({ tweets, page: currentPage })
}

// export const searchTweets = async (req: ExtendedRequest, res: Response): Promise<any> => {
//     console.log(req.query);
//
//     const validatedData = searchSchema.safeParse(req.query)
//
//     if(!validatedData.success)
//         return res.status(400).send({ error: validatedData.error.flatten().fieldErrors })
//
//
//     let perPage = 2
//     let currentPage = validatedData.data.page ?? 0
//
//
//     let finalQuery = validatedData.data.q
//
//     if(finalQuery.includes("+"))
//         finalQuery = finalQuery.split("+").filter(fq => fq != "").join(" ")
//
//     const tweets = await findTweetsByBody(
//         finalQuery,
//         Number(currentPage),
//         perPage
//     )
//
//     res.json({ tweets, page: currentPage })
// }