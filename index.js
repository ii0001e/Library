const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(cors());
app.use(express.json())






const libraries = [
    {id: 1, name: 'Mustamäe raamatukogu', address: 'Määrä 1, 123456', openingTime: "9-17", inactive: 1},
    {id: 2, name: 'Lasnamäe raamatukogu', address: 'Määrä 2, 123456', openingTime: "10-14", inactive: 1},
    {id: 3, name: 'Kopli raamatukogu', address: 'Määrä 3, 123456', openingTime: "9-17", inactive: 0},
    {id: 4, name: 'Kristiine raamatukogu', address: 'Määrä 4, 123456', openingTime: "8-18", inactive: 1},
    {id: 5, name: 'Haabersti raamatukogu', address: 'Määrä 5, 123456', openingTime: "10-19", inactive: 0},
    {id: 6, name: 'Pirita raamatukogu', address: 'Määrä 6, 123456', openingTime: "00-24", inactive: 1},
    {id: 7, name: 'Viimsi raamatukogu', address: 'Määrä 7, 123456', openingTime: "7-15", inactive: 1},
    {id: 8, name: 'Keila raamatukogu', address: 'Määrä 8, 123456', openingTime: "9-17", inactive: 0},
]

app.get('/libraries', (req, res) => {
    res.send(libraries);
});

app.get('/libraries/:id', (req, res) => {
    if (typeof libraries[req.params.id-1] === 'undefined'){
        return res.status(404).send({error: "Library is not found"});
    }
    res.send(libraries[req.params.id-1]);
});


app.post('/libraries', (req, res) => {
    if (!req.body.name ||!req.body.address ||!req.body.openingTime ||!req.body.inactive){
        return res.status(400).send({error: "One or all params are missing"});
    }
    let Library = {
        id: libraries.length + 1,
        name: req.body.name,
        address: req.body.address,
        openingTime: req.body.openingTime,
        inactive: req.body.inactive
    };
    libraries.push(Library);
    res.status(201)
                    .location(`${getBaseUrl(req)}/libraries/${libraries.length}`)
                    .send(Library);
});

app.delete('/libraries/:id', (req, res) => {
    if (typeof libraries[req.params.id-1] === 'undefined'){
        return res.status(404).send({error: "Library is not found"});
    }
    libraries.splice(req.params.id-1, 1);
    res.status(204).send({error: "Not content"});
});

app.patch('/libraries/:id', (req, res) => {
    let restult = libraries[req.params.id-1];
    if (typeof restult === 'undefined'){
        return res.status(404).send({error: "Library is not found"});
    }
    if (!req.body.name ||!req.body.address ||!req.body.openingTime ||!req.body.inactive){
        return res.status(400).send({error: "One or all params are missing"});
    }
    restult.name = req.body.name;
    restult.address = req.body.address;
    restult.openingTime = req.body.openingTime;
    restult.inactive = req.body.inactive;
    
    res.status(203).send(restult);
});


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted? 'https://' : 'http://' + req.headers.host;
}