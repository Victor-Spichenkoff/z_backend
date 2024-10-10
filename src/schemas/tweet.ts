import { string, z } from "zod";

export const addTweetSchema = z.object({
    body: string({ message: "Informe um corpo" }),  
    answer: z.string().optional()
})