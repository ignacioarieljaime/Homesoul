const nodemailer = require("nodemailer");

module.exports = {
  sendMailOld: async function (mainOptions) {
    var transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      app: "mail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  sendMail: async function (mailopt1) {
	let mailopt2 =  {
		from: '"Homesoul Platform" '+process.env.EMAIL_USER, // sender address
	}

	let mainOptions = {...mailopt1, ...mailopt2};

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log("Email sent: " + info.response);
        return true;
      }
    });
  },
  createTransporter: async function (email, password) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    return transporter;
  },
};
