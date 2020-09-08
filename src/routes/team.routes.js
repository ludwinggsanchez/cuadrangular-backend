const express = require('express');
const router = express.Router();
const Team = require('./../models/team')

const castTeam = ({ name, points, image }) => {
    return ({ name, points, image })
}

// get team function
router.get('', async (req, res) => {
    const teamlist = await Team.find({});
    res.json(teamlist);
});

// post team function
router.post('', async (req, res) => {
    const team = castTeam(req.body);
    const teamObject = new Team(team);
    await teamObject.save()
    res.json({ status: 'team saved', team: teamObject });
});

// put team function
router.put('/:id', async (req, res) => {
    const team = castTeam(req.body);
    await Team.findByIdAndUpdate(req.params.id, team);
    res.json({ status: 'team updated' })
});

// delete document function 5f56f4edca70da4c543892a8
router.delete('/:id', async (req, res) => {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ status: 'deleted team' })

});

module.exports = router;