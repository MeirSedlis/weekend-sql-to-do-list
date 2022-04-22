CREATE TABLE "tasks"(
"id" SERIAL PRIMARY KEY,
"task" VARCHAR (255) NOT NULL,
"dueDate" DATE,
"importance" INT CHECK ("importance"<=5 AND "importance" >0),
"description" VARCHAR (500),
"complete" BOOLEAN DEFAULT FALSE
);

SELECT * FROM "tasks";