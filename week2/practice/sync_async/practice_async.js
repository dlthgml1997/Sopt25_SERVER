function task1() { // 비동기
    setTimeout(function () {
        console.log('task1');
    }, 0);
}

function task2() { // 동기
    console.log('task2');
}

function task3() { // 동기
    console.log('task3');
}

task1();
task2();
task3(); 

/**
 * task2 
 * task3 
 * task1 
 * 
 * 이유: 자바스크립트의 싱글스레드 특징 때문에 
 */