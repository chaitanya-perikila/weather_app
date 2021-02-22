window.addEventListener("load", () =>{
    let long;
    let lat;
    const location = document.querySelector(".location-timezone");
    const currTemp = document.querySelector(".temp-degree");
    const tempDescription = document.querySelector(".temp-description");
    const tempSelect = document.querySelector(".temp-select");
    const PtempUnit = document.querySelector(".primary");
    const StempUnit = document.querySelector(".secondary");
    const currPressure = document.querySelector(".pressure span");
    const Humidity = document.querySelector(".humidity span");
    const windspeed = document.querySelector(".wind span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            //const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/40.7128,-74.0060`; //New_York

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    //console.log(data);
                    const {temperature, summary, icon, humidity, windSpeed, pressure} = data.currently;
                    //setting DOM elements using api
                    currTemp.textContent = temperature;
                    tempDescription.textContent = summary;
                    location.textContent = data.timezone;

                    currPressure.textContent = pressure;
                    Humidity.textContent = humidity*100;
                    windspeed.textContent = windSpeed;

                    //setting icon
                    setIcons(icon ,document.querySelector(".icon"));


                    //formula and conversion
                    let celcius = (temperature - 32) * (5/9);
                    //Faranheit to Celcius and back
                    tempSelect.addEventListener("click" , ()=>{
                        if(PtempUnit.textContent === "°F"){
                            PtempUnit.textContent = "°C";
                            StempUnit.textContent = " /°F";
                            currTemp.textContent = celcius.toFixed(2);
                        }else{
                            PtempUnit.textContent = "°F";
                            StempUnit.textContent = " /°C";
                            currTemp.textContent = temperature;
                        }
                    });
                })
            
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_" ).toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});