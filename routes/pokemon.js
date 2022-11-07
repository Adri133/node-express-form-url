const express = require('express');

const router = express.Router();

/* POST login. */
router.get('/:id', function (req, res) {
    const id = req.params.id;
    res.send(`Vous avez demandé le pokémon n° ${id}`)
});

router.get('/pokemon/:id/:poke', (req, res) => {
    const id = req.params.id;
    const poke = req.params.poke;
    res.send(`Vous avez demandé le pokémon n° ${id}} qui est ${poke}`)
})

module.exports = router;