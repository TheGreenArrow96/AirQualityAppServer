
class AirQualitySensor {
    constructor(){
        this.minPpm = 400;
        this.maxPpm = 3501;
        this.measurement = "";
        this.date = new Date().toLocaleString();
    }

    addNewMeasurementData(){
        this.measurement = this.getRandomArbitrary(this.minPpm,this.maxPpm); 
    }
    
    getRandomArbitrary(min, max) {
        return Math.trunc(Math.random() * (max - min) + min);
    }
}

module.exports = AirQualitySensor;