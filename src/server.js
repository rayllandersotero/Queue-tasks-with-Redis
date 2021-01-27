require("dotenv/config");

const express = require("express");
const { setQueues, BullAdapter, router: bullRouter } = require("bull-board");

const Queue = require("./lib/queue");

const userController = require("./app/controllers/userController");

setQueues(Queue.queues.map((q) => new BullAdapter(q.bull)));

const app = express();
app.use(express.json());

app.use("/queues", bullRouter);
app.post("/users", userController.store);

const port = process.env.PORT;

app.listen(port || 8080, () => console.log(`listen posrt: ${port}`));
