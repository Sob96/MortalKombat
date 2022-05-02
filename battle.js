import {$divArenas, $chat, logs, Player, createElement} from './prepForBattle.js'

export const $formFight = document.querySelector('.control');

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
export const ATTACK = ['head', 'body', 'foot'];

export const  playerWins =(name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if(name) {
        $loseTitle.innerText = name + ' wins';
    }else {
        $loseTitle.innerText = 'Draw';
    }
   
    return $loseTitle;
}

export const getRandom =(num) => Math.ceil(Math.random() * num);




export const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadWrap.appendChild($button);
    $divArenas.appendChild($reloadWrap);

    $button.addEventListener('click', () => window.location.reload())
}   

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) -1];
    const defence = ATTACK[getRandom(3) -1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

export const playerAttack = () => {
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

export function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
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

export const showNormalTime = (num) => (num.toString().length > 1 ? num : `0${num}`); 


export function generateLogs(type, {name}, {name: player2Name}, damage, remain) {
    const date = new Date();
    const time = `${showNormalTime(date.getHours())}:${showNormalTime(date.getMinutes())}:${showNormalTime(date.getSeconds())}`;
    let text;
    let el;
    switch (type) {
        case 'start':
                 text = logs[type].replace('[player1]', name).replace('[player2]', player2Name).replace('[time]', time);;
                 el = `<p>${text}</p>`;
                break;
        case 'hit': 
                 text = logs[type][getRandom(type.length) - 1].replace('[playerKick]', name).replace('[playerDefence]', player2Name);
                 el = `<p>[${time}] ${text} [-${damage}] [${remain}/100] </p>`;
                break;
        case 'defence':
                 text = logs[type][getRandom(type.length) - 1].replace('[playerKick]', name).replace('[playerDefence]', player2Name);
                 el = `<p>[${time}] ${text}</p>`;
                break;
        case 'end':
                 text = logs[type][getRandom(type.length) - 1].replace('[playerWins]', name).replace('[playerLose]', player2Name);
                 el = `<p>[${time}] ${text}</p>`;
                break;
        case 'draw': 
                 text = logs[type];
                 el = `<p>[${time}] ${text}</p>`;
                break;
    }
    
    return  $chat.insertAdjacentHTML('afterbegin', el);
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


let player1;
let player2;

export class Game {
    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body
    }
    
    computerChoice = async () => {
        const choice = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return choice
    }

    apiAttack = async () => {
        fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
    method: 'POST',
    body: JSON.stringify(playerAttack())
});
    }

    start = async () => {
        const players = await this.getPlayers();
        const p1 = players[getRandom(players.length) - 1];
        const p2 = await this.computerChoice();
        console.log(p1, p2);
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
        $divArenas.appendChild(player1.createPlayer());
        $divArenas.appendChild(player2.createPlayer());
        generateLogs('start', player1, player2);
    }
}
