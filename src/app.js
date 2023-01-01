const express = require("express");
const cors = require('cors');
const postsRoutes = require('../routes/posts');
const userRoutes = require('../routes/users');
const likesRoutes = require('../routes/likes');
const dislikesRoutes = require('../routes/dislikes');
const connectionsRoutes = require('../routes/connections');
const welcomeRoute = require('../routes/welcome');
const commentsRoute = require('../routes/comments');
const chatRoute = require('../routes/chat');
require('../db/mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const port = process.env.PORT;



app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// add this below app.use("/", routes) to make index.html a static file

app.use('/', welcomeRoute);
app.use('/api/auth', userRoutes);
app.use('/api/comments', commentsRoute);
app.use('/api/likes', likesRoutes);
app.use('/api/dislikes', dislikesRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/chat', chatRoute);

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
})