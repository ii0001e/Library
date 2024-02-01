const app = require('express')();
const port = 8080;
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');







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

add.post('/libraries', (req, res) => {
    games.push({
        id: games.length + 1,
        name: req.body.name,
        address: req.body.address,
        openingTime: req.body.openingTime,
        inactive: req.body.inactive
    });
    res.end();
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`);
})