import Player from '../players.js';
import {HIT, ATTACK} from '../store/dataForBattle.js';
import {createElement, getRandom} from '../utils.js';
import generateLogs from '../logGeneration.js';

const $divArenas = document.querySelector('.arenas');
export const $chat = document.querySelector('.chat');
const $formFight = document.querySelector('.control');
let player1;
let player2;

export class Game {
    computerChoice = async () => {
        const choice = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return choice
    }

    start = async () => {
        const p1 = JSON.parse(localStorage.getItem('player1'));
        const p2 = await this.computerChoice();
        player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        });

        player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',
        })
        $divArenas.classList.add(`arena${getRandom(5)}`);
        $divArenas.appendChild(player1.createPlayer());
        $divArenas.appendChild(player2.createPlayer());
        generateLogs('start', player1, player2);
    }
}


const playerAttack = () => {
    const attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;

    }
    return attack;
}

const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) -1];
    const defence = ATTACK[getRandom(3) -1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

const showResult = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
        const audio = new Audio('../../assets/audio/fatality.mp3');
        audio.play();
    }

    if (player1.hp === 0  && player1.hp < player2.hp) {
        $divArenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0  && player2.hp < player1.hp) {
        $divArenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    }else if (player1.hp === 0 && player2.hp === 0) {
        $divArenas.appendChild(playerWins());
        generateLogs('draw');
    }
}

const  playerWins = (name) => {
    const $finalTitle = createElement('div', 'finalTitle');
    if(name) {
        $finalTitle.innerText = name + ' wins';
    }else {
        $finalTitle.innerText = 'Draw';
    }
   
    return $finalTitle;
}

const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadWrap.appendChild($button);
    $divArenas.appendChild($reloadWrap);

    $button.addEventListener('click', () => window.location.pathname = 'index.html');
}   

$formFight.addEventListener('submit', (e) => {
    e.preventDefault();
    const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack();
    const {hit, defence, value} = playerAttack();
   

    if (hitEnemy !== defence) {
        player1.changeHP(valueEnemy);
        player1.renderHP();
        generateLogs('hit', player2, player1, valueEnemy, player1.hp)

    }else {
        generateLogs('defence', player2, player1);
    }

    if (defenceEnemy !== hit) {
        player2.changeHP(value);
        player2.renderHP();
        generateLogs('hit', player1, player2, value, player2.hp)
    
    }else {
        generateLogs('defence', player1, player2);
    }

    showResult();

})