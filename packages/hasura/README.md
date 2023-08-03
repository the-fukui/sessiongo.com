# hasura

## Requirements

### pg_dump

```bash
brew install libpq
```

## DB Dump

IP 制限の解除が必要

```bash
pg_dump --data-only 'postgres://[USER]:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres' > database-dump.sql
```

https://ironeko.com/posts/creating-a-local-backup-of-a-supabase-database
