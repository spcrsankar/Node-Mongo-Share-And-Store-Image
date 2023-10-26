const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const db = require('./db');
const cors=require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a Mongoose model for image storage
const Image = mongoose.model('Image', {
  data: Buffer,
  contentType: String,
});

// Define a route for handling image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image uploaded.');
  }
  
  // Save the uploaded image to MongoDB
  const image = new Image({
    data: req.file.buffer,
    contentType: req.file.mimetype,
  });

  image.save()
    .then((savedImage) => {
      res.status(200).send('Image uploaded successfully.');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error uploading image to MongoDB.');
    });
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
