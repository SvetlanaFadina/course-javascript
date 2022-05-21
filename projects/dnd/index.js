/* eslint-disable prettier/prettier */
/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

function get_random_color() {
  return "#"+((1<<24)*Math.random()|0).toString(16);
}

function getRandomInteger(min, max) {
  let result = min - 0.5 + Math.random() * (max - min + 1);

  result = Math.round(result);

  return result;
}

export function createDiv() {
  const result = document.createElement('div');

    result.className = 'draggable-div';
    result.style.backgroundColor = get_random_color();
    result.style.top = getRandomInteger(10, 100) + 'px';
    result.style.left = getRandomInteger(10, 100) + 'px';
    result.style.width = getRandomInteger(10, 100) + 'px';
    result.style.height = getRandomInteger(10, 100) + 'px';
    result.style.position = 'absolute';

    result.style.cursor = 'pointer';

    result.draggable = true; 

    return result;
}


const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
