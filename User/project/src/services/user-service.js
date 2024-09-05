const { UserRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSignature, ValidatePassword, GenerateSalt } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors')

const { validateOTP, generateAndSendOTP } = require('../utils/otp')

class UserService {

  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;

    try {
      const existingUser = await this.repository.FindUser({ email });

      if (existingUser) {
        const validPassword = await ValidatePassword(password, existingUser.password);

        if (validPassword) {
          const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id }, existingUser.role);
          return FormateData({ message: "success", id: existingUser._id, token, result: true, role: existingUser.role, user: { _id: existingUser._id, firstname: existingUser.firstname ,email: existingUser.email,lastname: existingUser.lastname,phone: existingUser.phone } });
        } else {
          return FormateData({ message: "Password incorrect" });
        }
      } else {
        return FormateData({ message: "Email not found" })
      }

    } catch (err) {
      throw new APIError('Data not found', err)
    }
  }


  async SignUp(userInputs) {
    const { firstname, lastname, email, password, isEnterprise, phone, companyName, companyRegistrationNumber } = userInputs;

    try {
      let salt = await GenerateSalt();
      let userPassword = await GeneratePassword(password, salt);


      const existingUser = await this.repository.CreateUser({
        firstname,
        lastname,
        email,
        password: userPassword,
        isEnterprise,
        phone,
        companyName,
        companyRegistrationNumber,
        role: 'user'
      });

      const token = await GenerateSignature({ email: email, _id: existingUser._id }, existingUser.role);

      return FormateData({ id: existingUser._id, token });
    } catch (err) {
      throw new APIError('Unable to sign up user', err);
    }
  }



  async GetAllUser() {
    try {
      const existingUser = await this.repository.FindAllUsers();
      console.log('Existing User:', existingUser);
      return FormateData(existingUser);
    } catch (err) {
      console.error('Error in GetAllUser:', err);
      throw new APIError('Data Not found', err);
    }
  }



  async blockUser(userId) {
    try {
      const user = await this.repository.FindUserById(userId);

      if (!user) {
        throw new APIError(404, 'User not found');
      }

      user.isBlocked = true;

      await this.repository.save(user);

      return { message: 'User blocked successfully' };
    } catch (error) {
      console.error(error);
      throw new APIError(
        500,
        'Internal Server Error',
        'Error blocking user'
      );
    }
  }



  async unblockUser(userId) {
    try {
      const user = await this.repository.FindUserById(userId);

      if (!user) {
        throw new APIError(404, 'User not found');
      }

      user.isBlocked = false;

      await this.repository.save(user);

      return { message: 'User unblocked successfully' };
    } catch (error) {
      throw new APIError(500, 'Error unblocking user');
    }
  }

  async ResetPassword({ email, otp, newPassword }) {
    try {
        console.log('Validating OTP for email:', email);
        const isValidOTP = await validateOTP(email, otp); 
        if (!isValidOTP) {
            throw new APIError(400, 'Invalid OTP');
        }

        console.log('Finding user with email:', email);
        const user = await this.repository.FindUser({email});
        if (!user) {
            console.log('User not found');
            throw new APIError(404, 'User not found');
        }

        console.log('Generating salt and hashed password');
        const salt = await GenerateSalt();
        const hashedPassword = await GeneratePassword(newPassword, salt);

        console.log('Updating user password');
        await this.repository.UpdateUserPassword(email, hashedPassword);

        return FormateData({ message: 'Password reset successfully' });
    } catch (err) {
        console.error('ResetPassword Error:', err);

        if (err instanceof APIError) {
            throw err; // Re-throw APIError with correct status code and message
        } else {
            throw new APIError(500, 'Internal Server Error', err.message || 'Unknown error');
        }
    }
}



  async sendPasswordResetOTPEmail(email) {
    try {
      console.log(`Searching for user with email: ${email}`);
      const user = await this.repository.FindUser({ email });
      
      if (!user) {
        console.log('User not found, throwing APIError');
        throw new APIError(404, "There's no account for the provided email.");
      }
  
      console.log('User found, generating and sending OTP');
      const otp = await generateAndSendOTP(email); 
    
      return {
        message: 'OTP sent successfully',
        otp 
      };
    } catch (error) {
      console.error('Error occurred:', error);
  
      // Si l'erreur est une instance de APIError, renvoyer telle quelle
      if (error instanceof APIError) {
        throw error;
      } else {
        // Sinon, renvoyer une erreur générique
        throw new APIError(500, 'Error sending password reset OTP');
      }
    }
  }
  
  async UpdateUserRole(userId, newRole) {
    try {
      const updatedUser = await this.repository.UpdateUserRole(userId, newRole);
      return FormateData({ userId: updatedUser._id, role: updatedUser.role });
    } catch (err) {
      throw new APIError('Unable to update user role', err);
    }
  }

  async MakeContact(contactInputs) {
    const { name, email, phone, object, message } = contactInputs;

    try {
        const contact = await this.repository.CreateContact({
            name,
            email,
            phone,
            object,
            message
        });

        return FormateData({ contact });
    } catch (err) {
        throw new APIError('Unable to create contact', err);
    }
}
  
  async GetAllContacts() {
    try {
      const contacts = await this.repository.FindAllContacts();
      return FormateData({ contacts });
    } catch (err) {
      throw new APIError('Unable to fetch contacts', err);
    }
  }





}





module.exports = UserService;