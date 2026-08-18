import express from 'express';

const sever = express();

const users = [
    {id: 1, name: 'Diego Miguel', gender: 'M'},
    {id: 2, name: 'Jorge Luiz', gender: 'M'},
    {id: 3, name: 'Leandro Barbosa', gender: 'M'},
    {id: 4, name: 'Yara Fernandes', gender: 'F'},
    {id: 5, name: 'João Henrique', gender: 'M'},
];

sever.get('/users', (req, res)=>{
    return res.status(200).json({
        error: false,
        message: 'Users List',
        result: users
    });
});

sever.get('/users/:id', (req, res)=>{
    const {id} = req.params;
    const user = users.find(u => u.id === parseInt(id));

    if (!user)
        return res.status(404).json({
        error: true,
        message: 'Users Not Found',
        result: null
    });
    
    return res.status(200).json({
        error: false,
        message: 'User Found',
        result: user
});
});

sever.get('/3info', (req, res)=>{
    res.status(200).json({
        error: false,
        message: '3infoB API',
    });
});

sever.get('/', (req, res)=>{
    res.send('Servidor Ligado!');
});

sever.listen(3000, ()=>{
    console.log('Server on.')
});