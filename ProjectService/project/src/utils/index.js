const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APP_SECRET,MESSAGE_BROKER_URL,EXCHANGE_NAME } = require("../config");
const axios = require("axios");
const amqplib = require("amqplib");

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

module.exports.GenerateSignature = async (payload) => {
  try {
      
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

    if (decodedToken.role === expectedRole) {
      return true;
    } else {
      console.error("User does not have the expected role");
      return false;
    }
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




// publish message

module.exports.PublishMessage = async (channel, binding_key, message) => {
  try{

  await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  console.log('message has been sent'+ message)
  
}catch(err){
throw err
}
};



// subscribe message 


module.exports.SubscribeMessage = async (channel, service, binding_key) => {
  const appQueue = await channel.assertQueue('QUEUE_NAME'); 

  channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);
  
  channel.consume(appQueue.queue, date =>{
    console.log('received data');
    console.log(data.content.toString());
    channel.ack(data)
  })
}