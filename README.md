# Python OOP — Course Slides

Interactive HTML presentations for the **Python Object-Oriented Programming** course at VILNIUS TECH, delivered in partnership with Visma.

## Live

[oop.szturo.online](https://oop.szturo.online)

## Topics

| # | Topic | Status |
|---|-------|--------|
| 01 | Classes & Objects | planned |
| 02 | Encapsulation & Access Control | planned |
| 03 | Inheritance | ready |
| 04 | Polymorphism & PEP 8 | ready |
| 05 | Composition & Aggregation | ready |
| 06 | SOLID Principles | planned |
| 07 | UML & Design Patterns | planned |
| 08 | Design Patterns (2nd part) | planned |
| 09 | Exception Handling & Logging | planned |
| 10 | Testing & TDD | planned |
| 11 | Libraries & Frameworks | planned |
| 12 | Recap & Consultation | planned |

## Structure

```
index.html              # curriculum page with links to presentations
shared.css              # common styles, theme variables, layouts
shared.js               # navigation, theme toggle, quiz mechanics
03-inheritance.html     # lecture 3 slides
04-polymorphism.html    # lecture 4 slides
04-live-coding-shapes.md # exercise guide for lecture 4
05-composition.html     # lecture 5 slides
```

Each presentation is a single HTML file that imports `shared.css` and `shared.js`, with only lecture-specific animations defined inline.

## Features

- Dark / light theme toggle (persisted via localStorage)
- Keyboard navigation (arrows, space, home, end)
- Interactive quiz slides with two-step reveal
- Skip Quiz button during quiz sections
- Mobile detection with redirect to index
- Progress bar and slide counter

## Development

Serve locally with any static file server:

```bash
python3 -m http.server 8788
```

Then open `http://localhost:8788`.

## Deployment

Hosted on [Vercel](https://vercel.com). Deploys automatically on push to `main`, or manually:

```bash
vercel --prod
```
