# Migration Workflow

Canonical migration command:

cd C:\MegHQ\backend
npx supabase db push

Rules:
1. All schema changes must be created as files in supabase/migrations/.
2. Do not run ad hoc dashboard SQL unless there is an emergency unblock.
3. After applying a PR zip that includes a migration:
   - run npx supabase db push
   - run npm run check
   - run npm run build
   - run npm run smoke
4. Repo-linked migration flow is canonical.
