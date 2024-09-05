const Service = require("../../helpers/index");
const AdminModel = require('../../model/admin');
const { Msg } = require("../../helpers/localization");
const bcrypt = require("bcrypt");
const { toastrHandler } = require('../../helpers');


const messageToStr = (errorMessage) => {
    return `${errorMessage}`;
};


module.exports = {
    signupForm: async function (req, res, next) {
        try {
            res.render('./auth/register', { title: 'Register' });
        } catch (error) {
            next(error);
        }
    },
    signup: async function (req, res, next) {
        try {
            const emailExist = await AdminModel.findOne({
                where: { emailID: req.body.emailID },
            });
            if (emailExist) {
                req.flash('error', Msg.EMAIL_ALREADY_EXIST);
                return res.redirect('/register');
            }
            const admin = await AdminModel.create({
                emailID: req.body.emailID,
                password: await bcrypt.hash(req.body.password, 10),
            });
            res.redirect("/")
        } catch (error) {
            next(error);
        }
    },
    loginForm: async function (req, res, next) {
        try {
            const result = toastrHandler(req)
            if (result == false) {
                res.render('./auth/login', { title: 'Login', req: null, res: res });
            } else {
                res.render('./auth/login', { title: 'Login', req: req, res: res });
            }
        } catch (error) {
            next(error);
        }
    },
    login: async function (req, res, next) {
        const { emailID, password } = req.body;
        try {
            const admin = await AdminModel.findOne({ where: { emailID } });
            if (!admin || !bcrypt.compareSync(password, admin.password)) {
                res.cookie("msg", { "error": Msg.INVALID_LOGIN_CREDENTIAL }, { httpOnly: true });
                return res.redirect('/');
            }
            const token = await Service.generateAccessToken(
                admin.id,
                process.env.JWT_SECRET,
                false
            );
            admin.login_access_token = token;
            await admin.save();
            res.cookie('token', token);
            res.redirect('/dashboard');
        } catch (error) {
            next(error);
        }
    },
    logout: async function (req, res, next) {
        try {
            const user = req.authUser;
            await AdminModel.update(
                { login_access_token: null },
                {
                    where: { id: user.id },
                }
            );
            res.clearCookie('token');
            res.cookie("msg", { "success": "Logged out!" }, { httpOnly: true });
            res.redirect("/")
        } catch (error) {
            next(error);
        }
    }
}