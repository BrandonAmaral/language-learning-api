export default {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/api',
  port: process.env.PORT || 8001,
  jwtSecret: process.env.JWT_SECRET || '8a5da52ed126447d359e70c05721a8aa',
};
