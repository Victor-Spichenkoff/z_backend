import { Request, RequestHandler, Response } from "express"
import { addTweetSchema } from "../schemas/tweet"
import { checkIfTweetIslikedByUser, createTweet, findAnswersFromTweet, findtweetById, likeTweet, unlikeTweet } from "../services/tweet"
import { ExtendedRequest } from "../types/extended-request"
import { addHashtag } from "../services/trend"


export const addTweet: RequestHandler = async (req: ExtendedRequest, res): Promise<any> => {
    const safeData = addTweetSchema.safeParse(req.body)
    if (!safeData.success)
        return res.status(400).send({ error: safeData.error.flatten().fieldErrors })

    if (safeData.data.answer) {//id de quem vai estar respondendo
        const hasAnswerTweet = await findtweetById(safeData.data.answer)

        if (!hasAnswerTweet)
            return res.status(400).send({ error: "Tweet original inexistente" })
    }


    // criação
    const newTweet = await createTweet(
        req.userSlug, //vem do middleware
        safeData.data.body,
        safeData.data.answer ? Number(safeData.data.answer) : 0
    )

    if (!newTweet)
        return res.status(500).send({ error: "Erro ao criar tweet" })


    const hashtags = safeData.data.body.match(/#[a-zA-Z0-9_]+/g)
    if (hashtags) {
        for (let hashtag of hashtags) {
            if (hashtag.length >= 2)
                await addHashtag(hashtag)
        }
    }

    res.send({ tweet: newTweet })
}


export const getTweetById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params

    if (!id)
        return res.status(400).send({ error: "Id não informado" })

    const tweet = await findtweetById(id)

    if (!tweet)
        return res.status(400).send({ error: "Tweet não encontrado" })

    res.send({ tweet })
}


export const getAnswers = async (req: ExtendedRequest, res: Response) => {
    const answers = await findAnswersFromTweet(req.params.id)

    res.json({ answers })
}


export const likeToggle = async (req: ExtendedRequest, res: Response) => {
    const { id } = req.params

    const isLiked = await checkIfTweetIslikedByUser(
        String(req.userSlug),
        Number(id)
    )

    if (isLiked)
        await unlikeTweet(
            String(req.userSlug),
            Number(id)
        )
    else
        await likeTweet(
            String(req.userSlug),
            Number(id)
        )

    res.send({ like: !isLiked })
}