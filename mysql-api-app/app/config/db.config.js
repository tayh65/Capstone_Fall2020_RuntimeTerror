dbConfig = {
    HOST: "testdb.chzxcndsgvai.us-east-1.rds.amazonaws.com",
    USER: "tester",
    PASSWORD: "12345678",
    DB: "testdb",
    dialect: "mysql",
    port: "3306",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

module.exports = dbConfig;