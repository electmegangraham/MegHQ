
alter table audit_events
add column if not exists payload jsonb default '{}'::jsonb;
