import dotenv from 'dotenv'
dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "POSTrequestobjectreceivestheemailandpasswordin",
    mongoUri: process.env.MONGODB_URI ||'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + process.env.MONGO_DB_NAME + '?retryWrites=true&w=majority'
}
export default config