const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.post("/books", controller.createBook);

router.get("/books", controller.getBooks);

router.get("/books/:id", controller.getBookById);

router.put("/books/:id", controller.updateBook);

router.delete("/books/:id", controller.deleteBook);

router.get("/books/search", controller.searchBook);

module.exports = router;