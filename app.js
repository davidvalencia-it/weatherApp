window.addEventListener('load', () => {

    let long;
    let lat;
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    let degreeSectionSpan = document.querySelector('.degree-section span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/bf2e0fd4cf52e832a554821321144717/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();

                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently
                        //Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    // let timezoneTextFormat = timezone;
                    let headerTimezone = data.timezone;

                    locationTimezone.textContent = headerTimezone.replace("/", " \n").replace("_", " ");

                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    //Set icon
                    setIcons(icon, document.querySelector(".icon"));
                    //Change temperature to Celsius/Farenheit
                    degreeSection.addEventListener('click', () => {
                        if (degreeSectionSpan.textContent === "F") {
                            degreeSectionSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);

                        } else {
                            degreeSectionSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;

                        }
                    })

                });
        });

    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" })
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});