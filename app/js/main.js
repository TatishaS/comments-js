'use strict';

const form = document.querySelector('.form');
const inputName = form.querySelector('.form__input--name');
const inputDate = form.querySelector('.form__input--date');
const inputTextarea = form.querySelector('.form__input--textarea');
const formBtn = form.querySelector('.form__btn');
const commentsInner = document.querySelector('.comments__inner');
const nameField = document.getElementById('name-field');
const textareaField = document.getElementById('textarea-field');
const commentsList = document.getElementById('comments-list');

const commentDate = document.querySelector('.comment__date');

/* Comments array */

let comments = [
  {
    name: 'Раиса',
    content: 'Первый коммент',
    date: 1678812066210,
  },
  {
    name: 'Федор',
    content: 'Второй',
    date: 1678812066890,
  },
  {
    name: 'Заяц',
    content: 'Третий коммент',
    date: 1648822656775,
  },
  {
    name: 'Волк',
    content: 'Четвертый коммент',
    date: 1678802656775,
  },
];

//let comments = [];

/* Helpers */

const dateOptions = {
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const patternDay = 1678812066210;

const formatDate = date => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) {
    const time = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
    console.log(`сегодня, ${time}`);

    return `сегодня, ${time}`;
  }

  if (daysPassed === 1) {
    const time = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
    return `вчера, ${time}`;
  }
  const formatedDate = new Intl.DateTimeFormat('ru-RU', dateOptions).format(
    date
  );

  return formatedDate;
};

const createComment = obj => {
  const item = document.createElement('li');
  item.classList.add('comment');

  let html = '';

  if (!obj) {
    commentsInner.innerHTML =
      '<p style="font-style: italic">Комментариев еще нет</p>';
  }

  if (obj) {
    //commentsInner.innerHTML = '';
    html = `
  <div class="comment__wrapper">
                    <div class="comment__header">
                      <span class="comment__name">${obj.name}</span>
                      <span class="comment__divider"></span>
                      <span class="comment__date">${formatDate(obj.date)}</span>
                    </div>
                    <p class="comment__content">
                      ${obj.content}
                    </p>
                    <div class="comment__footer">
                      <input
                        type="checkbox"
                        class="comment__like-input visually-hidden"
                        id=${`like-${obj.date}`}
                       
                      />
                      <label
                        for=${`like-${obj.date}`}
                        class="comment__like-label"
                        aria-label="Нравится"
                      >
                        <svg
                          class="comment__like-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          width="20"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1ZM24 38q5.05-4.65 8.325-7.975 3.275-3.325 5.2-5.825 1.925-2.5 2.7-4.45.775-1.95.775-3.9 0-3.3-2.1-5.425T33.5 8.3q-2.55 0-4.75 1.575T25.2 14.3h-2.45q-1.3-2.8-3.5-4.4-2.2-1.6-4.75-1.6-3.3 0-5.4 2.125Q7 12.55 7 15.85q0 1.95.775 3.925.775 1.975 2.7 4.5Q12.4 26.8 15.7 30.1 19 33.4 24 38Zm0-14.85Z"
                          />
                        </svg>
                      </label>
                      <button class="comment__delete-btn" type="submit">
                        <img
                          src="./images/icon-delete.svg"
                          alt="Удалить комментарий"
                          class="comment__delete-img"
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>
                  </div>
                  `;
  }

  item.insertAdjacentHTML('beforeend', html);

  return item;
};

const renderComments = items => {
  console.log(items);
  commentsList.textContent = '';
  if (items.length === 0) {
    commentsInner.innerHTML =
      '<p style="font-style: italic">Комментариев еще нет</p>';
  }

  items
    ?.sort((a, b) => b.date - a.date)
    .map(item => {
      const comment = createComment(item);
      commentsList.append(comment);
    });
};

const clearInputs = () => {
  inputName.value = '';
  inputTextarea.value = '';
  inputDate.value = '';
};

formatDate(1678812066210);
renderComments(comments);

const renderAlertMessage = (elem, text) => {
  let html = '';

  let span = document.createElement('span');
  span.classList.add('alert');
  console.log(span);
  html = text;
  span.innerText = text;
  elem.appendChild(span);
  //span.insertAdjacentHTML('beforeend', html);

  inputName.addEventListener('change', () => {
    console.log('меняется');
    if (!span) return;
    else span.remove();
  });
};

const clearAlert = input => {};

/* inputName.addEventListener('input', () => {
  console.log('меняется');
}); */

form.addEventListener('submit', event => {
  event.preventDefault();

  const name = inputName.value;
  const content = inputTextarea.value;
  const date = inputDate.value ? inputDate.valueAsNumber : Date.now();

  if (!name) {
    renderAlertMessage(nameField, 'Заполните имя!');

    return;
  }

  if (!content) {
    console.log(textareaField);
    renderAlertMessage(textareaField, 'Заполните поле комментария!');
  }

  if (name && content) {
    const formInfo = {
      name,
      content,
      date,
    };

    comments.push(formInfo);
    renderComments(comments);

    clearInputs();
  }
});
