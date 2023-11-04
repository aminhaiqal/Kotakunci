const listElement = document.getElementById('list');
const items = ['Item 1', 'Item 2', 'Item 3'];

// Create a list of <li> elements
const listItems = items.map(item => {
  const listItem = document.createElement('li');
  listItem.textContent = item;
  return listItem;
});

// Append the list items to the <ul> element
listItems.forEach(item => {
  listElement.appendChild(item);
});
