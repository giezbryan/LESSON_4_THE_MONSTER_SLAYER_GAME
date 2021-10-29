function GetRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp ({
    data() {
        return {
            PlayerHealth: 100,
            MonsterHealth: 100,
            CurrentRound: 0
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
        }
    }
});

app.mount('#game');