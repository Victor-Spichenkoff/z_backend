import { string } from "zod"
import { db } from "../lib/db"
import { getPublicUrl } from "../utils/url"

export const findtweetById = async (id: number | string) => {
    const tweet = await db.tweet.findUnique({
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: { id: Number(id) }
    })

    if (tweet)
        tweet.user.avatar = getPublicUrl(tweet.user.avatar)

    return tweet
}


export const createTweet = async (userSlug?: string, body?: string, imageName?: string, answerOf?: number) => {
    if (!body || !userSlug)
        return null

    const newTweet = await db.tweet.create({
        data: {
            body,
            userSlug,
            image: imageName ?? null,
            answerOf: answerOf ?? 0
        }
    })

    return newTweet
}


export const findAnswersFromTweet = async (tweetId: string | number) => {
    const tweets = await db.tweet.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: { answerOf: Number(tweetId) }
    })

    for (let tweet of tweets)
        tweet.user.avatar = getPublicUrl(tweet.user.avatar)
    //erro aqui, pode precisar usar tweetSSSSSS[index]

    return tweets
}


export const checkIfTweetIslikedByUser = async (slug: string, tweetId: number) => {
    const isLiked = await db.tweetLike.findFirst({
        where: {
            userSlug: slug,
            tweetId
        }
    })

    //erro aqui ?
    return !!isLiked
}


export const unlikeTweet = async (slug: string, tweetId: number) => {
    await prisma?.tweetLike.deleteMany({
        where: {
            userSlug: slug,
            tweetId
        }
    })
}

export const likeTweet = async (slug: string, tweetId: number) => {
    await db.tweetLike.create({
        data: {
            userSlug: slug,
            tweetId
        }
    })
}



export const findTweetsByUser = async (slug: string, currentPage: number, perPage: number) => {
    console.log(slug, currentPage, perPage)
    const tweets = await db.tweet.findMany({
        include: {
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: { userSlug: slug, answerOf: 0 },//só os originais
        orderBy: { createdAt: "desc" },
        skip: currentPage * perPage,
        take: perPage
    })

    return tweets
}

export const findTweetFeed = async (following: string[], currentPage: number, perPage: number) => {
    const tweets = await db.tweet.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    avatar: true,
                    slug: true
                }
            },
            likes: {
                select: {
                    userSlug: true
                }
            }
        },
        where: {
            userSlug: { in: following },
            answerOf: 0
        },
        orderBy: { createdAt: "desc" },
        skip: currentPage * perPage,
        take: perPage
    })


    for (let tweetsIndex in tweets) 
        tweets[tweetsIndex].user.avatar = getPublicUrl(tweets[tweetsIndex].user.avatar)  


    return tweets
} 


export const findTweetsByBody = async (bodyContains: string, currentPage: number, perPage: number) => { 

        const tweets = await db.tweet.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        avatar: true,
                        slug: true
                    }
                },
                likes: {
                    select: {
                        userSlug: true
                    }
                }
            },
            where: {
                body: { 
                    contains: bodyContains,
                    // mode: "insensitive"
                },
                answerOf: 0
            },
            orderBy: { createdAt: "desc" },
            skip: currentPage * perPage,
            take: perPage
        })
    
        for (let tweetsIndex in tweets) 
            tweets[tweetsIndex].user.avatar = getPublicUrl(tweets[tweetsIndex].user.avatar)  
    
    
        return tweets
}