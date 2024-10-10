import { getTrending } from "../services/trend"
import { IRequestHandler } from "../types/request"

export const getTrends: IRequestHandler = async (req, res) => {
    const trends = await getTrending()

    res.json({ trends })
}