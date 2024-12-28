import { z } from "zod";

export const searchSchema = z.object({
    q: z.string({ message: "Preencha a pesquisa" }).min(3, "Mínimo de 3 caracteres"),   
    page: z.string().optional()
    // page: z.coerce.number().min(0).optional()
})