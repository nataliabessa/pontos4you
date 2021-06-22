const conn = require('../database')
const jwt = require('../infra/jwt')

module.exports = {
  async login (req, res) {
    const db = await conn.getCollection('User')
    const { email, password } = req.body
    const user = await db.findOne({ email, password })
    if (user) {
      const token = await jwt.generate(email)
      return res.status(200).send({ msg: 'Autorizado!', token })
    }

    return res.status(401).send({ error: 'Usuário não autorizado!' })
  },

  async create (req, res) {
    const db = await conn.getCollection('User')
    const { businessName, email, password, socialNumber } = req.body
    const user = await db.findOne({ email, socialNumber }, { projection: { password } })

    if (!businessName || !email || !password || !socialNumber) {
      return res.status(400).send({ error: 'Campo(s) obrigatório(s) não informado!' })
    }
    if (user) {
      return res.status(400).send({ error: 'Usuário já existe!' })
    }
    await db.insertOne({
      businessName,
      email,
      password,
      socialNumber
    })
    return res.status(200).send({ msg: 'Usuário criado com sucesso! ' })
  }
}
