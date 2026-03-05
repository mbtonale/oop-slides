# 04 Polymorphism & PEP 8 Presentation Design

## Overview
- File: `04-polymorphism.html`
- Duration: 70-90 minutes
- Target: 1st year university students
- ~55 slides
- Style: match 03-inheritance.html exactly (same CSS, animations, nav, quiz mechanics)

## Section 1: Recap Quiz (~15 min)

| Slide | Type | Content |
|-------|------|---------|
| 1 | Title | "Polymorphism & PEP 8: Course 4" with SVG graphic |
| 2 | Curriculum | Highlight topic 4, show full list |
| 3 | Quiz (01) | "What is the process of creating an object from a class called?" A) Compilation B) Instantiation C) Inheritance D) Encapsulation. Answer: B |
| 4 | Quiz (01) | "What does `self` refer to inside a method?" A) The class itself B) The parent class C) The current instance D) A global variable. Answer: C |
| 5 | Quiz (02) | "Which prefix makes an attribute private in Python?" A) No prefix B) _single C) __double D) #hash. Answer: C |
| 6 | Quiz (02) | "What is the purpose of a getter method?" A) Delete an attribute B) Provide controlled read access C) Make attribute public D) Call parent method. Answer: B |
| 7 | Quiz (03) | "What is the child class also known as?" A) Base class B) Super class C) Derived class D) Abstract class. Answer: C |
| 8 | Quiz (03) | "What happens if __init__ doesn't call super().__init__()?" Code example. A) Works fine B) AttributeError C) SyntaxError D) TypeError. Answer: B |
| 9 | Quiz (03) | MRO question with diamond inheritance. "Which class method is called?" Answer based on MRO left-to-right |
| 10 | Quiz (bridge) | "What's wrong with this code?" - isinstance() chain checking animal types. Leads into "polymorphism solves this" |

## Section 2: Polymorphism (~30 min)

| Slide | Content |
|-------|---------|
| 11 | 4 Pillars of OOP - highlight Polymorphism (transition) |
| 12 | Agenda for today |
| 13 | Understanding polymorphism - definition, "poly" + "morph" etymology |
| 14 | Why polymorphism matters - media player analogy (play() on Spotify, YouTube, VLC) |
| 15 | Polymorphism you already use - len(), + operator, print() on different types |
| 16 | Polymorphism visual - Animal/Dog/Cat class diagram (SVG) |
| 17 | Polymorphism visual - Animal/Dog/Cat code with speak() |
| 18 | Static vs Dynamic polymorphism - compile-time vs runtime explanation |
| 19 | Method overloading vs overriding - concept comparison (side-by-side cards) |
| 20 | Method overloading - Java example (compile-time) |
| 21 | Method overloading in Python - *args approach, Calculator example |
| 22 | Method overriding in Python - Animal.speak() overridden by Dog/Cat |
| 23 | Method overriding rules - 3 rules (signature, access level, super()) |
| 24 | Duck typing - "If it looks like a duck..." quote slide |
| 25 | Duck typing - principle explanation + Duck/Person code example |
| 26 | Polymorphism + Encapsulation - PaymentProcessor example with code |
| 27 | Abstract classes - definition + ABC module + @abstractmethod |
| 28 | Abstract classes - Shape example with area()/perimeter() |
| 29 | Refactoring: before - isinstance() conditional mess |
| 30 | Refactoring: after - clean polymorphic code |
| 31 | Live coding slide - Shape Calculator (reference separate MD) |

## Section 3: PEP 8 (~15 min)

| Slide | Content |
|-------|---------|
| 32 | PEP 8 section divider |
| 33 | What is PEP 8? - definition, conventions, readability + consistency |
| 34 | Why Code Style Matters - readability, maintainability, collaboration, longevity |
| 35 | Indentation & Line Length - 4 spaces, 79 chars |
| 36 | Blank Lines & Imports - rules |
| 37 | Blank Lines & Imports - bad vs good code examples |
| 38 | Naming Conventions - snake_case, CamelCase, UPPER_CASE |
| 39 | Naming Conventions - code example (MAX_SIZE, UserProfile, get_user_name) |
| 40 | Whitespace in expressions - rules (operators, commas) |
| 41 | Whitespace in expressions - bad vs good code examples |
| 42 | Type Hints - intro to annotations, def add(x: int, y: int) -> int |
| 43 | PEP 8 and OOP - class naming, method naming, __special__ |
| 44 | PEP 8 Tools - flake8, pylint, black, IDE integration |

## Section 4: Course Work (~10 min)

| Slide | Content |
|-------|---------|
| 45 | Course Work section divider |
| 46 | Steps overview - 6 steps from coursework PDF |
| 47 | Select topic - categories (management systems, file manager, games, etc.) |
| 48 | Select topic - registration rules, deadline 2026-03-30 (-1 point penalty) |
| 49 | Requirements: Git & GitHub |
| 50 | Requirements: 4 OOP pillars (describe in code + report) |
| 51 | Requirements: 1 design pattern + composition/aggregation |
| 52 | Requirements: File I/O + Testing (unittest) + Code style (PEP8) |
| 53 | Report structure - MD format, 4 parts (intro, body, results, conclusions) |
| 54 | Evaluation system - table with dates, requirements, points (3 total) |
| 55 | Summary / Key Takeaways |

## Key Dates (from coursework PDF)
- Topic selection: 2026-03-30
- Code + report deadline: 2026-04-24
- Oral defense: 2026-04-27 to 2026-05-15
- Total points: 3 (70% code = 2.1p, 30% report = 0.9p)

## Technical Notes
- Copy CSS/JS from 03-inheritance.html exactly
- Same quiz mechanics (step-1 shows answers, step-2 reveals correct + explanation)
- Same nav, progress bar, Visma+VilniusTech logos, mobile warning
- SVG diagrams for inheritance trees, class relationships
- Syntax-highlighted code blocks using span classes (kw, cls, fn, str, num, cm, par, op)
- Animations: fadeIn, inherit-line flow, list item stagger
