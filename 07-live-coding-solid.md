# Live Coding: Smart Home System

## Goal
Build a smart home system demonstrating all **5 SOLID principles** — showing violations first, then refactoring to clean design.

---

## Part A: SRP — Single Responsibility Principle

## Step 1: A class that does too much (violation)

```python
class SmartDevice:
    def __init__(self, name):
        self.name = name
        self.is_on = False
        self.logs = []

    def turn_on(self):
        self.is_on = True
        self.logs.append(f"{self.name} turned on")
        print(f"[LOG] {self.name} turned on")
        print(f"[EMAIL] Notification: {self.name} is now on")

    def turn_off(self):
        self.is_on = False
        self.logs.append(f"{self.name} turned off")
        print(f"[LOG] {self.name} turned off")
        print(f"[EMAIL] Notification: {self.name} is now off")

    def get_logs(self):
        return self.logs
```

```python
light = SmartDevice("Living Room Light")
light.turn_on()
light.turn_off()
print(light.get_logs())
```

### Output:
```
[LOG] Living Room Light turned on
[EMAIL] Notification: Living Room Light is now on
[LOG] Living Room Light turned off
[EMAIL] Notification: Living Room Light is now off
['Living Room Light turned on', 'Living Room Light turned off']
```

> **Discussion:** How many reasons does this class have to change?
> Device logic, logging format, AND notification method — that's three.

## Step 2: Refactor — one class, one job

```python
class DeviceLogger:
    def __init__(self):
        self.logs = []

    def log(self, message):
        self.logs.append(message)
        print(f"[LOG] {message}")

    def get_logs(self):
        return self.logs


class NotificationService:
    def notify(self, message):
        print(f"[EMAIL] Notification: {message}")


class SmartDevice:
    def __init__(self, name, logger, notifier):
        self.name = name
        self.is_on = False
        self.logger = logger
        self.notifier = notifier

    def turn_on(self):
        self.is_on = True
        self.logger.log(f"{self.name} turned on")
        self.notifier.notify(f"{self.name} is now on")

    def turn_off(self):
        self.is_on = False
        self.logger.log(f"{self.name} turned off")
        self.notifier.notify(f"{self.name} is now off")
```

```python
logger = DeviceLogger()
notifier = NotificationService()

light = SmartDevice("Living Room Light", logger, notifier)
light.turn_on()
light.turn_off()
print(logger.get_logs())
```

### Output:
```
[LOG] Living Room Light turned on
[EMAIL] Notification: Living Room Light is now on
[LOG] Living Room Light turned off
[EMAIL] Notification: Living Room Light is now off
['Living Room Light turned on', 'Living Room Light turned off']
```

> **Key point:** Same output, but now each class has exactly one reason to change.
> Want to switch to SMS notifications? Only `NotificationService` changes. Want to log to a file? Only `DeviceLogger` changes.

---

## Part B: OCP — Open-Closed Principle

## Step 3: Adding device types means editing the controller (violation)

```python
class DeviceController:
    def operate(self, device_type, action):
        if device_type == "light":
            if action == "on":
                print("Light turned on")
            elif action == "off":
                print("Light turned off")
        elif device_type == "thermostat":
            if action == "on":
                print("Thermostat set to 22°C")
            elif action == "off":
                print("Thermostat turned off")
        elif device_type == "camera":
            if action == "on":
                print("Camera recording started")
            elif action == "off":
                print("Camera recording stopped")
```

```python
controller = DeviceController()
controller.operate("light", "on")
controller.operate("thermostat", "on")
controller.operate("camera", "off")
```

### Output:
```
Light turned on
Thermostat set to 22°C
Camera recording stopped
```

> **Discussion:** What happens when we add a smart lock? A smart speaker?
> We have to modify `DeviceController.operate` every single time. That's fragile.

## Step 4: Refactor — open for extension, closed for modification

```python
from abc import ABC, abstractmethod


class Device(ABC):
    @abstractmethod
    def turn_on(self):
        pass

    @abstractmethod
    def turn_off(self):
        pass


class LightDevice(Device):
    def turn_on(self):
        print("Light turned on")

    def turn_off(self):
        print("Light turned off")


class ThermostatDevice(Device):
    def turn_on(self):
        print("Thermostat set to 22°C")

    def turn_off(self):
        print("Thermostat turned off")


class SecurityCamera(Device):
    def turn_on(self):
        print("Camera recording started")

    def turn_off(self):
        print("Camera recording stopped")


class DeviceController:
    def operate(self, device, action):
        if action == "on":
            device.turn_on()
        elif action == "off":
            device.turn_off()
```

```python
controller = DeviceController()
controller.operate(LightDevice(), "on")
controller.operate(ThermostatDevice(), "on")
controller.operate(SecurityCamera(), "off")
```

### Output:
```
Light turned on
Thermostat set to 22°C
Camera recording stopped
```

> **Key point:** Adding a `SmartLock` device? Just create a new class.
> `DeviceController` never needs to change — it's closed for modification, open for extension.

---

## Part C: LSP — Liskov Substitution Principle

## Step 5: A subclass that breaks the parent's contract (violation)

```python
class SmartDevice:
    def __init__(self, name):
        self.name = name

    def turn_on(self):
        print(f"{self.name} turned on")

    def set_temperature(self, temp):
        print(f"{self.name} set to {temp}°C")


class SmartPlug(SmartDevice):
    def set_temperature(self, temp):
        raise NotImplementedError("SmartPlug doesn't support temperature")
```

```python
devices = [SmartDevice("Thermostat"), SmartPlug("Coffee Maker Plug")]

for device in devices:
    device.turn_on()
    device.set_temperature(22)
```

### Output:
```
Thermostat turned on
Thermostat set to 22°C
Coffee Maker Plug turned on
NotImplementedError: SmartPlug doesn't support temperature
```

> **Discussion:** Can we safely replace `SmartDevice` with `SmartPlug` everywhere?
> No — code that works with `SmartDevice` will crash on `SmartPlug`. That's an LSP violation.

## Step 6: Fix — proper hierarchy where subtypes are truly substitutable

```python
from abc import ABC, abstractmethod


class Controllable(ABC):
    @abstractmethod
    def turn_on(self):
        pass

    @abstractmethod
    def turn_off(self):
        pass


class TemperatureControllable(Controllable):
    @abstractmethod
    def set_temperature(self, temp):
        pass


class SmartPlug(Controllable):
    def __init__(self, name):
        self.name = name

    def turn_on(self):
        print(f"{self.name} turned on")

    def turn_off(self):
        print(f"{self.name} turned off")


class SmartThermostat(TemperatureControllable):
    def __init__(self, name):
        self.name = name

    def turn_on(self):
        print(f"{self.name} turned on")

    def turn_off(self):
        print(f"{self.name} turned off")

    def set_temperature(self, temp):
        print(f"{self.name} set to {temp}°C")
```

```python
all_devices = [SmartPlug("Coffee Maker"), SmartThermostat("Living Room")]
for device in all_devices:
    device.turn_on()

print()

temp_devices = [SmartThermostat("Living Room"), SmartThermostat("Bedroom")]
for device in temp_devices:
    device.set_temperature(21)
```

### Output:
```
Coffee Maker turned on
Living Room turned on

Living Room set to 21°C
Bedroom set to 21°C
```

> **Key point:** Now every object can be used wherever its type is expected.
> `SmartPlug` doesn't promise temperature control, so no one will call it.

---

## Part D: ISP — Interface Segregation Principle

## Step 7: One fat interface forces devices to implement things they can't do (violation)

```python
from abc import ABC, abstractmethod


class SmartHomeInterface(ABC):
    @abstractmethod
    def turn_on(self):
        pass

    @abstractmethod
    def turn_off(self):
        pass

    @abstractmethod
    def set_brightness(self, level):
        pass

    @abstractmethod
    def set_temperature(self, temp):
        pass


class SmartLight(SmartHomeInterface):
    def turn_on(self):
        print("Light on")

    def turn_off(self):
        print("Light off")

    def set_brightness(self, level):
        print(f"Brightness: {level}%")

    def set_temperature(self, temp):
        raise NotImplementedError("Lights don't have temperature")


class SmartHeater(SmartHomeInterface):
    def turn_on(self):
        print("Heater on")

    def turn_off(self):
        print("Heater off")

    def set_brightness(self, level):
        raise NotImplementedError("Heaters don't have brightness")

    def set_temperature(self, temp):
        print(f"Temperature: {temp}°C")
```

> **Discussion:** Both classes are forced to implement methods that make no sense for them.
> `NotImplementedError` is a code smell — the interface is too wide.

## Step 8: Refactor — small, focused interfaces

```python
from abc import ABC, abstractmethod


class Switchable(ABC):
    @abstractmethod
    def turn_on(self):
        pass

    @abstractmethod
    def turn_off(self):
        pass


class Dimmable(ABC):
    @abstractmethod
    def set_brightness(self, level):
        pass


class TemperatureSettable(ABC):
    @abstractmethod
    def set_temperature(self, temp):
        pass


class SmartLight(Switchable, Dimmable):
    def turn_on(self):
        print("Light on")

    def turn_off(self):
        print("Light off")

    def set_brightness(self, level):
        print(f"Brightness: {level}%")


class SmartHeater(Switchable, TemperatureSettable):
    def turn_on(self):
        print("Heater on")

    def turn_off(self):
        print("Heater off")

    def set_temperature(self, temp):
        print(f"Temperature: {temp}°C")
```

```python
light = SmartLight()
light.turn_on()
light.set_brightness(75)

print()

heater = SmartHeater()
heater.turn_on()
heater.set_temperature(24)
```

### Output:
```
Light on
Brightness: 75%

Heater on
Temperature: 24°C
```

> **Key point:** No class is forced to implement methods it doesn't need.
> Each interface is small and cohesive — clients depend only on what they actually use.

---

## Part E: DIP — Dependency Inversion Principle

## Step 9: High-level module depends on a concrete low-level class (violation)

```python
class MySQLDatabase:
    def save(self, data):
        print(f"Saving to MySQL: {data}")

    def load(self):
        return "data from MySQL"


class HomeAutomation:
    def __init__(self):
        self.storage = MySQLDatabase()

    def record_event(self, event):
        self.storage.save(event)

    def get_history(self):
        return self.storage.load()
```

```python
system = HomeAutomation()
system.record_event("Light turned on at 08:00")
print(system.get_history())
```

### Output:
```
Saving to MySQL: Light turned on at 08:00
data from MySQL
```

> **Discussion:** What if we want to switch to PostgreSQL? Or use a file for testing?
> We'd have to modify `HomeAutomation` itself. The high-level logic is locked to a specific database.

## Step 10: Refactor — depend on abstractions, inject via constructor

```python
from abc import ABC, abstractmethod


class Storage(ABC):
    @abstractmethod
    def save(self, data):
        pass

    @abstractmethod
    def load(self):
        pass


class MySQLStorage(Storage):
    def save(self, data):
        print(f"Saving to MySQL: {data}")

    def load(self):
        return "data from MySQL"


class HomeAutomation:
    def __init__(self, storage: Storage):
        self.storage = storage

    def record_event(self, event):
        self.storage.save(event)

    def get_history(self):
        return self.storage.load()
```

```python
db = MySQLStorage()
system = HomeAutomation(db)
system.record_event("Light turned on at 08:00")
print(system.get_history())
```

### Output:
```
Saving to MySQL: Light turned on at 08:00
data from MySQL
```

> **Key point:** `HomeAutomation` now depends on the `Storage` abstraction, not a concrete class.
> The specific storage is injected from outside — the caller decides.

## Step 11: Proving it works — swap storage without touching HomeAutomation

```python
class FileStorage(Storage):
    def __init__(self):
        self.data = []

    def save(self, data):
        self.data.append(data)
        print(f"Saving to file: {data}")

    def load(self):
        return self.data


class InMemoryStorage(Storage):
    def __init__(self):
        self.data = []

    def save(self, data):
        self.data.append(data)

    def load(self):
        return self.data
```

```python
file_system = HomeAutomation(FileStorage())
file_system.record_event("Door locked at 22:00")
print(file_system.get_history())

print()

memory_system = HomeAutomation(InMemoryStorage())
memory_system.record_event("Motion detected at 03:00")
print(memory_system.get_history())
```

### Output:
```
Saving to file: Door locked at 22:00
['Door locked at 22:00']

['Motion detected at 03:00']
```

> **Key point:** Three different storage backends, zero changes to `HomeAutomation`.
> That's the power of depending on abstractions — easy to extend, easy to test.

---

## Comparison

| Principle | Problem | Solution |
|---|---|---|
| **SRP** | One class with multiple reasons to change | Split into focused classes, each with one job |
| **OCP** | Modifying existing code to add new behavior | Extend via new classes, don't touch the old ones |
| **LSP** | Subclass breaks parent's contract | Design hierarchies where subtypes are truly substitutable |
| **ISP** | Fat interface forces useless implementations | Split into small, cohesive interfaces |
| **DIP** | High-level code locked to specific low-level class | Depend on abstractions, inject dependencies |

## Discussion Points
- How do SRP and ISP relate to each other? (SRP is about classes having one reason to change, ISP is about interfaces being small enough that clients aren't forced to depend on methods they don't use — different angles on the same idea of cohesion)
- When is it okay to violate SOLID? (Small scripts, prototypes, throwaway code — SOLID adds complexity that needs to pay for itself)
- How does DIP enable testing? (Inject a mock or in-memory storage instead of a real database — no infrastructure needed for unit tests)
- Which principle do you think has the biggest impact on real codebases? (No single right answer — opens discussion about trade-offs and experience)
- How do OCP and DIP work together? (OCP says extend without modifying; DIP provides the mechanism — abstractions that new implementations can plug into)
