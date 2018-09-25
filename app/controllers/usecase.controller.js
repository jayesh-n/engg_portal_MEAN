const Usecase = require('../models/usecase.model.js');

// Create and Save a new Usecase
exports.create = (req, res) => {
	// Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Usecase content can not be empty"
        });
    }

    // Create a Usecase
    const usecase = new Usecase({
        
		name: req.body.name || "Untitled Usecase", 
		sponsor: req.body.sponsor,
		value: req.body.value,
		description: req.body.description,
		users: req.body.users
    });

    // Save Usecase in the database
    usecase.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Usecase."
        });
    });

};

// Retrieve and return all usecases from the database.
exports.findAll = (req, res) => {
	
	Usecase.find()
    .then(usecases => {
        res.send(usecases);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving usecases."
        });
    });

};

// Find a single usecase with a usecaseId
exports.findOne = (req, res) => {
	
	Usecase.findById(req.params.usecaseId)
    .then(usecase => {
        if(!usecase) {
            return res.status(404).send({
                message: "Usecase not found with id " + req.params.usecaseId
            });            
        }
        res.send(usecase);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usecase not found with id " + req.params.usecaseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving usecase with id " + req.params.usecaseId
        });
    });

};

// Update a usecase identified by the usecaseId in the request
exports.update = (req, res) => {
	
	// Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Usecase content can not be empty"
        });
    }

    // Find usecase and update it with the request body
    Usecase.findByIdAndUpdate(req.params.usecaseId, {
        name: req.body.name || "Untitled Usecase", 
		sponsor: req.body.sponsor,
		value: req.body.value,
		description: req.body.description,
		users: req.body.users
    }, {new: true})
    .then(usecase => {
        if(!usecase) {
            return res.status(404).send({
                message: "Usecase not found with id " + req.params.usecaseId
            });
        }
        res.send(usecase);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usecase not found with id " + req.params.usecaseId
            });                
        }
        return res.status(500).send({
            message: "Error updating usecase with id " + req.params.usecaseId
        });
    });

};

// Delete a usecase with the specified usecaseId in the request
exports.delete = (req, res) => {
	
	Usecase.findByIdAndRemove(req.params.usecaseId)
    .then(usecase => {
        if(!usecase) {
            return res.status(404).send({
                message: "Usecase not found with id " + req.params.usecaseId
            });
        }
        res.send({message: "Usecase deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Usecase not found with id " + req.params.usecaseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete usecase with id " + req.params.usecaseId
        });
    });

};