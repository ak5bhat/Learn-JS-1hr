//1. Deposit some money
//2. Collect the bet
//3. Collect the bet
//4. Spin the slot machine
//5. check if the user won
//6. give the user their winnings
//7. play again

// function deposit(){
//     return  1
// }

// const x = deposit()

const prompt = require("prompt-sync")();

//slot machine
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 6,
    B: 6,
    C: 8,
    D: 8
}

SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

//es6
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter a deposit amount: ")
        //17.2 -> 17.2
        //hello -> NaN
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ")
        //17.2 -> 17.2
        //hello -> NaN
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
}

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ")
        //17.2 -> 17.2
        //hello -> NaN
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
    }
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        // console.log(symbol,count);
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
        //console.log(symbols);
    }

    //3 arrays represent 3 colmns inside slot machine
    //const reels = [[],[],[]];
    //[[A A A],[],[]]
    //A
    //A
    //A

    const reels = [];

    //for every single reel, symbols contains the array to put into 
    //so we create another array reelSymbols that have all the symbols, then delete after we put into reel slots.
    //but when we move to next reel, all elements should be available

    for (let i = 0; i < COLS; i++) {

        reels.push([]);

        //copy the symbols that we have available to choose for each reel into another array

        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            //Math.random generates random number b/w 0 and 1 ie 0.01 to 0.99
            // max value of us is .9 *20
            //floor -> 1.9 == 1
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);

            const selectedSymbol = reelSymbols[randomIndex];

            reels[i].push(selectedSymbol);

            reelSymbols.splice(randomIndex, 1); //removing (randomIndexPosElement, removing 1element)
        }
    }
    return reels;
    //[ [ 'C', 'B', 'D' ], [ 'B', 'D', 'B' ], [ 'C', 'A', 'D' ] ]
}


//[ [ 'C', 'B', 'D' ], [ 'B', 'D', 'B' ], [ 'C', 'A', 'D' ] ]
// [C B C]
// [B D A]
// [D B D]
//transposing matrix

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
}

const printRows = (rows) => {
    for (const row of rows) { //row will get array here
        let rowString = ""; //going to build like "A | B | C"
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) { //ROW LENGTH 3 --> i!=2
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
}

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $", balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        console.log("You won, $" + winnings.toString());
        balance += winnings;

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again (y/n)? ");
        if (playAgain.toLowerCase() != "y") {break};
    }
    console.log(`You have $${balance} with you now`)
}

game();



// let balance = deposit();
// const numberOfLines = getNumberOfLines();
// const bet = getBet(balance, numberOfLines);
// const reels = spin();
// const rows = transpose(reels);
// printRows(rows);
// const winnings = getWinnings(rows, bet, numberOfLines);
// console.log("You won, $" + winnings.toString());

// console.log("");
// console.log("balance:", balance);
// console.log("number of lines:", numberOfLines);
// console.log("bet per line:", bet);
// console.log(reels);
// console.log(rows);
// printRows(rows);
// console.log("You won, $" + winnings.toString());

