import express from "express";
import nodemailer from "nodemailer";

import { prisma } from "./prisma";

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7751fd3cee422c",
    pass: "40b20dad0b077c",
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      comment,
      type,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "Equpe Feedget <contato@feedget.com>",
    to: "Vinícius Oliveira <viniciuso.contato@gmail.com>",
    subject: "Novo feedback reportado",
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      `<h1>Novo feedback reportado</h1>`,
      `<p>Tipo: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });

  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => console.log("Server started on port 3333"));
