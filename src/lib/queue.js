const Bull = require("bull");

const redisConfig = require("../configs/redis");
const jobs = require("../jobs");

const queues = Object.values(jobs).map((job) => ({
  bull: new Bull(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

function add(name, data) {
  const queue = queues.find((q) => q.name === name);
  return queue.bull.add(data, queue.options);
}

function process() {
  return queues.forEach((queue) => {
    queue.bull.process(queue.handle);
    queue.bull.on("failed", (job, err) => {
      console.log("Job failed", job.key, job.data);
      console.log(err);
    });
  });
}

module.exports = {
  queues,
  add,
  process,
};
