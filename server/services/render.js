// const axios = require('axios')

// exports.homeRoutes = (req,res)=>{
//     //make a get request to api/users
//     axios.get('http://localhost:4000/api/users')
//      .then(function(response){
//         res.render('index',{users:response.data})
//      })
//     .catch(err=>{
//         res.send(err)
//     })
// }

// exports.add_user = (req,res)=>{
//     res.render('add_user')
// }

// exports.update_user = (req,res)=>{
//     axios.get('http://localhost:4000/api/users',{params:{ id: req.query.id}})
//     .then(function(userdata){
//         res.render('update_user',{user:userdata.data})
//     })
//     .catch(err=>{
//         res.send(err)
//     })
// }

const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../database/datas.json')

exports.homeRoutes = (req, res) => {
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    const users = JSON.parse(data);
    res.render('index', { users });
  });
};

exports.add_user = (req, res) => {
    res.render('add_user');
  };

  
exports.update_user = (req, res) => {
    const id = req.query.id; // Fetch the id parameter from the query string
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error reading data from the file' });
      }
      const users = JSON.parse(data);
      const user = users.find(u => u.id == parseInt(id));
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.render('update_user', { user }); // Pass the user object to the template
    });
  };