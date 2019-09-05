const express = require('express');
const path = require('path');
const requestBodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const authorizationRouter = require('./server/routes/auth-routes');
const userRouter = require('./server/routes/user-routes');
const mentorRouter = require('./server/routes/mentor-routes');
const sessionRouter = require('./server/routes/session-routes');

const swaggerDocument = require('./swagger.json');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('UI'));

app.use(
  requestBodyParser.urlencoded(
    {
      extended: true,
    }
  )
);

app.use(requestBodyParser.json());

// landing page to Free Mentors application
app.get(['/', '/api/v1'], (req, res) => {
  res.sendFile(path.join(`${__dirname}/UI/index.html`));
});

app.use('/api/v1/auth', authorizationRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/mentor', mentorRouter);
app.use('/api/v1/sessions', sessionRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Free mentors app listening on port ${port}.`));

export default app;
