# Децентрализованная платформа обеспечения арендных платежей

Платформа обеспечивает взаимодействие трех видов участников – арендодателей, арендаторов и банков – и позволяет
ликвидировать дебиторскую задолженность арендодателей за счет гарантированного получения арендной платы путем
автоматического кредитования арендаторов. Ежедневное фондирование процентов от выручки арендаторов повышает дисциплину
финансового планирования арендаторов и позволяет уменьшить сроки получения денежных средств арендодателями. За счет
применения технологии распределенных реестров и смарт-контрактов платформа снижает издержки взаимодействия всех
участвующих сторон.

# Сборка проекта

Перед сборкой необходимо установить следующее ПО:

- NodeJS ^14.16.6
- NPM ^7.5.2
- Typescript ^4.0.1

Перед сборкой проекта нужно выполнить команду `npm i`
Сборка проекта осуществляется командой `npm i && npm build`


# Переменные окружения

Для запуска проекта в режиме разработчика нужно указать переменные окружения
- `PROXY_API_URL={YOUR_LOCAL_API}` По умолчанию `https://rent.weintegrator.com`
`


