deposit = float(input("Введите сумму вклада: "))
rate = float(input("Введите годовую ставку (%): "))
years = int(input("Введите срок в годах: "))
total = deposit * (1 + rate / 100) ** years
print("Итоговая сумма:", total)