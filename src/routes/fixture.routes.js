const express = require('express');
const router = express.Router();
const Fixture = require('./../models/fixture');
const Team = require('./../models/team')


const castFixture = ({ team1, score1, team2, score2 }) => {
    return ({ team1, score1, team2, score2 })
}

// get team function
router.get('', async (req, res) => {
    const teamlistfix = await Fixture.find({})
        .populate({ path: 'team1', model: Team })
        .populate({ path: 'team2', model: Team })
        .exec()
    res.json(teamlistfix);
});

// post team function
router.post('', async (req, res) => {
    const fixture = castFixture(req.body);
    const fixtureObject = new Fixture(fixture);
    await fixtureObject.save()
    res.json({ status: 'fixture saved', fixture: fixtureObject });
});

router.post('/cuadrangular', async (req, res) => {
    const teamlist = await Team.find({});
    let roundRobin = [];
    for (let i = 0; i < teamlist.length; i++) {
        for (let j = 0; j < teamlist.length; j++) {
            const fixture = castFixture({
                team1: teamlist[i]._id + '',
                team2: teamlist[j]._id + '',
                score1: -1,
                score2: -1
            });
            if (i > j) {
                const fixtureObject = new Fixture(fixture);
                await fixtureObject.save();
                roundRobin.push(fixtureObject);
            }
        }
    }
    res.json({ status: 'fixture saved', fixture: roundRobin });

});

// put team function
router.put('/:id', async (req, res) => {
    const team = castFixture(req.body);
    await Team.findByIdAndUpdate(req.params.id, team);
    res.json({ status: 'team updated' })
});

module.exports = router;