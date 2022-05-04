export type SendEmailDTO = {
  subject: string;
  body: string;
};

export interface MailAdapter {
  sendMail: (data: SendEmailDTO) => Promise<void>;
}
