'use strict';
const Assembly = require('../model/assembly'); // Import your Sequelize model
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
      /* A */
		  	{ assemblyCategoryId:1,assemblyTitle: 'AGW#01 - Drywall + R22 batt @ 16" o.c. + 7 / 16" OSB + Siding', subTitle:'Lumber Stud - Stud dimensional lumber - 38 mm x 140 mm (2"x6") with RSI=1.19 m²K/W', standardCost:20200, totalEffectiveRSI:3.00, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:1,assemblyTitle: 'AGW#02 - Drywall + R22 batt @ 16" o.c. + 7 / 16" OSB + Brick', subTitle:'Lumber Stud - Stud dimensional lumber - 38 mm x 140 mm (2"x6") with RSI=1.19 m²K/W', standardCost:24200, totalEffectiveRSI:3.13, totalEffectiveRValue:17.78 },

			{ assemblyCategoryId:1,assemblyTitle: 'AGW#03 - Drywall + R20 batt @ 16" o.c. + R5 c.i. (1" XPS or equivalent), No OSB + Brick', subTitle:'Lumber Stud - Stud dimensional lumber - 38 mm x 140 mm (2"x6") with RSI=1.19 m²K/W', standardCost:29900, totalEffectiveRSI:3.76, totalEffectiveRValue:21.33 },

			{ assemblyCategoryId:1,assemblyTitle: 'AGW#04 - Drywall + R19 batt @ 16" o.c. + R10 c.i. (2" XPS or equivalent), No OSB + Brick', subTitle:'Lumber Stud - Stud dimensional lumber - 38 mm x 140 mm (2"x6") with RSI=1.19 m²K/W', standardCost:31950, totalEffectiveRSI:4.56, totalEffectiveRValue:25.90 },

      /* B */
      { assemblyCategoryId:2,assemblyTitle: 'BGW#01 - 8" Concrete + R20 Full Height Blankets + no finish', subTitle:'Foundation Wall – Cast-in-place concrete with interior stud frame wall', standardCost:20200, totalEffectiveRSI:3.72, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:2,assemblyTitle: 'BGW#02 - 8" Concrete + R4 ci (1" MW) + R19 Batt 2"x6" @ 16" o.c. + no finish', subTitle:'Foundation Wall – Cast-in-place concrete with interior stud frame wall', standardCost:20200, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:2,assemblyTitle: 'BGW#03 - 8" Concrete + R5 ci (1" XPS) + R20 Batt 2"x6" @ 24" o.c. + drywall', subTitle:'Foundation Wall – Cast-in-place concrete with interior stud frame wall', standardCost:20200, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

      /* C */

      { assemblyCategoryId:3,assemblyTitle: 'U1.61 / ER25', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.72, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:3,assemblyTitle: 'U1.44 / ER29', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:3,assemblyTitle: 'U1.22 / ER34', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:3,assemblyTitle: 'U1.05 / ER40', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:3,assemblyTitle: 'U0.94 / ER42', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:3,assemblyTitle: 'U0.82 / ER44', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },


      /* D */

      { assemblyCategoryId:4,assemblyTitle: 'Level 1 (ACH 3.0)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.72, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:4,assemblyTitle: 'Level 2 (ACH 2.5)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:4,assemblyTitle: 'Level 3 (ACH 2.0)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:4,assemblyTitle: 'Level 4 (ACH 1.5)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:4,assemblyTitle: 'Level 5 (ACH 1.0)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

      /* E */

      { assemblyCategoryId:5,assemblyTitle: '60% ≤ SRE < 65%', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.72, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:5,assemblyTitle: '65% ≤ SRE < 75%', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:5,assemblyTitle: '75% ≤ SRE < 84%', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

      /* F */

      { assemblyCategoryId:6,assemblyTitle: 'Gas- or oil-fired Tankless Condensing Water Heater (EF ≥ 0.95 or UEF ≥ 0.92)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.72, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:6,assemblyTitle: 'Gas- or oil-fired Residential Storage-type Service Water Heater (EF ≥ 0.80 or UEF ≥ 0.83)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:6,assemblyTitle: 'Gas- or oil-fired Residential-duty Commercial Storage-type Service Water Heater (UEF ≥ 0.79)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

      { assemblyCategoryId:6,assemblyTitle: 'Gas- or oil-fired Residential-duty Commercial Storage-type Service Water Heater (UEF ≥ 0.85)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },

			{ assemblyCategoryId:6,assemblyTitle: 'Heat pump water heater (EF ≥ 2.35)', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.97, totalEffectiveRValue:17.03 },

       /* G */

       { assemblyCategoryId:7,assemblyTitle: '96% AFUE', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.72, totalEffectiveRValue:17.03 },

       { assemblyCategoryId:7,assemblyTitle: '98% AFUE', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },
 
       /* H */

       { assemblyCategoryId:8,assemblyTitle: 'Removed', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:3.72, totalEffectiveRValue:17.03 },

       { assemblyCategoryId:8,assemblyTitle: '30% Efficiency', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },

       { assemblyCategoryId:8,assemblyTitle: '40% Efficiency', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },
       { assemblyCategoryId:8,assemblyTitle: '50% Efficiency', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },
       { assemblyCategoryId:8,assemblyTitle: '60% Efficiency', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },
       { assemblyCategoryId:8,assemblyTitle: '70% Efficiency', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },
       { assemblyCategoryId:8,assemblyTitle: '75% Efficiency', subTitle:'Subtitle', standardCost:11350, totalEffectiveRSI:2.87, totalEffectiveRValue:17.03 },
 
			
		];
  
		for (const data of fillData) {
			await Assembly.findOrCreate({
          where: { assemblyTitle: data.assemblyTitle }, // Checking for existing entry based on assemblyTitle
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
