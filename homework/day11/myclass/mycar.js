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
        console.log("π λΆλ¦λΆλ¦~ μλμ°¨κ° λ¬λ €κ°λ€");
        console.log(`${this.color} Colorμ ${this.model}, ${this.hp}λ§λ ₯μ νμΌλ‘ μ§μ£Όνλ€!`);
    }

    stop = () => {
        console.log("π λΌμ΄μ΄μ΄μ΄μ΅! π");
        console.log(`μλμ°¨ ${this.model}, μμ νκ² κ°μνμ¬ λ©μ·λ€.`);
    }
}

class RacingCar extends Car {

    constructor(model, hp, color){
        super(model, hp, color);
    }

    zeroToHundred = () => {
        console.log(`μνΌμΉ΄ ${this.model}μ μ λ‘λ°±μ μμμ΄μ!`);
    }

    // @ Overriding
    stop = () => {
        console.log("π λΌμ΄μ΄μ΄μ΄μ΄μ΄μ΄μ΄μ΄μ΄μ΅! π");
        console.log(`μνΌμΉ΄ ${this.model}, μμ¬μμ¬νκ² κ°μνμ¬ λ©μ·λ€.`);
    }

}

class OldCar extends Car {
    constructor(model, hp, color){
        super(model, hp, color);
    }

    restInPeace = () => {
        console.log(`μ¬λμΉ΄ ${this.model}, νΈμν μ λμμ.`);
    }

    // @ Overriding
    stop = () => {
        console.log("π λΌμ΄μ΅, π");
        console.log(`μ¬λμΉ΄ ${this.model}, μ¬μ λ‘­κ² λ©μ·λ€.`);
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