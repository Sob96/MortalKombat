//Task #0

const player1 = {
    name: 'Scorpion',
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai'],
    attack: function () {
        console.log(this.name + ' Fight...')
    }

}


const player2 = {
    name: 'Sub-zero',
    hp: 70,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['iceBlade'],
    attack: function () {
        console.log(this.name + ' Fight...')
    }

}

//Task #1-2

// function createPlayer(player, name, hp) {
//     const $playerDiv = document.createElement('div');
//     $playerDiv.classList.add(player);


//     const $playerProgressbar = document.createElement('div');
//     $playerProgressbar.classList.add('progressbar');
//     $playerDiv.appendChild($playerProgressbar);

//     const $playerCharacter = document.createElement('div');
//     $playerCharacter.classList.add('character');
//     $playerDiv.appendChild($playerCharacter);

//     const $progressbarLife = document.createElement('div');
//     $progressbarLife.classList.add('life');
//     $progressbarLife.style.width = hp + '%';
//     $playerProgressbar.appendChild($progressbarLife);

//     const $progressbarName = document.createElement('div');
//     $progressbarName.classList.add('name');
//     $progressbarName.innerText = name;
//     $playerProgressbar.appendChild($progressbarName);

//     const $characterImg = document.createElement('img');
//     $characterImg.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';
//     $playerCharacter.appendChild($characterImg);

//     const $divArenas = document.querySelector('.arenas');
//     $divArenas.appendChild($playerDiv);
// }

// createPlayer('player1', 'SCORPION', 100);
// createPlayer('player2', 'Sub-Zero', 10);


// Task #3*

function createPlayer(player, object) {
    const $playerDiv = document.createElement('div');
    $playerDiv.classList.add(player);


    const $playerProgressbar = document.createElement('div');
    $playerProgressbar.classList.add('progressbar');
    $playerDiv.appendChild($playerProgressbar);

    const $playerCharacter = document.createElement('div');
    $playerCharacter.classList.add('character');
    $playerDiv.appendChild($playerCharacter);

    const $progressbarLife = document.createElement('div');
    $progressbarLife.classList.add('life');
    $progressbarLife.style.width = object.hp + '%';
    $playerProgressbar.appendChild($progressbarLife);

    const $progressbarName = document.createElement('div');
    $progressbarName.classList.add('name');
    $progressbarName.innerText = object.name;
    $playerProgressbar.appendChild($progressbarName);

    const $characterImg = document.createElement('img');
    $characterImg.src = object.img;
    $playerCharacter.appendChild($characterImg);

    const $divArenas = document.querySelector('.arenas');
    $divArenas.appendChild($playerDiv);
}

createPlayer('player1', player1);
createPlayer('player2', player2);