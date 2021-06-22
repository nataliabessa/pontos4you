const conn = require('../database')
const { create } = require('./user')

module.exports = {
  async get(req, res) {
    const db = await conn.getCollection('Points')
    const { businessName } = req.body
    let client
    if (businessName) {
      client = await db.find({ businessName }, 
        { projection: { businessName: 1, socialNumber: 1 } }).toArray()
    } else {
      client = await db.find({}, { projection: { businessName: 1, socialNumber: 1 } }).toArray()
    }

    if (!client) {
      return res.status(404).send({ error: 'Nenhum cliente encontrado!' })
    }
    return res.status(200).send({msg:'', client })
  },

  async set(req, res) {
    const db = await conn.getCollection('Points')
    const { socialNumber, points } = req.body
    const { value } = await db.findOneAndUpdate({ socialNumber }, { $set:{ points } },
      { projection: { socialNumber: 1, points: 1 } })

    if (!value) {
      return res.status(404).send({ error: 'Nenhum cliente encontrado!' })
    }
    return res.status(200).send({ msg: 'Pontos atualizado com sucesso!', points: value })
  },

  async create(req, res) {
    const db = await conn.getCollection('Points')
    const { businessName, socialNumber } = req.body
    const clients = await db.findOne({ socialNumber }, 
      { projection: { businessName: 1, socialNumber: 1 } })

    if (clients) {
      return res.status(400).send({ error: 'Cliente já cadastrado!' })
    }

    await db.insertOne({ businessName, socialNumber, points: 0 })
    return res.status(200).send({ msg: 'Usuário e Ponto criado com sucesso'})
  }
}