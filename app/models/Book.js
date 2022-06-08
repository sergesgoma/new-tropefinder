// const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../database/db");

// const Book = db.define(
//   "book",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//     },
//     book_id: {
//       type: DataTypes.INTEGER,
//     },
//     title: {
//       type: DataTypes.TEXT,
//     },
//     author: {
//       type: DataTypes.TEXT,
//     },
//     img: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       validate: {
//         notEmpty: true,
//       },
//     },
//     gdRating: {
//       type: DataTypes.DECIMAL(10, 2),
//     },
//     seriesName: {
//       type: DataTypes.TEXT,
//     },
//     numSeries: {
//       type: DataTypes.TEXT,
//     },
//     numGdRating: {
//       type: DataTypes.INTEGER,
//     },
//     numGdReview: {
//       type: DataTypes.TEXT,
//     },
//     format: {
//       type: DataTypes.TEXT,
//     },
//     firstPublished: {
//       type: DataTypes.TEXT,
//     },
//     yearOfPublication: {
//       type: DataTypes.TEXT,
//     },
//     awards: {
//       type: DataTypes.ARRAY(DataTypes.TEXT),
//     },
//     tag: {
//       type: DataTypes.ARRAY(DataTypes.TEXT),
//     },
//     genres: {
//       type: DataTypes.ARRAY(DataTypes.TEXT),
//     },
//     summary: {
//       type: DataTypes.TEXT,
//     },
//   },
//   {
//     tableName: "books",
//     timestamps: false,
//   }
// );

// Book.sync();

// module.exports = Book;
