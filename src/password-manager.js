const sqlite3 = require('sqlite3').verbose();

// Initialize the SQLite database
const db = new sqlite3.Database('../data/passwords.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database');
    // Create a "passwords" table if it doesn't exist
    db.run('CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY, website TEXT, username TEXT, password TEXT)');
  }
});

// Function to add a new password
function addPassword(website, username, password) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO passwords (website, username, password) VALUES (?, ?, ?)', [website, username, password], function(err) {
      if (err) {
        reject(err.message);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

// Function to retrieve all passwords
function getAllPasswords() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM passwords', (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

// Function to update a password entry
function updatePassword(id, website, username, password) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE passwords SET website = ?, username = ?, password = ? WHERE id = ?', [website, username, password, id], function(err) {
      if (err) {
        reject(err.message);
      } else {
        resolve(this.changes);
      }
    });
  });
}

// Function to delete a password entry by ID
function deletePassword(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM passwords WHERE id = ?', [id], function(err) {
      if (err) {
        reject(err.message);
      } else {
        resolve(this.changes);
      }
    });
  });
}

module.exports = {
  addPassword,
  getAllPasswords,
  updatePassword,
  deletePassword,
};
