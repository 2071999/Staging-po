require('dotenv').config(); 
const connectDB = require('../config/db'); 
const SampleData = require('../models/SampleData'); 
const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '../sampledata.json');
const data = fs.readFileSync(filePath, 'utf-8');
const jsonData = JSON.parse(data);


const insertData = async () => {
  let connection;
  try {
    connection = await connectDB(); 
    await SampleData.insertMany(jsonData);
    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    if (connection) {
      connection.disconnect(); 
    }
  }
};

insertData();