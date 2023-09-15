// const Userdb = require('../model/model')
//var userdb =require('../model/model')

const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser')

const dataFilePath = path.join(__dirname, '../database/datas.json');

// Helper function to read data from the datas.json file
function readDataFromFile() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

// Helper function to write data to the datas.json file
function writeDataToFile(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

//create and save user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }
    
    // New user
    const user = {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
        id: Date.now(), // generate a unique Id
    };
    
    
    const data = readDataFromFile(); // Read existing data from the file 
    data.push(user); // Append the new user to the data array
    writeDataToFile(data); // Write the updated data back to the file
    // res.status(201).send({ message: "User created successfully", user });
    res.redirect('/add-user').status(201)
    
};


//retrive and return all users/retrive and return a single user
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Error retrieving user with ID ' + id });
            }
            const users = JSON.parse(data);
            const user = users.find(u => u.id === parseInt(id));
            if (!user) {
                return res.status(404).send({ message: 'Not found user with ID ' + id });
            }
            res.send(user);
        });
    } else {
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Error retrieving user information' });
            }
            const users = JSON.parse(data);
            res.send(users);
        });
    }
};

exports.findUserById = (req, res) => {
    const id = req.params.id;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error retrieving user with ID ' + id });
        }
        const users = JSON.parse(data);
        const user = users.find(u => u.id == parseInt(id));
        if (!user) {
            return res.status(404).send({ message: 'Not found user with ID ' + id });
        }
        res.send(user);
    });
};


//update a new identified user by user ID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty" });
    }
    const id = req.params.id;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error updating user information' });
        }
        const users = JSON.parse(data);
        const userIndex = users.findIndex(u => u.id == parseInt(id));
        if (userIndex === -1) {
            return res.status(404).send({ message: `Cannot update user with ID ${id}. Maybe user not found` });
        }
        users[userIndex] = { ...users[userIndex], ...req.body };
        fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Some error occurred while saving data to the file' });
            }
            res.send(users[userIndex]);
        
        });
    });
};


//delete a user with specifiied user ID in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Error deleting user with ID ' + id });
        }
        const users = JSON.parse(data);
        const updatedUsers = users.filter(u => u.id != parseInt(id));
        fs.writeFile(dataFilePath, JSON.stringify(updatedUsers, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Some error occurred while saving data to the file' });
            }
            res.send({ message: 'User was deleted successfully' });
        });
    });
};


