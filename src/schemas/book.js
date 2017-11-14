module.exports = class Book {
  constructor(isbn, title, price, cover, synopsis) {
    this.isbn = isbn;
    this.title = title;
    this.price = price;
    this.cover = cover;
    this.synopsis = synopsis;
  }
};