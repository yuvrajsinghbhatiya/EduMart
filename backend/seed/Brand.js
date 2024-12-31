const Brand = require("../models/Brand");

const brands = [
  // Textbook and Educational Publishers
  { _id: "65a7e20102e12c44f59943da", name: "Oxford University Press" },
  { _id: "65a7e20102e12c44f59943db", name: "Pearson Education" },
  { _id: "65a7e20102e12c44f59943dc", name: "McGraw Hill" },
  { _id: "65a7e20102e12c44f59943dd", name: "Cambridge University Press" },
  { _id: "65a7e20102e12c44f59943de", name: "Wiley Publishing" },

  // Electronics and Technology
  { _id: "65a7e20102e12c44f59943df", name: "Texas Instruments" },
  { _id: "65a7e20102e12c44f59943e0", name: "Casio Education" },
  { _id: "65a7e20102e12c44f59943e1", name: "HP Education" },
  { _id: "65a7e20102e12c44f59943e2", name: "Wacom" },
  { _id: "65a7e20102e12c44f59943e3", name: "SMART Technologies" },

  // Art Supplies
  { _id: "65a7e20102e12c44f59943e4", name: "Faber-Castell" },
  { _id: "65a7e20102e12c44f59943e5", name: "Prismacolor" },
  { _id: "65a7e20102e12c44f59943e6", name: "Staedtler" },
  { _id: "65a7e20102e12c44f59943e7", name: "Crayola" },
  { _id: "65a7e20102e12c44f59943e8", name: "Royal & Langnickel" },

  // Stationery
  { _id: "65a7e20102e12c44f59943e9", name: "Parker" },
  { _id: "65a7e20102e12c44f59943ea", name: "Moleskine" },
  { _id: "65a7e20102e12c44f59943eb", name: "PILOT" },
  { _id: "65a7e20102e12c44f59943ec", name: "Five Star" },
  { _id: "65a7e20102e12c44f59943ed", name: "Leuchtturm1917" },

  // Laboratory Equipment
  { _id: "65a7e20102e12c44f59943ee", name: "Lab Essentials" },
  { _id: "65a7e20102e12c44f59943ef", name: "Science First" },
  { _id: "65a7e20102e12c44f59943f0", name: "Carolina Biological" },
  { _id: "65a7e20102e12c44f59943f1", name: "Ward's Science" },
  { _id: "65a7e20102e12c44f59943f2", name: "AmScope" },

  // School Bags and Storage
  { _id: "65a7e20102e12c44f59943f3", name: "JanSport" },
  { _id: "65a7e20102e12c44f59943f4", name: "SwissGear" },
  { _id: "65a7e20102e12c44f59943f5", name: "High Sierra" },
  { _id: "65a7e20102e12c44f59943f6", name: "Eastpack" },
  { _id: "65a7e20102e12c44f59943f7", name: "The North Face" },

  // Educational Games and Learning Tools
  { _id: "65a7e20102e12c44f59943f8", name: "Learning Resources" },
  { _id: "65a7e20102e12c44f59943f9", name: "ThinkFun" },
  { _id: "65a7e20102e12c44f59943fa", name: "Educational Insights" },
  { _id: "65a7e20102e12c44f59943fb", name: "Melissa & Doug" },
  { _id: "65a7e20102e12c44f59943fc", name: "Brain Box" },

  // Mathematical Instruments
  { _id: "65a7e20102e12c44f59943fd", name: "Helix" },
  { _id: "65a7e20102e12c44f59943fe", name: "Maped" },
  { _id: "65a7e20102e12c44f59943ff", name: "Westcott" },
  { _id: "65a7e20102e12c44f5994400", name: "Rotring" },
  { _id: "65a7e20102e12c44f5994401", name: "KUM" }
];

exports.seedBrand = async () => {
  try {
    await Brand.insertMany(brands);
    console.log('Educational brands seeded successfully');
  } catch (error) {
    console.log(error);
  }
};