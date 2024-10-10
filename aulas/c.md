# DICA
- pesquisa no prisma:
```
where: {
    body: { 
        contains: textQueVaiComparar,
        // mode: "insensitive"//acho que é default
    }
},
```

# Sugestões (raw)
```
const suggestions = await db.$queryRaw`
    SELECT 
        name, avatar, slug
    FROM "User"
    WHERE
        slug NOT IN (${Prisma.join(followingAndMe)})
    ORDER BY RANDOM()
    LIMIT 2
`
```
 
- Lidar com TYPES
```
type ISuggestion = Pick<//do proproi ts
    Prisma.UserGetPayload<Prisma.UserDefaultArgs>,//full, o original
    "name" | "avatar" | "slug"//o que eu vou usar
>
```