const api = require('./api/server')

const HOST = 'localhost'
const PORT = 4000

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`))
