const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;




// const mongoose = require('mongoose')

// const connectDB = async ()=>{
//     try{
//         //mongoDB connection  
//         const con = await mongoose.connect(process.env.MONGO_URI,{
//             userNewUriParser:true,
//             userUnifiedTopology:true,
//             useFindAndModify:false,
//             useCreateIndex:true  // this properties will stop unwanted warnings
//         })
//         console.log(`MongoDB connected :${con.connection.host}`)
//     }catch(err){
//         console.log(err);
//         process.exit(1)

//     }
// }

// module.exports = connectDB what is to edit in this