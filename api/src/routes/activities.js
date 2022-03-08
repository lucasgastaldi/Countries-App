const express = require('express');
const { Country, Activities } = require('../db');
const router = express.Router();
const { Op } = require('sequelize');


router.use(express.json())

router.post('/', async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  const searchActivity = await Activities.findOne({ where: { name } });

  if (!searchActivity) {
    const activity = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });

    for (let i = 0; i < countries.length; i++) {
      const country = await Country.findAll({
        where: {
          name: countries[i],
        },
        attributes: ["id"],
      });
      activity.addCountries(country[0].id);
    }

    return res.json({ message: "activity created" });
  } else {
    return res.json({ message: "activity already exists" });
  }

})

router.get('/', async (req, res) => {
    try {
    const activities = await Activities.findAll({
        include: Country
    })
    res.status(201).send(activities)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;    