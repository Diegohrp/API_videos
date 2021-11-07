const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class userService {
  constructor() {
    this.collection = 'user';
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser(user) {
    const { name, email, password } = user;
    //La contraseña se guardará como un hash, no como txt plano
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });

    return createUserId;
  }
}
