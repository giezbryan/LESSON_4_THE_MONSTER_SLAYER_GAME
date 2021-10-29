function GetRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp ({
    data() {
        return {
            PlayerHealth: 100,
            MonsterHealth: 100,
            CurrentRound: 0,
            Winner: null,
            LogMessages: []
        };
    },
    computed: {
        MonsterBarStyles() {
            if (this.MonsterHealth < 0) {
                return { width: '0%' };
            }
            return {width: this.MonsterHealth + '%'};
        },
        PlayerBarStyles() {
            if (this.PlayerHealth < 0) {
                return { width: '0%' };
            }
            return {width: this.PlayerHealth + '%'};
        },
        MayUseSpecialAttack() {
            return this.CurrentRound % 3 !==0;
        }
    },
    watch: {
        PlayerHealth(value) {
            if(value <= 0 && this.MonsterHealth <= 0) {
                this.Winner = 'draw';
            } else if (value <= 0) {
                this.Winner = 'monster';
            }
        },
        MonsterHealth(value) {
            if(value <= 0 && this.PlayerHealth <= 0) {
                this.Winner = 'draw';
            } else if (value <= 0) {
                this.Winner = 'player';
            }
        }
    },
    methods: {
        StartGame() {
            this.PlayerHealth = 100;
            this.MonsterHealth = 100;
            this.Winner = null;
            this.CurrentRound = 0;
            this.LogMessages = [];
        },
        AttackMonster() {
            this.CurrentRound++;
            const AttackValue = GetRandomValue(5, 12);
            this.MonsterHealth -= AttackValue;
            this.AddLogMessage('player', 'attack', AttackValue);
            this.AttackPlayer();
        },
        AttackPlayer() {
            const AttackValue = GetRandomValue(8, 15);
            this.PlayerHealth -= AttackValue;
            this.AddLogMessage('monster', 'attack', AttackValue);
        },
        SpecialAttackMonster() {
            this.CurrentRound++;
            const AttackValue = GetRandomValue(10, 25);
            this.MonsterHealth -= AttackValue;
            this.AddLogMessage('player', 'attack', AttackValue);
            this.AttackPlayer();
        },
        HealPlayer() {
            this.CurrentRound++;
            const HealValue = GetRandomValue(8, 20);
            if (this.PlayerHealth + HealValue > 100) {
                this.PlayerHealth = 100;
            } else {
                this.PlayerHealth += HealValue;
            }
            this.AddLogMessage('player', 'heal', HealValue);
            this.AttackPlayer();
        },
        Surrender() {
            this.Winner = 'monster';
        },
        AddLogMessage(who, what, value) {
            this.LogMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
});

app.mount('#game');