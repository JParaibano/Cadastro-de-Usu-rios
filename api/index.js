/*
    Objetivo da API: "CRUD"

    - Criar um usuário
    - Listar um usuário
    - Editar um usuário
    - Deletar um usuário  

    Dados do meu MongoDB:

    User: jparaibano
    password: 6200 
*/
import express from 'express';
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();
app.use(express.json())
app.use(cors())

// Adicionando um Post
app.post('/usuarios', async (req, res) => {
    
    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    res.status(201).json(req.body);
})

// Listando o users e devolvendo o status de sucesso/200
app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()
    res.status(200).json(users);
})

// Editando dados do usuário
app.put('/usuarios/:id', async (req, res) => {
    
    await prisma.user.update({
        where: {
            id: req.params.id // Editando pelo parametro ID
        },
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })
    res.status(201).json(req.body);
})

// Deletando o Usuário
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id // Deletando o usuário pelo parametro ID
        }
    })
    // Devolvendo a mensagem de feedback "Usuário deletado com sucesso!"
    res.status(200).json({message: "Usuário deletado com sucesso!"})
})
app.listen(3000);

