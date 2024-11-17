

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

