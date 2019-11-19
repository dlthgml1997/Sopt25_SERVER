const express = require('express');
const router = express.Router();
const csvManager = require('../../module/csvManager');
const groupMixer = require('../../module/groupMixer');

const memberFileName = 'member.csv';
const groupFileName = 'group.csv';

router.get('/', async (req, res) => {
    // TODO 조 그룹 섞기
    try {
        const members = await csvManager.read(memberFileName);
        const memberIdxs = members.map(it=> it.groupIdx);
        const mixedMemIdxs = await groupMixer.mix(memberIdxs);
        
        var i=0;
        
        if (!members || !mixedMemIdxs) {
            console.log(`read error : ${err}`);
            res.send(`read error : ${err}`);
        }
        
        members.forEach(element => {
            element.groupIdx= mixedMemIdxs[i];
            i++;
        });
        res.send(members);
        
        csvManager.write(memberFileName,members);
    } catch (err) {
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