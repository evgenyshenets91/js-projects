var removeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><style type="text/css">.st0{fill:none;}.st1{fill:#26B999;}</style><rect y="0" class="st0" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

document.getElementById('add').addEventListener('click', function () {
  
  var value = document.getElementById('item').value
  if(value) addItemTodo (value);
  // обнуляем поле каждый раз
  document.getElementById('item').value = '';
});

// событие на нажатие Enter в input
document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if(e.code === 'Enter' && value) {
    addItemTodo (value);
    // обнуляем поле каждый раз
    document.getElementById('item').value = '';
  }
})

// добавляем новый элемент
function addItemTodo (text) {
 
  var item = document.createElement('li');
  item.classList.add('todo-item');
  item.innerText = text;  

  var buttons = document.createElement('div')
  buttons.classList.add('todo-item__buttons');

  var remove = document.createElement('button');
  remove.classList.add('todo-item__buttons-remove');
  // Вставляем в button содержимое svg
  remove.innerHTML = removeSVG;
  
  /////////////////////////////
  // При нажатии на данную кнопку, элемент Li должен удалиться
  remove.addEventListener('click', removeItem)
 
  var complete = document.createElement('button');
  complete.classList.add('todo-item__buttons-complete');
  // вставляем в button содержимое svg
  complete.innerHTML = completeSVG;

  //////////////////////////////
  // При нажатии на кнопку, заметка будет в 'завершённых'
  complete.addEventListener('click', completeItem)

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  // оборачиваем текст который в Li в спан
  var span = document.createElement('span');
  item.insertBefore(span, item.firstChild);
  span.appendChild(span.nextSibling);

  var list = document.querySelector('.todo-list') //ul
  list.insertBefore(item, list.childNodes[0])

}

function removeItem () {
  // двойная вложенность над кнопкой удалить -> buttons->li
  var delElem = this.parentNode.parentNode;
  // родетель li -> ul
  var parent = delElem.parentNode; 

  parent.removeChild(delElem);

}

function completeItem () {
  var choiceElem =   this.parentNode.parentNode; // li
  var parent = choiceElem.parentNode; // ul
  
  var target ; // определяем родителя, куда будем перемещать элемент
  
  if(parent.id === 'uncompleted') {
    target = document.getElementById('completed')
  } else {
    target = document.getElementById('uncompleted')
  }

  parent.removeChild(choiceElem); // удаляем li которая выделена и перемещаем в другой родитель
  target.insertBefore(choiceElem, target.childNodes[0])
  
}

