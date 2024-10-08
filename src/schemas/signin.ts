import { z } from "zod";

export const signinSchema = z.object({
    email: z.string({ message: "Informe um e-mail" }).email({ message: "E-mail inválido" }),
    password: z.string({ message: "Informe uma senha" }).min(5, {message: "Senha deve ter 5 caracteres ou mais"})
})