import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.get('/', (req, res) => {
    res.status(201).json('ok')
})

routes.post('/users', new UserController().create)
routes.post('/login', new UserController().login)
routes.use(authMiddleware)
routes.get('/profile', new UserController().getProfile)



export default routes
