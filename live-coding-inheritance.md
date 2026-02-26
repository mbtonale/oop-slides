# Live Coding Session: Employee Management System

## Goal
Build an Employee Management System that demonstrates **all inheritance concepts** from the presentation.

## Step 1: Base Employee Class

```python
class Employee:
    raise_percentage = 1.05

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display_info(self):
        print(f"{self.name} | Salary: ${self.salary:,.2f}")

    def calculate_bonus(self):
        return self.salary * 0.10

    def apply_raise(self):
        self.salary *= self.raise_percentage
```

**Talk about:** base class, `self`, instance vs class attributes (`raise_percentage` vs `name`)

---

## Step 2: Developer (Single Inheritance)

```python
class Developer(Employee):
    raise_percentage = 1.10

    def __init__(self, name, salary, programming_language):
        super().__init__(name, salary)
        self.programming_language = programming_language

    def display_info(self):
        super().display_info()
        print(f"  Language: {self.programming_language}")

    def calculate_bonus(self):
        return self.salary * 0.15
```

**Talk about:** `super().__init__()`, method overriding, class attribute override

### Try it:
```python
dev = Developer("Alice", 95000, "Python")
dev.display_info()
print(f"Bonus: ${dev.calculate_bonus():,.2f}")

dev.apply_raise()
dev.display_info()
```

**Ask audience:** Where does `apply_raise()` come from? (inherited!)
**Ask audience:** Which `raise_percentage` does it use? (Developer's 1.10!)

---

## Step 3: Manager (Single Inheritance)

```python
class Manager(Employee):
    raise_percentage = 1.08

    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)
        self.team_size = team_size

    def display_info(self):
        super().display_info()
        print(f"  Team size: {self.team_size}")

    def calculate_bonus(self):
        base_bonus = self.salary * 0.12
        team_bonus = self.team_size * 500
        return base_bonus + team_bonus
```

### Try it:
```python
mgr = Manager("Bob", 110000, 8)
mgr.display_info()
print(f"Bonus: ${mgr.calculate_bonus():,.2f}")
```

**Ask audience:** How much is the bonus? ($13,200 + $4,000 = $17,200)

---

## Step 4: TechLead (Multiple Inheritance)

```python
class TechLead(Developer, Manager):
    def __init__(self, name, salary, programming_language, team_size):
        Developer.__init__(self, name, salary, programming_language)
        self.team_size = team_size

    def display_info(self):
        Employee.display_info(self)
        print(f"  Language: {self.programming_language}")
        print(f"  Team size: {self.team_size}")

    def calculate_bonus(self):
        dev_bonus = self.salary * 0.15
        team_bonus = self.team_size * 500
        leadership_bonus = 2000
        return dev_bonus + team_bonus + leadership_bonus
```

**Talk about:** multiple inheritance, why we use explicit `Developer.__init__` here, MRO

### Try it:
```python
lead = TechLead("Carol", 130000, "Python", 5)
lead.display_info()
print(f"Bonus: ${lead.calculate_bonus():,.2f}")
```

---

## Step 5: Demonstrate isinstance() and issubclass()

```python
print(isinstance(dev, Developer))    # True
print(isinstance(dev, Employee))     # True
print(isinstance(dev, Manager))      # False

print(isinstance(lead, Developer))   # True
print(isinstance(lead, Manager))     # True
print(isinstance(lead, Employee))    # True

print(issubclass(TechLead, Developer))  # True
print(issubclass(TechLead, Employee))   # True
print(issubclass(Developer, Manager))   # False
```

**Ask audience:** Why is `lead` an instance of `Manager`? (multiple inheritance)

---

## Step 6: Show MRO in Action

```python
print(TechLead.__mro__)
```

Output:
```
(TechLead, Developer, Manager, Employee, object)
```

**Talk about:** C3 linearization, left-to-right order, why Developer comes before Manager

---

## Step 7: Polymorphic Function

```python
def print_annual_report(employees):
    print("=" * 50)
    print("ANNUAL REPORT")
    print("=" * 50)
    for emp in employees:
        emp.display_info()
        bonus = emp.calculate_bonus()
        print(f"  Bonus: ${bonus:,.2f}")
        print()

team = [
    Developer("Alice", 95000, "Python"),
    Developer("Dave", 88000, "JavaScript"),
    Manager("Bob", 110000, 8),
    Manager("Eve", 105000, 5),
    TechLead("Carol", 130000, "Python", 5),
]

print_annual_report(team)
```

**Talk about:** polymorphism — same function call `calculate_bonus()`, different behavior per class

---

## Step 8 (Bonus): Add Abstract Base Class

```python
from abc import ABC, abstractmethod

class Employee(ABC):
    raise_percentage = 1.05

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def display_info(self):
        print(f"{self.name} | Salary: ${self.salary:,.2f}")

    @abstractmethod
    def calculate_bonus(self):
        pass

    def apply_raise(self):
        self.salary *= self.raise_percentage
```

### Try it:
```python
emp = Employee("Test", 50000)  # TypeError!
```

**Talk about:** why abstract classes are useful — forces subclasses to implement `calculate_bonus()`

---

## Concepts Covered

| Concept | Where |
|---------|-------|
| Base class / parent class | Step 1 |
| Single inheritance | Steps 2, 3 |
| `super().__init__()` | Steps 2, 3 |
| Method overriding | Steps 2, 3, 4 |
| Class vs instance attributes | Steps 1, 2 |
| Multiple inheritance | Step 4 |
| `isinstance()` / `issubclass()` | Step 5 |
| MRO | Step 6 |
| Polymorphism | Step 7 |
| Abstract classes (ABC) | Step 8 |
