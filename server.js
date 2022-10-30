import app from './express.js'
import config from './config/config.js'
import mongoose from 'mongoose'




mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

})
mongoose.connection.on('error', (err) => {
throw new Error(`unable to connect to database: ${err}`)
}
)
app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})