const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("readline");
const argv = yargs(hideBin(process.argv)).argv;
const { param } = require("express/lib/request");
const weather = require("./app");
const fs = require("fs");

if (argv.h) {
  console.log(
    "node weather -s <Название города> -t <Токен> -h <Вызов меню помощи> \nПрограмма показывает температуру в указанном городе. Работает посредством Yandex Weather API\nВ случае появления ошибки требуется ввести команду с учетом флагов города и токена\nЗатем перезапустить программу"
  );
  process.exit();
}

let configFile = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

let params = {
  city: argv.s || configFile.city || null,
  token: argv.t || configFile.token || null,
};

const writeDataSync = () => {
  try {
    const jsonString = JSON.stringify(params, null, 2);
    // Запись в JSON
    fs.writeFileSync("./config.json", jsonString);
  } catch (err) {
    // Обработчик ошибок
    console.log(err);
  }
};

writeDataSync();

if (params.city && params.token) {
  console.log(weather.get_data(params.city, params.token));
} else {
  console.log("Ошибка, введите данные заново");
}
