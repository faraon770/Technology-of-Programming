start_hours = int(input("Введите часы начала: "))
start_minutes = int(input("Введите минуты начала: "))
duration = int(input("Введите продолжительность (минуты): "))
total_minutes = start_hours * 60 + start_minutes + duration
end_hours = total_minutes // 60 % 24
end_minutes = total_minutes % 60
print("Время окончания:", end_hours, ":", end_minutes)555