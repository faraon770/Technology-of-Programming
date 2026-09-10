import json
import os
import logging
from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes,
)

# Включаем логирование для отслеживания ошибок
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)

# --- КОНФИГУРАЦИЯ ---
TOKEN = "8892764692:AAHCzb7V3BqzuNZmbrhy5i2keEpIQnlffSc"  # ✅ ЗАМЕНИТЕ НА ВАШ ТОКЕН
SCHEDULE_FILE = "schedule.json"

DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]

# Расписание с указанием времени, предмета, типа занятия, преподавателя и АУДИТОРИИ
DEFAULT_SCHEDULE = {
    "Понедельник": """
17:25-18:15 — Культурология (практика, Вакансия, 🚪 409-Б)
18:30-19:20 — Психология (практика, Вакансия, 🚪 413-Б)
""",
    "Вторник": """
13:05-13:55 — Философия (лекция, Закирьянов А.К., 🚪 508-б)
14:10-15:00 — Философия (лекция, Закирьянов А.К., 🚪 508-б)
16:20-17:10 — Социология (лекция, Орынбекова Д.С., 🚪 308-Б)
17:25-18:15 — Социология (лекция, Орынбекова Д.С., 🚪 308-Б)
""",
    "Среда": """
8:30-9:20 — Физическая культура (практика, Кожак Л.Е., 🚪 Спортивный зал Б)
9:35-10:25 — Физическая культура (практика, Кожак Л.Е., 🚪 Спортивный зал Б)
10:40-11:30 — Политология (практика, Орынбекова Д.С., 🚪 208-Б)
13:05-13:55 — Базы данных в ИС (лаб., Дуйсенбек Ф., 🚪 207-Б)
14:10-15:00 — Базы данных в ИС (лаб., Дуйсенбек Ф., 🚪 207-Б)
15:15-16:05 — Базы данных в ИС (лекция, Искакова А.Т., 🚪 410-Б)
16:20-17:10 — Основы ИИ (практика, Имансакипова А.Б., 🚪 303-Б)
17:25-18:15 — Основы ИИ (лекция, Имансакипова А.Б., 🚪 406-Б)
""",
    "Четверг": """
15:15-16:05 — Технология программирования (лаб., Рашиддинов Д.Р., 🚪 303-Б)
16:20-17:10 — Технология программирования (лаб., Рашиддинов Д.Р., 🚪 303-Б)
17:25-18:15 — Дискретная математика (лекция, Букенов Г.С., 🚪 313-Б)
20:40-21:30 — Технология программирования (лекция, Павлов С.В., 🌐 Онлайн)
""",
    "Пятница": """
8:30-9:20 — Дискретная математика (лаб., Жолдыбаев Б.Е., 🌐 Онлайн)
9:35-10:25 — Дискретная математика (лаб., Жолдыбаев Б.Е., 🌐 Онлайн)
14:10-15:00 — Философия (практика, Закирьянов А.К., 🚪 218-Б)
15:15-16:05 — Политология (лекция, Орынбекова Д.С., 🚪 308-Б)
16:20-17:10 — Культурология (лекция, Вакансия, 🚪 313-Б)
17:25-18:15 — Психология (лекция, Вакансия, 🚪 308-Б)
""",
    "Суббота": "🎉 Выходной!",
    "Воскресенье": "🎉 Выходной!"
}


# --- РАБОТА С ФАЙЛОМ ---
def load_schedule():
    """Загрузка расписания. Если файла нет, создает его с дефолтными данными."""
    if os.path.exists(SCHEDULE_FILE):
        try:
            with open(SCHEDULE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return DEFAULT_SCHEDULE
    else:
        save_schedule(DEFAULT_SCHEDULE)
        return DEFAULT_SCHEDULE


def save_schedule(schedule):
    with open(SCHEDULE_FILE, "w", encoding="utf-8") as f:
        json.dump(schedule, f, ensure_ascii=False, indent=4)


# --- КЛАВИАТУРА ---
KEYBOARD = [
    ["Понедельник", "Вторник", "Среда"],
    ["Четверг", "Пятница"],
    ["Суббота", "Воскресенье"],
    ["/fullschedule", "/help"]
]
REPLY_KEYBOARD = ReplyKeyboardMarkup(KEYBOARD, resize_keyboard=True)


# --- ОБРАБОТЧИКИ ---
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "👋 Привет! Я бот с твоим расписанием и аудиториями.\n\n"
        "Выбери день недели на клавиатуре или напиши команду:\n"
        "/schedule [день] — расписание на день\n"
        "/fullschedule — полное расписание\n"
        "/update [день] [текст] — изменить расписание",
        reply_markup=REPLY_KEYBOARD
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "📌 *Как пользоваться:* Нажимай на кнопки снизу.\n\n"
        "📝 *Как обновить аудиторию или предмет:*\n"
        "Отправь команду в формате:\n"
        "`/update Понедельник 17:25-18:15 — Математика (🚪 405-Б)`",
        parse_mode="Markdown",
        reply_markup=REPLY_KEYBOARD
    )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработка нажатий на кнопки дней недели"""
    text = update.message.text.strip().capitalize()
    schedule = load_schedule()

    if text in DAYS:
        day_schedule = schedule.get(text, "❌ Расписание пустo.")
        await update.message.reply_text(
            f"📅 *Расписание на {text}:*\n{day_schedule}",
            parse_mode="Markdown"
        )
    else:
        await update.message.reply_text(
            "⚠️ Выберите день недели на клавиатуре снизу.",
            reply_markup=REPLY_KEYBOARD
        )


async def schedule_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    schedule = load_schedule()

    if not context.args:
        await update.message.reply_text("Укажите день недели. Пример: `/schedule Понедельник`", parse_mode="Markdown")
        return

    day = context.args[0].capitalize()
    if day in DAYS:
        day_schedule = schedule.get(day, "❌ Расписание не найдено.")
        await update.message.reply_text(
            f"📅 *Расписание на {day}:*\n{day_schedule}",
            parse_mode="Markdown"
        )
    else:
        await update.message.reply_text(f"❌ День '{day}' не найден.")


async def show_full_schedule(update: Update, context: ContextTypes.DEFAULT_TYPE):
    schedule = load_schedule()
    response = "📜 *Полное расписание со всеми аудиториями:*\n\n"
    for day in DAYS:
        day_schedule = schedule.get(day, "❌ Не загружено")
        response += f"🔹 *{day}:*\n{day_schedule}\n\n"
    await update.message.reply_text(response, parse_mode="Markdown")


async def update_schedule(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if len(context.args) < 2:
        await update.message.reply_text(
            "⚠️ Формат обновления:\n`/update День Новое расписание (с аудиторией)`",
            parse_mode="Markdown"
        )
        return

    day = context.args[0].capitalize()
    if day not in DAYS:
        await update.message.reply_text(f"❌ День '{day}' не найден.")
        return

    new_text = " ".join(context.args[1:])
    schedule = load_schedule()
    schedule[day] = f"\n{new_text}\n"
    save_schedule(schedule)

    await update.message.reply_text(f"✅ Расписание и аудитории для *{day}* обновлены!", parse_mode="Markdown")


def main():
    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("schedule", schedule_command))
    app.add_handler(CommandHandler("fullschedule", show_full_schedule))
    app.add_handler(CommandHandler("update", update_schedule))

    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("🤖 Бот запущен...")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()