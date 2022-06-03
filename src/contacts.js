const stickyHeader = document.getElementsByClassName("stickyHeader")[0];
const contacts = document.getElementsByClassName("contacts")[0];
const count_elems = 14; /* Количество отображаемых элементов (можно поменять в зависимости от высоты списка элементов) */
addContacts(0, count_elems); /* Сначала генерируется список из count_elems элементов */
let counter = 0; /* Счетчик текущего элемента, отображаемого в stickyHeader */

/* Функция addContacts() генерирует элементы div и добавляет их в контейнер contacts */
function addContacts(start, count) {
  const fragment = document.createDocumentFragment();
  for (let i = start; i < count; i++) {
    const div = document.createElement("div");
    div.setAttribute("class", "contact");
    div.textContent = i;
    fragment.appendChild(div);
  }
  contacts.appendChild(fragment);
}

/* Следующий метод обрабатывает колесико мыши, прокручивая список и генерируя новые элементы при необходимости, чтобы снизить загрузку страницы */
const scroll = function (e) {
  const contact = contacts.children;
  if (e.wheelDelta < 0 && counter < 50000 - count_elems) {
    stickyHeader.textContent = contact[counter + 2].textContent;
    counter++;
    if (contact.length <= counter + count_elems) {
      addContacts(counter + count_elems - 1, counter + count_elems);
    }
    contact[counter].style.display = "none";
    contact[counter + count_elems].style.display = "block";
  } else if (e.wheelDelta > 0 && counter > 0) {
    stickyHeader.textContent = contact[counter].textContent;
    contact[counter].style.display = "block";
    contact[counter + count_elems].style.display = "none";
    counter--;
  }
};

contacts.addEventListener("wheel", scroll);
