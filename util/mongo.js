const mongoose = require('mongoose')
const { mongoPath } = require('../config/config.json')

module.exports = async () => {
  mongoose.connect(mongoPath, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}