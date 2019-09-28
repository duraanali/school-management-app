const server = require('./server.js');
require('dotenv').config()

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
