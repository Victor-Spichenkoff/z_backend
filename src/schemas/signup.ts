import { string, z } from "zod";

export const signupSchema = z.object({
    name: string({ message: "Informe um nome" }).min(2, { message: "Nome deve ter 2 caracteres ou mais" }),
    email: z.string({ message: "Informe um e-mail" }).email({ message: "E-mail inválido" }),
    password: z.string({ message: "Informe uma senha" }).min(5, {message: "Senha deve ter 5 caracteres ou mais"})
})