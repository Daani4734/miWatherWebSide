const key = "a58081ad04348a364ea39f09abe56d45";
//https://api.openweathermap.org/data/2.5/weather?q=boston&APPID=a58081ad04348a364ea39f09abe56d45



const requestCity = async (city) => {
    try {
        const response = await fetch (`
https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=sp&units=metric&APPID=${key}
`);
            const data= await response.json();
            return data;
        }
     catch (error) {
        console.log(error)
    }
};