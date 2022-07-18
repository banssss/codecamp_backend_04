const aaa = new Date();

console.log(aaa.getFullYear());
console.log(aaa.getMonth() + 1);


class Monster{
    power = 10;

    // 생성자 함수!
    constructor(aaa){
     this.power = aaa;

    }

    attack = () => {
        console.log("공격하자");
        console.log(`내 공격력은 ${this.power} 이야!!!`);
    }
}

class SkyMonster extends Monster {
    // super -> 부모의 생성자로 전달하기
    constructor(qqq){
        super(qqq);
    }
    
    run = () => {
        console.log("날아서 도망가자!");
    }

    // Overriding
    // attack = () => {
    //     console.log("하늘로부터의 공격이다! 👻");
    //     console.log(`내 공격력은 ${this.power} 이야!!!`);
    // }
}

class GroundMonster extends Monster {
    // super -> 부모의 생성자로 전달하기
    constructor(www){
        super(www);
    }

    run = () => {
        console.log("뛰어서 도망가자!");
    }

    // Overriding
    // attack = () => {
    //     console.log("지상으로부터의 공격이다! 🐗");
    //     console.log(`내 공격력은 ${this.power} 이야!!!`);
    // }
}

const mymonster1 = new SkyMonster(20);
mymonster1.attack();
mymonster1.run();

const mymonster2 = new GroundMonster(75);
mymonster2.attack();
mymonster2.run();

