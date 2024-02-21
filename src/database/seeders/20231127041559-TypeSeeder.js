"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Types", [
      {
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Teacher",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "TA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Types", null, {});
  },
};
