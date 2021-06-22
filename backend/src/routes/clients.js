const conn = require('../database')

module.exports = {
  async get (req, res) {
    const db = await conn.getCollection('Client')
    const { businessName } = req.body
    const clients = await db.find({ businessName }, { projection: { businessName: 1, socialNumber: 1 } }).toArray()

    if (!clients) {
      return res.status(404).send({ error: 'Nenhum cliente encontrado!' })
    }

    return res.status(200).send({ clients })
  },

  async create (req, res, next) {
    const db = await conn.getCollection('Client')
    const { businessName, email, phone, socialNumber } = req.body
    const client = await db.findOne({ socialNumber }, { projection: { socialNumber } })

    if (!businessName || !email || !phone || !socialNumber) {
      return res.status(400).send({ error: 'Campo(s) obrigatório(s) não informado!' })
    }
    if (client) {
      return res.status(400).send({ error: 'Usuário já existe!' })
    }
    await db.insertOne({
      businessName,
      email,
      phone,
      socialNumber
    })
    next()
  }
}
