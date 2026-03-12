# Live Coding: Bank Account System

## Goal
Build a bank account system demonstrating **encapsulation**, **access control**, **getters/setters**, and **@property** step by step.

---

## Part A: The Problem — No Encapsulation

## Step 1: A naive BankAccount

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
```

## Step 2: Direct access — what could go wrong?

```python
account = BankAccount("Alice", 1000)

account.balance = -500
print(f"{account.owner}: {account.balance}")

account.balance = 999999999
print(f"{account.owner}: {account.balance}")
```

### Output:
```
Alice: -500
Alice: 999999999
```

> **Discussion:** No validation, no protection! Anyone can set any value. This is why we need encapsulation.

---

## Part B: Adding Encapsulation

## Step 3: Protected attributes with methods

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        self._owner = owner
        self._balance = balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit must be positive!")
            return
        self._balance += amount
        print(f"Deposited {amount}. Balance: {self._balance}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal must be positive!")
            return
        if amount > self._balance:
            print(f"Insufficient funds! Balance: {self._balance}")
            return
        self._balance -= amount
        print(f"Withdrew {amount}. Balance: {self._balance}")

    def get_balance(self):
        return self._balance
```

## Step 4: Try it

```python
account = BankAccount("Alice", 1000)

account.deposit(500)
account.withdraw(200)
account.withdraw(5000)
account.deposit(-100)

print(f"Balance: {account.get_balance()}")
```

### Output:
```
Deposited 500. Balance: 1500
Withdrew 200. Balance: 1300
Insufficient funds! Balance: 1300
Deposit must be positive!
Balance: 1300
```

> **Key point:** All modifications go through methods that validate input!

## Step 5: But we can still bypass...

```python
account._balance = -9999
print(f"Balance: {account.get_balance()}")
```

### Output:
```
Balance: -9999
```

> **Discussion:** Single underscore is just a convention — Python trusts developers. Want stronger protection? Use double underscore.

---

## Part C: Private Attributes & Name Mangling

## Step 6: Private with double underscore

```python
class SecureBankAccount:
    def __init__(self, owner, balance=0):
        self.__owner = owner
        self.__balance = balance

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit must be positive!")
            return
        self.__balance += amount
        print(f"Deposited {amount}. Balance: {self.__balance}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal must be positive!")
            return
        if amount > self.__balance:
            print(f"Insufficient funds! Balance: {self.__balance}")
            return
        self.__balance -= amount
        print(f"Withdrew {amount}. Balance: {self.__balance}")

    def get_balance(self):
        return self.__balance

    def get_owner(self):
        return self.__owner
```

## Step 7: Try to access private attributes

```python
account = SecureBankAccount("Bob", 500)

try:
    print(account.__balance)
except AttributeError as e:
    print(f"Error: {e}")

print(f"Via getter: {account.get_balance()}")
print(f"Name mangling: {account._SecureBankAccount__balance}")
```

### Output:
```
Error: 'SecureBankAccount' object has no attribute '__balance'
Via getter: 500
Name mangling: 500
```

> **Discussion:** Name mangling makes it harder, but not impossible. Python philosophy: "We're all consenting adults."

---

## Part D: The Pythonic Way — @property

## Step 8: Using @property

```python
class PythonBankAccount:
    def __init__(self, owner, balance=0):
        self._owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        raise AttributeError("Use deposit() or withdraw()")

    @property
    def owner(self):
        return self._owner

    def deposit(self, amount):
        if amount <= 0:
            print("Deposit must be positive!")
            return
        self._balance += amount
        print(f"Deposited {amount}. Balance: {self._balance}")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal must be positive!")
            return
        if amount > self._balance:
            print(f"Insufficient funds! Balance: {self._balance}")
            return
        self._balance -= amount
        print(f"Withdrew {amount}. Balance: {self._balance}")

    def __str__(self):
        return f"Account({self._owner}, balance={self._balance})"
```

## Step 9: Clean attribute-style access

```python
account = PythonBankAccount("Charlie", 1000)

print(f"Owner: {account.owner}")
print(f"Balance: {account.balance}")

account.deposit(250)
account.withdraw(100)

print(f"Balance: {account.balance}")
```

### Output:
```
Owner: Charlie
Balance: 1000
Deposited 250. Balance: 1250
Withdrew 100. Balance: 1150
Balance: 1150
```

## Step 10: Try to set balance directly

```python
try:
    account.balance = 9999
except AttributeError as e:
    print(f"Blocked: {e}")
```

### Output:
```
Blocked: Use deposit() or withdraw()
```

> **Key point:** `@property` gives us the clean syntax of attribute access with the safety of method validation!

---

## Comparison

| Approach | Access | Protection | Syntax |
|---|---|---|---|
| `self.balance` | Direct | None | `obj.balance = x` |
| `self._balance` | Convention | Weak (single `_`) | `obj.get_balance()` |
| `self.__balance` | Name mangling | Stronger (double `__`) | `obj.get_balance()` |
| `@property` | Controlled | Pythonic | `obj.balance` (looks direct, but isn't!) |

## Discussion Points
- When would you use protected (`_`) vs private (`__`)? (Protected for subclass access, private for truly internal)
- Is `@property` always better than getter/setter methods? (Yes in Python — it's the idiomatic way)
- Why does Python allow `_ClassName__attr` access? ("We're all consenting adults" philosophy)
- How is this different from Java's `private` keyword? (Java enforces at compiler level, Python uses conventions)
