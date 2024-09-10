# company_functional
20240913 발표용

## 함수형 프로그래밍이란?
부수 효과(Side Effect)를 미워하고 조합성을 강조하는 프로그래밍 패러다임

### 순수 함수
동일한 인자 값에 동일한 결과를 항상 반환하는 함수
부수 효과가 없는 함수
인자와 반환 값으로만 소통한다
```javascript
function add(a, b) {
    return a + b;
}
```
#### 퀴즈1 
```javascript
const SIDE_EFFECT = 10;

function add(a, b) {
    return a + b + SIDE_EFFECT;
}
```
#### 퀴즈2 https://www.tutorialspoint.com/online_java_compiler.php
```java
import java.util.Random;

public class Main {
	public static void main(String[] args) {
		System.out.println(add(10, 10));
		System.out.println(add(10, 10));
		System.out.println(add(10, 10));
		System.out.println(add(10, 10));
		System.out.println(add(10, 10));
		System.out.println(add(10, 10));
		System.out.println(add(10, 10));
		System.out.println(add(10, 10));
	}
	
	static Integer add(Integer lt, Integer rt) {
		return lt + rt + new Random(0).nextInt(100);
	}
}
```
#### 퀴즈3 
```javascript
const SIDE_EFFECT = Math.random;

function add(a, b) {
    return a + b + SIDE_EFFECT(0);
}
```
#### 순수 함수는 부수 효과를 받는 것 뿐만 아니라 일으켜도 안된다
```javascript
let victim = "무죄";

function add(a, b) {
    victim = "유죄";
    return a + b;
}
```


**주의사항**
사이드 이펙트 뜻은 부작용으로 그 어감만으로는 부정적인 뉘양스가 있으나 증상 자체는 옳고 그름이 없습니다.

#### 사이드 이펙트 없이 새로운 값을 반환
```javascript
function merge(obj1, obj2) {
    // 값만 읽어서 새로운 객체를 리턴
    return {
        obj1 : obj1. val ,
        obj2 : obj2. val ,
    };
}
console.log(merge({val : 10}, {val : 20}));
```
부수 효과가 없기 실행 시점에 대한 의존성이 없어진다. 언제 실행해도 외부에 영향을 받지 않기 때문에 같은 값을 반환하기 때문이다. 이 특성으로 병렬 처리 또한 쉬워진다. 함수 간 조합성도 좋아진다. 함수를 다른 함수의 인자로 사용해도 순수 함수이기 때문에 문제가 되지 않는다.

### 일급함수
함수를 값 처럼 다루는 것.
```javascript
let add = function (a, b) { return a + b; };
```

### 고차함수
함수를 인자로 받는 함수
함수형 프로그래밍은 순수함수를 인자로 받아 더 상위 개념의 고차함수로 만들어 조합성을 강조한다.
```javascript
function add_maker() {
    return (a, b) => a + b;
}
```
### 고차함수 + 클로저
클로저까지 응용하면 평가 시점을 완전히 조정가능하다.
```javascript
function add_maker(a) {
	// add_maker(10) 호출 후 반환된 화살표 함수는 순수 함수인가요?
    return b => a + b; 
}
```
이 모든 구현은 순수 함수이기에 가능한 구현 방식

---
## filter - 거르기 함수
* 인자로 들어온 컬렉션 사이즈보다 반환되는 컬렉션 사이즈가 같거나 작다.

```javascript
function _filter(list, predi) {
	// 반드시 새로운 컬렉션으로 반환한다.
    const result = [];

    for (let i = 0; i < list.length; i++) {
        if (predi(list[i])) {
            result.push(list[i]);
        }
    }

    return result;
}
```