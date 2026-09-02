
import math

# Ввод координат точки A
x1 = float(input("Введите x1: "))
y1 = float(input("Введите y1: "))

# Ввод координат точки B
x2 = float(input("Введите x2: "))
y2 = float(input("Введите y2: "))

# Вычисления
dx = x2 - x1
dy = y2 - y1

distance = math.sqrt(dx * dx + dy * dy)
mid_x = (x1 + x2) / 2
mid_y = (y1 + y2) / 2

# Вывод результатов
print("\nРезультаты:")
print("Расстояние между точками: {:.4f}".format(distance))
print("Координаты середины отрезка AB: ({:.4f}, {:.4f})".format(mid_x, mid_y))