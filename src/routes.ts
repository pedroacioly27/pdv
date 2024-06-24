import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'
import { CategorieController } from './controllers/CategorieController'
import { ClientController } from './controllers/ClientController'
import { ProductController } from './controllers/ProductController'
import { OrderController } from './controllers/OrderController'

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
routes.get('/products/:id', new ProductController().getProductById)
routes.put('/products/:id', new ProductController().putProduct)
routes.delete('/products/:id', new ProductController().delProduct)

routes.post('/orders', new OrderController().create)
routes.get('/orders', new OrderController().getOrders)



export default routes
