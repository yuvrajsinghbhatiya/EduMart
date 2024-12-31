const Category = require("../models/Category");

const categories = [
  { _id: "65a7e24602e12c44f599442c", name: "textbooks" },
  { _id: "65a7e24602e12c44f599442d", name: "educational-electronics" },
  { _id: "65a7e24602e12c44f599442e", name: "art-supplies" },
  { _id: "65a7e24602e12c44f599442f", name: "stationery" },
  { _id: "65a7e24602e12c44f5994430", name: "lab-equipment" },
  { _id: "65a7e24602e12c44f5994431", name: "school-bags" },
  { _id: "65a7e24602e12c44f5994432", name: "mathematical-instruments" },
  { _id: "65a7e24602e12c44f5994433", name: "educational-games" },
  { _id: "65a7e24602e12c44f5994434", name: "language-learning" },
  { _id: "65a7e24602e12c44f5994435", name: "music-instruments" },
  { _id: "65a7e24602e12c44f5994436", name: "sports-equipment" },
  { _id: "65a7e24602e12c44f5994437", name: "teaching-aids" },
  { _id: "65a7e24602e12c44f5994438", name: "office-supplies" },
  { _id: "65a7e24602e12c44f5994439", name: "computers-accessories" },
  { _id: "65a7e24602e12c44f599443a", name: "school-furniture" },
  { _id: "65a7e24602e12c44f599443b", name: "science-kits" },
  { _id: "65a7e24602e12c44f599443c", name: "storage-organization" },
  { _id: "65a7e24602e12c44f599443d", name: "educational-software" },
  { _id: "65a7e24602e12c44f599443e", name: "engineering-tools" },
  { _id: "65a7e24602e12c44f599443f", name: "safety-equipment" }
];

exports.seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Educational categories seeded successfully");
  } catch (error) {
    console.log(error);
  }
};