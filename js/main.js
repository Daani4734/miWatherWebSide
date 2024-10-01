//contenedor de la card
const cardContainer = document.querySelector(".cont-dataCity");
//entrada de cuidad
const cityInput = document.querySelector(".input-city");
//formulario de busqueda de cuidad
const form = document.querySelector(".form");
//mensaje de busqueda
const seachMsg = document.querySelector(".serch-msg");

 //function of round a number
 const roundNumber = number => Math.round(number);
 
 
// const cityImageUrl= https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png;
 
//Function to convert Fahrenheit to Celsius and round the result
// const covertFahrCent =(fahr)=>{
//     return ((fahr -32)*5/9).toFixed(2);
// };


//API City Search Function
const getCityData = (cityData) => ({
    cityName:cityData.name,
    cityTemp:roundNumber(cityData.main.temp) ,
    cityST:roundNumber(cityData.main.feels_like),
    cityMin: roundNumber(cityData.main.temp_min ),
    cityMax:roundNumber(cityData.main.temp_max),
    cityImage:`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`,
    cityInfo:cityData.weather[0].description,
    cityHumidity:cityData.main.humidity,
    
});


//template to simplify the city card
//html desestructuring
const createCityTemplate = (cityData) =>{
    const {
        cityName,
        cityTemp,
        cityST,
        cityMin,
        cityMax,
        cityImage,
        cityInfo,
        cityHumidity
    } = getCityData(cityData);
    return`
        <div class="data-city">
                            <h3 class="city">${cityName}</h3>
                            <p class="p-city">${cityInfo}</p>
                            <div class="grados">
                                <span class="temp-span">${cityTemp}º</span><span class="sensasion">${cityST}st</span>
                            </div>
        </div>


        <div clas="image-card">
                        <img src= ${cityImage} alt="foto del clima">
        </div>


        <div class="contain-minMax">
                            <div class="temp-max">
                                <p><i class="fa-solid fa-arrow-up"></i>max:${cityMax}º</p>
                                <p><i class="fa-solid fa-arrow-down"></i>min:${cityMin}º</p>
                            </div>
                            <div class="hum">
                                <p>${cityHumidity}% de humedad</p>
                            </div>
        </div>`

};
//render card function
const renderCityCard = (cityData) =>{
    cardContainer.innerHTML = createCityTemplate(cityData);
    seachMsg.classList.add("noShow");
};



//Input value check function.
const isEmptyInput = () =>{
    return cityInput.value.trim() === '';
};

//city id check function.
const isInvalidCity = cityData => !cityData.id;

//msg serched function
// const searchedMsg =  cityData => {
//     const cityName = cityData.name;
//     seachMsg.textContent = `Asi esta el clima en ${cityName}`
// };


//funtion city search, and verification of valor entrace
const seachCity = async(e) =>{
    e.preventDefault();

    if( isEmptyInput()){
        alert("Debes ingresar una cuidad para poder continuar");
        return;
    }
    //validation of user question of the entrace
    const searchCity = await requestCity(cityInput.value);
   // console.log(getCityData(searchCity)) 
   if(isInvalidCity(searchCity)){
    alert("Ciudad no valida, por favor ingresa otra");
    form.reset();
    return;
   }
   renderCityCard(searchCity);
   form.reset();
   //searchedMsg(seachCity);
   return;
}


const init=()=>{
    form.addEventListener("submit", seachCity)
}
init();