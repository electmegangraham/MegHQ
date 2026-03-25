create table if not exists compressed_artifacts (
  id uuid primary key default gen_random_uuid(),
  compressed_id uuid generated always as (id) stored,
  project_id text not null,
  artifact_type text not null check (artifact_type in ('memory_block', 'audit_block', 'checkpoint_block')),
  summary text not null,
  covers jsonb not null default '[]'::jsonb,
  source_trace jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists compressed_artifacts_project_type_created_at_idx
  on compressed_artifacts(project_id, artifact_type, created_at desc);
