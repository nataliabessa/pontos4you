const { MongoClient } = require('mongodb')

module.exports = {
    async run() {
        try {
            this.uri = 'mongodb://localhost:27017'
            this.client = await MongoClient.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            this.db = this.client.db('pontos4you')
        } catch (error) {
            console.log(error)
        }
    },

    async close() {
        await this.client.close()
        this.client = null
        this.db = null
    },

    async getCollection(name) {
        if (!this.client || !this.client.isConnected()) {
            await this.connect(this.uri)
        }
        return this.db.collection(name)
    }
}
