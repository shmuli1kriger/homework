function Vehicle(color) {
    this.color = color;
}
Vehicle.prototype.go = function(speed) {
    this.speed = speed;
    console.log(`now going at speed ${this.speed}`);
};
Vehicle.prototype.print = function() {
    console.log(`color: ${this.color}, current speed: ${this.speed}`);
};

const car1 = new Vehicle('red');
car1.go(65);
car1.print();

function Plane(color) {
    this.color = color;
}
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.go = function(speed) {
    this.speed = speed;
    console.log(`now flying at speed ${this.speed}`);
};

const plane1 = new Plane('green');
plane1.go(225);
plane1.print();
console.log(car1, plane1);