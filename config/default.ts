export default {
  port: 1337,
  dbUri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.apyij9i.mongodb.net/?retryWrites=true&w=majority`,
};
