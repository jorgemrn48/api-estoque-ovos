import { connectDB } from './config/database.js';

const PORTA = process.env.PORT || 3000;

await connectDB();

const { default: app } = await import('./app.js');

app.get('/', (req, res) => {
    res.json({message: "API online e rodando no Render!"});
})

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
