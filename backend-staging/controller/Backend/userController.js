const Service = require("../../helpers/index");
const sendView = Service.sendView;
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");
const path = require('path');
const fs = require('fs');
const UserModel = require("../../model/user");

module.exports = {

  form: async function (req, res, next) {
    try {
      const itemId = req.params.userId;
      var data = null;
      if (req.params !== null) {
        data = await UserModel.findById(itemId)
      }
      if (data === null) {
        sendView(res, { title: 'Add Form', filename: '../user/form', route: 'user', data: null, url: '/admin/user/add' })
      } else {
        const newData = {
          image: data.image,
          name: data.name,
          email: data.email,
          phone: data.phone,
          status: data.status,
          date_of_birth: data.date_of_birth,
          date_of_anniversary: data.date_of_anniversary
        }
        sendView(res, {
          title: 'Edit Form', filename: '../user/form', route: 'user', data: newData, url: '/admin/user/update/' + itemId
        })
      }
    } catch (error) {
      next(error);
    }
  },
  add: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }

      const { name, phone, email, date_of_birth, date_of_anniversary, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ 'message': Msg.PASSWORD_NOT_MATCH });
      }

      const emailExist = await UserModel.findOne({ email: email }).exec();
      if (emailExist) {
        return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ 'message': Msg.EMAIL_ALREADY_EXIST })
      }

      let imageUrl = '';
      if (req.files.image) {
        const folderName = 'user';
        imageUrl = await Service.imageUpload(req.files.image, folderName);
      }
      const userInfo = {
        name,
        phone,
        email,
        image: imageUrl,
        date_of_birth,
        date_of_anniversary,
        password: await Service.bcryptPassword(password),
      };
      const user = new UserModel(userInfo);
      const userData = await user.save();

      return res.status(HttpStatus.SUCCESS_CODE).send({ 'message': Msg.USER_ADD_SUCCESSFULLY, url: '/admin/user' })

    } catch (error) {
      next(error);
    }
  },
  list: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      sendView(res, { title: 'Users', filename: '../user/index', route: 'user', loadList: '/admin/user/load-list' })
    } catch (error) {
      next(error);
    }
  },
  getList: async function (req, res, next) {
    try {
      const { draw, start, length, search } = req.query;
      const searchTerm = search.value || '';
      const query = UserModel.find({
        $and: [{ isDeleted: false }],
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } },
        ]
      }).skip(parseInt(start)).limit(parseInt(length));
      const [data, recordsTotal] = await Promise.all([
        query,
        UserModel.countDocuments()
      ]);
      const formattedData = data.map(element => ({
        'name': element.name || '-',
        'email': element.email,
        'status': `<span class="badge ${element.status == 1 ? 'badge-success' : 'badge-danger'}">${element.status == 1 ? 'Active' : 'Inactive'}</span>`,
        'action': `<a href="/admin/user/edit/${element._id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>

                    <button type="button" onclick="deleteRecord('/admin/user/delete','${element._id}')" class="btn btn-danger btn-sm">
                    <i class="fas fa-solid fa-trash"></i>
                </button>`
      }));

      res.json({
        draw: parseInt(draw),
        recordsTotal,
        recordsFiltered: recordsTotal,
        data: formattedData
      });
    } catch (error) {
      next(error);
    }
  },
  update: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }

      const { name, phone, email, date_of_birth, date_of_anniversary, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ 'message': Msg.PASSWORD_NOT_MATCH });
      }

      const checkUser = await UserModel.findOne({ _id: req.params.userId }).exec();
      if (!checkUser) {
        return res.status(HttpStatus.NOT_FOUND).send({ 'message': Msg.USER_NOT_FOUND })
      }
      const checkEmail = await UserModel.findOne({
        $and: [
          { _id: { $ne: req.params.userId } },
          { email }
        ]
      }).exec();
      if (checkEmail) {
        return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ 'message': Msg.EMAIL_ALREADY_EXIST })
      }
      let imageUrl = checkUser.image;
      if (req.files) {
        const folderName = 'user';
        imageUrl = await Service.imageUpload(req.files.image, folderName, path.join(process.cwd(), checkUser.image));
      }
      checkUser.image = imageUrl;
      checkUser.name = name;
      checkUser.phone = phone;
      checkUser.email = email;
      checkUser.date_of_birth = date_of_birth;
      checkUser.date_of_anniversary = date_of_anniversary;
      if (password && password !== "") {
        checkUser.password = await Service.bcryptPassword(password);
      }
      const userData = await checkUser.save();
      if (!userData) {
        return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ 'message': Msg.SOMETHING_WENT_WRONG })
      }
      return res.status(HttpStatus.SUCCESS_CODE).send({ 'message': Msg.USER_UPDATE_SUCCESSFULLY, url: '/admin/user/edit/' + req.params.userId })
    } catch (error) {
      // console.log(error);
      next(error);
    }
  },
  delete: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      const detail = await UserModel.findOne({ _id: req.body.id }).exec();
      if (!detail) {
        return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ 'message': Msg.USER_NOT_FOUND })
      }
      const user = await UserModel.findById(req.body.id).exec();
      if (user) {
        if (detail.image) {
          const imagePath = path.join(process.cwd(), detail.image);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        user.isDeleted = true;
        user.save();
      }
      return res.status(HttpStatus.SUCCESS_CODE).send({ 'message': Msg.USER_DELETE_SUCCESSFULLY })
    } catch (error) {
      next(error)
    }
  },
};
