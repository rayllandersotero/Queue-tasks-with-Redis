const passwordGenerator = require("password-generator");

const Queue = require("../../lib/queue");
const registrationMail = require("../../jobs/registrationMail");

module.exports = {
  async store(req, res) {
    const { name, email } = req.body;

    const user = {
      name,
      email,
      password: passwordGenerator(15, false),
    };

    await Queue.add(registrationMail.key, { user });

    return res.json(user);
  },
};
