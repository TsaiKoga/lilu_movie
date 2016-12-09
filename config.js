module.exports = {
  dev: {
    host: "localhost",
    defaultPort: "3003"
  },
  heroku: {
    host: "lilumovie.herokuapp.com"
  },
  db: {
    mongolab: "@ds050879.mlab.com:50879/lilu_movie",
    mongoose: "mongodb://127.0.0.1:27017/lilu_movie"
  },
  jwtSecret: "somesecretkeyforjsonwebtoken"
}
