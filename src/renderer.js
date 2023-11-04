const { addPassword, getAllPasswords, updatePassword, deletePassword } = require('../src/password-manager');

document.addEventListener('DOMContentLoaded', () => {
  const addPasswordForm = document.getElementById('addPasswordForm');
  const passwordTable = document.getElementById('passwordTable').getElementsByTagName('tbody')[0];

  // Load and display all passwords when the page loads
  loadPasswords();

  addPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const id = await addPassword(website, username, password);
      console.log(`Password added with ID: ${id}`);
      clearForm();
      loadPasswords();
    } catch (error) {
      console.error(`Error adding password: ${error}`);
    }
  });

  // Function to load and display all passwords in the table
  async function loadPasswords() {
    try {
      passwordTable.innerHTML = ''; // Clear the table
      const passwords = await getAllPasswords();

      passwords.forEach((password) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${password.id}</td>
          <td>${password.website}</td>
          <td>${password.username}</td>
          <td>${password.password}</td>
          <td>
            <button class="update-button" data-id="${password.id}">Update</button>
            <button class="delete-button" data-id="${password.id}">Delete</button>
          </td>
        `;

        row.querySelector('.update-button').addEventListener('click', () => {
          // Handle update button click
          // Implement an update form or dialog
        });

        row.querySelector('.delete-button').addEventListener('click', async () => {
          const id = password.id;
          try {
            await deletePassword(id);
            console.log(`Password with ID ${id} deleted`);
            loadPasswords(); // Refresh the table after deletion
          } catch (error) {
            console.error(`Error deleting password: ${error}`);
          }
        });

        passwordTable.appendChild(row);
      });
    } catch (error) {
      console.error(`Error loading passwords: ${error}`);
    }
  }

  function clearForm() {
    document.getElementById('website').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }
});
