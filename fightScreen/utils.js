export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

   if(className) {
    $tag.classList.add(className);
   } 

    return $tag;
}

export const getRandom =(num) => Math.ceil(Math.random() * num);

export const showNormalTime = (num) => (num.toString().length > 1 ? num : `0${num}`);