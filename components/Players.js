import {createElement} from './Utils.js';

class Player {
    constructor({player, name, hp, img}) {
        this.player = player;
        this.name = name;
        this.hp = hp;
        this.img = img;
    }
    attack = () => {
        console.log(`${this.name} Fight...`)
    };
    
    changeHP = (damage) => {
        this.hp -= damage;
    
        if(this.hp <= 0) {
            this.hp = 0;
        }
    };
    elHP = () => {
        return document.querySelector(`.player${this.player} .life`);
    };
    renderHP() {
        const $playerLifeContainer = this.elHP(); 
       $playerLifeContainer.style.width = this.hp + '%';
    };

    createPlayer() {
        const $playerDiv = createElement('div', `player${this.player}`);
    
        const $playerProgressbar = createElement('div', 'progressbar');
        $playerDiv.appendChild($playerProgressbar);
    
        const $playerCharacter = createElement('div', 'character');
        $playerDiv.appendChild($playerCharacter);
    
        const $progressbarLife = createElement('div', 'life');
        $progressbarLife.style.width = this.hp + '%';
        $playerProgressbar.appendChild($progressbarLife);
    
        const $progressbarName = createElement('div', 'name');
        $progressbarName.innerText = this.name;
        $playerProgressbar.appendChild($progressbarName);
    
        const $characterImg = createElement('img');
        $characterImg.src = this.img;
        $playerCharacter.appendChild($characterImg);
    
        return $playerDiv
    }
}

export default Player;