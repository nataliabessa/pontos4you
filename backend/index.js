const MongoHelper = require('./src/database')

MongoHelper.run()
    .then(() =>{
        const app = require('./app')
        app.listen(8000, () => console.log('Server running at http://localhost:8000'))
    })
    .catch(console.error)