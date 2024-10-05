import { Router, Request, Response } from 'express';
import { signup, signin } from "../controllers/auth"
const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

router.get('/teste', (req: Request, res: Response) => {
    res.send('Testado 👍')
})


//cadatrar
router.post('/auth/signup', signup)
//login
router.post('/auth/signin', signin)


//Tweets
// router.post('/tweet', )
// router.get('/tweet/:id', )
// router.get('/tweet/:id/answers', )
// router.post('/tweet/:id/like', )//toggle like


//USER
// router.get('/user/:slug', )
// router.get('/user/:slug/tweets', )
// router.post("/user/:slug/follow", ) //toggle
// router.put('/user', )//avtar e image separados
// router.get('/user/avatar', )
// router.get('/user/cover', )



//feed
// router.get('/feed', )
// router.get('/search', )
// router.get('/trending', )
// router.get('/suggestions', )
// router.get('/teste/private', auth.teste)
export default router