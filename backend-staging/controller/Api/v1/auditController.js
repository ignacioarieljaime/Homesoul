const Service = require("../../../helpers/index");
const { HttpStatus, ErrorCode } = require("../../../errors/code");
const emailRepo = require("../../../helpers/email");
const RegionModel = require("../../../model/regions");
const WeatherModel = require("../../../model/weather_stations");
const NbcModel = require("../../../model/nbc_tier");
const ClimateZoneMatrixModel = require("../../../model/hdd_climate_zone_matrix");
const AssemblyModel = require("../../../model/assembly");
const AssemblyCategoryModel = require("../../../model/assembly_category");
const AssemblyElementsModel = require("../../../model/assembly_elements");
const AuditsModel = require("../../../model/audits");
const AuditStatusLog = require("../../../model/audit_status_log");
const AuditAssemblySelectionModel = require("../../../model/audit_assembly_selection");
const AuditorModel = require("../../../model/auditor");
const UserAuditRequests = require('../../../model/user_audit_requests');
const UserModel = require('../../../model/user');
const UserHomeModel = require('../../../model/user_home');
const ECMResultCombinationsModel = require('../../../model/ecm_result_combinations');
const ECMResultCombinationsHeaderModel = require('../../../model/ecm_result_combinations_header');
const AuditorRejectedAuditModel = require('../../../model/auditor_rejected_audit');
const AboveGridMeasureModel = require('../../../model/above_grid_wall_measures');
const BelowGridMeasureModel = require('../../../model/below_grid_wall_measures');
const FenestrationMeasureModel = require('../../../model/fenestration_and_door_measures');
const AirTightnessMeasureModel = require('../../../model/air_tightness_measures');
const VentilationMeasureModel = require('../../../model/ventilation_measures');
const WaterHeatingMeasureModel = require('../../../model/water_heating_measures');
const GasFireMeasureModel = require('../../../model/gas_fire_furnaces_measures');
const DrainWaterMeasureModel = require('../../../model/drain_water_measures');
const VolumeCreditMeasureModel = require('../../../model/volume_credit_measures');

const moment = require('moment');
const { Msg } = require("../../../helpers/localization");
const { Op, Sequelize, or, ENUM } = require("sequelize");
const { AUDIT_STATUS_ID, AUDIT_STATUS_NAME, Type } = require("../../../helpers/enum");
const Property = require("../../../model/property");

module.exports = {
  getRegions: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const regions = await RegionModel.findAll({ attributes: ["id", "regionCode", "regionTitle"], where: { isDeleted: false } });
      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, regions);
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getWeatherStation: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const weatherStations = await WeatherModel.findAll({ attributes: ["id", "weatherStationTitle", "hdd"], where: { regionId: req.params.regionId, isDeleted: false } });
      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, weatherStations);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getNbc: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const nbc = await NbcModel.findAll({ attributes: ["id", "nbcTierTitle"], where: { isDeleted: false } });
      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, nbc);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getECpoints: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const ecPoints = await NbcModel.findAll({ attributes: ["id", "ecPoints"], where: { id: req.params.tierId, isDeleted: false } });
      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, ecPoints);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getClimateZone: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const weatherStationId = req.params.weatherStationId;
      const weatherStation = await WeatherModel.findByPk(weatherStationId);
      if (!weatherStation) {
        // return send(res, HttpStatus.NOT_FOUND, HttpStatus.NOT_FOUND, 'Weather station not found');
        return await Service.getBadrequestErrorResponse(Msg.WEATHER_STATION_IS_REQUIRED, res);

      }
      const zone = await ClimateZoneMatrixModel.findOne({
        attributes: ["id", "zone"], where: {
          [Op.and]: [
            { minHdd: { [Op.lte]: weatherStation.hdd } },
            { maxHdd: { [Op.gte]: weatherStation.hdd } },
            { isDeleted: false }
          ]
        },
      });
      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, zone);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getCreditAndEcp: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const { volume, unit, requiredEcp } = req.query;

      const ecPoint = await VolumeCreditMeasureModel.findOne({
        attributes: ["ecPoints"],
        where: {
          lBound: { [Op.lt]: volume },
          uBound: { [Op.gte]: volume },
          unit: unit
        },
      });
      const credit = ecPoint ? ecPoint.ecPoints : 'N/A';
      const remainingEcp = ecPoint ? requiredEcp - ecPoint.ecPoints : requiredEcp;

      const data = { credit, requiredEcp: remainingEcp };

      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, data);
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getAssembly: async function (req, res, next) {
    try {
      const homeType = req.query.homeType;
      const zone = req.query.zone;
      const auditId = req.query.auditId;
      const assemblies = await AssemblyModel.findAll({
        attributes: [
          "id",
          "assemblyCategoryId",
          "assemblyTitle",
          "subTitle",
          "standardCost",
          "totalEffectiveRSI",
          "totalEffectiveRValue",
          "max_uValue",
          "min_energy_rating",
          "energy_efficiency",
          "homeType",
          "levels",
          "createdAt"

        ],
        where: {
          isDeleted: false,
          [Op.or]: [
            { homeType: homeType },
            { homeType: 0 }
          ]
        },
        include: [
          {
            model: AssemblyCategoryModel,
            required: false,
            where: { isDeleted: false }
          },
          {
            model: AssemblyElementsModel,
            attributes: [
              "id",
              "elementTitle",
              "elementDetails",
              "table",
              "effectiveRSI"
            ],
            as: "assemblyElement",
            required: false,
            where: { isDeleted: false }
          }
        ]
      });
      const assembliesByCategory = {};
      const [
        aboveEcPoints,
        belowEcPoints,
        airTightnessEcPoints,
        fenestrationEcPoints,
        ventilationEcPoints,
        waterHeatingEcPoints,
        gasFiredEcPoints,
        drainWaterEcPoints
      ] = await Promise.all([
        AboveGridMeasureModel.findAll({ where: { zone } }),
        BelowGridMeasureModel.findAll({ where: { zone } }),
        AirTightnessMeasureModel.findAll({ where: { zone, homeType } }),
        FenestrationMeasureModel.findAll({ where: { zone } }),
        VentilationMeasureModel.findAll({ where: { zone } }),
        WaterHeatingMeasureModel.findAll({ where: { zone } }),
        GasFireMeasureModel.findAll({ where: { zone } }),
        DrainWaterMeasureModel.findAll({ where: { zone } })
      ]);

      assemblies.forEach(async (assembly) => {
        const categoryName = assembly.assembly_category.title;
        if (!assembliesByCategory[categoryName]) {
          assembliesByCategory[categoryName] = [];
        }
        const { assembly_category, assembly_elements, ...assemblyWithoutCategory } = assembly.toJSON();
        let ecPoint = null;

        switch (assemblyWithoutCategory.assemblyCategoryId) {
          case 1:
            aboveEcPoints.sort((a, b) => b.rsi - a.rsi);
            ecPoint = aboveEcPoints.find(ec => assemblyWithoutCategory.totalEffectiveRSI >= ec.rsi)?.ecPoints;
            break;
          case 2:
            belowEcPoints.sort((a, b) => b.rsi - a.rsi);
            ecPoint = belowEcPoints.find(ec => assemblyWithoutCategory.totalEffectiveRSI >= ec.rsi)?.ecPoints;
            break;
          case 3:
            ecPoint = fenestrationEcPoints.find(ec => assemblyWithoutCategory.max_uValue === ec.max_uValue && assemblyWithoutCategory.min_energy_rating === ec.min_energy_rating)?.ecPoints;
            break;
          case 4:
            ecPoint = airTightnessEcPoints.find(ec => assemblyWithoutCategory.levels === ec.level)?.ecPoints;
            break;
          case 5:
            ecPoint = ventilationEcPoints.find(ec => assemblyWithoutCategory.assemblyTitle === ec.SRE)?.ecPoints;
            break;
          case 6:
            ecPoint = waterHeatingEcPoints.find(ec => assemblyWithoutCategory.energy_efficiency === ec.UEF)?.ecPoints;
            break;
          case 7:
            ecPoint = gasFiredEcPoints.find(ec => assemblyWithoutCategory.assemblyTitle === ec.AFUE)?.ecPoints;
            break;
          case 8:
            ecPoint = drainWaterEcPoints.find(ec => assemblyWithoutCategory.assemblyTitle === ec.HRE)?.ecPoints;
            break;
        }

        // if (ecPoint !== null) {
        assemblyWithoutCategory.ecPoints = ecPoint ?? "0.00";
        // }
        assembliesByCategory[categoryName].push(assemblyWithoutCategory);
      });
      if (assembliesByCategory["Above Grade Walls"]) {
        assembliesByCategory["Above Grade Walls"].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }

      if (assembliesByCategory["Air Tightness"]) {
        assembliesByCategory["Air Tightness"].sort((a, b) => {
          const levelA = parseInt(a.levels.split('-')[1].trim());
          const levelB = parseInt(b.levels.split('-')[1].trim());
          return levelA - levelB;
        });
      }
      const finalAssemblies = Object.keys(assembliesByCategory).map(categoryName => {
        return {
          categoryName: categoryName,
          assemblies: assembliesByCategory[categoryName]
        };
      });

      let selectedAssemblies = [];
      if (auditId) {
        const selectedAssembliesData = await AuditAssemblySelectionModel.findAll({ where: { auditId: auditId } });
        const selectedAssembliesByCategory = {};
        selectedAssembliesData.forEach(selectedAssembly => {
          const { assemblyCategoryId, assemblyId, cost } = selectedAssembly;
          if (!selectedAssembliesByCategory[assemblyCategoryId]) {
            selectedAssembliesByCategory[assemblyCategoryId] = [];
          }
          selectedAssembliesByCategory[assemblyCategoryId].push({ id: assemblyId, cost: cost });
        });
        selectedAssemblies = Object.values(selectedAssembliesByCategory).map(assemblies => {
          return { selectedAssemblies: assemblies };
        });
      }
      const result = {
        finalAssemblies,
        selectedAssembliesList: selectedAssemblies
      };


      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, result);
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res,);
    }
  },
  createAudit: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const user = req.authUser;
      const requiredEcp = req.body.ecpRequired;
      const totalEcp = req.body.totalECP;
      const zone = req.body.nbcClimateZone;
      const homeType = req.body.houseTypeId;
      const isEdit = req.body.isEdit
      const auditorExist = await AuditorModel.findOne({
        where: { userId: user.id },
      });

      if (typeof req.body.auditId === 'undefined') {
        return await Service.getBadrequestErrorResponse(Msg.AUDIT_ID_IS_REQUIRED, res);
      }
      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_IS_NOT_AUDITOR, res);
      }
      // if (totalEcp < requiredEcp) {
      //   return await Service.getBadrequestErrorResponse(Msg.TOTAL_ECP_LESS_THEN_REQUIRED_ECP, res);
      // }
      const selectedAssembly = req.body.selectedAssembly

      if (!Array.isArray(selectedAssembly)) {
        return await Service.getBadrequestErrorResponse(Msg.SELECTED_ASSEMBLY_MUST_ARRAY, res);
      }
      let validSelectedAssembly = [];

      for (const item of selectedAssembly) {
        if (typeof item !== 'object' || !('assemblyId' in item) || !('cost' in item)) {
          return await Service.getBadrequestErrorResponse(Msg.INVALID_FORMAT_SELECTED_ASSEMBLY, res);
        } else {
          const AssemblyExist = await AssemblyModel.findOne({
            where: { id: item.assemblyId },
          });
          if (!AssemblyExist) {
            return await Service.getBadrequestErrorResponse(Msg.INVALID_ASSEMBLY_ID, res);
          }
          validSelectedAssembly.push({
            assemblyId: AssemblyExist.id,
            cost: item.cost,
            assemblyCategoryId: AssemblyExist.assemblyCategoryId
          });
        }
      }

      let auditsDetail = {
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        emailId: req.body.emailId || '',
        pincode1: req.body.pincode1 || '',
        pincode2: req.body.pincode2 || '',
        phone: req.body.phone || '',
        addressLine1: req.body.addressLine1 || '',
        projectName: req.body.projectName || '',
        addressLine2: req.body.addressLine2 || '',
        userProvinceId: req.body.userProvinceId || 0,
        provinceId: req.body.projectProvinceId || 0,
        weatherStationId: req.body.weatherStationId || 0,
        hdd: req.body.hdd || 0,
        nbcClimateZone: req.body.nbcClimateZone || '',
        nbcPerspectiveTierId: req.body.nbcPerspectiveTierId || 0,
        houseTypeId: req.body.houseTypeId || 0,
        fdwrPercent: req.body.fdwrPercent || 0,
        volume: req.body.volume || 0,
        unit: req.body.unit || 0,
        credit: req.body.credit || 0,
        ecpRequired: req.body.ecpRequired || 0,
        auditStatusId: AUDIT_STATUS_ID.COMPLETED
      };
      let userDetails = {
        firstName: req.body.firstName || '',
        lastName: req.body.lastName || '',
        emailID: req.body.emailId || '',
        phoneNo: req.body.phone || '',
        addressLine1: req.body.addressLine1 || '',
        addressLine2: req.body.addressLine2 || '',
        pincode: req.body.pincode1 || '',
        provinceId: req.body.userProvinceId || 0,
      }
      let propertyDetails = {
        type: req.body.type,
        title: req.body.title,
        address: req.body.address,
        city: req.body.city,
        provinceId: req.body.propertyProvinceId,
        postalCode: req.body.postalCode,
      };
      // console.log(auditsDetail);
      let audits = null;
      let userData = await UserModel.findOne({ where: { emailId: req.body.emailId } });
      if (req.body.auditId == 0) {
        auditsDetail.auditorId = auditorExist.id;
        auditsDetail.auditRequestId = null;

        if (userData) {
          return await Service.getBadrequestErrorResponse(Msg.EMAIL_ALREADY_EXIST, res);
        }
        const resetToken = await Service.generaterandomToken();
        userDetails.userType = Type.Customer;
        userDetails.is_offline = 1;
        userDetails.forgotPasswordCode = resetToken;

        const user = await UserModel.create(userDetails)
        const resetLinkUrl = await Service.getFrontendUrl(
          "reset-password",
          resetToken
        );

        const mailOption = {
          to: user.emailID,
          subject: "Reset your password now",
          html: `<p>Click here to reset your password</p> 
                  <a href="${resetLinkUrl}">Click here to reset</a>`,
        };
        const isEmailSent = await emailRepo.sendMail(mailOption);

        propertyDetails.userId = user.id;
        const property = await Property.create(propertyDetails)

        auditsDetail.propertyId = property.id;
        audits = await AuditsModel.create(auditsDetail);

        if (!audits) {
          return await Service.getBadrequestErrorResponse(Msg.SOMETHING_WENT_WRONG, res);
        }
        await AuditStatusLog.create({ auditId: audits.id, auditStatusId: AUDIT_STATUS_ID.NEW })
        await AuditStatusLog.create({ auditId: audits.id, auditStatusId: AUDIT_STATUS_ID.ACCEPTED })
        await AuditStatusLog.create({ auditId: audits.id, auditStatusId: AUDIT_STATUS_ID.ON_GOING })
      } else {
        audits = await AuditsModel.findOne({ where: { id: req.body.auditId } });
        if (!audits) {
          return await Service.getBadrequestErrorResponse(Msg.AUDIT_NOT_FOUND, res);
        }
        if (audits.auditorId != auditorExist.id) {
          return await Service.getBadrequestErrorResponse(Msg.CANT_START_OTHER_AUDITOR_AUDIT, res);
        }

        await AuditsModel.update(auditsDetail, {
          where: { id: audits.id },
        });
        await UserModel.update(userDetails, {
          where: { id: userData.id },
        });
      }

      if (!isEdit) {
        await AuditStatusLog.create({ auditId: audits.id, auditStatusId: AUDIT_STATUS_ID.COMPLETED })
      }

      const [
        aboveEcPoints,
        belowEcPoints,
        airTightnessEcPoints,
        fenestrationEcPoints,
        ventilationEcPoints,
        waterHeatingEcPoints,
        gasFiredEcPoints,
        drainWaterEcPoints
      ] = await Promise.all([
        AboveGridMeasureModel.findAll({ where: { zone } }),
        BelowGridMeasureModel.findAll({ where: { zone } }),
        AirTightnessMeasureModel.findAll({ where: { zone, homeType } }),
        FenestrationMeasureModel.findAll({ where: { zone } }),
        VentilationMeasureModel.findAll({ where: { zone } }),
        WaterHeatingMeasureModel.findAll({ where: { zone } }),
        GasFireMeasureModel.findAll({ where: { zone } }),
        DrainWaterMeasureModel.findAll({ where: { zone } })
      ]);


      validSelectedAssembly = validSelectedAssembly.map(obj => ({
        ...obj,
        auditId: audits.id
      }));

      for (const obj of validSelectedAssembly) {
        const assemblyData = await AssemblyModel.findByPk(obj.assemblyId);
        const { totalEffectiveRSI, max_uValue, min_energy_rating, levels, assemblyTitle, energy_efficiency } = assemblyData;
        let ecPoint = null;

        switch (obj.assemblyCategoryId) {
          case 1:
            aboveEcPoints.sort((a, b) => b.rsi - a.rsi);
            ecPoint = aboveEcPoints.find(ec => totalEffectiveRSI >= ec.rsi)?.ecPoints;
            break;
          case 2:
            belowEcPoints.sort((a, b) => b.rsi - a.rsi);
            ecPoint = belowEcPoints.find(ec => totalEffectiveRSI >= ec.rsi)?.ecPoints;
            break;
          case 3:
            ecPoint = fenestrationEcPoints.find(ec => max_uValue === ec.max_uValue && min_energy_rating === ec.min_energy_rating)?.ecPoints;
            break;
          case 4:
            ecPoint = airTightnessEcPoints.find(ec => levels === ec.level)?.ecPoints;
            break;
          case 5:
            ecPoint = ventilationEcPoints.find(ec => assemblyTitle === ec.SRE)?.ecPoints;
            break;
          case 6:
            ecPoint = waterHeatingEcPoints.find(ec => energy_efficiency === ec.UEF)?.ecPoints;
            break;
          case 7:
            ecPoint = gasFiredEcPoints.find(ec => assemblyTitle === ec.AFUE)?.ecPoints;
            break;
          case 8:
            ecPoint = drainWaterEcPoints.find(ec => assemblyTitle === ec.HRE)?.ecPoints;
            break;
        }
        obj.ecp = ecPoint;
      }
      if (isEdit) {
        await AuditAssemblySelectionModel.destroy({ where: { auditId: req.body.auditId } })
      }
      await AuditAssemblySelectionModel.bulkCreate(validSelectedAssembly);

      /*------------------------------START FOLLOWING CODE IS FOR GENERATE COMBINATION RESULT ------------------------------ */
      /*------------------------------START------------------------------ */

      const assemblyData = await AssemblyModel.findAll({ where: { isDeleted: false } });
      const assemblyIds = [];
      const selectedAssemblyIds = [];
      const selectedAssemblyDataArray = [];
      const assemblyArray = [];

      for (const record of assemblyData) {

        if (!assemblyIds[record.assemblyCategoryId]) {
          assemblyIds[record.assemblyCategoryId] = []; // Initialize the array if it doesn't exist
        }
        assemblyIds[record.assemblyCategoryId].push(record.id);

        if (!assemblyArray[record.id]) {
          assemblyArray[record.id] = {
            id: record.id,
            standardCost: record.standardCost,
            totalEffectiveRSI: record.totalEffectiveRSI,
            totalEffectiveRValue: record.totalEffectiveRValue
          }
        }
      }
      assemblyIds.shift();

      const auditId = audits.id

      const assemblySelectionData = await AuditAssemblySelectionModel.findAll({
        where: { auditId: auditId },
        attributes: ['id', 'auditId', 'assemblyId', 'assemblyCategoryId', 'assemblyId', 'cost', 'ecp']
      });

      for (const record of assemblySelectionData) {

        if (!selectedAssemblyIds[record.assemblyCategoryId]) {
          selectedAssemblyIds[record.assemblyCategoryId] = []; // Initialize the array if it doesn't exist
        }
        selectedAssemblyIds[record.assemblyCategoryId].push(record.assemblyId);
        if (!selectedAssemblyDataArray[record.assemblyId]) {
          selectedAssemblyDataArray[record.assemblyId] = {
            id: record.id,
            auditId: record.auditId,
            assemblyCategoryId: record.assemblyCategoryId,
            assemblyId: record.assemblyId,
            cost: record.cost,
            ecp: record.ecp
          };
        }
      }
      selectedAssemblyIds.shift();


      const allCombinations = await Service.generateCombinations(assemblyIds, selectedAssemblyIds);

      let totalECPoints = 0;
      let totalECMCost = 0;
      let ecmCostIndex = 0;

      const ecm_result_combinations = []
      if (allCombinations) {
        for (const combination of allCombinations) {
          for (const assembly_id of combination) {
            totalECPoints = totalECPoints + Number(selectedAssemblyDataArray[assembly_id].ecp);
            totalECMCost = totalECMCost + Number(selectedAssemblyDataArray[assembly_id].cost);
          }
        }
        if (isEdit) {
          await ECMResultCombinationsHeaderModel.destroy({ where: { auditId: req.body.auditId } })
        }
        ecmCostIndex = Number(totalECMCost).toFixed(2) / Number(totalECPoints).toFixed(2);
        const ecmResultCombinationsHeader = await ECMResultCombinationsHeaderModel.create(
          {
            auditId: auditId,
            totalECPoints: Number(totalECPoints).toFixed(2),
            totalECMCost: Number(totalECMCost).toFixed(2),
            ecmCostIndex: Number(ecmCostIndex).toFixed(2),
          }
        );
        if (ecmResultCombinationsHeader) {

          for (const combination of allCombinations) {

            let totalCombinationCost = 0;
            let totalCombinationECP = 0;

            for (const assembly_id of combination) {
              totalCombinationCost = totalCombinationCost + Number(selectedAssemblyDataArray[assembly_id].cost);
              totalCombinationECP = totalCombinationECP + Number(selectedAssemblyDataArray[assembly_id].ecp);
            }

            ecm_result_combinations.push({
              combinationId: ecmResultCombinationsHeader.id,
              auditId: auditId,
              assemblyIds: combination.join(','),
              totalCombinationECP: Number(totalCombinationECP).toFixed(2),
              totalCombinationCost: Number(totalCombinationCost).toFixed(2),
            })

          }
          if (isEdit) {
            await ECMResultCombinationsModel.destroy({ where: { combinationId: ecmResultCombinationsHeader.id, auditId: auditId } })
          }
          await ECMResultCombinationsModel.bulkCreate(ecm_result_combinations);
        }
      }
      const combinationsHeaderExist = await ECMResultCombinationsHeaderModel.findOne({
        where: { auditId: auditId }
      });
      let resultCombinationsExist = await ECMResultCombinationsModel.findAll({
        where: { combinationId: combinationsHeaderExist.id },
      });
      resultCombinationsExist = resultCombinationsExist.filter(combination => parseFloat(combination.totalCombinationECP) >= parseFloat(requiredEcp));
      if (resultCombinationsExist.length === 0) {
        return await Service.sendResponse(res, HttpStatus.BAD_REQUEST_STATUS_CODE, HttpStatus.BAD_REQUEST_STATUS_CODE, Msg.TOTAL_ECP_LESS_THEN_REQUIRED_ECP, { auditId: audits.id })
      }


      /*------------------------------END FOLLOWING CODE IS FOR GENERATE COMBINATION RESULT ------------------------------ */
      /*------------------------------END------------------------------ */

      return await Service.getSuccessResponse(Msg.CREATE_AUDIT_SUCCESS, res, { auditId: audits.id });

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
    // manual testing
  },
  getStatusCount: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const authUser = req.authUser;
      const { sortBy } = req.query;

      const auditorExist = await AuditorModel.findOne({
        where: { userId: authUser.id },
      });
      // const user = await Property.findAll({ where: { userId: authUser.id } });
      const user = await UserModel.findOne({ where: { id: authUser.id } });

      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_IS_NOT_AUDITOR, res);
      }

      const auditorId = auditorExist.id;
      const auditorProvinces = await Service.getAuditorProvinces(auditorId);
      // const AuditorPincodes = await Service.getAuditorPincodes(auditorId);
      const rejectedAuditId = await Service.getAuditorRejectedAudits(auditorId);
      let dateFilter = {};
      if (sortBy === 'today') {
        dateFilter.createdAt = {
          [Op.gte]: moment().startOf('day').toDate(),
          [Op.lte]: moment().endOf('day').toDate()
        };
      } else if (sortBy === 'this week') {
        dateFilter.createdAt = {
          [Op.gte]: moment().startOf('week').toDate(),
          [Op.lte]: moment().endOf('week').toDate()
        };
      } else if (sortBy === 'this month') {
        dateFilter.createdAt = {
          [Op.gte]: moment().startOf('month').toDate(),
          [Op.lte]: moment().endOf('month').toDate()
        };
      } else if (sortBy === 'this year') {
        dateFilter.createdAt = {
          [Op.gte]: moment().startOf('year').toDate(),
          [Op.lte]: moment().endOf('year').toDate()
        };
      }
      const [
        newRequests,
        acceptedRequests,
        onGoingRequests,
        completedRequests,
        rejectedRequests
      ] = await Promise.all([
        AuditsModel.count({
          where: {
            auditStatusId: AUDIT_STATUS_ID.NEW,
            '$property.provinceId$': {
              [Op.in]: auditorProvinces
            },
            id: { [Op.notIn]: rejectedAuditId },
            isDeleted: false,
            ...dateFilter
          },
          include: [
            {
              model: Property,
              attributes: [],
              as: 'property',
              required: true
            }
          ]
        }),
        // AuditsModel.count({ where: { auditStatusId: AUDIT_STATUS_ID.NEW, provinceId: user.provinceId, id: { [Op.notIn]: rejectedAuditId }, isDeleted: false, ...dateFilter } }),
        AuditsModel.count({ where: { auditStatusId: AUDIT_STATUS_ID.ACCEPTED, auditorId: auditorId, isDeleted: false, ...dateFilter } }),
        AuditsModel.count({ where: { auditStatusId: AUDIT_STATUS_ID.ON_GOING, auditorId: auditorId, isDeleted: false, ...dateFilter } }),
        AuditsModel.count({ where: { auditStatusId: AUDIT_STATUS_ID.COMPLETED, auditorId: auditorId, isDeleted: false, ...dateFilter } }),
        AuditsModel.count({ where: { id: rejectedAuditId, isDeleted: false, ...dateFilter } })
      ]);
      const totalRequests = newRequests + acceptedRequests + onGoingRequests + completedRequests + rejectedRequests;

      const requestCount = {
        new: newRequests,
        accepted: acceptedRequests,
        onGoing: onGoingRequests,
        completed: completedRequests,
        rejected: rejectedRequests,
        total: totalRequests
      };

      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, requestCount);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getRequests: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const auditorExist = await AuditorModel.findOne({
        where: { userId: req.authUser.id },
      });

      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.USER_IS_NOT_AUDITOR, res);
      }

      const { status, sortBy, page } = req.query;
      let perPage = 4;
      let skip = 0;

      if (page) {
        const paginationData = Service.parsePagination({ perPage, page });
        perPage = paginationData.perPage;
        skip = paginationData.skip;
      }

      let dateFilter = {};
      if (sortBy === 'today') {
        dateFilter.createdAt = {
          [Op.gte]: moment().startOf('day').toDate(),
          [Op.lte]: moment().endOf('day').toDate()
        };
      } else if (sortBy === 'this week') {
        dateFilter.createdAt = {
          [Op.gte]: moment().startOf('week').toDate(),
          [Op.lte]: moment().endOf('week').toDate()
        };
      } else if (sortBy === 'this month') {
        dateFilter.createdAt = {
          [Op.gte]: moment().startOf('month').toDate(),
          [Op.lte]: moment().endOf('month').toDate()
        };
      } else if (sortBy === 'this year') {
        dateFilter.createdAt = {
          [Op.gte]: moment().startOf('year').toDate(),
          [Op.lte]: moment().endOf('year').toDate()
        };
      }

      const auditorProvinces = await Service.getAuditorProvinces(auditorExist.id);
      const rejectedAuditId = await Service.getAuditorRejectedAudits(auditorExist.id);

      let whereClause = {};

      if (status) {
        if (status == 1) {
          whereClause = {
            auditStatusId: status,
            // pincode1: AuditorPincodes,
            '$property.provinceId$': {
              [Op.in]: auditorProvinces
            },
            id: { [Op.notIn]: rejectedAuditId }
          };
        } else if (status == 5) {
          whereClause = {
            id: rejectedAuditId,
          };
        } else {
          whereClause = {
            auditStatusId: status,
            auditorId: auditorExist.id
          };
        }
      } else {
        whereClause[Op.or] = [
          { auditorId: auditorExist.id },// GET THAT RECORDS WERE LOGIN AUTITOR AUDITORID MATCHED
          { id: rejectedAuditId }, // GET THAT RECORDS which LOGIN AUTITOR is rejected
          {
            // pincode1: AuditorPincodes,
            '$property.provinceId$': {
              [Op.in]: auditorProvinces
            },
            auditStatusId: AUDIT_STATUS_ID.NEW,
            auditorId: { [Op.not]: null }
          },//GET THAT RECORDS WERE PINCODE MATCH WITH LOGIN AUDITOR + AUDITSTATUSID = NEW + AUDITORID IS NULL
        ];
      }

      const { rows: totalCount } = await AuditsModel.findAndCountAll({
        include: [
          {
            model: UserAuditRequests,
            attributes: ["id", "auditStatusId"],
            include: [
              {
                model: UserModel,
                attributes: ["id", "firstName", "lastName", "addressLine1", "addressLine2"],
                as: "UserInfo",
              },
              {
                model: UserHomeModel,
                attributes: ["id", "userId", "pincode", "addressLine1", "addressLine2"],
                as: "UserHomeInfo",
              },
            ],
          },
          {
            model: AuditStatusLog,
            as: "auditStatusLogs",
            attributes: ["auditStatusId", "createdAt"],
          },
          {
            model: AuditAssemblySelectionModel,
            as: "auditAssemblySelection",
            include: [
              {
                model: AssemblyModel,
                where: { isDeleted: false },
                include: [
                  {
                    model: AssemblyElementsModel,
                    attributes: ["id", "elementTitle", "elementDetails", "table", "effectiveRSI"],
                    as: "assemblyElement",
                  }
                ]
              },
              {
                model: AssemblyCategoryModel,
              },
            ],
          },
          {
            model: Property,
            attributes: ["provinceId"],
            as: 'property',
            required: true
          }
        ],
        where: {
          ...whereClause,
          ...dateFilter,
        },
      });

      const { rows: requestData } = await AuditsModel.findAndCountAll({
        include: [
          {
            model: UserAuditRequests,
            attributes: ["id", "auditStatusId"],
            include: [
              {
                model: UserModel,
                attributes: ["id", "firstName", "lastName", "addressLine1", "addressLine2"],
                as: "UserInfo",
              },
              {
                model: UserHomeModel,
                attributes: ["id", "userId", "pincode", "addressLine1", "addressLine2"],
                as: "UserHomeInfo",
              },
            ],
          },
          {
            model: AuditStatusLog,
            as: "auditStatusLogs",
            attributes: ["auditStatusId", "createdAt"],
          },
          {
            model: AuditAssemblySelectionModel,
            as: "auditAssemblySelection",
            include: [
              {
                model: AssemblyModel,
                include: [
                  {
                    model: AssemblyElementsModel,
                    attributes: ["id", "elementTitle", "elementDetails", "table", "effectiveRSI"],
                    as: "assemblyElement",
                  }
                ]
              },
              {
                model: AssemblyCategoryModel,
              },
            ],
          },
          {
            model: Property,
            attributes: ["provinceId"],
            as: 'property',
            required: true
          }
        ],
        where: {
          ...whereClause,
          ...dateFilter,
        },
        limit: perPage,
        offset: skip,
        order: [['createdAt', 'DESC']]
      });


      const totalPage = Math.ceil(totalCount.length / perPage);

      const formattedData = [];
      for (const request of requestData) {
        const auditStatusLog = await Service.getAuditStatusLog(request.id, auditorExist.id);


        const auditAssemblySelection = {};
        if (Array.isArray(request.auditAssemblySelection)) {
          request.auditAssemblySelection.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).forEach(assemblySelection => {
            const categoryName = assemblySelection.assembly_category.title;
            auditAssemblySelection[categoryName] = auditAssemblySelection[categoryName] || [];
            auditAssemblySelection[categoryName].push({
              cost: assemblySelection.cost,
              assemblyTitle: assemblySelection.assembly.assemblyTitle,
              subTitle: assemblySelection.assembly.subTitle,
              standardCost: assemblySelection.assembly.standardCost,
              totalEffectiveRSI: assemblySelection.assembly.totalEffectiveRSI,
              totalEffectiveRValue: assemblySelection.assembly.totalEffectiveRValue,
              assemblyElement: assemblySelection.assembly.assemblyElement.map(element => ({
                elementTitle: element.elementTitle,
                elementDetails: element.elementDetails,
                table: element.table,
                effectiveRSI: element.effectiveRSI
              }))
            });
          });
        }

        const processedAuditStatusId = rejectedAuditId.includes(request.id) ? AUDIT_STATUS_ID.REJECTED : request.auditStatusId;

        const data = {
          id: request.id,
          projectName: request.projectName,
          auditorId: request.auditorId,
          firstName: request.firstName,
          lastName: request.lastName,
          emailId: request.emailId,
          phone: request.phone,
          pincode1: request.pincode1,
          provinceId: request.provinceId,
          addressLine1: request.addressLine1,
          addressLine2: request.addressLine2,
          pincode: request.pincode,
          auditStatusId: processedAuditStatusId,
          requestedAt: request.createdAt,
          auditStatusName: AUDIT_STATUS_NAME[processedAuditStatusId] || '',
          auditStatusLog: auditStatusLog,
          auditAssemblySelection: Object.entries(auditAssemblySelection).map(([categoryName, assemblies]) => ({
            categoryName,
            // assemblies
          }))
        };
        formattedData.push(data);
      }
      const paginationResponse = {
        requests: formattedData,
        perPage: perPage,
        currentPageRecordCount: requestData.length,
        totalRecord: totalCount.length,
        totalPage: totalPage,
      };

      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, paginationResponse);
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  acceptReject: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const { auditId, auditStatusId, reason } = req.body
      const user = req.authUser;

      const auditorExist = await AuditorModel.findOne({
        where: { userId: user.id },
      });

      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.AUDITOR_CAN_UPDATE_STATUS, res);
      }
      const audit = await AuditsModel.findByPk(auditId)
      if (!audit) {
        return await Service.getBadrequestErrorResponse(Msg.AUDIT_NOT_FOUND, res);
      }

      if (auditStatusId === 2) {

        await AuditsModel.update(
          { auditStatusId: auditStatusId, auditorId: auditorExist.id },
          { where: { id: auditId } }
        );
        await AuditStatusLog.create({ auditId: auditId, auditStatusId: auditStatusId });

        const isRequestExists = await UserAuditRequests.findByPk(audit.auditRequestId);
        if (isRequestExists) {
          await UserAuditRequests.update(
            { auditStatusId: auditStatusId },
            { where: { id: audit.auditRequestId } }
          );
        }

      } else {
        await AuditorRejectedAuditModel.create({ auditorId: auditorExist.id, auditId: auditId, rejectReason: reason });
      }
      return await Service.getSuccessResponse(Msg.STATUS_UPDATE_SUCCESSFULLY, res);
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  getAuditResult: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const user = req.authUser;
      const { auditId } = req.body

      const auditData = await AuditsModel.findOne({
        include: [
          {
            model: UserAuditRequests,
            attributes: ["id", "auditStatusId"],
            include: [
              {
                model: UserModel,
                attributes: ["id", "firstName", "lastName", "addressLine1", "addressLine2"],
                as: "UserInfo",
              },
              {
                model: UserHomeModel,
                attributes: ["id", "userId", "pincode", "addressLine1", "addressLine2"],
                as: "UserHomeInfo"
              },
            ],
          },
          {
            model: RegionModel,
            as: "RegionInfo",
            attributes: ["id", "regionCode", "regionTitle"],
          },
          {
            model: WeatherModel,
            as: "WeatherStationsInfo",
            attributes: ["id", "weatherStationTitle"],
          },
          {
            model: NbcModel,
            as: "NBCTierInfo",
            attributes: ["id", "nbcTierTitle"],
          },
          {
            model: AuditStatusLog,
            as: "auditStatusLogs",
            attributes: ["auditStatusId", "createdAt"],
          },
          {
            model: AuditAssemblySelectionModel,
            as: "auditAssemblySelection",
            include: [
              {
                model: AssemblyModel,
                include: [
                  {
                    model: AssemblyElementsModel,
                    attributes: ["id", "elementTitle", "elementDetails", "table", "effectiveRSI"],
                    as: "assemblyElement"
                  }
                ]
              },
              {
                model: AssemblyCategoryModel,
              },
            ],
          }
        ],
        where: {
          id: auditId
        },
      });

      if (!auditData) {
        return await Service.getBadrequestErrorResponse(Msg.AUDIT_NOT_FOUND, res);
      }

      let data = {
        id: auditData.id,
        projectName: auditData.projectName,
        firstName: auditData.firstName,
        lastName: auditData.lastName,
        addressLine1: auditData.addressLine1,
        addressLine2: auditData.addressLine2,
        pincode1: auditData.pincode1,
        auditStatusId: auditData.auditStatusId,
        requestedAt: auditData.createdAt,
        auditStatusName: AUDIT_STATUS_NAME[auditData.auditStatusId] || '',
        province: auditData.RegionInfo ? auditData.RegionInfo.regionCode : '',
        weatherStation: auditData.WeatherStationsInfo ? auditData.WeatherStationsInfo.weatherStationTitle : '',
        hdd: auditData.hdd,
        nbcClimateZone: auditData.nbcClimateZone,
        nbcPrescriptiveTier: auditData.NBCTierInfo ? auditData.NBCTierInfo.nbcTierTitle : '',
        houseType: auditData.houseTypeId == 1 ? 'Attached' : 'Detached',
        fdwrPercent: auditData.fdwrPercent,
        createdOn: auditData.createdAt,
        volume: auditData.volume,
        unit: auditData.unit,
        credit: auditData.credit != 0 ? auditData.credit : 'N/A',
        ecpRequired: auditData.ecpRequired,
      };


      const combinationsHeaderExist = await ECMResultCombinationsHeaderModel.findOne({
        where: { auditId: auditData.id }
      });

      const options = [{
        id: 0,
        ecm_index: 0,
        ecp: 15.2,
        cost: 0,
        combinationAssembly: [{}, {}, {}, {}, {}, {}, {}, {}]
      }];
      const categories = [];
      if (combinationsHeaderExist) {
        let resultCombinationsExist = await ECMResultCombinationsModel.findAll({
          where: { combinationId: combinationsHeaderExist.id },
          // order: [['totalCombinationCost', 'ASC']], // Order by price in ascending order
          // limit: 3,
        });
        resultCombinationsExist = resultCombinationsExist.filter(combination => parseFloat(combination.totalCombinationECP) >= parseFloat(auditData.ecpRequired));

        if (resultCombinationsExist.length === 0) {
          return await Service.sendResponse(res, HttpStatus.BAD_REQUEST_STATUS_CODE, HttpStatus.BAD_REQUEST_STATUS_CODE, Msg.TOTAL_ECP_LESS_THEN_REQUIRED_ECP, null)
        }

        // Order by totalCombinationCost in ascending order
        resultCombinationsExist.sort((a, b) => a.totalCombinationCost - b.totalCombinationCost);

        // Limit the result to 3 records
        resultCombinationsExist = resultCombinationsExist.slice(0, 3);
        if (resultCombinationsExist) {
          for (const result of resultCombinationsExist) {

            let combinationAssembly = await AuditAssemblySelectionModel.findAll({
              include: [
                { model: AssemblyCategoryModel },
                { model: AssemblyModel },
              ],
              where: {
                auditId: auditData.id,
                assemblyId: { [Op.in]: result.assemblyIds.split(',') }
              },
            });
            for (const cb of combinationAssembly) {
              const categoryIndex = categories.findIndex(cat => cat.category_id === cb.assembly_category.id);
              if (categoryIndex === -1) {
                categories.push({
                  category_id: cb.assembly_category.id,
                  category_title: cb.assembly_category.title,
                  assemblies: [{
                    assemblyId: cb.assembly.id,
                    category_id: cb.assembly.assemblyCategoryId,
                    assemblyTitle: cb.assembly.assemblyTitle,
                    cost: cb.cost,
                    ecp: cb.ecp,
                  }]
                });
              } else {
                categories[categoryIndex].assemblies.push({
                  assemblyId: cb.assembly.id,
                  category_id: cb.assembly.assemblyCategoryId,
                  assemblyTitle: cb.assembly.assemblyTitle,
                  cost: cb.cost,
                  ecp: cb.ecp,
                });
              }
            }
            options.push({
              id: result.id,
              ecm_index: Number(Number(result.totalCombinationCost).toFixed(2) / Number(result.totalCombinationECP).toFixed(2)).toFixed(2),
              ecp: result.totalCombinationECP,
              cost: result.totalCombinationCost,
            });
          }
        }
      }

      const staticDataBeforeCategory1 = [
        {
          category_title: "Ceiling with Attic Space",
          assemblies: [
            {
              assemblyTitle: "R60",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "R60",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "R60",
              cost: "-",
              ecp: "-"
            },
          ]
        },
        {
          category_title: "Ceiling without Attic Space",
          assemblies: [
            {
              assemblyTitle: "R31",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "R31",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "R31",
              cost: "-",
              ecp: "-"
            },
          ]
        },
        {
          category_title: "Exposed Floor",
          assemblies: [
            {
              assemblyTitle: "R31",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "R31",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "R31",
              cost: "-",
              ecp: "-"
            },
          ]
        },
      ];
      const staticDataAfterCategory2 = [
        {
          category_title: "Below Grade Slab Entire Surface > 600 mm B.G.",
          assemblies: [
            {
              assemblyTitle: "-",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "-",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "-",
              cost: "-",
              ecp: "-"
            },
          ]
        },
        {
          category_title: "Heated Slab or Slab ≤ 600 mm Below Grade",
          assemblies: [
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
          ]
        },
        {
          category_title: "Edge of Below Grade Slab ≤ 600 mm B.G.",
          assemblies: [
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
          ]
        },
      ];
      const staticDataAfterCategory3 = [
        {
          category_title: "Skylights",
          assemblies: [
            {
              assemblyTitle: "U2.8",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "U2.8",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "U2.8",
              cost: "-",
              ecp: "-"
            },
          ]
        },
      ];
      const staticDataAfterCategory6 = [
        {
          category_title: "Combined Space and Water",
          assemblies: [
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "N/A",
              cost: "-",
              ecp: "-"
            },
          ]
        },
      ];
      const staticDataAfterCategory7 = [
        {
          category_title: "Space Cooling Equipment",
          assemblies: [
            {
              assemblyTitle: "13 SEER",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "13 SEER",
              cost: "-",
              ecp: "-"
            },
            {
              assemblyTitle: "13 SEER",
              cost: "-",
              ecp: "-"
            },
          ]
        },
      ];
      const insertionIndexBeforeCategory1 = 0;
      categories.splice(insertionIndexBeforeCategory1, 0, ...staticDataBeforeCategory1);
      const insertionIndexAfterCategory2 = categories.findIndex(category => category.category_id === 2) + 1;
      categories.splice(insertionIndexAfterCategory2, 0, ...staticDataAfterCategory2);
      const insertionIndexAfterCategory3 = categories.findIndex(category => category.category_id === 3) + 1;
      categories.splice(insertionIndexAfterCategory3, 0, ...staticDataAfterCategory3);
      const insertionIndexAfterCategory6 = categories.findIndex(category => category.category_id === 6) + 1;
      categories.splice(insertionIndexAfterCategory6, 0, ...staticDataAfterCategory6);
      const insertionIndexAfterCategory7 = categories.findIndex(category => category.category_id === 7) + 1;
      categories.splice(insertionIndexAfterCategory7, 0, ...staticDataAfterCategory7);

      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, { audit_data: data, options: options, categories: categories });

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  createAuditRequest: async function (req, res, next) {
    try {

      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const user = req.authUser;
      const propertyId = req.body.propertyId;

      const userData = await UserModel.findOne({ where: { id: user.id } });

      if (!userData) {
        return await Service.getBadrequestErrorResponse(Msg.USER_NOT_FOUND, res);
      }

      const auditRequestsExist = await UserAuditRequests.findOne({ where: { userId: user.id, auditStatusId: AUDIT_STATUS_ID.NEW, propertyId: propertyId } });
      if (auditRequestsExist) {
        return await Service.getBadrequestErrorResponse(Msg.AUDIT_REQUEST_ALREADY_EXIST, res);
      }

      // if (userData.pincode == null || userData.pincode == '') {
      //   return await Service.getBadrequestErrorResponse(Msg.UPDATE_PROFILE_PINCODE, res);
      // }


      const userAuditRequests = {
        userId: userData.id,
        propertyId: propertyId,
        pincode: userData.pincode,
        auditStatusId: AUDIT_STATUS_ID.NEW
      };

      const AuditRequests = await UserAuditRequests.create(userAuditRequests);
      if (!AuditRequests) {
        return await Service.getBadrequestErrorResponse(Msg.SOMETHING_WENT_WRONG, res);
      }

      const auditsDetail = {
        auditRequestId: AuditRequests.id,
        propertyId: propertyId,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        emailId: userData.emailID || '',
        phone: userData.phoneNo || '',
        userProvinceId: userData.provinceId || '',
        pincode1: userData.pincode || '',
        addressLine1: userData.addressLine1 + ', ' + userData.addressLine2,
        auditStatusId: AUDIT_STATUS_ID.NEW
      };

      const audits = await AuditsModel.create(auditsDetail);
      if (!audits) {
        return await Service.getBadrequestErrorResponse(Msg.SOMETHING_WENT_WRONG, res);
      }

      await AuditStatusLog.create({ auditId: audits.id, auditStatusId: AUDIT_STATUS_ID.NEW })

      return await Service.getSuccessResponse(Msg.CREATE_AUDIT_REQUEST_SUCCESS, res, { auditId: audits.id });

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
    // manual testing
  },
  startAudit: async function (req, res, next) {
    try {

      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const user = req.authUser;
      const { auditId, isEdit } = req.body

      const auditorExist = await AuditorModel.findOne({
        where: { userId: user.id },
      });

      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.AUDITOR_CAN_UPDATE_STATUS, res);
      }

      const auditData = await AuditsModel.findOne({ where: { id: auditId } });

      if (!auditData) {
        return await Service.getBadrequestErrorResponse(Msg.AUDIT_NOT_FOUND, res);
      }
      if (auditData.auditorId != auditorExist.id) {
        return await Service.getBadrequestErrorResponse(Msg.CANT_START_OTHER_AUDITOR_AUDIT, res);
      }
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>.', auditData.auditStatusId);
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>.', auditData.auditStatusId != AUDIT_STATUS_ID.COMPLETED);
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>.', auditData.auditStatusId != AUDIT_STATUS_ID.ON_GOING);

      // if (auditData.auditStatusId == AUDIT_STATUS_ID.COMPLETED) {
      //   return await Service.getBadrequestErrorResponse(Msg.AUDIT_IS_ALREADY_START, res);
      // }

      if (!isEdit) {
        await AuditsModel.update(
          { auditStatusId: AUDIT_STATUS_ID.ON_GOING },
          { where: { id: auditData.id } }
        );
        const isStatus = await AuditStatusLog.findOne({ where: { auditId: auditData.id, auditStatusId: AUDIT_STATUS_ID.ON_GOING } });
        if (!isStatus) {
          await AuditStatusLog.create({ auditId: auditData.id, auditStatusId: AUDIT_STATUS_ID.ON_GOING });
        } else {
          await AuditStatusLog.update(
            { auditStatusId: AUDIT_STATUS_ID.ON_GOING },
            { where: { id: isStatus.id } }
          );
        }

        const isRequestExists = await UserAuditRequests.findByPk(auditData.auditRequestId);
        if (isRequestExists) {
          await UserAuditRequests.update(
            { auditStatusId: AUDIT_STATUS_ID.ON_GOING },
            { where: { id: auditData.auditRequestId } }
          );
        }
      }
      const auditsDetail = {
        auditId: auditData.id,
        propertyId: auditData.propertyId,
        auditRequestId: auditData.auditRequestId,
        firstName: auditData.firstName || '',
        lastName: auditData.lastName || '',
        emailId: auditData.emailId || '',
        phone: auditData.phone || '',
        pincode1: auditData.pincode1 || '',
        userProvinceId: auditData.userProvinceId || '',
        addressLine1: auditData.addressLine1 || '',
        auditStatusId: auditData.auditStatusId || ''
      };

      return await Service.getSuccessResponse(Msg.AUDIT_IS_START, res, auditsDetail);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
    // manual testing
  },
  getAuditDetails: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const user = req.authUser;
      const { auditId } = req.params

      const auditorExist = await AuditorModel.findOne({
        where: { userId: user.id },
      });

      if (!auditorExist) {
        return await Service.getBadrequestErrorResponse(Msg.NOT_AUDITOR, res);
      }

      const auditData = await AuditsModel.findOne({
        include: [
          {
            model: UserAuditRequests,
            attributes: ["id", "auditStatusId"],
            include: [
              {
                model: UserModel,
                attributes: ["id", "firstName", "lastName", "addressLine1", "addressLine2"],
                as: "UserInfo",
              },
              {
                model: UserHomeModel,
                attributes: ["id", "userId", "pincode", "addressLine1", "addressLine2"],
                as: "UserHomeInfo"
              },
            ],
          },
          {
            model: RegionModel,
            as: "RegionInfo",
            attributes: ["id", "regionCode", "regionTitle"],
          },
          {
            model: WeatherModel,
            as: "WeatherStationsInfo",
            attributes: ["id", "weatherStationTitle"],
          },
          {
            model: NbcModel,
            as: "NBCTierInfo",
            attributes: ["id", "nbcTierTitle"],
          },
          {
            model: AuditStatusLog,
            as: "auditStatusLogs",
            attributes: ["auditStatusId", "createdAt"],
          },
          {
            model: AuditAssemblySelectionModel,
            as: "auditAssemblySelection",
            include: [
              {
                model: AssemblyModel,
                include: [
                  {
                    model: AssemblyElementsModel,
                    attributes: ["id", "elementTitle", "elementDetails", "table", "effectiveRSI"],
                    as: "assemblyElement"
                  }
                ]
              },
              {
                model: AssemblyCategoryModel,
              },
            ],
          }
        ],
        where: {
          id: auditId
        },
      });

      if (!auditData) {
        return await Service.getBadrequestErrorResponse(Msg.AUDIT_NOT_FOUND, res);
      }

      const rejectedAuditIds = await Service.getAuditorRejectedAudits(auditorExist.id);
      const auditStatusLog = await Service.getAuditStatusLog(auditData.id, auditorExist.id);


      const processedAuditStatusId = rejectedAuditIds.includes(auditData.id) ? AUDIT_STATUS_ID.REJECTED : auditData.auditStatusId;

      let data = {
        id: auditData.id,
        projectName: auditData.projectName,
        firstName: auditData.firstName,
        lastName: auditData.lastName,
        addressLine1: auditData.addressLine1,
        addressLine2: auditData.addressLine2,
        pincode1: auditData.pincode1,
        auditStatusId: processedAuditStatusId,
        requestedAt: auditData.createdAt,
        auditStatusName: AUDIT_STATUS_NAME[processedAuditStatusId] || '',
        province: auditData.RegionInfo ? auditData.RegionInfo.regionCode : '',
        weatherStation: auditData.WeatherStationsInfo ? auditData.WeatherStationsInfo.weatherStationTitle : '',
        hdd: auditData.hdd,
        nbcClimateZone: auditData.nbcClimateZone,
        nbcPrescriptiveTier: auditData.NBCTierInfo ? auditData.NBCTierInfo.nbcTierTitle : '',
        houseType: auditData.houseTypeId == 1 ? 'Detached' : 'Attached',
        fdwrPercent: auditData.fdwrPercent,
        createdOn: auditData.createdAt,
        volume: auditData.volume,
        unit: auditData.unit,
        credit: auditData.credit != 0 ? auditData.credit : 'N/A',
        ecpRequired: auditData.ecpRequired,
      };


      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, { audit_data: data, audit_status_log: auditStatusLog });

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  customerAuditRequestList: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrors(req, res)) {
        return;
      }

      const { page, propertyId } = req.query;
      let perPage = 4;
      let skip = 0;

      if (page) {
        const paginationData = Service.parsePagination({ perPage, page });
        perPage = paginationData.perPage;
        skip = paginationData.skip;
      }


      let whereClause = {};
      const { rows: totalCount } = await AuditsModel.findAndCountAll({
        include: [
          {
            model: UserAuditRequests,
            attributes: ["id", "auditStatusId"],
            required: true,
            where: {
              userId: req.authUser.id
            }
          },
        ],
        where: {
          propertyId: propertyId,
          ...whereClause,
        },
      });

      const { rows: requestData } = await AuditsModel.findAndCountAll({
        include: [
          {
            model: UserAuditRequests,
            attributes: ["id", "auditStatusId"],
            required: true,
            where: {
              userId: req.authUser.id
            }
          },
        ],
        where: {
          propertyId: propertyId,
          ...whereClause,
        },
        limit: perPage,
        offset: skip,
        order: [['createdAt', 'DESC']]
      });


      const totalPage = Math.ceil(totalCount.length / perPage);

      const formattedData = [];
      let count = 1;
      for (const request of requestData) {
        const data = {
          id: request.id,
          requestTitle: request.projectName ? request.projectName : "Audit is not start yet",
          auditStatusId: request.auditStatusId,
          reasonForRejection: request.rejectReason || '',
          requestedAt: request.createdAt,
          auditStatusName: AUDIT_STATUS_NAME[request.auditStatusId] || '',
        };
        count += 1;
        formattedData.push(data);
      }

      const paginationResponse = {
        requests: formattedData,
        perPage: perPage,
        currentPageRecordCount: requestData.length,
        totalRecord: totalCount.length,
        totalPage: totalPage,
      };

      return await Service.getSuccessResponse(Msg.SUCCESS_MESSAGE, res, paginationResponse);
    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
  },
  homeDetails: async function (req, res, next) {
    try {

      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const { auditId } = req.query

      const auditData = await AuditsModel.findOne({ where: { id: auditId } });

      if (!auditData) {
        return await Service.getBadrequestErrorResponse(Msg.AUDIT_NOT_FOUND, res);
      }

      const auditsDetail = {
        auditId: auditData.id,
        projectName: auditData.projectName,
        addressLine2: auditData.addressLine2 || '',
        pincode2: auditData.pincode2 || '',
        projectProvinceId: auditData.provinceId || '',
        weatherStationId: auditData.weatherStationId || '',
        nbcClimateZone: auditData.nbcClimateZone || '',
        nbcPerspectiveTierId: auditData.nbcPerspectiveTierId || '',
        houseTypeId: auditData.houseTypeId || '',
        fdwrPercent: auditData.fdwrPercent || '',
        volume: auditData.volume || '',
        unit: auditData.unit || '',
        credit: auditData.credit || '',
        ecpRequired: auditData.ecpRequired || '',
      };

      return await Service.getSuccessResponse(Msg.AUDIT_IS_START, res, auditsDetail);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
    // manual testing
  },
  propertyDetails: async function (req, res, next) {
    try {

      if (Service.hasValidatorErrors(req, res)) {
        return;
      }
      const { auditId } = req.query

      const auditData = await AuditsModel.findOne({ where: { id: auditId } });

      if (!auditData) {
        return await Service.getBadrequestErrorResponse(Msg.AUDIT_NOT_FOUND, res);
      }

      const propertyData = await Property.findByPk(auditData.propertyId);
      const propertyDetail = {
        auditId: auditData.id,
        type: propertyData.type,
        title: propertyData.title || '',
        address: propertyData.address || '',
        city: propertyData.city || '',
        propertyProvinceId: propertyData.provinceId || '',
        postalCode: propertyData.postalCode || '',
      };

      return await Service.getSuccessResponse(Msg.AUDIT_IS_START, res, propertyDetail);

    } catch (error) {
      console.log('error.message', error);
      return await Service.getInternalServerErrorResponse(error.message, res);
    }
    // manual testing
  },
};
