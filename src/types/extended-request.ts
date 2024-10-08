import { Request } from "express"

export type ExpandedRequest =  Request & { 
    userSlug?: string
}