var arr1 = [];
console.log(arr1);
console.log(typeof arr1);

var arr2 = [1, 2, 3, 4, 5];
console.log(arr2);
console.log(typeof arr2);

var arr3 = ['윤희성', 3, 4.5, false, {name: 'heesung', part: 'server'}];
console.log(arr3);
console.log(typeof arr3);

// array 기본 함수
console.log('[array 기본 함수]')
var arr = [1,2,3,4,5];
var tmp = [];
// 1. length 함수
console.log('length: ' + arr.length); // 배열 길이 반환

// 2. shift 함수
arr.unshift(0); // 배열의 요소들을 오른쪽으로 한칸씩 밀고 0을 넣는다.
console.log('after unshift: ' + arr);
arr = [1, 2, 3, 4, 5];
arr.shift(); // 배열 요소들을 모두 왼쪽으로 밀어서 1이 사라짐
console.log('after shift: ' + arr);
arr = [1, 2, 3, 4, 5];

// 3. push & pop 함수
arr.push('new Item'); // 배열 맨 마지막에 추가
console.log('after push: ' + arr);
arr.pop(); // 배열 맨 마지막을 삭제
console.log('after pop: ' + arr);

// 4. includes 함수
console.log('includes(4): ' + arr.includes(4)); // 4가 포함 되어있는지 boolean으로 반환

// 5. indexOf 함수
console.log('indexOf: ' + arr.indexOf(4)); // 4가 몇번째 인덱스인지 반환

// 6. concat 함수
var arr1 = [1, 2, 3]; 
var arr2 = [4, 5];
console.log('after concat' + arr1.concat(arr2)); // array1 + array2

// 7. join 함수
var arrStation = ['온수','역곡','소사','부천','중동','송내'];
console.log(arrStation.join('->')); // 배열 사이에 특정한 String 값을 넣을 수 있음

// 8. reverse 함수
console.log(arrStation.reverse().join('->')); // 배열을 뒤집고 join

// 9. sort 함수
console.log(arrStation.sort()); // 정렬 (default : 오름차순)

// 배열 순회
arr = [1, 2, , 4, 5];
for(var i = 0; i < arr.length; i++){ // undefined 까지 출력
    console.log(arr[i]);
}

for(var idx in arr){ // undefined 빼고 출력
    console.log(arr[idx]);
}

for(var data of arr){ // data에 arr 값이 들어감 
    console.log(data);
}