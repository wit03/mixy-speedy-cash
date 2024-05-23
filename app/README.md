SELECT t.sender, t.receiver, c.email, t.amount, t."transactionDate" FROM "Transaction" as t JOIN "Account" as A on t.sender = A."accountId" JOIN "Customer" as C ON A."customerId" = C."customerId" LIMIT 100


# On table account to list customer email from account
SELECT a."accountId", cus.email, cus."customerId", a.balance
FROM "Account" AS a
JOIN "Customer" AS cus ON a."customerId" = cus."customerId";

# Elysia with Bun runtime

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.