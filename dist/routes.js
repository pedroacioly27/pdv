"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const CategorieController_1 = require("./controllers/CategorieController");
const ClientController_1 = require("./controllers/ClientController");
const ProductController_1 = require("./controllers/ProductController");
const OrderController_1 = require("./controllers/OrderController");
const routes = (0, express_1.Router)();
routes.post('/users', new UserController_1.UserController().create);
routes.post('/login', new UserController_1.UserController().login);
routes.get('/categories', new CategorieController_1.CategorieController().getCategories);
routes.use(authMiddleware_1.authMiddleware);
routes.post('/categories', new CategorieController_1.CategorieController().create);
routes.delete('/categories/:id', new CategorieController_1.CategorieController().delCategorie);
routes.get('/profile', new UserController_1.UserController().getProfile);
routes.put('/users', new UserController_1.UserController().putUser);
routes.post('/clients', new ClientController_1.ClientController().create);
routes.put('/clients/:id', new ClientController_1.ClientController().putCliente);
routes.get('/clients', new ClientController_1.ClientController().getClients);
routes.get('/clients/:id', new ClientController_1.ClientController().getClientsById);
routes.post('/products', new ProductController_1.ProductController().create);
routes.get('/products', new ProductController_1.ProductController().getProduct);
routes.get('/products/:id', new ProductController_1.ProductController().getProductById);
routes.put('/products/:id', new ProductController_1.ProductController().putProduct);
routes.delete('/products/:id', new ProductController_1.ProductController().delProduct);
routes.post('/orders', new OrderController_1.OrderController().create);
routes.get('/orders', new OrderController_1.OrderController().getOrders);
exports.default = routes;