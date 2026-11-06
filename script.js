
"use strict";

const name = prompt("Введите ваше имя:");

if (name !== null && name.trim() !== "") {
    alert(`Здравствуйте, ${name.trim()}! Добро пожаловать на страницу волонтёра.`);
    console.log(`Пользователь: ${name.trim()}`);
} else {
    alert("Здравствуйте! Добро пожаловать на страницу волонтёра.");
    console.log("Имя пользователя не указано.");
}

const hours = [12, 4, 18, 6, 20, 3, 10];

console.log("Часы волонтёрской работы по неделям:", hours);

function findMaximum(arr) {
    if (arr.length === 0) {
        return null;
    }

    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    return max;
}

function filterHighLoad(arr) {
    return arr.filter(hour => hour > 15);
}

function calculateSum(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}

let lowParticipationCount = 0;

for (let i = 0; i < hours.length; i++) {
    if (hours[i] <= 5) {
        lowParticipationCount++;
    }
}

const lowParticipationPercent =
    (lowParticipationCount / hours.length) * 100;

const maximum = findMaximum(hours);
const highLoadWeeks = filterHighLoad(hours);
const totalHours = calculateSum(hours);

console.log("Максимум часов за неделю:", maximum);
console.log("Недели с высокой нагрузкой (> 15 часов):", highLoadWeeks);
console.log("Количество недель с высокой нагрузкой:", highLoadWeeks.length);
console.log("Общее количество часов:", totalHours);

console.log(
    `Недель с малым участием: ${lowParticipationCount}`
);

console.log(
    `Процент недель с малым участием: ${lowParticipationPercent.toFixed(2)}%`
);

alert(
    `Всего отработано ${totalHours} часов, ` +
    `в ${highLoadWeeks.length} неделях нагрузка была высокой.`
);

if (totalHours > 50) {
    console.log("Вы настоящий герой сообщества!");
}



const actionsSection = document.getElementById("actions");

const actionsContainer = document.querySelector(".actions-container");

const initialCards = document.querySelectorAll(".action-card");

const themeButton = document.querySelector("#theme-button");
const addActionButton = document.querySelector("#add-action-button");
const hideActionsButton = document.querySelector("#hide-actions-button");

console.log("Секция акций:", actionsSection);
console.log("Контейнер акций:", actionsContainer);
console.log("Количество карточек:", initialCards.length);

if (!actionsSection || !actionsContainer) {
    console.error("Ошибка: секция акций или контейнер не найдены");
} else {
    console.log("Элементы секции акций успешно найдены.");
}

if (!themeButton || !addActionButton || !hideActionsButton) {
    console.error("Ошибка: одна или несколько кнопок не найдены");
}

const STORAGE_KEY = "volunteerPageState";

let pageState = {
    theme: false,
    hidden: false,
    addedActions: [],
    participated: {},
    removed: []
};

function loadState() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            const parsedData = JSON.parse(savedData);

            pageState = {
                ...pageState,
                ...parsedData
            };
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

function saveState() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(pageState)
        );

        console.log("Данные успешно сохранены.");
    } catch (error) {
        console.error("Ошибка сохранения данных:", error);
    }
}

loadState();

function applyTheme() {
    if (pageState.theme) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }

    themeButton.textContent = pageState.theme
        ? "Включить светлую тему"
        : "Включить тёмную тему";
}

if (themeButton) {
    applyTheme();

    themeButton.addEventListener("click", function () {
        pageState.theme = !pageState.theme;

        applyTheme();
        saveState();

        console.log("Тема изменена.");
    });
}

function createActionCard(action, id) {
    const article = document.createElement("article");

    article.classList.add("action-card");
    article.setAttribute("data-action-id", id);

    const title = document.createElement("h3");
    title.textContent = action.name;

    const dateParagraph = document.createElement("p");
    const dateLabel = document.createElement("strong");

    dateLabel.textContent = "Дата: ";

    const time = document.createElement("time");
    time.setAttribute("datetime", action.date);
    time.textContent = new Date(action.date + "T00:00:00")
        .toLocaleDateString("ru-RU");

    dateParagraph.append(dateLabel, time);

    const description = document.createElement("p");
    description.textContent = action.description;

    const participateButton = document.createElement("button");

    participateButton.type = "button";
    participateButton.classList.add("participate-button");
    participateButton.textContent = pageState.participated[id]
        ? "Вы участвовали ✓"
        : "Участвовал";


    if (pageState.participated[id]) {
        participateButton.classList.add("participated");
    }

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Удалить акцию";

    article.append(
        title,
        dateParagraph,
        description,
        participateButton,
        deleteButton
    );

    return article;
}

const actionDescriptions = {
    "Чистый берег":
        "Экологическая акция по очистке побережья от мусора.",

    "Помощь рядом":
        "Помощь пожилым людям: доставка продуктов и бытовая поддержка.",

    "Книги в сёла":
        "Сбор и передача книг в школьные библиотеки."
};

const correctDates = {
    "Чистый берег": "2026-10-18",
    "Помощь рядом": "2026-10-24",
    "Книги в сёла": "2026-10-31"
};

initialCards.forEach(function (card, index) {
    const id = "initial-" + index;

    card.setAttribute("data-action-id", id);

    const title = card.querySelector("h3");
    const time = card.querySelector("time");

    if (title && time) {
        const titleText = title.textContent.trim();

        if (correctDates[titleText]) {
            time.setAttribute("datetime", correctDates[titleText]);
        }

        const description = document.createElement("p");

        description.textContent =
            actionDescriptions[titleText] || "Описание акции.";

        card.appendChild(description);
    }

    const participateButton = document.createElement("button");

    participateButton.type = "button";
    participateButton.classList.add("participate-button");

    participateButton.textContent = pageState.participated[id]
        ? "Вы участвовали"
        : "Участвовал";

    if (pageState.participated[id]) {
        participateButton.classList.add("participated");
    }

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Удалить акцию";

    card.append(participateButton, deleteButton);
});

if (actionsContainer) {

    pageState.removed.forEach(function (id) {
        const card = actionsContainer.querySelector(
            `[data-action-id="${id}"]`
        );

        if (card) {
            card.remove();
        }
    });

    pageState.addedActions.forEach(function (action) {
        const card = createActionCard(action.data, action.id);

        actionsContainer.appendChild(card);
    });
}

if (addActionButton && actionsContainer) {

    addActionButton.addEventListener("click", function () {

        const name = prompt("Введите название акции:");

        if (name === null || name.trim() === "") {
            alert("Название акции не указано");
            return;
        }

        const date = prompt(
    "Введите дату акции в формате ГГГГ-ММ-ДД:"
);

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        let validDate = false;

        if (date !== null && datePattern.test(date.trim())) {
            const parts = date.trim().split("-").map(Number);

            const year = parts[0];
            const month = parts[1];
            const day = parts[2];

            const checkDate = new Date(year, month - 1, day);

            validDate =
            checkDate.getFullYear() === year &&
            checkDate.getMonth() === month - 1 &&
            checkDate.getDate() === day;
        }

    if (!validDate) {
        alert("Некорректная дата");
        return;
    }

        const description = prompt("Введите описание акции:");

        if (description === null || description.trim() === "") {
            alert("Описание акции не указано");
            return;
        }

        const id = "action-" + Date.now();

        const actionData = {
            name: name.trim(),
            date: date.trim(),
            description: description.trim()
        };

        const action = {
            id: id,
            data: actionData
        };

        const card = createActionCard(actionData, id);

        actionsContainer.appendChild(card);

        pageState.addedActions.push(action);

        saveState();

        alert("Акция успешно добавлена");
    });
}

if (actionsContainer) {

    actionsContainer.addEventListener("click", function (event) {

        const button = event.target;

        const card = button.closest(".action-card");

        if (!card) {
            console.error("Ошибка: карточка акции не найдена.");
            return;
        }

        const id = card.getAttribute("data-action-id");

        if (!id) {
            console.error("Ошибка: у карточки отсутствует ID.");
            return;
        }

        if (button.classList.contains("participate-button")) {

            pageState.participated[id] =
                !pageState.participated[id];

            button.classList.toggle(
                "participated",
                pageState.participated[id]
            );

            button.textContent = pageState.participated[id]
                ? "Вы участвовали"
                : "Участвовал";

            saveState();

            console.log("Изменено состояние участия:", id);
        }

        if (button.classList.contains("delete-button")) {

            const confirmation = confirm(
                "Вы действительно хотите удалить эту акцию?"
            );

            if (confirmation) {

                card.remove();

                pageState.addedActions =
                    pageState.addedActions.filter(function (action) {
                        return action.id !== id;
                    });

                if (id.startsWith("initial-")) {
                    pageState.removed.push(id);
                }

                delete pageState.participated[id];

                saveState();

                console.log("Акция удалена:", id);
            }
        }
    });
}

function applyHiddenState() {

    actionsContainer.classList.toggle(
        "hidden",
        pageState.hidden
    );

    hideActionsButton.textContent = pageState.hidden
        ? "Показать акции"
        : "Скрыть акции";
}

if (hideActionsButton && actionsContainer) {

    applyHiddenState();

    hideActionsButton.addEventListener("click", function () {

        pageState.hidden = !pageState.hidden;

        applyHiddenState();

        saveState();

        console.log("Состояние отображения акций изменено.");
    });
}

console.log("Дополнительные функции DOM успешно загружены.");