client:
	@cd frontend && pnpm run dev

server:
	@cd app && pnpm dev

db-up:
	@docker compose up -d

db-stop:
	@docker compose stop

# Ex. make migrate name=init
db-migrate:
	@cd app && bunx prisma migrate dev --name $(name)

db-generate:
	bunx prisma generate

db-seed:
	@cd app && npx prisma db seed