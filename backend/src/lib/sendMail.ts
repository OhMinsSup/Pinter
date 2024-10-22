import * as nodemailer from 'nodemailer';
import * as config from '../config/config';

type MailTypes = {
  to: string;
  from: string;
  subject: string;
  html: string;
};

/**
 * @description nodemailer를 통해서 메일 보내기
 * @param {string} to
 * @param {string} from
 * @param {string} subject
 * @param {string} html
 * @returns {void}
 */
export const sendMail = ({ to, from, subject, html }: MailTypes) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.EMAIL,
      pass: config.PASS,
    },
  });

  let mailoptions: nodemailer.SendMailOptions = {
    to,
    from,
    subject,
    html,
  };

  transporter.sendMail(
    mailoptions,
    (err: Error, data: any): void => {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: %s', data.messageId);
      }
    }
  );
};
