const { UserModel } = require("../models/index")
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");
const Joi = require('joi');
class UserRepository {
  
  async CreateUser(userData) {

    const userSchemaJoi = Joi.object({
      firstname: Joi.string().required(), 
      lastname: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isEnterprise: Joi.boolean(),
      phone: Joi.string().required(),
      role:Joi.string().required(),
      companyRegistrationNumber: Joi.string().when('isEnterprise', {
          is: true,
          then: Joi.required(),
          otherwise: Joi.optional()
      }),
      companyName: Joi.string().when('isEnterprise', {
          is: true,
          then: Joi.required(),
          otherwise: Joi.optional()
      })
  });

    const { error } = userSchemaJoi.validate(userData);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    const user = new UserModel(userData);
    try {
      await user.save();
      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new Error(`User with email "${userData.email}" already exists.`);
      } else {
        throw err;
      }
    }
  }

  


  async FindUser({ email }) {
    try {
      const existingUser = await UserModel.findOne({ email: email });
      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find user"
      );
    }
  }

  async FindUserById({ id }) {
    try {
      const existingUser = await UserModel.findById(id)
        .populate("address")
        .populate("wishlist")
      return existingUser;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find User"
      );
    }
  }

  async Wishlist(userId) {
    try {
      const profile = await UserModel.findById(userId).populate(
        "wishlist"
      );

      return profile.wishlist;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Wishlist "
      );
    }
  }
  async FindAllUsers() {
    try {
        const allUsers = await UserModel.find();
        console.log('All Users:', allUsers);
        return allUsers;
    } catch (err) {
        console.error('Error in FindAllUsers:', err);
        throw new APIError(
            "API Error",
            STATUS_CODES.INTERNAL_ERROR,
            "Unable to fetch all users"
        );
    }
}
  
}

module.exports = UserRepository;
