create table if not exists checkpoints (
  id uuid primary key default gen_random_uuid(),
  checkpoint_id uuid generated always as (id) stored,
  project_id text not null,
  snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists checkpoints_project_id_created_at_idx
  on checkpoints(project_id, created_at desc);
