const { validationResult } = require("express-validator");
const { HttpStatus, ErrorCode } = require("../errors/code");
const otpGenerator = require("otp-generator");
const { ACTION } = require("./enum");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { Msg } = require("../helpers/localization");
const JWT_EXPIRES_IN = '4h'
const fs = require('fs');
const axios = require('axios');
const crypto = require("crypto");
const { Op } = require("sequelize");
const AuditorPincodeModel = require("../model/auditor_pincode");
const AuditorRejectedAuditModel = require("../model/auditor_rejected_audit");
const AuditsModel = require("../model/audits");
const AuditStatusLog = require("../model/audit_status_log");
const { AUDIT_STATUS_ID, AUDIT_STATUS_NAME, AUDIT_STATUS_NAME_FRONTEND } = require("../helpers/enum");



function getAppName() {
    return process.env.APP_NAME
}

/**
 * This function is use for generate jwt token
 * 
 * @param {any} payload - payload
 * @param {String} expiresIn - expiresIn
 * @returns {any} - token
 */
async function generateJwt(payload, expiresIn) {
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
        algorithm: process.env.JWT_ALGORITHM,
    });
    return token;
}
function toastrHandler(req) {
    if (req.cookies['msg']) {
        if (req.cookies['msg'].error) {
            req.toastr.error(req.cookies['msg'].error);
        } else if (req.cookies['msg'].success) {
            req.toastr.success(req.cookies['msg'].success);
        }
    } else {
        return false;
    }
}
/**
 * This function is use for prepare response
 * 
 * @param {Number} status - status
 * @param {String} message - message
 * @param {any} data - data
 * @returns {any} - response
 */
function prepareResponse(status, message, data) {
    if (data != null || data != undefined) {
        return {
            responseCode: status,
            responseMessage: message,
            responseData: data,
        };
    }
    return {
        responseCode: status,
        responseMessage: message,
    };
}

/**
 * This function is use for check validators error
 * 
 * @param {any} req - req
 * @param {any} res - res
 * @returns {Boolean} - response
 */
function hasValidatorErrors(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        res.status(400).json(prepareResponse(ErrorCode.REQUIRED_CODE, err.msg, null));
        return true;
    } else {
        return false;
    }
}

function hasValidatorErrorsBackend(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        res.status(400).send({ 'code': ErrorCode.REQUIRED_CODE, 'message': err.msg })
        return true;
    } else {
        return false;
    }
}

/**
 * This function is use for generate token
 * 
 * @param {String} userId - userId
 * @param {Number} type - type
 * @returns {any} - res
 */
async function generateAccessToken(userId, type, isRememberMe) {
    return generateJwt({
        sub: userId,
        action: ACTION.Access,
        type: type
    }, isRememberMe == "true" ? process.env.JWT_REMEMBER_ME_EXPIRES_IN : process.env.JWT_EXPIRES_IN);
}

/**
 * This function is use for get current timeStamp
 * 
 * @returns {any} - res
 */
function getCurrentTimeStampUnix() {
    return moment().unix();
}
function frDate(date, format = 'YYYY-MM-DD') {
    const formattedDate = moment(date, format).format('DD/MM/YYYY');
    return formattedDate;
}
function getCodeExpiresTimestamp() {
    const currentTimestampInSeconds = Math.floor(new Date().getTime() / 1000);
    const newTimestampInSeconds = currentTimestampInSeconds + 900;
    const newTimestampInMilliseconds = newTimestampInSeconds * 1000;
    const newDate = new Date(newTimestampInMilliseconds);
    return newDate;
}
/**
 * This function is use for verify jwt
 * 
 * @param {String} token - token
 * @returns {any} - res
 */
function verifyJwt(token) {
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenData && this.getCurrentTimeStampUnix() > tokenData.exp) {
            return {
                isValid: false,
                reason: "expired"
            };
        } else if (tokenData && this.getCurrentTimeStampUnix() < tokenData.exp) {
            return {
                isValid: true,
                ...tokenData
            };
        } else {
            return {
                isValid: false,
                reason: "invalid"
            };
        }
    } catch (err) {
        return {
            isValid: false,
            reason: "invalid"
        };
    }
}

/**
 * This function is use for pagination 
 * 
 * @param {any} data - data
 * @returns {any} res 
 */
function parsePagination(data) {
    let perPage = data.perPage > 0 ? Number(data.perPage) : 10;
    let page = data.page > 0 ? Number(data.page) - 1 : 0;
    let skip = perPage * page
    return { skip, perPage, page }
}

/**
 * This function is use for prepare Sort Object
 * 
 * @param {any} data - data
 * @returns {any} sortObj
 */
function parseSort(data) {
    const sortField = data.sortField
    sortObj = {
        createdAt: 1,
    };
    if (sortField != undefined && data.sortType == "asc") {
        sortObj = {
            [sortField]: 1,
        };
    } else if (sortField != undefined && data.sortType == "desc") {
        sortObj = {
            [sortField]: -1,
        };
    }
    return { sortObj }
}

/**
 * This function is use for generate number
 * 
 * @param {Number} length -length
 * @returns {Number} res
 */
function randomNumber(length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}


/**
 * This function is use for prepare search filter
 * 
 * @param {String} search - search
 * @param {String} fieldName - fieldName
 * @returns {any} filterData
 */
function prepareSearchFilter(search, fieldName) {
    var filterData = []
    if (fieldName.length == 1) {
        // filterData = [{
        //     [fieldName[0]]: {
        //         $regex: search,
        //         $options: "$i"
        //     }
        // }]   
        filterData = [{
            [fieldName[0]]: { $regex: new RegExp(search, "i") }
        }]

        return filterData
    }
    for (let i = 0; i < fieldName.length; i++) {
        // const data = {
        //     [fieldName[i]]: {
        //         $regex: search,
        //         $options: "$i"
        //     }
        // }
        const data = {
            [fieldName[i]]: { $regex: new RegExp(search, "i") }
        }

        filterData.push(data)
    }
    return filterData
}

// query.name = { $regex: new RegExp(search, "i") };


/**
 * This function is use for prepare pagination response
 * 
 * @param {any} dataList - dataList
 * @param {Number} dataCount - dataCount
 * @param {Number} perPage - perPage
 * @param {Number} page - page
 * @returns {any} responseData
 */
function preparePaginationResponse(dataList, dataCount, perPage, page) {
    let responseData = {
        list: dataList,
        perPage: perPage,
        page: page + 1,
        totalRecord: dataCount,
        totalPage: Math.ceil(dataCount / perPage),
    };
    return responseData;
}

/**
 * This function is use for upload image
 * 
 * @param {any} fileData - fileData
 * @param {String} id - id 
 * @returns {any} res
 */
async function imageUpload(fileData, folderName, oldImagePath = null) {
    const file = fileData;
    const extension = path.extname(fileData.name);
    const fname = moment() + "_" + randomNumber(10) + extension;

    fs.promises.mkdir('./uploads/', { recursive: true });

    if (!fs.existsSync('./uploads/' + folderName)) {
        fs.promises.mkdir('./uploads/' + folderName, { recursive: true });
    }

    if (oldImagePath) {
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
    }

    await file.mv(
        "./uploads/" + folderName + "/" + fname,
        function (err, result) {
            if (err)
                console.log(err);
            return err
        }
    );
    return `/uploads/${folderName}/${fname}`;
}


// async function imageUpload(filesData, folderName, oldImagePaths = null) {
//     const uploadedImages = [];
//     const promises = [];
//     for (let i = 0; i < filesData.length; i++) {
//         const file = filesData[i];
//         const extension = path.extname(file.name);
//         const fname = moment() + "_" + randomNumber(10) + extension;

//         if (!fs.existsSync('./uploads/' + folderName)) {
//             fs.promises.mkdir('./uploads/' + folderName, { recursive: true });
//         }

//         if (oldImagePaths && oldImagePaths[i]) {
//             if (fs.existsSync(oldImagePaths[i])) {
//                 fs.unlinkSync(oldImagePaths[i]);
//             }
//         }

//         const promise = new Promise((resolve, reject) => {
//             file.mv(
//                 "./uploads/" + folderName + "/" + fname,
//                 function (err, result) {
//                     if (err) {
//                         console.log(err);
//                         reject(err);
//                     } else {
//                         uploadedImages.push(`/uploads/${folderName}/${fname}`);
//                         resolve();
//                     }
//                 }
//             );
//         });
//         promises.push(promise);
//     }
//     await Promise.all(promises);
//     return uploadedImages;
// }

async function audioUpload(fileData, folderName, oldAudioPath = null) {
    const file = fileData;
    const extension = path.extname(fileData.name);
    const fname = moment() + "_" + randomNumber(10) + extension;

    if (!fs.existsSync('./uploads/' + folderName)) {
        fs.promises.mkdir('./uploads/' + folderName, { recursive: true });
    }

    if (oldAudioPath) {
        if (fs.existsSync(oldAudioPath)) {
            fs.unlinkSync(oldAudioPath);
        }
    }

    await file.mv(
        "./uploads/" + folderName + "/" + fname,
        function (err, result) {
            if (err)
                console.log(err);
            return err;
        }
    );
    return `/uploads/${folderName}/${fname}`;
}

async function storeBuffer(buffer, folderName, oldFilePath = null) {
    try {
        const extension = '.png';
        const fname = moment() + "_" + randomNumber(10) + extension;
        const uploadDirectory = path.join('./uploads/', folderName);

        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }

        if (oldFilePath) {
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }
        const filePath = path.join(uploadDirectory, fname);
        fs.writeFileSync(filePath, buffer);

        return `/uploads/${folderName}/${fname}`;
    } catch (error) {
        console.error('Error storing buffer:', error);
        throw error;
    }
}

/**
 * This function is use for bcrypt password
 * 
 * @param {String} password - password
 * @returns {any} password
 */
async function bcryptPassword(password) {
    const genSalt = await bcrypt.genSalt(10)
    const hasPassword = await bcrypt.hash(password, genSalt)
    return hasPassword
}

/**
 * This function is use for prepare send response
 * 
 * @param {any} res - res
 * @param {Number} status - status
 * @param {Number} code - code
 * @param {String} message - message
 * @param {any} payload - payload
 * @returns {any} res
 */
function sendResponse(res, status, code, message, payload) {
    return res.status(status).send(prepareResponse(code, message, payload));
}
function sendView(res, data) {
    return res.render('layout/app', { ...data });
}

/**
 * This function is use for create image path
 * 
 * @param {String} image - image 
 * @returns {String} res
 */
function createImagePath(image) {
    return process.env.BASE_URL + image
}

/**
 * This function is use for convert to objectId
 * 
 * @param {String} id - id
 * @returns {any} objectId
 */
function toObjectId(id) {
    const objectId = new mongoose.Types.ObjectId(id)
    return objectId
}
function generateOTP(length) {
    return otpGenerator.generate(length, {
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
        lowerCaseAlphabets: false,
    });
};
/**
 * This function is use for generate token
 * 
 * @param {String} userId - userId
 * @param {Number} type - type
 * @returns {any} - res
 */
async function generateLoginToken(userId, type) {
    return generateJwt({
        sub: userId,
        action: ACTION.Login,
        type: type
    }, JWT_EXPIRES_IN);
}
async function getCurrentTimeStampWithAdditionMinutes(minutes) {
    return moment().add(minutes, "minutes");
}
async function injectOtp() {
    const otpDetails = {
        otp: generateOTP(6),
        otpCreatedAt: await getCurrentTimeStampWithAdditionMinutes(0),
        otpExpiredAt: await getCurrentTimeStampWithAdditionMinutes(3),

    };
    return otpDetails
}

/**
 * This function is use for generate token for hotel access
 * 
 * @param {String} hotelId - hotelId
 * @param {Number} type - type
 * @returns {any} - res
 */
async function generateHotelAccessToken(userId, type, hotelId) {
    return generateJwt({
        sub: userId,
        action: ACTION.Access,
        type: type,
        hotelId: hotelId
    }, process.env.JWT_EXPIRES_IN);
}


/**
 * This function is use for upload image
 * 
 * @param {any} fileData - fileData
 * @param {String} id - id 
 * @returns {any} res
 */
async function createExistSync(folderName) {
    if (!fs.existsSync('./uploads/' + folderName)) {
        fs.mkdir('./uploads/' + folderName, (err) => {
            if (err) {
                console.log(err);
                return err
            }
        })
    }
    return true
}

async function imageExists(image_url) {
    try {
        const res = await axios.get(image_url)
        return true;
    } catch (error) {
        return false;
    }

}
function getYoutubeVideoId(url) {
    let videoId = null;
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (match) {
        videoId = match[1];
    } else {
        // If the URL format changes in the future or it's invalid
        throw new Error('Invalid YouTube URL');
    }
    return videoId;
}
function readDirAsync(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
}
async function generaterandomToken() {
    return crypto.randomBytes(32).toString("hex");
}
async function getFrontendUrl(type = "", token = "") {
    let url;
    if (type == 'email-token') {
        url = process.env.FRONTEND_URL + '/verify-email?token=' + token
    }
    if (type == 'reset-password') {
        url = process.env.FRONTEND_URL + '/reset-password?token=' + token
    }
    return url
}

async function getInternalServerErrorResponse(message = "", res) {
    return this.sendResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR, message, null)
}
async function getBadrequestErrorResponse(message = "", res) {
    return this.sendResponse(res, HttpStatus.BAD_REQUEST_STATUS_CODE, HttpStatus.BAD_REQUEST_STATUS_CODE, message, null)
}
async function getSuccessResponse(message = "", res, data = null) {
    return this.sendResponse(res, HttpStatus.SUCCESS_CODE, HttpStatus.SUCCESS_CODE, message, data)
}

let counter = 0;
async function generateCombinationsDemo(categories, selectedOptions, currentCategoryIndex = 0, currentCombination = []) {
    if (currentCategoryIndex === categories.length) {
        console.log(currentCombination);
        console.log('counter', counter++);
        return;
    }

    for (const option of categories[currentCategoryIndex]) {
        if (selectedOptions[currentCategoryIndex].includes(option)) {
            const updatedCombination = [...currentCombination, option];
            await this.generateCombinationsDemo(categories, selectedOptions, currentCategoryIndex + 1, updatedCombination);
        }
    }
}
let combinationCounter = 0;
// const allCombinations = [];
async function generateCombinations(allAssemblyIds, selectedAssemblyIds, currentAssemblyIndex = 0, currentCombination = [], allCombinations = []) {
    if (currentAssemblyIndex === allAssemblyIds.length) {
        // console.log('combinationCounter',combinationCounter++);
        allCombinations.push(currentCombination)
        return;
    }

    for (const option of allAssemblyIds[currentAssemblyIndex]) {
        if (option) {
            if (selectedAssemblyIds[currentAssemblyIndex].includes(option)) {
                const updatedCombination = [...currentCombination, option];
                await generateCombinations(allAssemblyIds, selectedAssemblyIds, currentAssemblyIndex + 1, updatedCombination, allCombinations);
            }
        }
    }
    return allCombinations;
}

// async function generateCombinations(allAssemblyIds, selectedAssemblyIds, currentAssemblyIndex = 0, currentCombination = [], allCombinations = []) {
//     if (currentAssemblyIndex === allAssemblyIds.length) {
//         allCombinations.push(currentCombination);
//         return allCombinations;
//     }

//     for (const option of allAssemblyIds[currentAssemblyIndex]) {
//         if (selectedAssemblyIds[currentAssemblyIndex].includes(option)) {
//             const updatedCombination = [...currentCombination, option];
//             await generateCombinations(allAssemblyIds, selectedAssemblyIds, currentAssemblyIndex + 1, updatedCombination, allCombinations);
//         }
//     }

//     return allCombinations;
// }

// const allCombinations = await generateCombinations(assemblyIds, selectedAssemblyIds);
// console.log('allCombinations', allCombinations);


// Function to handle search
function applySearch(options, searchTerm, columns) {
    if (searchTerm !== "") {
        options.where[Op.or] = columns.map(column => ({
            [column]: { [Op.like]: `%${searchTerm}%` }
        }));
    }
    return options;
}
// Function to handle order
function applyOrder(options, order, columns) {
    if (order && order.length > 0) {
        const orderColumnIndex = parseInt(order[0].column);
        const orderDirection = order[0].dir.toUpperCase();
        const orderColumn = columns[orderColumnIndex];
        options.order.push([orderColumn, orderDirection]);
    }
    return options;
}

async function getAuditorPincodes(auditorId) {
    const pincodeData = await AuditorPincodeModel.findAll({
        where: { auditorId: auditorId },
    });

    const pincode_data = []

    for (const item of pincodeData) {
        pincode_data.push(item.pincode);
    }
    return pincode_data
}
async function getAuditorProvinces(auditorId) {
    const provinceData = await AuditorPincodeModel.findAll({
        where: { auditorId: auditorId, isDeleted: false },
    });

    return provinceData.map(item => item.provinceId);
}

async function getAuditorRejectedAudits(auditorId) {
    const rejectedAudit = await AuditorRejectedAuditModel.findAll({
        where: { auditorId: auditorId },
    });

    const audit_data = []

    for (const item of rejectedAudit) {
        audit_data.push(item.auditId);
    }
    return audit_data
}
async function getAuditStatusLog(auditId, auditorId) {

    const auditData = await AuditsModel.findOne({
        include: [
            {
                model: AuditStatusLog,
                as: "auditStatusLogs",
                attributes: ["auditStatusId", "createdAt"],
            }
        ],
        where: {
            id: auditId
        },
    });

    let auditStatusLog;
    if (auditData) {

        auditStatusLog = auditData.auditStatusLogs.map(logs => ({
            auditStatusId: logs.auditStatusId,
            auditStatusName: AUDIT_STATUS_NAME_FRONTEND[logs.auditStatusId] || '',
            auditStatusLogDate: logs.createdAt
        }));
    }
    const ifRejected = await AuditorRejectedAuditModel.findOne({ where: { auditorId: auditorId, auditId: auditId } });

    if (ifRejected) {
        auditStatusLog.push({
            auditStatusId: AUDIT_STATUS_ID.REJECTED,
            auditStatusName: AUDIT_STATUS_NAME_FRONTEND[AUDIT_STATUS_ID.REJECTED] || '',
            auditStatusLogDate: ifRejected.createdAt
        })
    }
    return auditStatusLog
}

module.exports = {
    hasValidatorErrors: hasValidatorErrors,
    hasValidatorErrorsBackend: hasValidatorErrorsBackend,
    generateAccessToken: generateAccessToken,
    parsePagination: parsePagination,
    verifyJwt: verifyJwt,
    frDate: frDate,
    getCurrentTimeStampUnix: getCurrentTimeStampUnix,
    getCodeExpiresTimestamp: getCodeExpiresTimestamp,
    prepareSearchFilter: prepareSearchFilter,
    preparePaginationResponse: preparePaginationResponse,
    bcryptPassword: bcryptPassword,
    getYoutubeVideoId: getYoutubeVideoId,
    imageUpload: imageUpload,
    audioUpload: audioUpload,
    storeBuffer: storeBuffer,
    sendResponse: sendResponse,
    sendView: sendView,
    createImagePath: createImagePath,
    toObjectId: toObjectId,
    parseSort: parseSort,
    generateOTP: generateOTP,
    generateLoginToken: generateLoginToken,
    injectOtp: injectOtp,
    generateHotelAccessToken: generateHotelAccessToken,
    createExistSync: createExistSync,
    imageExists: imageExists,
    toastrHandler: toastrHandler,
    getAppName: getAppName,
    readDirAsync: readDirAsync,
    getFrontendUrl: getFrontendUrl,
    generaterandomToken: generaterandomToken,
    getInternalServerErrorResponse: getInternalServerErrorResponse,
    getBadrequestErrorResponse: getBadrequestErrorResponse,
    getSuccessResponse: getSuccessResponse,
    generateCombinations: generateCombinations,
    generateCombinationsDemo: generateCombinationsDemo,
    applySearch: applySearch,
    applyOrder: applyOrder,
    getAuditorPincodes: getAuditorPincodes,
    getAuditorProvinces: getAuditorProvinces,
    getAuditorRejectedAudits: getAuditorRejectedAudits,
    getAuditStatusLog: getAuditStatusLog
}