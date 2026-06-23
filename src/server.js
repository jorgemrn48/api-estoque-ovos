import { connectDB } from './config/database.js';

const PORTA = 3000;

await connectDB();

const { default: app } = await import('./app.js');

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
    console.log(`API disponível em http://localhost:${PORTA}/api`);
});
