const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: '0.0.0.0',
  port: 1028,
  auth: {
      user: 'project.4',
      pass: 'secret.4'
  }
});

const otpStore = {}; 

const validateOTP = async (email, otp) => {
  const storedOTP = otpStore[email]; 
  if (storedOTP && storedOTP === otp) {
    delete otpStore[email]; 
    return true;
  }
  return false;
};

const generateAndSendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000); 
  otpStore[email] = otp;

  const mailOptions = {
    from: 'yahiasaidi031@gmail.com',  // Utilisez le même email que dans auth
    to: email, 
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error(error);
  }
};

module.exports = { validateOTP, generateAndSendOTP };
