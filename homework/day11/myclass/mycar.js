class Car{
    model = "kia";
    hp = 100;
    color = "gray";

    constructor(model, hp, color){
        this.model = model;
        this.hp = hp;
        this.color = color;
    }

    start = () => {
        console.log("🚘 부릉부릉~ 자동차가 달려간다");
        console.log(`${this.color} Color의 ${this.model}, ${this.hp}마력의 힘으로 질주한다!`);
    }

    stop = () => {
        console.log("🏁 끼이이이이익! 🚗");
        console.log(`자동차 ${this.model}, 안전하게 감속하여 멈췄다.`);
    }
}

class RacingCar extends Car {

    constructor(model, hp, color){
        super(model, hp, color);
    }

    zeroToHundred = () => {
        console.log(`슈퍼카 ${this.model}의 제로백은 상상초월!`);
    }

    // @ Overriding
    stop = () => {
        console.log("🏁 끼이이이이이이이이이이익! 🚗");
        console.log(`슈퍼카 ${this.model}, 아슬아슬하게 감속하여 멈췄다.`);
    }

}

class OldCar extends Car {
    constructor(model, hp, color){
        super(model, hp, color);
    }

    restInPeace = () => {
        console.log(`올드카 ${this.model}, 편안히 잠드소서.`);
    }

    // @ Overriding
    stop = () => {
        console.log("🏁 끼이익, 🚗");
        console.log(`올드카 ${this.model}, 여유롭게 멈췄다.`);
    }
}

const ferrari = new RacingCar("ferrari", "1000", "Red");
ferrari.start();
ferrari.stop();
ferrari.zeroToHundred();
console.log("------------------");

const pride = new OldCar("pride", "90", "Gray");
pride.start();
pride.stop();
pride.restInPeace();
console.log("------------------");