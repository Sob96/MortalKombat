import logs from '../store/logs.js';
import {getRandom, showNormalTime} from './Utils.js';
import {$chat} from './Gameplay.js';

const generateLogs = (type, {name: player1Name}, {name: player2Name}, damage, remain) => {
    const date = new Date();
    const time = `${showNormalTime(date.getHours())}:${showNormalTime(date.getMinutes())}:${showNormalTime(date.getSeconds())}`;
    let text;
    let el;
    switch (type) {
        case 'start':
                 text = logs[type].replace('[player1]', player1Name).replace('[player2]', player2Name).replace('[time]', time);;
                 el = `<p>${text}</p>`;
                break;
        case 'hit': 
                 text = logs[type][getRandom(type.length) - 1].replace('[playerKick]', player1Name).replace('[playerDefence]', player2Name);
                 el = `<p>[${time}] ${text} [-${damage}] [${remain}/100] </p>`;
                break;
        case 'defence':
                 text = logs[type][getRandom(type.length) - 1].replace('[playerKick]', player1Name).replace('[playerDefence]', player2Name);
                 el = `<p>[${time}] ${text}</p>`;
                break;
        case 'end':
                 text = logs[type][getRandom(type.length) - 1].replace('[playerWins]', player1Name).replace('[playerLose]', player2Name);
                 el = `<p>[${time}] ${text}</p>`;
                break;
        case 'draw': 
                 text = logs[type];
                 el = `<p>[${time}] ${text}</p>`;
                break;
    }
    
    return  $chat.insertAdjacentHTML('afterbegin', el);
}

export default generateLogs;