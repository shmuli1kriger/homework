'use strict';

function createPatient(medicationName, initialDosage) {
    const mn = medicationName;
    let d;
    if (initialDosage < 0) {
       return undefined; 
    }
    else {
        d = initialDosage;
    }
        return {
        _medName: mn,
        _initdose: d,
        getInstructions() {
            return `Take ${this._initdose} of ${this._medName}`;
        },
        adjustDosage(doctorPin, newDosage) {
            const requiredPin = 1234;
            if (doctorPin === requiredPin && newDosage > 0) {
                this._initdose = newDosage;
            } 
            else {
                throw new Error('Error. Unable to update dosage.');
            }
        }
    };
}

function trackDosage(medicationName, initialDosage) {
    createPatient(medicationName, initialDosage);
}
console.log(trackDosage('advil', 50).adjustDosage(1234, 20));