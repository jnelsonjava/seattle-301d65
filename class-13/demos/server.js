'use strict';

// On home page - see all my tasks
// on the add page - have a form to add tasks
// on the home page i can click a task to see a detail page about that specific task
// show errors on the error page when they happen

const express = require('express');
require('dotenv').config();
const pg = require('pg');
const methodOverride = require('method-override');
// looks for a key in the req.query to change the type of METHOD the request is into a new one

const PORT = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', console.error);

// master rule for how to send data to front end - GET can render, POST must not

app.get('/tasks', getAllTasks);
app.get('/addTasks', viewAddTaskForm);
app.post('/tasks', makeNewTask);
app.get('/tasks/:potatoId', showSingleTask);
app.delete('/tasks/:id', deleteTask);
app.put('/tasks/:idPotato', updateTask);

function updateTask(request, response){
  const SQL = `UPDATE todos SET
                task=$1,
                criteria=$2 WHERE id=$3`;
  const values = [request.body.task, request.body.criteria, request.params.idPotato];
  client.query(SQL, values)
    .then((result) => {
      console.log(result);
      response.redirect('/tasks');
    })
    .catch(console.error);
}

// I can send the id through request.params.id /deleteTask/:id
// I can send the id through request.query.id /deleteTask?id=
// I can send the id through request.body.id /deleteTask -(form) u(rlEncoded input name=id
function deleteTask(request, response){
  // const id = request.params.id;
  const {id} = request.params;
  const SQL = 'DELETE FROM todos WHERE id=$1';
  client.query(SQL, [id])
    .then(() => {
      response.redirect('/tasks');
    });
}

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
      // console.log(result);
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
    // throw new Error('you done goofed');
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
