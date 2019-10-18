const express = require('express');
const router = express.Router();
const csvManager = require('../../module/csvManager');

const memberFileName = 'member.csv';
const groupFileName = 'group.csv';

router.get('/', async (req, res) => {
    // TODO 그룹 구성원 전체 보기
    try {
        console.log(memberFileName);
        const members = await csvManager.read(fileName);

        if (!members) {
            console.log(`read error : ${err}`);
            res.send(`read error : ${err}`);
        }
        res.send(members);

    } catch {
        console.log(`read error : ${err}`);
    }
});

router.get('/:groupIdx', async (req, res) => {
    try {
        const groupIdx = req.params.groupIdx;
        const members = await csvManager.read(memberFileName);
        const groups = await csvManager.read(groupFileName);
        
        if(!members || !groups) {
            console.log(`csv error : ${err}`);
            res.send(`csv error : ${err}`);
        }

        const membersInIdx = members.filter(it => it.groupIdx === groupIdx).map(it => it.name);
        const groupName = groups.filter(it => it.groupIdx === groupIdx).map(it=> it.name);

        res.send(`${groupName} : ${membersInIdx}`);
    } catch (err) {
        console.log(`err with csv : ${err}`);
    }
});


module.exports = router;