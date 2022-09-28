const express = require('express');
var cors = require('cors')
const app = express()
const Auth = require('./router/auth.router');
const Repo = require('./router/todo.router');
const client = require('./router/clientTracking.router')
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

const basePath = "/api";
app.use(`${basePath}/auth`,cors(),Auth);
app.use(`${basePath}/todo`,cors(),Repo);
app.use(`${basePath}/clientTracking`,cors(),client);


let PORT = process.env.port || 3000
app.listen(PORT, () => {
    console.log(`listen to the ${PORT}`)
})