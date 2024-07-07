#! /usr/bin/env node
import inquirer from "inquirer";

// Currency exchange rates relative to 1 USD
const exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    RS: 83.48,
    PKR: 277.66,
};

function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    if (!fromRate || !toRate) {
        throw new Error('Invalid currency code');
    }
    return (amount / fromRate) * toRate;
}

async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'Enter the amount of money: ',
            validate: (input) => !isNaN(input) || 'Please enter a valid number',
        },
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Enter the currency code to convert from:',
            choices: ['USD', 'EUR', 'RS', 'PKR'],
        },
        {
            type: 'list',
            name: 'toCurrency',
            message: 'Enter the currency code to convert to:',
            choices: ['USD', 'EUR', 'RS', 'PKR'],
        },
    ]);

    try {
        const convertedAmount = convertCurrency(answers.amount, answers.fromCurrency, answers.toCurrency);
        console.log(`${answers.amount} ${answers.fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${answers.toCurrency}`);
    } catch (error) {
        console.error(error);
    }
}

main();
