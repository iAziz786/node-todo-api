const {ObjectID} = require('mongodb');
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const someTodos = [{
    _id: new ObjectID(),
    text: "First dummy todo"
}, {
    _id: new ObjectID(),
    text: "Second dummy todo",
    completed: true,
    completedAt: 23456
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(someTodos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = "Test todo text";

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done()
                }).catch(err => done(err));
            })
    });

    it('should not create todo with invalid body data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done()
                }).catch(err => done(err));
            })

    });
});

describe('GET /todos', () => {
    it('should get all the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get all todos', (done) => {
        request(app)
            .get(`/todos/${someTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(someTodos[0].text);
            })
            .end(done);
    });

    it('should return 404 if object is not found', (done) => {
        var newId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${newId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if pass an invalid ID', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove an item from database', (done) => {
        var hexId = someTodos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((result) => {
                    expect(result).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 if todo is not found', (done) => {
        var fakeId = new ObjectID().toHexString()
        request(app)
            .delete(`/todos/${fakeId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
})

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var hexId = someTodos[0]._id.toHexString();
    var completedTodo = {
      text: "This is completed todo",
      completed: true
    };
    request(app)
      .patch(`/todos/${hexId}`)
      .send(completedTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return res.status(404).send();
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo.text).toBe(completedTodo.text);
          expect(todo.completed).toBe(true);
          expect(todo.completedAt).toBeA('number');
          done();
        }).catch((e) => done(e));
      });

  });

  it('should set clear completedAt when completed is false', (done) => {
    var hexId = someTodos[1]._id.toHexString();
    var incompletedTodo = {
      text: "This is an incompleted todo",
      completed: false
    }
    request(app)
      .patch(`/todos/${hexId}`)
      .send(incompletedTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return res.status(404).send();
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo.text).toBe(incompletedTodo.text);
          expect(todo.completed).toBe(false);
          expect(todo.completedAt).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });
});
