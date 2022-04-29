const express = require("express");
const router = express.Router();

const pool = require("../modules/pool");

// GET 
router.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "tasks" ORDER BY "dueDate";';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error getting tasks", error);
      res.sendStatus(500);
    });
});

// POST
router.post("/", (req, res) => {
  let newTask = req.body;
  console.log(`Adding task`, newTask);

  let queryText = `INSERT INTO "tasks" ("task", "dueDate", "importance", "description")
                     VALUES ($1, $2, $3, $4);`;
  pool
    .query(queryText, [
      newTask.task,
      newTask.dueDate,
      newTask.importance,
      newTask.description,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

// PUT
router.put("/:taskId", (req, res) => {
  let sqlQuery = `
      UPDATE "tasks"
        SET "complete"=$1
        WHERE "id"=$2;
    `;
  let sqlValues = [req.body.newComplete, req.params.taskId];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log("error in PUT /task db request:");
      res.sendStatus(500);
    });
});

//DELETE
router.delete("/:taskId", (req, res) => {
  // We can access the value that was supplied
  // to this route parameter by:
  let taskToDelete = req.params.taskId;
  let sqlQuery = `
      DELETE FROM "tasks"
        WHERE "id"=$1;
    `;
  let sqlValues = [taskToDelete];
  pool
    .query(sqlQuery, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log("error in DELETE /tasks db request:");
      res.sendStatus(500);
    });
});

module.exports = router;
