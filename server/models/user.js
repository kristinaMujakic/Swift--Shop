const db = require("../db");
const bcrypt = require("bcrypt");
const ExpressError = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  static async register({ email, password, your_name }) {
    console.log("Received data for registration:", email, your_name); // Log the data received

    try {
      console.log("Modal/User: Trying to register user");
      const hashedPassword = await this.hashPassword(password);
      const result = await db.query(
        `INSERT INTO users (email, password, your_name)
                 VALUES ($1, $2, $3)
                 RETURNING email, your_name`,
        [email, hashedPassword, your_name]
      );

      return result.rows[0];
    } catch (error) {
      // Handle or log the error here
      console.error("Error in User.register: ", error.message);
      throw error; // Re-throw the error if you want calling code to handle it as well
    }
  }

  static async authenticate(email, password) {
    const result = await db.query(
      `SELECT password FROM users WHERE email = $1`,
      [email]
    );
    const user = result.rows[0];

    return user && this.comparePasswords(password, user.password);
  }

  static async get(email) {
    const result = await db.query(
      `SELECT email, your_name, cart FROM users WHERE email = $1`,
      [email]
    );

    if (!result.rows[0]) {
      return null; // Return null or similar if the user is not found
    }

    return result.rows[0];
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  }

  static async comparePasswords(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
