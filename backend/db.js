const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/image_check';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    console.log("connected to the database")
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });


module.exports = mongoose;
