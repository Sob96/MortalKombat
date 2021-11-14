const $divArenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai'],
    attack: function () {
        console.log(this.name + ' Fight...')
    }

}


const player2 = {
    player: 2,
    name: 'Sub-zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['iceBlade'],
    attack: function () {
        console.log(this.name + ' Fight...')
    }

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

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player +   ' .life');
    const randomDamage = Math.ceil(Math.random()*20);
        player.hp -= randomDamage;

        if(player.hp < 0) {
            player.hp = 0;
            if(!document.querySelector('.loseTitle')) {
                $divArenas.appendChild(playerWins());
                $randomButton.disabled = true;
            }
        }
    
   
    $playerLife.style.width = player.hp + '%';
    console.log(player.hp);
    
    
}

function playerWins() {
    const $loseTitle = createElement('div', 'loseTitle');
    if(player1.hp > 0) {
        $loseTitle.innerText = player1.name + ' wins';
    }else if (player2.hp > 0) {
        $loseTitle.innerText = player2.name + ' wins';
    }else {
        $loseTitle.innerText = 'Draw';
    }
   
    return $loseTitle;
}

$randomButton.addEventListener('click', () => {

    changeHP(player1);
    changeHP(player2);

})

$divArenas.appendChild(createPlayer(player1));
$divArenas.appendChild(createPlayer(player2));