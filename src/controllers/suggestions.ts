import { Response } from "express"
import { ExtendedRequest } from "../types/extended-request"
// import { IRequestHandler } from "../types/request"
import { getUserSuggestions } from "../services/user"


export const getSuggestions = async (req: ExtendedRequest, res: Response) => {
    const userSlug = String(req.userSlug)

    const suggestions = await getUserSuggestions(userSlug)

    res.json({ users: suggestions })
}