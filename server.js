require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MongoDB conectado"))
.catch(err=>console.log(err));

const PeliculaSchema = new mongoose.Schema({
    titulo:String,
    genero:String
});

const Pelicula = mongoose.model('Pelicula', PeliculaSchema);

// CREATE
app.post('/peliculas', async(req,res)=>{
    const pelicula = new Pelicula(req.body);
    await pelicula.save();
    res.json(pelicula);
});

// READ
app.get('/peliculas', async(req,res)=>{
    const peliculas = await Pelicula.find();
    res.json(peliculas);
});

// UPDATE
app.put('/peliculas/:id', async(req,res)=>{

    const pelicula =
    await Pelicula.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );

    res.json(pelicula);

});

// DELETE
app.delete('/peliculas/:id', async(req,res)=>{
    await Pelicula.findByIdAndDelete(req.params.id);
    res.json({mensaje:"Eliminado"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`);
});