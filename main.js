const $divArenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];



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

$formFight.addEventListener('submit', function(e) {
    e.preventDefault();
    const enemy = enemyAttack();
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
   

    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();

    }

    if (enemy.defence !== attack.hit) {
        player2.changeHP(attack.value);
        player2.renderHP();
    }

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

})

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));



