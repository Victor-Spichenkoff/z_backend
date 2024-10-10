import { db } from "../lib/db"

export const addHashtag = async (hashtag: string) => {
    const storageHs = await db.trend.findFirst({
        where: { hashtag }
    })

    if (storageHs)
        await db.trend.update({
            data: {
                counter: storageHs.counter + 1,
                upadtedAt: new Date()
            },
            where: { id: storageHs.id }
        })
    else
        await db.trend.create({
            data: { hashtag }
        })
}


export const getTrending = async () => {
    const trends = await db.trend.findMany({
        select: {
            hashtag: true,
            counter: true
        },
        orderBy: {
            counter: "desc"
        },
        take: 4
    })

    return trends
}