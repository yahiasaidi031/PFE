const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APP_SECRET, EXCHANGE_NAME, USER_BINDING_KEY , Queue_Name,MESSAGE_BROKER_URL } = require("../config");
const amqplib = require('amqplib')
 



module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

module.exports.GenerateSignature = async (payload,role) => {
  try {
    payload.role = role;
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};


module.exports.ValidateSignature = async (req, expectedRole) => {
  try {
    const signature = req.get("Authorization");

    if (!signature) {
      console.error("Authorization header is missing");
      return false;
    }

    const parts = signature.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.error("Invalid Authorization header format");
      return false;
    }

    const decodedToken = jwt.verify(parts[1], APP_SECRET);
    console.log(decodedToken);

    if (!decodedToken.role || decodedToken.role !== expectedRole) {
      console.error("User does not have the expected role");
      
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};


// creat a channel 

module.exports.CreateChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (err) {
    throw err;
  }
};





// subscribe message 


module.exports.SubscribeMessage = async (channel, service, ) => {
  const appQueue = await channel.assertQueue(Queue_Name);
  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, USER_BINDING_KEY);
  channel.consume(appQueue.queue, data =>{
    console.log('received data');
    console.log(data.content.toString());
    channel.ack(data)
  })
}

