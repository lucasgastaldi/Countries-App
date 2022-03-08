//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Country } = require('./src/db');
const axios = require('axios')


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const apiInfo = async () => { 
      const apiUrl = await axios.get('https://restcountries.com/v3/all')
      const apiInfo = await apiUrl.data.map(async c => {
          return await Country.create({
              id: c.cca3,
              name: c.name.common ? c.name.common : "name not found",
              img: c.flags[0] ? c.flags[0] : "image not found",
              continent: c.continents.length
              ? c.continents.join(", ")
              : "continent not found",
              capital: c.capital ? c.capital.join(", ") : "capital not found",
              subregion: c.subregion ? c.subregion : "subregion not found",
              area: c.area ? parseInt(c.area) : 000,
              population: c.population ? parseInt(c.population) : 000,
              altSpellings: c.altSpellings? c.altSpellings[0] : "Initials not found" 
          })
      })
      return apiInfo;
  }
  apiInfo()
  })
})