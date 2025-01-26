const mongoose = require('mongoose');

const SampleDataSchema = new mongoose.Schema({
  DATE: { type: String, required: true },
  HSCODE: { type: Number, required: true },
  HSCODE2: { type: Number, required: true },
  PRODUCT: { type: String, required: true },
  QUANTITY: { type: Number },
  UNIT: { type: String, required: true },
  UNIT_RATE: { type: Number, required: true },
  CURRENCY: { type: String, required: true },
  TOTALUSD: { type: Number, required: true },
  DESTINATION: { type: String, required: true },
  ORIGIN: { type: String, required: true },
  EXPORTER: { type: String, required: true },
  IMPORTER: { type: String, required: true },
});

module.exports = mongoose.model('SampleData', SampleDataSchema);