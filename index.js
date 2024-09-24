import express from 'express';
import bodyParser from 'body-parser';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Middleware to serve static files and handle form data
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Temporary data store
let posts = [];

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.post('/create', (req, res) => {
  const { title, description } = req.body;
  posts.push({ id: posts.length + 1, title, description });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render('edit', { post });
});

app.post('/edit/:id', (req, res) => {
  const { title, description } = req.body;
  const post = posts.find(p => p.id === parseInt(req.params.id));
  post.title = title;
  post.description = description;
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at  ${port}`);
});
