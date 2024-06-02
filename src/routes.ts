import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'
import { CategorieController } from './controllers/CategorieController'

const routes = Router()

routes.post('/users', new UserController().create)
routes.post('/login', new UserController().login)
routes.post('/categories', new CategorieController().create)
routes.get('/categories', new CategorieController().getCategories)
routes.use(authMiddleware)
routes.get('/profile', new UserController().getProfile)
routes.put('/users', new UserController().putUser)



export default routes
