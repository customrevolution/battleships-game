function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

Vue.createApp({
    data() {
        return {
            gridTop: ['-', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            sideGrid: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            playerBattleship: [],
            playerDestroyer1: [],
            playerDestroyer2: [],
            computerBattleship: [],
            computerDestroyer1: [],
            computerDestroyer2: [],
            gameStarted: false,
            playerHits: [],
            computerHits: [],
            playerMisses: [],
            computerMisses: [],
            logMessages: [],
            winner: '',
            gameIsOver: false
        }
    },

    methods: {
        fillPlayerBoard() {
            this.gameOver();
            this.gameStarted = true;
            this.generatePlayerBattleship();
            this.generatePlayerDestroyer1();
            this.generatePlayerDestroyer2();
            this.generateComputerBattleship();
            this.generateComputerDestroyer1();
            this.generateComputerDestroyer2();
        },

        generatePlayerBattleship() {
            let battleshipIndex = generateNumber(1, 65);
            if (battleshipIndex % 11 == 0) {
                battleshipIndex++;
            }
            let battleship = [battleshipIndex, battleshipIndex + 11, battleshipIndex + 22, battleshipIndex + 33, battleshipIndex + 44];
            this.playerBattleship = battleship;
        },

        generatePlayerDestroyer1() {
            let destroyerIndex = generateNumber(1, 65);
            let checker = false;
            if (destroyerIndex % 11 == 0) {
                destroyerIndex++;
            }

            if (this.playerBattleship.includes(destroyerIndex) || this.playerBattleship.includes(destroyerIndex + 11) || this.playerBattleship.includes(destroyerIndex + 22) || this.playerBattleship.includes(destroyerIndex + 33) || this.playerBattleship.includes(destroyerIndex + 44)) {
                this.generatePlayerDestroyer1();
            } else {
                let destroyer = [destroyerIndex, destroyerIndex + 11, destroyerIndex + 22, destroyerIndex + 33];
                this.playerDestroyer1 = destroyer;
            }
        },

        generatePlayerDestroyer2() {
            let destroyerIndex = generateNumber(1, 65);
            if (destroyerIndex % 11 == 0) {
                destroyerIndex++;
            }

            if (this.playerBattleship.includes(destroyerIndex) || this.playerBattleship.includes(destroyerIndex + 11) || this.playerBattleship.includes(destroyerIndex + 22) || this.playerBattleship.includes(destroyerIndex + 33) || this.playerBattleship.includes(destroyerIndex + 44)) {
                this.generatePlayerDestroyer2();
            } else if (this.playerDestroyer1.includes(destroyerIndex) || this.playerDestroyer1.includes(destroyerIndex + 11) || this.playerDestroyer1.includes(destroyerIndex + 22) || this.playerDestroyer1.includes(destroyerIndex + 33)) {
                this.generatePlayerDestroyer2();
            } else {
                let destroyer = [destroyerIndex, destroyerIndex + 11, destroyerIndex + 22, destroyerIndex + 33];
                this.playerDestroyer2 = destroyer;
            }
        },

        generateComputerBattleship() {
            let battleshipIndex = generateNumber(1, 65);
            if (battleshipIndex % 11 == 0) {
                battleshipIndex++;
            }
            let battleship = [battleshipIndex, battleshipIndex + 11, battleshipIndex + 22, battleshipIndex + 33, battleshipIndex + 44];
            this.computerBattleship = battleship;
        },

        generateComputerDestroyer1() {
            let destroyerIndex = generateNumber(1, 65);
            if (destroyerIndex % 11 == 0) {
                destroyerIndex++;
            }

            if (this.computerBattleship.includes(destroyerIndex) || this.computerBattleship.includes(destroyerIndex + 11) || this.computerBattleship.includes(destroyerIndex + 22) || this.computerBattleship.includes(destroyerIndex + 33) || this.computerBattleship.includes(destroyerIndex + 44)) {
                this.generateComputerDestroyer1();
            } else {
                let destroyer = [destroyerIndex, destroyerIndex + 11, destroyerIndex + 22, destroyerIndex + 33];
                this.computerDestroyer1 = destroyer;
            }
        },

        generateComputerDestroyer2() {
            let destroyerIndex = generateNumber(1, 65);
            if (destroyerIndex % 11 == 0) {
                destroyerIndex++;
            }

            if (this.computerBattleship.includes(destroyerIndex) || this.computerBattleship.includes(destroyerIndex + 11) || this.computerBattleship.includes(destroyerIndex + 22) || this.computerBattleship.includes(destroyerIndex + 33) || this.computerBattleship.includes(destroyerIndex + 44)) {
                this.generateComputerDestroyer2();
            } else if (this.computerDestroyer1.includes(destroyerIndex) || this.computerDestroyer1.includes(destroyerIndex + 11) || this.computerDestroyer1.includes(destroyerIndex + 22) || this.computerDestroyer1.includes(destroyerIndex + 33)) {
                this.generateComputerDestroyer2();
            } else {
                let destroyer = [destroyerIndex, destroyerIndex + 11, destroyerIndex + 22, destroyerIndex + 33];
                this.computerDestroyer2 = destroyer;
            }
        },

        ifSideGridEnemy(idx) {
            if (idx == 0) {
                return 1;
            } else if (idx % 11 == 0) {
                return idx % 10 + 1;
            } else if (this.playerHits.includes(idx)) {
                return 'X'
            } else if (this.playerMisses.includes(idx)) {
                return '-'
            } else {
                return '\u00A0';
            }
        },

        ifSideGridPlayer(idx) {
            if (idx == 0) {
                return 1;
            }
            else if (idx % 11 == 0) {
                return idx % 10 + 1;
            } else if (this.computerHits.includes(idx)) {
                return 'X'
            } else if (this.computerMisses.includes(idx)) {
                return '-'
            } else {
                return '\u00A0';
            }
        },

        ifSideGridCheck(idx) {
            if (idx == 0) {
                return true;
            } else if (idx % 11 == 0) {
                return true;
            } else {
                return false;
            }
        },

        isPlayerBattleship(idx) {
            for (let i = 0; i < 5; i++) {
                if (idx == this.playerBattleship[i]) {
                    return true;
                }
            }
            return false;
        },

        isPlayerDestroyer(idx) {
            for (let i = 0; i < 4; i++) {
                if (idx == this.playerDestroyer1[i]) {
                    return true;
                }
            }

            for (let i = 0; i < 4; i++) {
                if (idx == this.playerDestroyer2[i]) {
                    return true;
                }
            }
            return false;
        },

        isComputerBattleship(idx) {
            for (let i = 0; i < 5; i++) {
                if (idx == this.computerBattleship[i]) {
                    return true;
                }
            }
            return false;
        },

        isComputerDestroyer(idx) {
            for (let i = 0; i < 4; i++) {
                if (idx == this.computerDestroyer1[i]) {
                    return true;
                }
            }

            for (let i = 0; i < 4; i++) {
                if (idx == this.computerDestroyer2[i]) {
                    return true;
                }
            }
            return false;
        },

        isHit(idx) {
            if (this.playerHits.includes(idx)) {
                return true;
            }
            return false;
        },

        playerFire(idx) {

            this.isGameOver();

            //Checks if you already fired on the selected tag
            if (!this.gameIsOver) {


                if (this.playerHits.includes(idx) || this.playerMisses.includes(idx)) {

                    this.logMessages.unshift(`You've already fired on that tile!`)

                } else {

                    if (this.computerBattleship.includes(idx)) {
                        this.playerHits.push(idx);
                        this.logMessages.unshift(`You hit the enemy battleship!`);
                    } else if (this.computerDestroyer1.includes(idx)) {
                        this.playerHits.push(idx);
                        this.logMessages.unshift(`You hit an enemy destroyer!`);
                    } else if (this.computerDestroyer2.includes(idx)) {
                        this.playerHits.push(idx);
                        this.logMessages.unshift(`You hit an enemy destroyer!`);
                    } else {
                        this.playerMisses.push(idx);
                        this.logMessages.unshift('Player missed!');
                    }
                    this.computerFire();
                }
            }
            this.isGameOver();
        },

        computerFire() {
            let destroyerIndex = generateNumber(1, 110);

            if (destroyerIndex % 11 == 0) {
                destroyerIndex++;
            }

            if (this.computerMisses.includes(destroyerIndex) || this.computerHits.includes(destroyerIndex)) {
                this.computerFire();
            } else {
                if (this.playerBattleship.includes(destroyerIndex)) {

                    this.computerHits.push(destroyerIndex);
                    this.logMessages.unshift(`Computer hit your battleship!`);

                } else if (this.playerDestroyer1.includes(destroyerIndex)) {

                    this.logMessages.unshift('Computer hit your destroyer!')
                    this.computerHits.push(destroyerIndex);

                } else if (this.playerDestroyer2.includes(destroyerIndex)) {
                    this.logMessages.unshift('Computer hit your destroyer!')
                    this.computerHits.push(destroyerIndex);

                } else {
                    this.computerMisses.push(destroyerIndex);
                    this.logMessages.unshift('Computer missed!')
                }
            }


        },

        isPlayerHit(idx) {
            if (this.computerHits.includes(idx)) {
                return true;
            } else {
                return false;
            }
        },

        isPlayerMiss(idx) {
            if (this.playerMisses.includes(idx)) {
                return true;
            } else {
                return false;
            }
        },

        isComputerMiss(idx) {
            if (this.computerMisses.includes(idx)) {
                return true;
            } else {
                return false;
            }
        },

        gameOver() {
            this.playerBattleship = [];
            this.playerDestroyer1 = [];
            this.playerDestroyer2 = [];
            this.computerBattleship = [];
            this.computerDestroyer1 = [];
            this.computerDestroyer2 = [];
            this.gameStarted = false;
            this.playerHits = [];
            this.computerHits = [];
            this.playerMisses = [];
            this.computerMisses = [];
            this.logMessages = [];
            this.winner = '';
            this.gameIsOver = false;
        },

        isGameOver() {
            if (this.playerHits.length == 13 && this.computerHits.length == 13) {
                this.winner = 'draw';
                this.gameIsOver = true;
            } else if (this.playerHits.length == 13) {
                this.winner = 'player'
                this.gameIsOver = true;
            } else if (this.computerHits.length == 13) {
                this.winner = 'computer'
                this.gameIsOver = true;
            } else {
                this.gameIsOver = false;
            }

        }
    }
}).mount('#game');