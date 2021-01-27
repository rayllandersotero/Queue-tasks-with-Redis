const mailLib = require("../lib/mail");

async function handle({ data }) {
  const { user } = data;
  const { name, email } = user;

  const html =
    "<h1>Well come to DIO, __NAME__.</h1><p>You was successfully registered</p>";

  await mailLib.sendMail({
    from: "DIO <dev@dio.com.br>",
    to: `${name} <${email}>`,
    subject: "Wellcome!",
    html: html.replace("__NAME__", name),
    text: "You was successfully registered",
  });
}

module.exports = {
  key: "RegistrationMail",
  handle,
  options: {
    attempts: 5,
    backoff: 5000,
  },
};
