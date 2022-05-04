import nodemailer from "nodemailer";

import { MailAdapter, SendEmailDTO } from "../contracts/MailAdapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7751fd3cee422c",
    pass: "40b20dad0b077c",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendEmailDTO) {
    await transport.sendMail({
      from: "Equipe Feedget <contato@feedget.com>",
      to: "Vinícius Oliveira <viniciuso.contato@gmail.com>",
      subject,
      html: body,
    });
  }
}
