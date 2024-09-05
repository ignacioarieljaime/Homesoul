'use strict';
const AssemblyElements = require('../model/assembly_elements'); // Import your Sequelize model
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

	try {
		const fillData = [
       /* 1 */
			{ assemblyId:1,elementTitle: 'Continuous materials', elementDetails:'Air film exterior', table:'CM-1', effectiveRSI:0.03},
			{ assemblyId:1,elementTitle: 'Continuous materials', elementDetails:'Siding', table:'CM-1', effectiveRSI:0.11},
			{ assemblyId:1,elementTitle: 'Continuous materials', elementDetails:'No Strapping', table:'N/A', effectiveRSI:0.00},
			{ assemblyId:1,elementTitle: 'Continuous materials', elementDetails:'OSB sheathing, 11mm at 0.0098 RSI/mm', table:'CM-1', effectiveRSI:0.11},
			{ assemblyId:1,elementTitle: 'Frame-Cavity Stud dimensional lumber', elementDetails:'Frame-Cavity Stud dimensional lumber: 38 mm x 140 mm (2"x6"), 410 mm (16") on-centre, RSI 2.61 (R22) nominal cavity fill between studs', table:'WA-2', effectiveRSI:2.55},
			{ assemblyId:1,elementTitle: 'Continuous materials', elementDetails:'Polyethylene vapour retarder', table:'n/a', effectiveRSI:0},
			{ assemblyId:1,elementTitle: 'Continuous materials', elementDetails:'Gypsum board, 12.7 mm at 0.0063 RSI/mm', table:'CM-1', effectiveRSI:0.08},
			{ assemblyId:1,elementTitle: 'Continuous materials', elementDetails:'Air film interior, wall (heat flow horizontal)', table:'CM-1', effectiveRSI:0.12},

        /* 5 */
			{ assemblyId:5,elementTitle: 'Dummy Element Title 1', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:5,elementTitle: 'Dummy Element Title 2', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:5,elementTitle: 'Dummy Element Title 3', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},

        /* 8 */
			{ assemblyId:8,elementTitle: 'Dummy Element Title 1', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:8,elementTitle: 'Dummy Element Title 2', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:8,elementTitle: 'Dummy Element Title 3', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},

          /* 14 */
			{ assemblyId:14,elementTitle: 'Dummy Element Title 1', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:14,elementTitle: 'Dummy Element Title 2', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:14,elementTitle: 'Dummy Element Title 3', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},


          /* 19 */
			{ assemblyId:19,elementTitle: 'Dummy Element Title 1', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:19,elementTitle: 'Dummy Element Title 2', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:19,elementTitle: 'Dummy Element Title 3', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},



          /* 22 */
			{ assemblyId:22,elementTitle: 'Dummy Element Title 1', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:22,elementTitle: 'Dummy Element Title 2', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:22,elementTitle: 'Dummy Element Title 3', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},



          /* 27 */
			{ assemblyId:27,elementTitle: 'Dummy Element Title 1', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:27,elementTitle: 'Dummy Element Title 2', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:27,elementTitle: 'Dummy Element Title 3', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},



          /* 29 */
			{ assemblyId:29,elementTitle: 'Dummy Element Title 1', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:29,elementTitle: 'Dummy Element Title 2', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      { assemblyId:29,elementTitle: 'Dummy Element Title 3', elementDetails:'Dummy Element Description', table:'CM-1', effectiveRSI:0.03},
      
			
			
		];
  
		for (const data of fillData) {
			await AssemblyElements.findOrCreate({
                where: { assemblyId: data.assemblyId, elementTitle: data.elementTitle }, // Checking for existing entry based on assemblyTitle
                defaults: data // If not found, insert the data
            });
		}
	} catch (error) {
		console.error('Error seeding data:', error);
	}
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
