//represents a book
class Book {
    constructor(title, author, genre, pages) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;   
    }
}

// UI class - represents the user interface
class UI {
    static displayModal() {
        document.querySelector('.overlay').style.display = 'block';
    }

    static addBook(book) {
        // create book card
        const card = document.createElement('div');
        card.className = 'card';

        // create read, title, author, and pages
        const read = document.createElement('div');
        read.className = 'read';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.className = 'checkbox';
            const label = document.createElement('label');
            label.textContent = "Read";
        read.appendChild(input);
        read.appendChild(label);

        const title = document.createElement('p');
        title.className = 'title';

        const author = document.createElement('p');
        author.className = 'author';

        const genre=document.createElement('p');
        genre.className='genre';

        const footer = document.createElement('div');
        footer.className = 'footer';
            const pages = document.createElement('p');
            pages.className = 'pages';
            const remove = document.createElement('p');
            remove.className = 'remove';
        footer.appendChild(pages);
        footer.appendChild(remove);

        // append card children to card
        card.appendChild(read);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(genre);
        card.appendChild(footer);
       
        
        // append card to card group
        const cardGroup = document.querySelector('.card-container');
        cardGroup.appendChild(card);

        // fills in book info
        title.textContent = book.title;
        author.textContent = book.author;
        genre.textContent=book.genre;
        pages.textContent = book.pages;
        remove.textContent = 'Remove';
        if (document.getElementById('read-state').checked == true) {
            input.checked = true;
        }
    }

    static hideDefaultState() {
        document.querySelector('.default-state').style.display = 'none';
        document.getElementById('add-btn-main').style.display = 'inline-block';
    }

    static dismissModal() {
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.titleInput').value = '';
        document.querySelector('.authorInput').value = '';
        document.querySelector('.genreInput').value= '';
        document.querySelector('.pagesInput').value = '';  
    }

    static removeBook(el) {
        if (el.classList.contains('remove')) {
            el.parentElement.parentElement.remove();
        }
    }
}

// event listeners

// add book button > invokes add book modal
Array.from(document.getElementsByClassName('add-btn')).forEach(element => {
    element.addEventListener('click', UI.displayModal);
})

// add book button (modal) > confirms book add
document.getElementById('add-btn-modal').addEventListener('click', () => {
    // grab inputted values
    const title = document.querySelector('.titleInput').value;
    const author = document.querySelector('.authorInput').value;
    const genre = document.querySelector('.genreInput').value;
    const pages = document.querySelector('.pagesInput').value;
    

    // instantiate new book
    const book = new Book(title, author, genre, pages);

    // add book
    UI.addBook(book);

    // dismiss modal
    UI.dismissModal();

    // dismiss default state
    UI.hideDefaultState();
});

// remove book
document.querySelector('.card-container').addEventListener('click', e => {
    // remove book
    UI.removeBook(e.target);

    // display null state if there are no books
    if (document.querySelector('.card-container').hasChildNodes == false) {
        document.querySelector('.default-state').style.display = 'block';
    }
})

