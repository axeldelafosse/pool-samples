import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import { Injectable } from '@nestjs/common';
// import { Logger } from 'winston';

import { MailOptions } from 'nodemailer/lib/sendmail-transport';

import { mailer, app } from 'src/config';

import * as templates from './templates';

interface SendOptions {
  template: keyof typeof templates;
  data: any;
}

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    pool: true,
    port: 587,
    secure: false,
    auth: {
      user: mailer.user,
      pass: mailer.pass,
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10,
  });

  // eslint-disable-next-line max-params
  public constructor() {}

  private interceptSubject(subject: MailOptions['subject']) {
    return app.env === 'production' ? subject : `[${app.env}] ${subject}`;
  }

  private interceptRecipient(to: MailOptions['to']) {
    return app.env === 'production' ? to : mailer.techTeamEmails;
  }

  public async send(mailOpts: SendOptions & MailOptions) {
    const { template, data, to, subject, cc, bcc, from, ...options } = mailOpts;

    // eslint-disable-next-line import/namespace
    const mjml = await Promise.resolve(templates[template](data));
    const result = mjml2html(mjml);

    const mail: MailOptions = {
      html: result.html,
      from: from || mailer.defaultSender,
      to: this.interceptRecipient(to),
      subject: this.interceptSubject(subject),
      cc: this.interceptRecipient(cc),
      bcc: this.interceptRecipient(bcc),
      ...options,
    };

    if (!app.isTest) {
      await this.transporter.sendMail(mail);
    }
  }

  public lostPassword(email: string, passwordToken: string) {
    return this.send({
      template: 'lostPassword',
      data: { email, passwordToken },
      to: email,
      subject: 'Pool Password',
    });
  }
}
