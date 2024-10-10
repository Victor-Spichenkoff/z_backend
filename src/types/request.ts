// resolver o problema com return
import { Request, Response } from "express"

export type IRequestHandler = (req: Request, res: Response) => any
