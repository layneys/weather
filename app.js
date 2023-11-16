function get_weather(lat, lon, token) {fetch(
  `https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}&extra=false`,
  {
    method: "GET",
    headers: {
      "X-Yandex-API-Key": token,
      "Content-Type": "application/json; charset=utf-8",
    },
  }
)
  .then((resp) => resp.json())
  .then((data) => {
    const temp = `Температура: ${data.fact.temp}`;
    const tempFeels = `Ощущается как: ${data.fact.feels_like}`;

    console.log(temp, "\n", tempFeels);
  })
  .catch((err) => {
    console.log(`${err}`);
  });
}


function get_data(city, token) {fetch(`https://geocode.maps.co/search?q=${city}`, {
  method: "GET",
})
  .then((resp) => resp.json())
  .then((data) => {
    get_weather(data[0].lat, data[0].lon, token)
  })
  .catch((err) => {
    console.log(`${err}`);
  });
}

module.exports = {
    get_data: get_data
  };