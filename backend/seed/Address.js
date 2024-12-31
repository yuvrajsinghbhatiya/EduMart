const Address = require("../models/Address");

const addresses = [
  {
    _id: "65c26398e1e1a2106ac8fbd5",
    user: "65b8e564ea5ce114184ccb96",
    street: "banusi",
    city: "Khatima",
    state: "Uttarakhand",
    phoneNumber: "7078021174",
    postalCode: "262308",
    country: "India",
    type: "Home",
    __v: 0,
  },

];

exports.seedAddress = async () => {
  try {
    await Address.insertMany(addresses);
    console.log("Address seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
