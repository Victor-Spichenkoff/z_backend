# DICA
- receber dados como string, mas validar com o zod como number:
```
export const userTweets = z.object({
    page: z.coerce.number().min(0).optional()
            //ele converte "1" para 1, mas "1sdf" é erro
})
```
    - Para o caso de receber pelo body/query, vem sempre como string     


# DICAS
- Como usar os dados certos de criação/edição pelo prisma
```
Prisma.UserCreateInput
```
- Se for logar e não tiver email com aquela, apenas dizer "negado", pois evita que descubram email válidos



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

-----------------------------





# FROTEND


# DICAS
- sticky -> para deixar o menu colocado em um ponto, só o feed deve rolar



# ENTER NO formulário
- O Input deve aceitar a função de "onEnter"
```
```