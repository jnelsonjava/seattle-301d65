'use strict';

// On home page - see all my tasks
// on the add page - have a form to add tasks
// on the home page i can click a task to see a detail page about that specific task
// show errors on the error page when they happen

const express = require('express');
require('dotenv').config();
const pg = require('pg');

const PORT = process.env.PORT;
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);

// master rule for how to send data to front end - GET can render, POST must not

app.get('/tasks', getAllTasks);
app.get('/addTasks', viewAddTaskForm);
app.post('/tasks', makeNewTask);
app.get('/tasks/:potatoId', showSingleTask);

function showSingleTask(request, response){
  console.log('request.params', request.params);

  client.query('SELECT * FROM todos WHERE id=$1', [request.params.potatoId])
    .then(result => {
      response.render('pages/detail-todo', {task : result.rows[0]});
    });

}

function getAllTasks(req, res) {
  client.query('SELECT * FROM todos')
    .then(result => {
      console.log(result);
      res.render('pages/index', { todos: result.rows });
    });
}

function viewAddTaskForm(request, response){
  response.render('pages/add-todo');
}

function makeNewTask(request, response){
  console.log(request.body);
  const {task, criteria, category, repeats, frequency} = request.body;

  const SQL = `INSERT INTO todos 
    (task, criteria, category, repeats, frequency) 
    VALUES($1, $2, $3, $4, $5)`;
  const valuesArray = [task, criteria, category, repeats, frequency];

  client.query(SQL, valuesArray).then(() => {
    throw new Error('you done goofed');
    response.redirect('/tasks');
  }).catch((error) => handleError(error, response));
}

function handleError(error, response){
  console.error(error);
  response.render('pages/errors', {error});
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`we did it, its up on ${PORT}`));
  });
