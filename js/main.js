import ancientsData from '../data/ancients.js';
import difficulties from '../data/difficulties.js';

import { brownCards, blueCards, greenCards } from '../data/mythicCards/index.js';

// console.log(brownCards);
// console.log(blueCards[1]['cardFace']);
// console.log(greenCards);
const ancientsContainer = document.querySelector('.ancients-container');
const difficultyContainer = document.querySelector('.difficulty-container');

const shufflebutton = document.querySelector('.shuffle-button');
const currentState = document.querySelector('.current-state');


const deckContainer = document.querySelector('.deck-container');
const deck = deckContainer.querySelector('.deck');

let counterClickCard = 0;

// создание главных карточек
ancientsData.forEach((ancient, i) => {
   const ancientsCard = document.createElement('div');
   ancientsCard.classList.add('ancient-card');
   ancientsCard.id = ancientsData[i].id;
   ancientsCard.style.backgroundImage = `url(${ancientsData[i].cardFace})`;
   ancientsContainer.append(ancientsCard);

   // добавление класса кликнутой карте
   ancientsCard.addEventListener("click", function (e) {
      const ancientsCards = ancientsContainer.querySelectorAll('.ancient-card');
      counterClickCard++;
      // dspsdftv функцию выбора сложности игры при первом клике по карточке
      if (counterClickCard === 1) {
         greateDiffBtn();

      }

      let target = e.target;
      for (let i = 0; i < ancientsCards.length; i++) {
         // Убираем у других
         ancientsCards[i].classList.remove('active');

      }
      // Добавляем тому на который нажали
      target.classList.add('active');
      ancientsData[i] === target.id
      console.log(ancientsData[i])

      // создание кнопок по уровню сложности
      function greateDiffBtn() {
         difficulties.forEach((elem, i) => {
            const difficultyBtn = document.createElement('div');
            difficultyBtn.classList.add('difficulty');
            difficultyBtn.textContent = `${difficulties[i].name} сложность`;
            difficultyBtn.id = difficulties[i].id;
            difficultyContainer.append(difficultyBtn);
            difficultyBtn.addEventListener("click", function (e) {
               generateStage(ancientsData[i])

               const difficultyBtnAll = difficultyContainer.querySelectorAll('.difficulty');

               let target = e.target;
               for (let j = 0; j < difficultyBtnAll.length; j++) {
                  // Убираем у других
                  difficultyBtnAll[j].classList.remove('active');
               }
               target.classList.add('active');
               // слушаем по какому id кликнули
               console.log(difficulties[i].id);
            });
         });
      }
   });
});

function generateStage(ancient) {

   for (let key in ancient) {
      // console.log(typeof (ancient[key]));
      let stageContainer = document.createElement('div');
      stageContainer.classList.add('stage-container');
      // если есть обект в данных
      if (typeof (ancient[key]) === 'object') {
         // добавляем в разметку контейнер со стэйджами
         currentState.append(stageContainer);
         let dotsContainer = document.createElement('div');
         dotsContainer.classList.add('dots-container');
         stageContainer.append(dotsContainer);

         for (let point in ancient[key]) {
            console.log(ancient[key])
            let objState = ancient[key][point];
            // console.log(objState)
            // количество карт по цвету помещаем в див с классом dot
            let dotDiv = document.createElement('div');
            dotDiv.classList.add('dot');
            dotsContainer.append(dotDiv);
            dotDiv.textContent = objState;
            // добавляем класс с цветом
            dotDiv.classList.add(`${point.slice(0, -5)}`);

            generateCard(objState);
         }
      }
   }
}



const AllCard = [...greenCards, ...brownCards, ...blueCards]

// перемешать колоду
function generateCard(arg) {
   const сardNormal = [];

   const greenNormal = [];
   const brownNormal = [];
   const blueNormal = [];

   for (let i = 0; i < AllCard.length; i++) {
      if (AllCard[i].difficulty === 'normal') {
         сardNormal.push(AllCard[i]);
      }
   }

   console.log(сardNormal)

   for (let i = 0; i < сardNormal.length; i++) {
      if (сardNormal[i].color === 'green') {
         greenNormal.push(сardNormal[i]);

      } else if (сardNormal[i].color === 'brown') {
         brownNormal.push(сardNormal[i]);
      } else if (сardNormal[i].color === 'blue') {
         blueNormal.push(сardNormal[i]);

      }
   }

   console.log(greenNormal)
   console.log(brownNormal)
   console.log(blueNormal)
}


