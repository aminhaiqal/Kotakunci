import os
from tabulate import tabulate
from .database import create_table, create_password, read_passwords, update_password, delete_password

def display_menu():
    print("\nPassword Manager Menu:")
    print("1. Create Password")
    print("2. Read Passwords")
    print("3. Update Password")
    print("4. Delete Password")
    print("5. Exit")

def password_manager_menu():
    create_table()

    while True:
        display_menu()

        choice = input("Enter your choice: ")

        if choice == "1":
            application = input("Application: ")
            username = input("Username: ")
            password = input("Password: ")
            create_password(application, username, password)
            os.system("cls")
        elif choice == "2":
            passwords = read_passwords()
            if passwords:
                headers = ["ID", "Application", "Username", "Password"]
                print(tabulate(passwords, headers, tablefmt="grid"))
            else:
                print("No passwords found.")
        elif choice == "3":
            password_id = input("Enter the ID of the password to update: ")
            application = input("Application: ")
            username = input("Username: ")
            password = input("Password: ")
            update_password(password_id, application, username, password)
            os.system("cls")
        elif choice == "4":
            password_id = input("Enter the ID of the password to delete: ")
            delete_password(password_id)
            os.system("cls")
        elif choice == "5":
            break
