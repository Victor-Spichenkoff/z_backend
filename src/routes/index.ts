import { Router, Request, Response } from 'express';
import { signup, signin, privateMiddelware } from "../controllers/auth"
import { addTweet, deleteTweet, getAnswers, getLikeStatusForUser, getTweetById, likeToggle } from '../controllers/tweet'
import { followToggle, getCurrentStateOfFollow, getUser, getUserTweets, updateUser } from "../controllers/user"
import { getFeed } from '../controllers/feed';
import { searchTweets } from '../controllers/search';
import { getTrends } from '../controllers/trend';
import { getSuggestions } from '../controllers/suggestions';
import { UploadMiddleaware } from '../middlewares/upload';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

router.get('/teste', (req: Request, res: Response) => {
    res.send('Testado 👍')
})

router.get("/static", (req, res, next) => {
    next()
})



//cadatrar
router.post('/auth/signup', signup)
//login
router.post('/auth/signin', signin)



router.use(privateMiddelware)


//Tweets
// image == nome que deve receber o campo na hora de envar a imagem
router.post('/tweet', UploadMiddleaware.single("image"), addTweet)
router.get('/tweet/:id', getTweetById)
router.get('/tweet/:id/answers', getAnswers)
router.get("/tweet/:id/likes", getLikeStatusForUser)
router.post('/tweet/:id/like', likeToggle)//toggle like
router.delete("/tweet/:id", deleteTweet)


//USER
router.get('/user/:slug', getUser)
router.get('/user/:slug/tweets', getUserTweets)
router.get('/user/follow/state/:checkSlug', getCurrentStateOfFollow)
router.post("/user/:slug/follow", followToggle) //toggle
router.put('/user', updateUser)//avatar e image separados
// router.get('/user/avatar', )
// router.get('/user/cover', )



//feed
router.get('/feed', getFeed)
router.get('/search', searchTweets)
router.get('/trending', getTrends)
router.get('/suggestions', getSuggestions)


router.get('/private/teste', (req: Request, res: Response) => {
    res.send('Testado 👍 privado 🔒')
})



export default router