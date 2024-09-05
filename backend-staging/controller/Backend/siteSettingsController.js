const Service = require("../../helpers/index");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");
const SiteSettingsModel = require("../../model/site_settings");

module.exports = {
    form: async function (req, res, next) {
        try {
            const settingsData = await SiteSettingsModel.findAll();
            const formattedSettings = {};

            settingsData.forEach(setting => {
                if (setting.key !== 'id') {
                    if (setting.key === 'siteLogo' || setting.key === 'siteIcon') {
                        setting.value = process.env.BASE_URL + setting.value; // Assuming you prepend BASE_URL to image paths
                    }
                    formattedSettings[setting.key] = setting.value;
                }
            });

            res.render("site-settings/form", {
                title: "Site Settings Form",
                route: "settings",
                data: formattedSettings,
                url: "/site-settings/save",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    save: async function (req, res, next) {
        try {
            if (Service.hasValidatorErrorsBackend(req, res)) {
                return;
            }

            const reqData = req.body;
            const settingKeysToUpdate = ['siteLogo', 'siteIcon'];

            for (let key in reqData) {
                let value = reqData[key];

                if (settingKeysToUpdate.includes(key)) {
                    const existingSetting = await SiteSettingsModel.findOne({ where: { key: key } });

                    if (req.files && req.files[key]) {
                        const folderName = 'settings';
                        const imagePath = await Service.imageUpload(req.files[key], folderName);
                        value = imagePath;

                        if (existingSetting && existingSetting.value) {
                            await Service.deleteFile(existingSetting.value);
                        }
                    } else if (value && existingSetting) {

                    }
                }

                let setting = await SiteSettingsModel.findOne({ where: { key: key } });

                if (!setting) {
                    setting = await SiteSettingsModel.create({ key: key, value: value });
                } else {
                    await setting.update({ value: value });
                }
            }
            return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.SITE_SETTINGS_UPDATE_SUCCESSFULLY, url: "/site-settings " });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};
