module.exports = (app) => {
    const usecases = require('../controllers/usecase.controller.js');

    // Create a new Usecase
    app.post('/usecases', usecases.create);

    // Retrieve all Usecases
    app.get('/usecases', usecases.findAll);

    // Retrieve a single Usecase with usecaseId
    app.get('/usecases/:usecaseId', usecases.findOne);

    // Update a Usecase with usecaseId
    app.put('/usecases/:usecaseId', usecases.update);

    // Delete a Usecase with usecaseId
    app.delete('/usecases/:usecaseId', usecases.delete);
}