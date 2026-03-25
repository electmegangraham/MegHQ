
create table if not exists idempotency_keys (
  idempotency_key text not null,
  route_key text not null,
  response_code integer not null,
  response_body jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (idempotency_key, route_key)
);
