function GetRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp ({
    data() {
        return {
            PlayerHealth: 100,
            MonsterHealth: 100,
            CurrentRound: 0,
            Winner: null
        };
    },
    computed: {
        MonsterBarStyles() {
            return {width: this.MonsterHealth + '%'};
        },
        PlayerBarStyles() {
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
        AttackMonster() {
            this.CurrentRound++;
            const AttackValue = GetRandomValue(5, 12);
            this.MonsterHealth -= AttackValue;
            this.AttackPlayer();
        },
        AttackPlayer() {
            const AttackValue = GetRandomValue(8, 15);
            this.PlayerHealth -= AttackValue;
        },
        SpecialAttackMonster() {
            this.CurrentRound++;
            const AttackValue = GetRandomValue(10, 25);
            this.MonsterHealth -= AttackValue;
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
            this.AttackPlayer();
        },
    },
});

app.mount('#game');