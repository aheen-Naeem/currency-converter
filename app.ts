import inquirer from "inquirer";
import chalk from "chalk";

// Currency converter API Link

let apiLink = "https://v6.exchangerate-api.com/v6/983cf66722bb6b6006036e67/latest/PKR";

// Fetching data from API
let fetchData = async (data: any) => {
    let fetchData = await fetch(data)
    let res = await fetchData.json()
    return res.conversion_rates;
}
let data = await fetchData(apiLink)

// object to array
let countries = Object.keys(data)

// user input first country
let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    choices: countries,
    message: "Converting From"
})

// user money
let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `please enter your amount in ${chalk.greenBright.bold(firstCountry.name)}`
})

// convert currency in second country
let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    choices: countries,
    message: "Converting To"
})

// conversion rates
let cnv = `https://v6.exchangerate-api.com/v6/983cf66722bb6b6006036e67/pair/${firstCountry.name}/${secondCountry.name}`
// console.log(cnv)
// // fetching data for conversion rates

let cnvData = async (data: any) => {
    try {

        let cnvData = await fetch(data)
        let res = await cnvData.json()
        return res.conversion_rate;
    }
    catch (err) {
        console.log('err', err);

    }
}
let a = await cnvData(cnv)
// console.log(a)
console.log(` ${userMoney.rupee}  ${firstCountry.name} = ${Math.floor(a*userMoney.rupee)} ${secondCountry.name} `)