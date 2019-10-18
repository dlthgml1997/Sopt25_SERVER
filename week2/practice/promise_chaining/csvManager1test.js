const csvManager = require('./csvManager1');

csvManager.write([{
    a: 2,
    v: 3
}, {
    a: 2,
    v: 4
}]);
csvManager.read().then((res) => {
    console.log(res);
    test2();
}).catch((err) => {
    console.log('error message occur on csvManager1Test at first time');
    console.log(err);
    test2();
});

async function test2() {
    csvManager.write({
        a: 2,
        v: 3
    });
    try {
        const res = await csvManager.read(); 
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}