import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'
import { CategorieController } from './controllers/CategorieController'
import { ClientController } from './controllers/ClientController'
import { ProductController } from './controllers/ProductController'

const routes = Router()

routes.post('/users', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/categories', new CategorieController().getCategories)
routes.use(authMiddleware)
routes.post('/categories', new CategorieController().create)
routes.delete('/categories/:id', new CategorieController().delCategorie)
routes.get('/profile', new UserController().getProfile)
routes.put('/users', new UserController().putUser)
routes.post('/clients', new ClientController().create)
routes.put('/clients/:id', new ClientController().putCliente)
routes.get('/clients', new ClientController().getClients)
routes.get('/clients/:id', new ClientController().getClientsById)
routes.post('/products', new ProductController().create)
routes.get('/products', new ProductController().getProduct)



export default routes
