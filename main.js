const $divArenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai'],
    attack,
    changeHP,
    elHP,
    renderHP,
}


const player2 = {
    player: 2,
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['iceBlade'],
    attack,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);

   if(className) {
    $tag.classList.add(className);
   } 

    return $tag;
}


function createPlayer(object) {
    const $playerDiv = createElement('div', 'player' + object.player);

    const $playerProgressbar = createElement('div', 'progressbar');
    $playerDiv.appendChild($playerProgressbar);

    const $playerCharacter = createElement('div', 'character');
    $playerDiv.appendChild($playerCharacter);

    const $progressbarLife = createElement('div', 'life');
    $progressbarLife.style.width = object.hp + '%';
    $playerProgressbar.appendChild($progressbarLife);

    const $progressbarName = createElement('div', 'name');
    $progressbarName.innerText = object.name;
    $playerProgressbar.appendChild($progressbarName);

    const $characterImg = createElement('img');
    $characterImg.src = object.img;
    $playerCharacter.appendChild($characterImg);

    return $playerDiv
}

function attack() {
    console.log(this.name + ' Fight...')
}

function changeHP(damage) {
    this.hp -= damage;

    if(this.hp <= 0) {
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player' + this.player +   ' .life');
}

function renderHP() {
    const $playerLifeContainer = this.elHP(); 
   $playerLifeContainer.style.width = this.hp + '%';
}

function playerWins(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    if(name) {
        $loseTitle.innerText = name + ' wins';
    }else {
        $loseTitle.innerText = 'Draw';
    }
   
    return $loseTitle;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}



function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadWrap.appendChild($button);
    $divArenas.appendChild($reloadWrap);

    $button.addEventListener('click', function() {
        window.location.reload();
    
    })
}   

function enemyAttack() {
    const hit = ATTACK[getRandom(3) -1];
    const defence = ATTACK[getRandom(3) -1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
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

function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton();
    }

    if (player1.hp === 0  && player1.hp < player2.hp) {
        $divArenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0  && player2.hp < player1.hp) {
        $divArenas.appendChild(playerWins(player1.name));
    }else if (player1.hp === 0 && player2.hp === 0) {
        $divArenas.appendChild(playerWins());
    }

}

function generateLogs(type, player1, player2) {
    const time = new Date();
    // switch (type) {
    //     case 'start':
    //         const text = logs[type].replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', time);
    //         const el = `<p>${text}</p>`;
    //         return  $chat.insertAdjacentHTML('afterbegin', el);
    //     case 'hit': 
    //         const text = logs[type][getRandom(type.length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
    //         const el = `<p>${time} ${text}</p>`;
    //     case 'defence':
    //     case 'end':
    //     case 'draw': 
    // }
    
    
   
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();
   

    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1)

    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2)
    }

    showResult();

})

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));
// generateLogs('start', player1, player2);



