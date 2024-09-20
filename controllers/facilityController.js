const FacilityServices = require("../services/facilityServices");

const res_CODE = require("../statusCode");
const res_MESSAGES = require("../errorMessage");

class FacilityController {
  createFacility = async (req, res, next) => {
    try {
      const result = await FacilityServices.createEntry(req.body);
      res.status(res_CODE.CREATED).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getFacilityByID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await FacilityServices.getEntryByID(id);
      if (result) {
        res.status(res_CODE.OK).json(result);
      } else {
        res.status(res_CODE.NOT_FOUND).json({
          error: res_MESSAGES.NOT_FOUND,
        });
      }
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  getAllFacility = async (req, res, next) => {
    try {
      const result = await FacilityServices.getAllEntry(req.query);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  updateFacility = async (req, res, next) => {
    try {
      const result = await FacilityServices.updateEntry(
        req.params.id,
        req.body
      );
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };

  deleteFacility = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await FacilityServices.deleteEntry(id);
      res.status(res_CODE.OK).json(result);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
}

module.exports = new FacilityController();
