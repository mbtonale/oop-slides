# Live Coding: Shape Calculator

## Goal
Build a shape calculator using abstract classes and polymorphism.

## Step 1: Abstract Base Class

```python
from abc import ABC, abstractmethod


class Shape(ABC):  # Figūra
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

    def describe(self):
        return f"{self.__class__.__name__}: area={self.area():.2f}, perimeter={self.perimeter():.2f}"
```

## Step 2: Circle

```python
import math


class Circle(Shape):  # Apskritimas
    def __init__(self, radius):
        self._radius = radius

    def area(self):
        return math.pi * self._radius ** 2

    def perimeter(self):
        return 2 * math.pi * self._radius
```

## Step 3: Rectangle

```python
class Rectangle(Shape):  # Stačiakampis
    def __init__(self, width, height):
        self._width = width
        self._height = height

    def area(self):
        return self._width * self._height

    def perimeter(self):
        return 2 * (self._width + self._height)
```

## Step 4: Square (inherits from Rectangle)

```python
class Square(Rectangle):  # Kvadratas
    def __init__(self, side):
        super().__init__(side, side)
```

## Step 5: Polymorphism in Action

```python
shapes = [
    Circle(5),
    Rectangle(4, 6),
    Square(3),
]

for shape in shapes:
    print(shape.describe())
```

### Output:
```
Circle: area=78.54, perimeter=31.42
Rectangle: area=24.00, perimeter=20.00
Square: area=9.00, perimeter=12.00
```

## Step 6: Show that abstract class can't be instantiated

```python
shape = Shape()  # TypeError: Can't instantiate abstract class
```

## Discussion Points
- Why is `describe()` in the base class? (shared behavior)
- Why are `area()` and `perimeter()` abstract? (each shape calculates differently)
- Square inherits from Rectangle - is this good design? (discuss Liskov later in SOLID)
- How does `self.__class__.__name__` work? (polymorphism + introspection)
