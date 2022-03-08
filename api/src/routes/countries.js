const express = require('express');
const { Country, Activities } = require('../db');
const axios = require('axios');
const router = express.Router();
const { Op } = require('sequelize');

router.use(express.json())

router.get('/', async (req, res) => {
    const { name } = req.query;

  if (!name) {
    // si query no existe
    const countriesDB = await Country.findAll({
      attributes: ["id", "img", "name", "continent", "population"],
      include: {
        model: Activities,
      },
    });

    return res.json({ from: "DB", results: countriesDB });
  } else {
  
    const buscar = name.charAt(0).toUpperCase() + name.slice(1);
    const countryDB = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${buscar}%`,
        },
      },
      attributes: ["id", "img", "name", "continent", "population"],
      include: {
        model: Activities,
      },
    });

    if (countryDB.length) return res.json({ from: "DB", result: countryDB });
    else
      return res.json({
        from: "DB",
        result: [{ message: "country not found" }],
      });
  }
})

router.get("/:id", (req, res) => {
    const {id} = req.params
    return Country.findByPk(id, {
        include: {model: Activities, through: {attributes: []}},
    })
    .then(countries => {
        res.send(countries)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;