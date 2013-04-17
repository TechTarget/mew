// modules
var path = require('path'),
    cfg = require(process.cwd() + '/lib/config/user.json'),
    msg = require(process.cwd() + '/lib/modules/messaging'),
    nodemailer = require('nodemailer'),
    emailTemplates = require('email-templates');

var emailTemplatesDir = path.join(__dirname, '../templates'),
    smtpOptions = {
      service: cfg.smtp.emailService,
      auth: {
        user: cfg.smtp.emailUser,
        pass: new Buffer(cfg.smtp.emailPassword, 'base64').toString('ascii')
      }
    },
    smtpTransport = nodemailer.createTransport('SMTP', smtpOptions);

// returns an object that has config data for the email template
var getEmailTemplateData = function (notificationType) {
  return {
    name: cfg.notifications[notificationType].emailTemplateName,
    subject: cfg.notifications[notificationType].emailSubject,
    recipients: cfg.notifications[notificationType].recipients.join(', ')
  };
};

// sends an email of release notes to all receiptients
// data is an object that will be passed to the email template
exports.send = function (notificationType, data) {

  var emailTemplateData = getEmailTemplateData(notificationType);

  // add a couple more properties into data object
  data.username = cfg.username;
  data.fullname = cfg.fullname;

  emailTemplates( emailTemplatesDir, function (err, template) {

    if (err) { return msg.log('error', err); }

    // send the email
    template( emailTemplateData.name, data, function (err, html, text) {

      if (err) { return msg.log('error', err); }

      smtpTransport.sendMail({
        from: cfg.fullname + ' <' + cfg.email + '>',
        to: emailTemplateData.recipients,
        subject: emailTemplateData.subject + data.site,
        html: html,
        text: text
      }, function (err, res) {

        if (err) { return msg.con('error', 'emailFail', err); }

        msg.con('info', 'emailSuccess');
        msg.log('list', '\t' + res.message);

        // close the connection
        smtpTransport.close();

      });

    });

  });

};