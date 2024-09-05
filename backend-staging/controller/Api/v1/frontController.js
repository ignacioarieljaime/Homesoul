
const Service = require("../../../helpers/index");
const { Status } = require("../../../helpers/enum");
const ejs = require('ejs');
const send = Service.sendResponse;
const { Msg } = require("../../../helpers/localization");
const fs = require('fs');
const path = require('path');
const { HttpStatus, ErrorCode } = require("../../../errors/code");
const emailRepo = require("../../../helpers/email");
const LeadsModel = require('../../../model/leads');
const SiteSettings = require("../../../model/site_settings");


module.exports = {

    createLead: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrors(req, res)) {
                return;
            }

            let leadsDetails = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
                province: req.body.province,
                country: req.body.country
            };
            let data = {
                appName: process.env.APP_NAME
            }
            const templatePath = path.join(process.cwd(), 'views', 'emails', 'leads-email.ejs');

            const emailTemplate = fs.readFileSync(templatePath, 'utf-8');
            const htmlContent = ejs.render(emailTemplate, { leadsDetails, data });
            const emailTo = await SiteSettings.findOne({ where: { key: 'email_to' } })

            if (!emailTo || !emailTo.value) {
                return await Service.getInternalServerErrorResponse("Email settings not found.", res);
            }

            const emailAddresses = emailTo.value.split(',').map(email => email.trim());
            for (const email of emailAddresses) {
                const mailOption = {
                    to: email,
                    subject: "New Lead Submission",
                    html: htmlContent,
                };
                const isEmailSent = await emailRepo.sendMail(mailOption);
            }
            const newLead = await LeadsModel.create(leadsDetails);
            return await Service.getSuccessResponse(Msg.CREATE_LEADS_SUCCESS, res);
        } catch (error) {
            return await Service.getInternalServerErrorResponse(error.message, res);
        }
    }
}