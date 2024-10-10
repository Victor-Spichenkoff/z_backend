import { NextFunction, Request, RequestHandler, Response } from "express"
import { signupSchema } from "../schemas/signup"
import { createUser, findUserBySlug, getUserByEmail } from "../services/user"
import slug from "slug"
import { compare, hash } from "bcryptjs"
import { createJWT } from "../utils/jwt"
import { signinSchema } from "../schemas/signin"
import jwt from 'jsonwebtoken'
import { ExtendedRequest } from "../types/extended-request"


//criar e devolver o token
export const signup: RequestHandler = async (req, res): Promise<any> => {
    // const { hash } = await import("bcrypt-ts")

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
    const passwordHash = await hash(validatedData.data.password, 10)
    validatedData.data.password = passwordHash

    //crair user e token
    const createdUser = await createUser({ ...validatedData.data, slug: userSlug })

    if(!createdUser)
        return res.status(500).send({ error: "Erro ao criar usuário" })



    const token = createJWT(userSlug)



    //devolver


    res.status(201).json({
        token,
        user: {
            name: createdUser.name,
            slug: createdUser.slug,
            avatar: createdUser.avatar, 
        }
    })
}



export const signin: RequestHandler = async (req, res): Promise<any> => {
    const validatedData = signinSchema.safeParse(req.body)

    if(!validatedData.success)
        return res.status(400).send({ error: validatedData.error.flatten().fieldErrors })

    const user = await getUserByEmail(validatedData.data.email)

    if(!user)
        return res.status(401).send({ error: "Acesso negado" })

    const isCorrectPassword = await compare(validatedData.data.password, user.password)

    if(!isCorrectPassword)
        return res.status(401).send({ error: "Acesso negado" })


    const token = createJWT(user.slug)


    res.json({
        token,
        user: {
            name: user.name,
            slug: user.slug,
            avatar: user.avatar, 
        }
    })
}



// export const privateMiddelware: RequestHandler = async (req, res, next): Promise<any> => {
export const privateMiddelware: RequestHandler = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    const authHeader: any = req.headers.authorization

    if(!authHeader)
        return res.status(401).send({ error: "Acesso negado" })


    const token = authHeader.split(" ")[1]

    jwt.verify(
        token,
        String(process.env.SECRET),
        async (error: any, payload: any) => {
            if(error)
                return res.status(401).send({ error: "Acesso negado" })

            const user = await findUserBySlug(payload.slug)

            if(!user)
                return res.status(401).send({ error: "Acesso negado" })

            //tudo certo
            req.userSlug = user.slug

            next() //tem que ficar aqui
        }
    )
}