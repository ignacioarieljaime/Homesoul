const Service = require("../../helpers/index");
const weatherModel = require("../../model/weather_stations");
const regionModel = require("../../model/regions");
const { HttpStatus, ErrorCode } = require("../../errors/code");
const { Msg } = require("../../helpers/localization");

module.exports = {
  form: async function (req, res, next) {
    try {
      const itemId = req.params.id;
      var data = null;
      if (req.params !== null) {
        data = await weatherModel.findByPk(itemId);
      }
      const regions = await regionModel.findAll({
        attributes: ["id", "regionTitle", "regionCode"],
      })
      if (data === null) {
        res.render('weather/form', { title: "Add Form", route: "weather", data: null, url: "/weather/add", regions: regions })
      } else {
        const newData = {
          regionId: data.regionId,
          weatherStationTitle: data.weatherStationTitle,
          hdd: data.hdd,
        };
        res.render('weather/form', { title: "Edit Form", route: "weather", data: newData, url: "/weather/update/" + itemId, regions: regions })
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

      const { regionId, weatherStationTitle, hdd } = req.body;

      await regionModel.findAll()
      const weatherInfo = {
        regionId: regionId,
        weatherStationTitle,
        hdd,
      };

      const weather = new weatherModel(weatherInfo);
      weather.save();

      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.WEATHER_STATION_ADD_SUCCESSFULLY, url: "/weather" });
    } catch (error) {
      next(error);
    }
  },

  list: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      res.render('weather/index', { title: "Weather", route: "weather", tableId: "weather-table", loadList: "/weather/load-list", })
    } catch (error) {
      next(error);
    }
  },

  getList: async function (req, res, next) {
    try {
      const { draw, start, length, search, order } = req.query;
      const searchTerm = search.value || "";

      let options = {
        attributes: ["regionId", "weatherStationTitle", "hdd", "id"],
        include: [{ model: regionModel, attributes: ['regionTitle'], where: { isDeleted: false } }],
        limit: parseInt(length),
        offset: parseInt(start),
        where: {
          isDeleted: false,
        },
        order: [],
        raw: true,
      };
      options = Service.applySearch(options, searchTerm, ["weatherStationTitle", "hdd"]);
      options = Service.applyOrder(options, order, ["weatherStationTitle", "hdd"]);
      const result = await weatherModel.findAndCountAll(options);
      const weather = result.rows;
      const formattedData = weather.map((element) => ({
        region: element['region.regionTitle'],
        weatherStationTitle: element.weatherStationTitle,
        hdd: element.hdd,
        action: `<a href="/weather/edit/${element.id}" title="Edit Record" class="text-info"><button type="button" class="btn btn-info btn-sm"><i class="fas fa-edit"></i></button></a>
                        <button type="button" onclick="deleteRecord('/weather/delete','${element.id}')" class="btn btn-danger btn-sm">
                            <i class="fas fa-solid fa-trash"></i>
                        </button>`,
      }));

      let totalRecords = result.count;
      if (searchTerm === "") {
        totalRecords = await weatherModel.count({ where: { isDeleted: false } });
      }
      res.json({
        draw: parseInt(draw),
        recordsTotal: totalRecords,
        recordsFiltered: result.count,
        data: formattedData,
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

      const { regionId, weatherStationTitle, hdd } = req.body;
      const checkWeather = await weatherModel.findByPk(req.params.id);
      if (!checkWeather) { return res.status(HttpStatus.NOT_FOUND).send({ message: Msg.RECORD_NOT_FOUND }); }

      checkWeather.regionId = regionId;
      checkWeather.weatherStationTitle = weatherStationTitle;
      checkWeather.hdd = hdd;

      const weatherData = await checkWeather.save();
      if (!weatherData) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.SOMETHING_WENT_WRONG }); }
      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.WEATHER_STATION_UPDATE_SUCCESSFULLY, url: "/weather", });
    } catch (error) {
      next(error);
    }
  },

  delete: async function (req, res, next) {
    try {
      if (Service.hasValidatorErrorsBackend(req, res)) {
        return;
      }
      const detail = await weatherModel.findByPk(req.body.id);
      if (!detail) { return res.status(HttpStatus.BAD_REQUEST_STATUS_CODE).send({ message: Msg.WEATHER_STATION_NOT_FOUND }); }

      detail.isDeleted = true;
      detail.save();

      return res.status(HttpStatus.SUCCESS_CODE).send({ message: Msg.WEATHER_DELETE_SUCCESSFULLY, url: "/weather", tableId: "weather-table" });
    } catch (error) {
      next(error);
    }
  },
};
