import express from 'express';

const sever = express();

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