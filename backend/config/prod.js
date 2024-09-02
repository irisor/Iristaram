export default {
  dbURL: process.env.MONGO_URL || 'mongodb+srv://morello:*********@cluster0.xvpqzyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  dbName : process.env.DB_NAME || 'board_db'
}
