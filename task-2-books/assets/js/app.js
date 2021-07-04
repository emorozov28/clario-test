
document.addEventListener("DOMContentLoaded", function () {

    const bookSearchInput = document.querySelector('.book-search-input');
    const bookSearchResult = document.querySelector('.book-search-result');
    const wait = 3000;
    const noImageUrl = 'https://img.icons8.com/ios/50/000000/no-image.png';
    let timeout;

    const _apiBase = 'https://www.googleapis.com/books/v1/volumes?q=';

    async function getBooks(name) {
        const res = await fetch(`${_apiBase}${name}`);
        if (!res.ok) throw new Error(`Could not fetch ${name}`);
        return await res.json();
    }

    function searchBooks() {
        if (this.value.length <= 3) {
            bookSearchResult.innerHTML = 'Enter a book title';
            return;
        };

        bookSearchResult.innerHTML = '';
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            getBooks(this.value).then(books => {

                const bookItems = books.items;
                bookItems.forEach(book => {
                    const { authors, title, imageLinks, previewLink } = book.volumeInfo;
                    bookSearchResult.innerHTML += renderBooks(authors, title, checkImage(imageLinks), previewLink);
                });
            }).catch(e => {
                console.log(e);
                bookSearchResult.innerHTML = 'No books found';
            });
        }, wait);

    }

    function renderBooks(authors, title, img, linkBook) {
        const renderWrap = `
            <a href="${linkBook}" class="book-search-result-item" target="_blank">
                <div class="book-search-result-img">
                    <img src="${img}" alt="${title}">
                </div>
                <div class="book-search-result-wrap">
                    <h3 class="book-search-result-title">${title}</h3>
                    ${authors ? `<h4 class="book-search-result-authors">Authors - ${authors.join(', ')}</h4>` : ''}
                </div>
            </a>
        `;
        return renderWrap;
    }

    function checkImage(imageLinks) {
        return imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : noImageUrl
    }

    bookSearchInput.addEventListener('input', searchBooks);

});