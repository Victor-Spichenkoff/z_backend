import { RequestHandler } from "express"
import { signupSchema } from "../schemas/signup"
import { findUserBySlug, getUserByEmail } from "../services/user"
import slug from "slug"


//criar e devolver o token
export const signup: RequestHandler = async (req, res): Promise<any> => {
    //verificações (email e slug)
    const validatedData = signupSchema.safeParse(req.body)

    if (!validatedData.success)
        return res.status(400).send({ error: validatedData.error.flatten().fieldErrors })


    const userByEmail = await getUserByEmail(validatedData.data.email, req)

    if (userByEmail)
        return res.status(400).send({ error: "E-mail já usado" })

    let generateSlug = true
    let userSlug = slug(validatedData.data.name)

    while (generateSlug) {//até criar um slug novo
        const userBySlug = await findUserBySlug(userSlug)
        
        if (userBySlug) {
            let slugSuffix = Math.floor(Math.random() * 9999999).toString()
            userSlug = slug(validatedData.data.name + slugSuffix)
        } else
            generateSlug = false
    }

    //gerar hash

    //crair user e token

    //devolver


    res.send("")
}

export const signin: RequestHandler = (req, res) => {

}