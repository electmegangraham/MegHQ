create table if not exists memory_entries (
  id uuid primary key default gen_random_uuid(),
  memory_id uuid generated always as (id) stored,
  content text not null,
  summary text,
  tags jsonb not null default '[]'::jsonb,
  source_type text,
  source_trace jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
