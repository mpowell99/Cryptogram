window.cryptogram = function() {
    const quote = getQuote();
    const letterMap = mapLetters();
    const uniqueLetters = [...new Set(quote.toLowerCase().replace(/[^a-z]/g, '').split(''))];

    const solutions = {};
    uniqueLetters.forEach(letter => {
        solutions[letterMap[letter]] = "";
    });

    return {
        title: "Cryptogram",
        quote: quote,
        activeLetter: "",
        errorMsg: "",
        victory: false,

        letterMap: letterMap,

        solutions: solutions,

        cryptifyQuote() {
            return this.quote.split('').map(char => {
                return this.letterMap[char.toLowerCase()] || char;
            }).join('');
        },

        inCryptifiedQuote(letter) {
            return this.cryptifyQuote().includes(letter);
        },

        highlightLetter(letter) {
            this.activeLetter = letter;
            console.log("Highlighting letter: " + letter);
        },

        validateInput(event, index) {
            const checkLetter = event.target.value.toLowerCase();
            console.log("Validating letter: " + checkLetter);
            if (! /^[a-z]$/.test(checkLetter)) {
                this.errorMsg = checkLetter;
                this.solutions[index] = "";
            } else if (checkLetter == index) {
                this.errorMsg = checkLetter + " is the same as the original letter";
                this.solutions[index] = "";
            } else if (Object.values(this.solutions).filter(val => val === checkLetter).length > 1) {
                this.errorMsg = checkLetter + " already exists";
                this.solutions[index] = "";
            }
            this.checkForVictory();
        },

        checkForVictory() {
            console.log("Checking for victory");
            for (const letter of Object.keys(this.solutions)) {
                const guess = this.solutions[letter];
                const actualSolution = Object.keys(this.letterMap).find(key => this.letterMap[key] === letter);
                console.log("Check for match: " + letter);
                console.log("Guess: " + guess);
                console.log("Actual solution: " + actualSolution);

                // If it's empty, it's not a victory
                if (this.solutions[letter] === "") {
                    console.log("Empty letter: " + letter);
                    return;
                }
                // If it doesn't match the letter in LetterMap, it's not a victory
                if (this.solutions[letter] !== actualSolution) {
                    console.log("Mismatch: " + this.solutions[letter] + " !== " + actualSolution);
                    return;
                }
            }
            this.victory = true;
        },

        reset() {
            this.solutions = {};
            for (const letter of uniqueLetters) {
                this.solutions[letter] = "";
            }
            this.activeLetter = "";
        },
    }
}


function getQuote() {
    const randomIndex = Math.floor(Math.random() * $quotes.length);
    return $quotes[randomIndex].quote;
}

function mapLetters() {
    let $letters = "abcdefghijklmnopqrstuvwxyz".split('');
    let $shuffled = "abcdefghijklmnopqrstuvwxyz".split('');
    console.log('letters: ' + $letters);
    shuffle($shuffled);
    console.log($shuffled);
    console.log('letters: ' + $letters);
    
    let $map = {};
    for (let i = 0; i < $letters.length; i++) {
        console.log(i + " " + $letters[i] + " -> " + $shuffled[i]);
        $map[$letters[i]] = $shuffled[i];
    }
    console.log($map);
    return $map;
};

/** Fisher-Yates shuffle algorithm, 
 *  from https://bost.ocks.org/mike/shuffle/
 * 
 *  With an additional bit of code to ensure no element
 *  remains in its original position
 */
function shuffle(array) {
    var m = array.length, t, i;
    
    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);
    
        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    // Ensure no element remains in its original position
    for (let j = 0; j < array.length; j++) {
        if (array[j] === "abcdefghijklmnopqrstuvwxyz"[j]) {
            // Swap with the next element, or the previous one if it's the last element
            if (j < array.length - 1) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            } else {
                [array[j], array[j - 1]] = [array[j - 1], array[j]];
            }
        }
    }
    
    return array;
};