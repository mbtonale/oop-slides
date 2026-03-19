# Live Coding: Bank Transaction System

## Goal
Build a bank transaction system demonstrating **custom exceptions**, **try/except/else/finally**, and **logging** — all key parts of robust error handling in Python.

---

## Part A: Custom Exceptions

## Step 1: InsufficientFundsError

```python
class InsufficientFundsError(Exception):
    def __init__(self, message, balance):
        super().__init__(message)
        self.balance = balance
```

## Step 2: InvalidAmountError

```python
class InvalidAmountError(Exception):
    def __init__(self, message, amount):
        super().__init__(message)
        self.amount = amount
```

> **Key point:** Custom exceptions inherit from `Exception`.
> Adding attributes like `balance` and `amount` gives the caller useful context when catching errors.

---

## Part B: BankAccount Class

## Step 3: BankAccount with validation in `__init__`

```python
class BankAccount:
    def __init__(self, owner, balance=0):
        if balance < 0:
            raise InvalidAmountError(
                f"Initial balance cannot be negative: {balance}",
                balance
            )
        self.owner = owner
        self.balance = balance

    def __str__(self):
        return f"BankAccount({self.owner}, balance={self.balance:.2f})"
```

```python
account = BankAccount("Alice", 100)
print(account)
```

### Output:
```
BankAccount(Alice, balance=100.00)
```

> **Discussion:** Why raise an exception instead of silently setting balance to 0?
> Silent fixes hide bugs — the caller should know they passed bad data.

## Step 4: deposit method

```python
def deposit(self, amount):
    if amount <= 0:
        raise InvalidAmountError(
            f"Deposit amount must be positive: {amount}",
            amount
        )
    self.balance += amount
    return self.balance
```

## Step 5: withdraw method

```python
def withdraw(self, amount):
    if amount <= 0:
        raise InvalidAmountError(
            f"Withdrawal amount must be positive: {amount}",
            amount
        )
    if amount > self.balance:
        raise InsufficientFundsError(
            f"Cannot withdraw {amount:.2f}, only {self.balance:.2f} available",
            self.balance
        )
    self.balance -= amount
    return self.balance
```

> **Key point:** One method can raise different exceptions for different problems.
> The caller decides how to handle each one.

## Step 6: transfer method

```python
def transfer(self, other_account, amount):
    self.withdraw(amount)
    other_account.deposit(amount)
```

> **Discussion:** We don't need extra validation here — `withdraw` and `deposit` already raise
> the right exceptions. Let them propagate!

---

## Part C: Using try/except/else/finally

## Step 7: Successful operations

```python
alice = BankAccount("Alice", 500)
bob = BankAccount("Bob", 200)

alice.deposit(100)
print(alice)
bob.deposit(50)
print(bob)
```

### Output:
```
BankAccount(Alice, balance=600.00)
BankAccount(Bob, balance=250.00)
```

## Step 8: Catching InsufficientFundsError

```python
try:
    alice.withdraw(9999)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"Current balance: {e.balance:.2f}")
```

### Output:
```
Error: Cannot withdraw 9999.00, only 600.00 available
Current balance: 600.00
```

> **Key point:** The `balance` attribute on the exception gives us extra info
> beyond just the error message — that's the power of custom exceptions.

## Step 9: Catching InvalidAmountError

```python
try:
    alice.deposit(-50)
except InvalidAmountError as e:
    print(f"Error: {e}")
    print(f"Invalid amount was: {e.amount}")
```

### Output:
```
Error: Deposit amount must be positive: -50
Invalid amount was: -50
```

## Step 10: Adding logging

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("bank")


def safe_transfer(source, target, amount):
    try:
        source.transfer(target, amount)
    except InsufficientFundsError as e:
        logger.error(f"Transfer failed: {e}")
        return False
    except InvalidAmountError as e:
        logger.error(f"Bad amount: {e}")
        return False
    else:
        logger.info(f"Transferred {amount:.2f} from {source.owner} to {target.owner}")
        return True
```

```python
safe_transfer(alice, bob, 200)
print(alice)
print(bob)
```

### Output:
```
INFO:bank:Transferred 200.00 from Alice to Bob
BankAccount(Alice, balance=400.00)
BankAccount(Bob, balance=450.00)
```

```python
safe_transfer(alice, bob, 9999)
```

### Output:
```
ERROR:bank:Transfer failed: Cannot withdraw 9999.00, only 400.00 available
```

> **Key point:** `else` runs only when no exception was raised — perfect for success logging.

## Step 11: Full transaction sequence with finally

```python
def process_transactions(account, transactions):
    successful = 0
    failed = 0

    try:
        for action, amount in transactions:
            try:
                if action == "deposit":
                    account.deposit(amount)
                elif action == "withdraw":
                    account.withdraw(amount)
                successful += 1
            except (InsufficientFundsError, InvalidAmountError) as e:
                logger.warning(f"Skipped: {e}")
                failed += 1
    finally:
        logger.info(
            f"Summary for {account.owner}: "
            f"{successful} succeeded, {failed} failed, "
            f"final balance: {account.balance:.2f}"
        )
```

```python
transactions = [
    ("deposit", 100),
    ("withdraw", 50),
    ("withdraw", 9999),
    ("deposit", -20),
    ("deposit", 200),
]

process_transactions(alice, transactions)
print(alice)
```

### Output:
```
WARNING:bank:Skipped: Cannot withdraw 9999.00, only 450.00 available
WARNING:bank:Skipped: Deposit amount must be positive: -20
INFO:bank:Summary for Alice: 3 succeeded, 2 failed, final balance: 650.00
BankAccount(Alice, balance=650.00)
```

> **Key point:** `finally` always runs — even if something unexpected happens.
> It's perfect for cleanup, summaries, and releasing resources.

---

## Comparison

| | Custom Exception | Built-in Exception |
|---|---|---|
| **When to use** | Domain-specific errors | Generic programming errors |
| **Extra data** | Yes — add any attributes | Limited to message string |
| **Catching** | Precise — catch only yours | Risk catching unrelated errors |
| **Readability** | `InsufficientFundsError` | `ValueError("not enough")` |
| **Hierarchy** | Can build exception trees | Already organized by Python |

## Discussion Points
- Why inherit from `Exception` and not `BaseException`? (`BaseException` includes `KeyboardInterrupt` and `SystemExit` — you don't want to accidentally catch those)
- When is a plain `ValueError` good enough? (Simple scripts, internal helpers — when you don't need the caller to distinguish error types)
- Why did `transfer` not need its own try/except? (It lets exceptions from `withdraw` and `deposit` propagate — don't catch what you can't handle)
- What's the difference between `except Exception` and bare `except:`? (Bare `except` catches `SystemExit` and `KeyboardInterrupt` too — almost never what you want)
- Why use `else` instead of putting code at the end of `try`? (Code after the risky call in `try` would be skipped on error — but it would also be "protected" by the except, hiding bugs)
