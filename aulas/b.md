# DICA
- receber dados como string, mas validar com o zod como number:
```
export const userTweets = z.object({
    page: z.coerce.number().min(0).optional()
            //ele converte "1" para 1, mas "1sdf" é erro
})
```
    - Para o caso de receber pelo body/query, vem sempre como string     


# Lidar com tweets
## Pegar as realações
```
include: {
    user: {
        select: {
            name: true,
            avatar: true,
            slug: true
        }
    },
    likes: {
        select: {
            userSlug: true
        }
    }
},
```

