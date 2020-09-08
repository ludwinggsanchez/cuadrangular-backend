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

router.post('/newTournament', async (req, res) => {
    await Fixture.remove({}).exec()
    await Team.remove({}).exec()
    res.json({ status: 'New Tournament' });
})

router.post('/cuadrangular', async (req, res) => {
    await Fixture.remove({}).exec()
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

// put score function
router.put('/:id', async (req, res) => {
    const scoreslist = castFixture(req.body);
    //console.log(scoreslist);

    await Fixture.findByIdAndUpdate(req.params.id, scoreslist);
    const team1 = await Team.findOne({"_id":scoreslist.team1});
    const team2 = await Team.findOne({"_id":scoreslist.team2});
    team1.goals = parseInt(team1.goals, 10) + parseInt(scoreslist["score1"], 10);
    team2.goals = parseInt(team2.goals, 10) + parseInt(scoreslist["score2"], 10);

    if (scoreslist["score1"] > scoreslist["score2"]){
        team1.points = team1.points + 3;

    }else if (scoreslist["score1"] < scoreslist["score2"]){
        team2.points = team2.points + 3;
    }else{
        team1.points = team1.points + 1;
        team2.points = team2.points + 1;
    }
    await team1.save();
    await team2.save();

    res.json({ status: 'score updated' })
});

router.delete('/:id', async (req, res) => {
    await Fixture.findByIdAndDelete(req.params.id);
    res.json({ status: 'deleted fixture' })

});


module.exports = router;