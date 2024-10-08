# DICAS
- Como usar os dados certos de criação/edição pelo prisma
```
Prisma.UserCreateInput
```
- Se for logar e não tiver email com aquela, apenas dizer "negado", pois evita que descubram email válidos



# Incicio do projeto
# 1
- helmet: Proteções extras


# 3 e 4
-  usa slug para relações com o user. tweet é por ID
- Para criar a relação de seguir, usa uma tabela extra
- Hashtags
    - Pega na hora de salvar
    - Criar uma tabela para armazenar todas as hashtags e incrementar se repetida




# Auth
- bcrypt-ts; slug (gerar ele); jsonwebtoken (os 2 ultimos precisam de types)
    - bcryptjs é melhor
- O token que usa secret só no servidor
```
    jwt.sign(
        {//payload
            slug
        },
        String(process.env.SECRET)
    )
```
- Permitir passar dados para o proximo via req. algo:
```
export type ExpandedRequestMiddleware =  Request & { 
    userSlug: string
}




```