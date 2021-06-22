const jwt = require('jsonwebtoken')

module.exports = {
  async generate (email) {
    if (!email) {
      throw Error(`Missing param: ${email}`)
    }
    return jwt.sign({ email }, 'urso', { expiresIn: '1d' })
  }
}
