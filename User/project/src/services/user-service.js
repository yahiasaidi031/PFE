const { UserRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSignature, ValidatePassword, GenerateSalt } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors')



class UserService {

    constructor(){
        this.repository = new UserRepository();
    }

    async SignIn(userInputs) {
        const { email, password } = userInputs;
      
        try {
          const existingUser = await this.repository.FindUser({ email });
      
          if (existingUser) {
            const validPassword = await ValidatePassword(password, existingUser.password);
      
            if (validPassword) {
              const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id },existingUser.role);
              return FormateData({ message: "success" ,id: existingUser._id,token });
            }else {
                return FormateData({ error: "Password incorrect" });
            }
          }else {
            return FormateData({ error: "Email not found" })
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
            role:'admin'
          });
      
          const token = await GenerateSignature({ email: email, _id: existingUser._id },existingUser.role);
      
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


}

module.exports = UserService;