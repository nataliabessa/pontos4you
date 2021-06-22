const jwt = require('jsonwebtoken')

function verifyJWT (req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token informado.' })

  jwt.verify(token, 'urso', function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Falha na autenticação do token.' })

    next()
  })
}

module.exports = verifyJWT