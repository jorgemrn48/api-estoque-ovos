import express from 'express';
import routes from './routes/routes.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import path from 'path';
import { fileURLToPath } from 'url';
import webRoutes from './routes/web.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from'./swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

//Middleware de Log Global
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}` );
    next();
});

//Rotas
app.use('/api', routes);
app.use('/web', webRoutes);

app.get('/hello-pug', (req, res) => {
    res.render('hello', {
        title: "Página de teste PUG",
        message: "Ola pug!"
    });
});

//Swagger UI:
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.json({message: "API online e rodando no Render!"});
})

//Middleware de Rota não encontrada
app.use((req, res, next) => {
    res.status(404).json({mensagem: "Rota solicitada não existe"});
});

//Middleware de erros:
app.use(globalErrorHandler);

export default app;