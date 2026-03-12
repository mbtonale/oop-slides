# Live Coding: Bookshelf

## Goal
Build a bookshelf system demonstrating **classes**, **objects**, **self**, and **magic methods** step by step.

---

## Part A: From Procedural to OOP

## Step 1: The procedural way

```python
title1 = "Clean Code"
author1 = "Robert Martin"
year1 = 2008

title2 = "The Pragmatic Programmer"
author2 = "David Thomas"
year2 = 1999

print(f"{title1} by {author1} ({year1})")
print(f"{title2} by {author2} ({year2})")
```

> **Discussion:** What happens when we need 100 books? 100 x 3 variables!

## Step 2: Create a Book class

```python
class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

    def display_info(self):
        print(f"{self.title} by {self.author} ({self.year})")
```

## Step 3: Create objects

```python
book1 = Book("Clean Code", "Robert Martin", 2008)
book2 = Book("The Pragmatic Programmer", "David Thomas", 1999)

book1.display_info()
book2.display_info()
```

### Output:
```
Clean Code by Robert Martin (2008)
The Pragmatic Programmer by David Thomas (1999)
```

> **Key point:** Each book is a self-contained object. Adding 100 books = 100 lines, not 300 variables!

---

## Part B: Magic Methods

## Step 4: Add `__str__` and `__repr__`

```python
class Book:
    def __init__(self, title, author, year):
        self.title = title
        self.author = author
        self.year = year

    def __str__(self):
        return f"{self.title} by {self.author} ({self.year})"

    def __repr__(self):
        return f"Book({self.title!r}, {self.author!r}, {self.year})"
```

## Step 5: Try it

```python
book = Book("Clean Code", "Robert Martin", 2008)
print(book)
print(repr(book))
```

### Output:
```
Clean Code by Robert Martin (2008)
Book('Clean Code', 'Robert Martin', 2008)
```

> **Discussion:** When do we use `__str__` vs `__repr__`? (`str` = user-friendly, `repr` = developer/debugging)

---

## Part C: Bookshelf with `__len__` and `__add__`

## Step 6: Bookshelf class

```python
class Bookshelf:
    def __init__(self, name):
        self.name = name
        self.books = []

    def add_book(self, book):
        self.books.append(book)
        print(f"Added: {book}")

    def __len__(self):
        return len(self.books)

    def __str__(self):
        header = f"Bookshelf '{self.name}' ({len(self)} books):"
        lines = [f"  - {book}" for book in self.books]
        return "\n".join([header] + lines)
```

## Step 7: Fill the shelf

```python
shelf = Bookshelf("Programming")
shelf.add_book(Book("Clean Code", "Robert Martin", 2008))
shelf.add_book(Book("The Pragmatic Programmer", "David Thomas", 1999))
shelf.add_book(Book("Python Crash Course", "Eric Matthes", 2015))

print(f"\nBooks on shelf: {len(shelf)}")
print(shelf)
```

### Output:
```
Added: Clean Code by Robert Martin (2008)
Added: The Pragmatic Programmer by David Thomas (1999)
Added: Python Crash Course by Eric Matthes (2015)

Books on shelf: 3
Bookshelf 'Programming' (3 books):
  - Clean Code by Robert Martin (2008)
  - The Pragmatic Programmer by David Thomas (1999)
  - Python Crash Course by Eric Matthes (2015)
```

## Step 8: Add `__add__` to merge shelves

```python
class Bookshelf:
    def __init__(self, name):
        self.name = name
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def __len__(self):
        return len(self.books)

    def __add__(self, other):
        merged = Bookshelf(f"{self.name} + {other.name}")
        merged.books = self.books + other.books
        return merged

    def __str__(self):
        header = f"Bookshelf '{self.name}' ({len(self)} books):"
        lines = [f"  - {book}" for book in self.books]
        return "\n".join([header] + lines)
```

## Step 9: Merge two shelves

```python
fiction = Bookshelf("Fiction")
fiction.add_book(Book("1984", "George Orwell", 1949))
fiction.add_book(Book("Dune", "Frank Herbert", 1965))

programming = Bookshelf("Programming")
programming.add_book(Book("Clean Code", "Robert Martin", 2008))

combined = fiction + programming
print(combined)
```

### Output:
```
Bookshelf 'Fiction + Programming' (3 books):
  - 1984 by George Orwell (1949)
  - Dune by Frank Herbert (1965)
  - Clean Code by Robert Martin (2008)
```

---

## Step 10: isinstance check

```python
items = [
    Book("Clean Code", "Robert Martin", 2008),
    Bookshelf("Empty"),
    "just a string",
    42,
]

for item in items:
    if isinstance(item, Book):
        print(f"Found a book: {item}")
    elif isinstance(item, Bookshelf):
        print(f"Found a shelf: {item.name}")
    else:
        print(f"Unknown: {item}")
```

### Output:
```
Found a book: Clean Code by Robert Martin (2008)
Found a shelf: Empty
Unknown: just a string
Unknown: 42
```

---

## Discussion Points
- Why is the OOP version better than parallel lists? (Encapsulation, single source of truth)
- What does `self` refer to in `add_book`? (The specific Bookshelf instance)
- Can we add a Book to a Bookshelf with `+`? (No — `__add__` merges two Bookshelves. Discuss type checking)
- What happens if we `print([book1, book2])`? (Uses `__repr__`, not `__str__`)
