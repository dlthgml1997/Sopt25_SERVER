const groupMixer = {
    mix: (memberArray) => {
        return new Promise((resolve, reject) => {
            if (memberArray instanceof Array) {
                const mixedArray = memberArray.sort(function () { return 0.5 - Math.random(); });
                resolve(mixedArray);
                if (err) {
                    reject(err);
                }
            } else {
                console.log(`not Array Object`);
            }
        });
    },
};

module.exports = groupMixer;