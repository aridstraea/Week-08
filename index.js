/**
 *  Book Class
 *  
 * Properties:
 * - name: string
 * - author: string
 * 
 * Methods:
 * - describe(): string
 */
class Book {
    constructor(name, author) { // constructor function
        this.name = name;
        this.author = author;
    }
 
    describe() { // [bookName] by [bookAuthor]
        return `${this.name} by  ${this.author}`;
    }
}

/**
 *  Library Class
 *  
 * Properties:
 * - name: string
 * - books: Book[]
 * 
 * Methods:
 * - addBook(book): void
 * - describe(): string
 */
class Library {
    constructor(name) { // constructor function
        this.name = name;
        this.books = [];
    }

    addBook(book) { // add book to library
        if (book instanceof Book) { // if book is an instance of Book, add book to library
            this.books.push(book);
        } else { // if book is not an instance of Book, throw error
            throw new Error(`You can only add an instance of Book. Argument is not a book: ${book}`);
        }
    }

    describe() { // The library [libraryName] has [bookCount] books.
        return `The library ${this.name} has ${this.books.length} books.`;
    }
}


/**
 *  Menu Class
 * 
 * Properties:
 * - libraries: Library[]
 * - selectedLibrary: Library
 * 
 * Methods:
 * - start(): void
 * - showMainMenuOptions(): string
 * - showLibraryMenuOptions(libraryInfo: string): string
 * - createLibrary(): void
 * - viewLibrary(): void
 * - deleteLibrary(): void
 * - displayLibraries(): void
 * - createBook(): void
 * - deleteBook(): void
 */
class Menu {
    constructor() { // constructor function
        this.libraries = [];
        this.selectedLibrary = null;
    }

    start() { // start menu
        let selection = this.showMainMenuOptions(); // show main menu options

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createLibrary(); // create new library
                    break;
                case '2':
                    this.viewLibrary(); // view library
                    break;
                case '3':
                    this.deleteLibrary(); // delete library
                    break;
                case '4':
                    this.displayLibraries(); // display all libraries
                    break;
                default:
                    selection = 0; // exit
            }
            selection = this.showMainMenuOptions(); // show main menu options
        }

        alert('Goodbye!'); // alert user that program is ending
    }

    showMainMenuOptions() { // show main menu options
        return prompt(`
            0> Exit
            1> Create a new library
            2> View library
            3> Delete library
            4> Display all libraries
        `)
    }

    showLibraryMenuOptions(libraryInfo) { // show library menu options
        return prompt(`
            0> Back
            1> Add book
            2> Delete book
            -----------------
            ${libraryInfo}
        `);
    }

    // TEAM FUNCTIONS

    createLibrary() { // create new library
        let name = prompt('Enter name for new library:'); // prompt user for library name
        this.libraries.push(new Library(name)); // add new library to libraries array
    }

    viewLibrary() { // view library
        let index = prompt('Enter the index of the library you wish to view:'); // prompt user for library index
        if (index > -1 && index < this.libraries.length) { // if index is valid
            this.selectedLibrary = this.libraries[index]; // set selected library to library at index
            let description = 'Library Name: ' + this.selectedLibrary.name + '\n'; // Library Name: [libraryName]

            for (let i = 0; i < this.selectedLibrary.books.length; i++) { // add to description
                // Library Name: [libraryName]) [bookName] - [bookAuthor] \n (added to end of description, full list.)
                description += i + ') ' + this.selectedLibrary.books[i].name + ' - ' + this.selectedLibrary.books[i].author + '\n'; 
            }

            let selection = this.showLibraryMenuOptions(description); // show library menu options
            switch (selection) {
                case '1':
                    this.createBook(); // create new book
                    break;
                case '2':
                    this.deleteBook(); // delete a book
                    break;
            }
        }
    }

    deleteLibrary() { // delete library
        let index = prompt('Enter the index of the library you wish to delete:'); // prompt user for library index
        if (index > -1 && index < this.libraries.length) { // if index is valid
            this.libraries.splice(index, 1); // remove library at index
        }
    }

    displayLibraries() { // display all libraries
        let libraryString = "";

        for (let i = 0; i < this.libraries.length; i++) { // add to libraryString
            // [libraryNumber]) [library name] \n (added to end of libraryString, full list.)
            libraryString += i + ') ' + this.libraries[i].name + '\n'; 
        }
        alert(libraryString); 
    }

    // PLAYER FUNCTIONS

    createBook() { // create new book
        let name = prompt('Enter name for new book:'); // prompt user for book name
        let author = prompt('Enter author for new book:'); // prompt user for book author
        this.selectedLibrary.books.push(new Book(name, author)); // add new book to selected library
    }

    deleteBook() {
        let index = prompt('Enter the index of the book you wish to delete:'); // prompt user for book index
        if (index > -1 && index < this.selectedLibrary.books.length) { // if index is valid
            this.selectedLibrary.books.splice(index, 1); // remove book at index
        }
    }
}

let menu = new Menu(); // make a menu
menu.start(); // start the menu