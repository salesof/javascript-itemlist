//Get elements
const itemInput = document.querySelector('.itemInput');
const form = document.querySelector('.itemForm');
const itemlist = document.querySelector('.itemlist');
const filter = document.getElementById('filter');
const emptyList = document.querySelector('.empty');
const modal = document.getElementById("editWindow");
const close = document.getElementsByClassName("close")[0];
const itemEdit = document.getElementById("itemEdit");

//Create variable for editing
let currentItem;

//Add EventListeners
form.addEventListener('submit', addItem);
filter.addEventListener('keyup', searchItem);

//FUNCTIONS
//Add new item function
function addItem(e){
  e.preventDefault();

  //Check if the input value is empty
  if (itemInput.value === ''){
    alert('Please add a value');
  } else {
    //Get input value
    const newItem = itemInput.value;

    //Create new li
    const li = document.createElement('li');
    li.className = 'item';
    li.appendChild(document.createTextNode(newItem));

    //Add to itemlist
    itemlist.appendChild(li);

    //Create new delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'deleteBtn';

    //Create delete icon
    const iDel = document.createElement('i');
    iDel.className = 'fa fa-close';
    const iconDel = document.createTextNode('');
    iDel.appendChild(iconDel);

    //Add icon to delete button
    delBtn.appendChild(iDel);

    //Create new edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'editBtn';

    //Create edit icon
    const iEdit = document.createElement('i');
    iEdit.className = 'fa fa-edit';
    const iconEdit = document.createTextNode('');
    iEdit.appendChild(iconEdit);

    //Add icon to edit button
    editBtn.appendChild(iEdit);

    //Add to li element
    li.appendChild(delBtn);
    li.appendChild(editBtn);

    //Erase the text from form
    itemInput.value = '';

    //Delete item
    const deleteBtn = li.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', deleteItem);

    // When the user clicks on the edit button, open the modal
    editBtn.onclick = function(e) {
      modal.style.display = "block";

      // Set current item
      currentItem = e.currentTarget.parentElement;
      // Set form value
      itemEdit.value = currentItem.textContent;

      //Edit item text when button is clicked
      const editBtnModal = document.querySelector('.editBtnModal');
      editBtnModal.addEventListener('click', editItem);
    }

    // When the user clicks on <span> (x), close the modal
    close.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(e) {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    }

    //Get lis
    const items = itemlist.getElementsByTagName('li');
    //Convert to an array
    const itemCount = Array.from(items);
    //Check if the list has any items
    if (itemlist.length != 0){
      emptyList.style.display = 'none';
    }
  }
}

//Delete item function
function deleteItem(e){
  if(e){
    if(confirm('Are you sure you want to remove this item?')){
      const li = e.target.parentElement.parentElement;
      itemlist.removeChild(li);
    }
  }
  //Get lis
  const items = itemlist.getElementsByTagName('li');
  //Convert to an array
  const itemCount = Array.from(items);
  //Check if the list is empty
  if (itemCount.length === 0){
    emptyList.style.display = 'block';
  }
}

//Search item function
function searchItem(e){
  //Get input value in lowercase
  const searchItem = e.target.value.toLowerCase();

  //Get lis
  const items = itemlist.getElementsByTagName('li');

  //Convert to an array
  const itemArray = Array.from(items);

  //Check if any of the items match the search term
  itemArray.forEach(function(item){
    const itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(searchItem) != -1){
      item.style.display = 'li';
    } else {
      item.style.display = 'none';
    }
  });
}

//Edit item function
function editItem(e){
  e.preventDefault();

  //Check if the input value is empty
  if (itemEdit.value === ''){
    alert('Please add a value');
  } else {
    //Grab the current li text and reassign its value
    currentItem.childNodes[0].textContent = itemEdit.value;
    //Close the modal
    modal.style.display = "none";
  }
}
