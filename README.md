# Competition Platform

Платформа для спортивных игр и соревнований.
Проект позволяет пользователям регистрироваться и входить в аккаунт, просматривать игры и соревнования, подавать заявки на участие, подтверждать оплату, общаться в чатах событий, а организаторам — создавать события и управлять заявками участников.

---

## Возможности проекта

### Для участника
- регистрация и вход в аккаунт
- просмотр списка игр
- просмотр списка соревнований
- подача заявки на игру
- подача заявки на соревнование
- просмотр своих заявок и событий
- подтверждение оплаты
- просмотр и редактирование профиля
- доступ к чатам подтвержденных событий

### Для организатора
- создание игр
- создание соревнований
- просмотр своих событий
- просмотр заявок участников
- подтверждение или отклонение заявок
- подтверждение оплаты участников
- доступ к чатам своих событий

### Дополнительно
- отдельные чаты для каждой игры и соревнования
- Swagger для проверки API
- PostgreSQL как база данных
- unit-тесты для основной бизнес-логики
- JaCoCo coverage report

---

## Используемый стек

### Backend
- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- WebSocket / STOMP
- JUnit 5
- Mockito
- JaCoCo

### Frontend
- React
- TypeScript
- Vite
- CSS

---

## Архитектура проекта

Проект построен по классической многослойной архитектуре:

```text
Frontend (React + TypeScript)
        ↓ HTTP / WebSocket
Controller (Spring Boot)
        ↓
Service
        ↓
Repository
        ↓
PostgreSQL
```

---

## Запуск проекта

### 1. PostgreSQL
Создай базу `competition_db` и пользователя `postgres` / `postgres` (или измени `competition-platform/src/main/resources/application.properties`).

### 2. Backend
```bash
cd competition-platform
./gradlew bootRun
```
API: http://localhost:8080  
Swagger: http://localhost:8080/swagger-ui/index.html

### 3. Frontend
```bash
cd frontedforcompetition
npm install
npm run dev
```
Приложение: http://localhost:5173

### 4. Демо-аккаунты (после первого запуска backend)
При старте подгружается `data.sql` (если пользователей ещё нет):

| Роль | Логин | Почта | Пароль |
|------|-------|-------|--------|
| PARTICIPANT | `demo_participant` | `demo.participant@example.com` | `demo123` |
| ORGANIZER | `demo_organizer` | `demo.organizer@example.com` | `demo123` |

---

## Демо-сценарий на защите (5–7 минут)

1. Вход как `demo_participant` / `demo123`.
2. Список игр → открыть **Demo Football** → подать заявку.
3. Вход как `demo_organizer` → **Мои события** → подтвердить заявку.
4. Снова участник → статус APPROVED → чат события / **Мои чаты**.
5. Участник: «Я оплатил» → организатор подтверждает оплату.
6. Показать Swagger: `POST /user`, `POST /login`, `POST /createGameApplication`.
7. Кратко: `./gradlew test` и JaCoCo report в `competition-platform/build/reports/jacoco/test/html/index.html`.

---

## API: DTO и валидация

Ключевые операции переведены с `Map` на типизированные DTO:
- регистрация и вход (`CreateUserRequest`, `LoginRequest`)
- заявка на игру (`CreateGameApplicationRequest`)
- создание игры (`CreateGameRequest`)

Используется Bean Validation (`@Valid`, `@NotBlank`, `@Email` и др.) и `GlobalExceptionHandler` (ответ **400** с описанием ошибок).

Остальные endpoint'ы по-прежнему принимают `Map` — запланировано к рефакторингу.

---

## Ограничения (MVP)

- Пароль хранится в открытом виде (без хеширования).
- Нет Spring Security / JWT — идентификация через `localStorage` на клиенте.
- Проверка прав на части операций только на frontend.
- `ddl-auto=update` — для production нужны миграции (Flyway/Liquibase).

---

## CI/CD

GitHub Actions: `.github/workflows/ci-cd.yml`  
Сборка backend (тесты + build), lint и build frontend.

---

## Тесты

```bash
cd competition-platform
./gradlew test
./gradlew jacocoTestReport
```

Отчёт покрытия: `competition-platform/build/reports/jacoco/test/html/index.html`