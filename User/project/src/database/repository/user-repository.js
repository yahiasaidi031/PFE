const { UserModel,ContactModel } = require("../models/index")



const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");
const Joi = require('joi');
class UserRepository {
  
  async CreateUser(userData) { 
    
      const userSchemaJoi = Joi.object({

          firstname: Joi.when('isEnterprise', {
              is: false,
              then: Joi.string().required(),
              otherwise: Joi.string().optional()
          }),
          lastname: Joi.when('isEnterprise', {
              is: false,
              then: Joi.string().required(),
              otherwise: Joi.string().optional()
          }),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          isEnterprise: Joi.boolean(),
          phone: Joi.string().required(),
          role: Joi.string().required(),
          companyName: Joi.when('isEnterprise', {
              is: true,
              then: Joi.string().required(),
              otherwise: Joi.optional()
          }),
          companyRegistrationNumber: Joi.when('isEnterprise', {
              is: true,
              then: Joi.string().required(),
              otherwise: Joi.optional()
          })
        })

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

  


  async FindUser( {email }) {
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

  async save(user) {
    try {
        await user.save();
    } catch (error) {
        throw new APIError(500, 'Error saving user', error);
    }
}


  async FindUserById(id) {
    try {
        const existingUser = await UserModel.findById(id);
        if (!existingUser) {
            throw new APIError(404, 'User not found');
        }
        return existingUser;
    } catch (err) {
        console.error(err); 
        throw new APIError(
            500,
            'Internal Server Error',
            'Unable to Find User'
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

async UpdateUserPassword(email, newPassword) {
  try {
    const result = await UserModel.updateOne(
      { email },
      { $set: { password: newPassword } }
    );
    if (result.modifiedCount === 0) {
      throw new APIError(404, 'User not found');
    }
    return { message: 'Password updated successfully' };
  } catch (err) {
    throw new APIError(
      "API Error",
      STATUS_CODES.INTERNAL_ERROR,
      "Unable to update password"
    );
  }
}
async UpdateUserRole(userId, newRole) {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );
    return updatedUser;
  } catch (err) {
    throw new APIError('Unable to update user role', err);
  }
}



async CreateContact(contactData) {
  try {
    const contact = new ContactModel(contactData);
    await contact.save();
    return contact;
  } catch (err) {
    throw new APIError('Unable to create contact', err);
  }
}


async FindAllContacts() {
  try {
    const contacts = await ContactModel.find();
    return contacts;
  } catch (err) {
    throw new APIError('Unable to fetch contacts', err);
  }
}
}


module.exports = UserRepository;
