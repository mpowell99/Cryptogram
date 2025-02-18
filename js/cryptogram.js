    window.cryptogram = function() {
        return {
            title: "Cryptogram",
            quote: "Just because this isn't in your life plan doesn't mean this isn't exactly where you're supposed to be.",
            activeLetter: "",

            letterMap: {
                "a": "z",    "b": "y",    "c": "x",    "d": "w",    "e": "v",
                "f": "u",    "g": "t",    "h": "s",    "i": "r",    "j": "q",
                "k": "p",    "l": "o",    "m": "n",    "n": "m",    "o": "l",
                "p": "k",    "q": "j",    "r": "i",    "s": "h",    "t": "g", 
                "u": "f",    "v": "e",    "w": "d",    "x": "c",    "y": "b",    "z": "a"
            },

            solutions: {
                "a": "",     "b": "",     "c": "",     "d": "",     "e": "",
                "f": "",     "g": "",     "h": "",     "i": "",     "j": "",
                "k": "",     "l": "",     "m": "",     "n": "",     "o": "",
                "p": "",     "q": "",     "r": "",     "s": "",     "t": "", 
                "u": "",     "v": "",     "w": "",     "x": "",     "y": "",     "z": ""
            },

            cryptifyQuote() {
                return this.quote.split('').map(char => {
                    return this.letterMap[char.toLowerCase()] || char;
                }).join('');
            },

            inCryptifiedQuote(letter) {
                return this.cryptifyQuote().includes(letter);
            },

            mapLetters() {
            },

            highlightLetter(letter) {
                this.activeLetter = letter;
                console.log("Highlighting letter: " + letter);
            },
        }
    }