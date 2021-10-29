function GetRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp ({
    data() {
        return {
            PlayerHealth: 100,
            MonsterHealth: 100
        };
    },
    computed: {
        MonsterBarStyles() {
            return {width: this.MonsterHealth + '%'};
        },
        PlayerBarStyles() {
            return {width: this.PlayerHealth + '%'};
        }
    },
    methods: {
        AttackMonster() {
            const AttackValue = GetRandomValue(5, 12);
            this.MonsterHealth -= AttackValue;
            this.AttackPlayer();
        },
        AttackPlayer() {
            const AttackValue = GetRandomValue(8, 15);
            this.PlayerHealth -= AttackValue;
        }
    }
});

app.mount('#game');