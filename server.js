const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(cors());
app.use(bodyParser.json());


let championsLeagueData = {
    "name": "Champions League 2015/16",
    "groups": [
        {
            "group": "A",
            "team1": "Real Madrid",
            "team2": "Paris Saint-Germain",
            "team3": "FC Shakhtar Donetsk",
            "team4": "Malmö FF"
        },
        {
            "group": "B",
            "team1": "VfL Wolfsburg",
            "team2": "Manchester United FC",
            "team3": "PFC CSKA Moskva",
            "team4": "PSV Eindhoven"
        },
        {
            "group": "C",
            "team1": "Atlético Madrid",
            "team3": "SL Benfica",
            "team2": "Galatasaray İstanbul AŞ",
            "team4": "FC Astana"
        },
        {
            "group": "D",
            "team1": "Manchester City FC",
            "team2": "Sevilla FC",
            "team3": "Juventus",
            "team4": "Borussia Mönchengladbach",
        },
        {
            "group": "E",
            "team1": "Bayer 04 Leverkusen",
            "team2": "FC Barcelona",
            "team3": "AS Roma",
            "team4": "FC BATE Borisov"
        },
        {
            "group": "F",
            "team1": "Bayern München",
            "team2": "Arsenal FC",
            "team3": "GNK Dinamo Zagreb",
            "team4": "Olympiacos Piraeus FC"
        },
        {
            "group": "G",
            "team1": "Chelsea FC",
            "team2": "FC Porto",
            "team3": "FC Dynamo Kyiv",
            "team4": "Maccabi Tel-Aviv FC"
        },
        {
            "group": "H",
            "team1": "Valencia CF",
            "team2": "Olympique Lyonnais",
            "team3": "Zenit St. Petersburg",
            "team4": "KAA Gent"
        }
    ]

};


// Endpoint para obtener los datos
app.get('/api/data', (req, res) => {
    console.log(championsLeagueData)
    res.json(championsLeagueData);
});

// Endpoint para agregar un nuevo dato
app.post('/api/data', (req, res) => {
    const newItem = req.body;
    const itemExists = championsLeagueData.some(item => item.groups.group === newItem.groups.group);
    if (itemExists) {
        return res.status(400).json({ error: 'Group already exists' });
    }
    championsLeagueData.push(newItem);
    res.status(201).json(newItem);
});

// Endpoint para modificar un dato existente
app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.groups.group);
    const updatedItem = req.body;

    // Comprobamos si existe el dato
    if (id < 0 || id >= championsLeagueData.length) {
        return res.status(404).send('Item not found');
    }

    // Actualizamos el dato
    championsLeagueData[id] = updatedItem;
    res.json(updatedItem);
});

// Endpoint para eliminar un dato
app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Comprobamos si existe el dato
    if (id < 0 || id >= championsLeagueData.length) {
        return res.status(404).send('Item not found');
    }

    // Eliminamos el dato
    championsLeagueData.groups.splice(id, 1);
    res.status(204).send(); // 204 No Content
});

app.get('/api/championsLeagueData/:id', (req, res) => {
    const id = req.params.id;
    const item = championsLeagueData.find(item => item.id === id);

    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

