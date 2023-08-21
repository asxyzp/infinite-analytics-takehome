# Invoice Generation Application (Invogen)

## Context
Invogen is an invoice generation application built as a part of the take-home assignment for Infinite Analytics. It includes the following features:
- Create a new invoice
- Add line items to the invoice, indicating how the user is charged. Every line item will be of one of the three types:
  - **Labor expenses**, which accounts for charges incurred with manual labor.
  - **Work-related expenses**, which accounts for accomodation, meals, etc.
  - **Material expenses**, which accounts for purchase of physical items.
- Add notes to the invoice, which can includes terms of payment or payment instructions
- Send the invoice via email [WIP]
- View invoices with it's status (paid, outstanding & late)

## Setup Instructions
```
yarn install               # Dependency installation
yarn redwood dev           # Starts the development server
yarn rw prisma migrate dev # Creates database migration
```

## Technology Stack
```
PostgreSQL - Database
React.js - Frontend Framework
Material UI (MUI) - Components
GraphQL - Data Query & Manipulation
```
