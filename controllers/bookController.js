const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    publishedDate: req.body.publishedDate,
    pages: req.body.pages,
    genre: req.body.genre,
    filepath: req.body.filepath,
    uploader: req.body.uploader,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({
        message: "Book not found",
      });
    }

    if (req.body.title != null) {
      book.title = req.body.title;
    }
    if (req.body.author != null) {
      book.author = req.body.author;
    }
    if (req.body.description != null) {
      book.description = req.body.description;
    }
    if (req.body.publishedDate != null) {
      book.publishedDate = req.body.publishedDate;
    }
    if (req.body.pages != null) {
      book.pages = req.body.pages;
    }
    if (req.body.genre != null) {
      book.genre = req.body.genre;
    }
    if (req.body.filepath != null) {
      book.filepath = req.body.filepath;
    }
    if (req.body.uploader != null) {
      book.uploader = req.body.uploader;
    }

    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    await book.remove();
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
