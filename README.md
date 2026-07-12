# 📅 Room Booking App

**Room Booking App** – это одностраничное веб-приложение (SPA) для управления бронированием переговорных комнат.
Приложение предоставляет удобный интерфейс для просмотра доступных переговорных комнат, выбора времени бронирования, создания новых встреч, а также редактирования и удаления существующих бронирований.
Основная цель приложения – предоставить простой и интуитивно понятный инструмент для планирования переговоров с возможностью визуального контроля занятости комнат.

## ✨ Возможности приложения

* Просмотр переговорных комнат в двух режимах:
  * **Недельный календарь** с детализацией по дням и отображением занятости комнат во временных интервалах.
  * **Представление по комнатам** с отображением всех бронирований каждой переговорной комнаты по дням.
* Создание нового бронирования через интерактивный выбор свободного временного промежутка.
* Автоматическое заполнение формы бронирования выбранными датой и комнатой.
* Редактирование и удаление существующих бронирований.
* Отображение информации о занятости переговорных комнат.
* Проверка пересечений бронирований в реальном времени:
  * проверка времени начала и окончания бронирования;
  * вывод пользовательских подсказок;
  * блокировка создания некорректного бронирования.
* Запрет бронирований с переходом через границу суток.
* Адаптивный интерфейс для различных устройств (**responsive design**).

## 🚀 Деплой

[![GitHub Pages](https://img.shields.io/badge/Room_Booking_App-222222?style=for-the-badge&logo=github-pages&logoColor=white)](https://mvavilin.github.io/room-booking-app/)

## ▶️ Запуск приложения

- Клонируйте этот репозиторий:

```
git clone https://github.com/mvavilin/room-booking-app
```

- Перейдите в папку `room-booking-app` и установите все зависимости:

```
npm install
```

- После установки зависимостей, запустите приложение в режиме разработки:

```
npm run dev
```

- После этого вы сможете получить к нему доступ по адресу `localhost:5173`.

## 🛠️ Технологии

| Категория | Технологии |
|-----------|------------|
| **Язык** | [![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) |
| **Фреймворк** | [![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/) [![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/) |
| **Сборщик** | [![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) |
| **Стилизация** | [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/) |
| **Формы и валидация** | [![React Hook Form](https://img.shields.io/badge/React_Hook_Form_7-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/) [![Zod](https://img.shields.io/badge/Zod_4-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/) |
| **Управление состоянием** | [![Zustand](https://img.shields.io/badge/Zustand_5-000000?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/) |
| **Backend / CMS** | [![Strapi](https://img.shields.io/badge/Strapi_5-4945FF?style=for-the-badge&logo=strapi&logoColor=white)](https://strapi.io/) [![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/) |
| **Работа с датами** | [![date-fns](https://img.shields.io/badge/date--fns_4-770C56?style=for-the-badge&logo=date-fns&logoColor=white)](https://date-fns.org/) |
| **Качество кода** | [![ESLint](https://img.shields.io/badge/ESLint_10-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier_3-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/) [![TypeScript ESLint](https://img.shields.io/badge/TS_ESLint-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescript-eslint.io/) [![lint-staged](https://img.shields.io/badge/lint--staged-000000?style=for-the-badge&logo=lint-staged&logoColor=white)](https://github.com/okonet/lint-staged) |

## 🏗️ Архитектура проекта

Проект построен с использованием архитектурного подхода **Feature-Sliced Design (FSD)**.

## 💾 Работа с данными

Работа с данными реализована через отдельный слой `api → services → model`.

Архитектура взаимодействия:
```text
UI
 ↓
Features / Widgets
 ↓
Store
 ↓
Services
 ↓
API Layer (Axios)
 ↓
Strapi Backend
```

## 🏢 Работа с сущностями

Данные переговорных комнат и бронирований разделены на независимые доменные сущности:
```text
entities
├── room
└── booking
```

Каждая сущность содержит:
* `api` – взаимодействие с backend;
* `services` – бизнес-логика работы с данными;
* `model` – состояние приложения через Zustand;
* `types` – TypeScript-модели данных.
---

## 🔄 Strapi интеграция

В качестве backend CMS используется **Strapi**, который предоставляет API для работы с данными.
Текущая архитектура позволяет:
* получать данные комнат и бронирований через API;
* хранить бизнес-логику на frontend;
* заменить источник данных без изменения UI-слоя.

## 👨‍💻 Разработчик

<div align="center">

|        <img src="https://sun9-44.vkuserphoto.ru/s/v1/ig2/g8n1hPh21BLC8wQFHP0rcrRB7U6rOlSIGU41G0Ha_v1E5qfj_UgTitHBGjjJE_nS6szqRPK48M41PGbV1oVBGeYp.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440,2560x2560&from=bu&u=2eh8IEQZgWT31n8XYyDczSF99lf96FE1ADg_ZrLdCZk&cs=2560x0" width="100" height="100" style="border-radius: 50%;">        |
| :-------------------------------------------------------------------------------------------------------------------------------------: |
|                                                           **Mikhail Vavilin**                                                           |
| [![GitHub](https://img.shields.io/badge/-mvavilin-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mvavilin) |

</div>
