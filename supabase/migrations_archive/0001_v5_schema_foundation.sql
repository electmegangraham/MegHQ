create extension if not exists pgcrypto;

create type task_status as enum ('captured','normalized','routed','accepted','in_progress','blocked','awaiting_review','awaiting_approval','complete','cancelled','archived');
create type task_priority as enum ('P0','P1','P2','P3');
create type task_urgency as enum ('immediate','today','this_week','scheduled','no_fixed_clock');
create type sla_breach_state as enum ('within_sla','warning','breached');
create type initiative_status as enum ('proposed','active','blocked','awaiting_review','awaiting_approval','complete','cancelled','archived');
create type blocker_status as enum ('open','mitigating','resolved','archived');
create type blocker_severity as enum ('low','moderate','high','critical');
create type handoff_status as enum ('proposed','accepted','rejected','cancelled','completed');
create type collaboration_state as enum ('not_needed','proposed','requested','accepted','in_progress','waiting_on_support','blocked','needs_manager_resolution','needs_Megan_resolution','completed','cancelled');
create type approval_type as enum ('publish','message_release','budget_release','strategy_decision','event_go_decision','compliance_signoff','external_distribution','executive_review','other_protected_action');
create type approval_status as enum ('draft','requested','under_review','approved','rejected','expired','cancelled','invalidated','archived');
create type artifact_type as enum ('memo','brief','message','statement','press_guidance','fundraising_asset','event_packet','research_packet','decision_packet','other_work_product');
create type artifact_status as enum ('draft','in_review','approval_pending','approved','published','superseded','archived');
create type artifact_maturity as enum ('rough','working','review_ready','approval_ready','final');
create type desk_item_type as enum ('approval_request','decision_prompt','risk_alert','opportunity_alert','briefing','prep_packet','blocked_work_escalation','strategic_comparison','executive_summary_card');
create type desk_item_status as enum ('active','pinned','dismissed','filed','snoozed','resolved','archived');

create table departments (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table initiatives (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  owner_id uuid,
  lead_department_id uuid references departments(id),
  supporting_department_ids uuid[] not null default '{}',
  status initiative_status not null default 'proposed',
  priority task_priority,
  urgency task_urgency,
  current_phase text,
  due_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  completion_evidence jsonb,
  source_type text,
  source_trace jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  initiative_id uuid not null references initiatives(id),
  owner_id uuid,
  lead_department_id uuid references departments(id),
  supporting_department_ids uuid[] not null default '{}',
  status task_status not null default 'captured',
  priority task_priority not null default 'P2',
  urgency task_urgency,
  queue_class text,
  due_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  blocker_ids uuid[] not null default '{}',
  dependency_task_ids uuid[] not null default '{}',
  linked_object_ids uuid[] not null default '{}',
  approval_ids uuid[] not null default '{}',
  sla_policy jsonb,
  sla_breach_state sla_breach_state not null default 'within_sla',
  source_type text,
  source_trace jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table blockers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status blocker_status not null default 'open',
  severity blocker_severity not null default 'moderate',
  linked_task_id uuid references tasks(id),
  linked_initiative_id uuid references initiatives(id),
  owner_id uuid,
  resolution_plan text,
  source_trace jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table artifacts (
  id uuid primary key default gen_random_uuid(),
  artifact_type artifact_type not null,
  status artifact_status not null default 'draft',
  maturity artifact_maturity not null default 'rough',
  version integer not null default 1,
  owner_id uuid,
  linked_object_ids uuid[] not null default '{}',
  approval_required boolean not null default false,
  approval_state approval_status,
  supersedes_artifact_id uuid references artifacts(id),
  superseded_by_artifact_id uuid references artifacts(id),
  source_trace jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table approvals (
  id uuid primary key default gen_random_uuid(),
  approval_type approval_type not null,
  status approval_status not null default 'draft',
  requested_by_id uuid,
  requested_from_id uuid,
  artifact_id uuid references artifacts(id),
  artifact_version integer,
  linked_object_ids uuid[] not null default '{}',
  rationale text,
  deadline timestamptz,
  decision_record jsonb,
  comments_history jsonb not null default '[]'::jsonb,
  priority_band text,
  source_type text,
  source_trace jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table handoffs (
  id uuid primary key default gen_random_uuid(),
  from_owner_id uuid,
  to_owner_id uuid,
  from_department_id uuid references departments(id),
  to_department_id uuid references departments(id),
  linked_task_id uuid references tasks(id),
  linked_initiative_id uuid references initiatives(id),
  status handoff_status not null default 'proposed',
  collaboration_state collaboration_state not null default 'proposed',
  request_reason text,
  due_at timestamptz,
  source_trace jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table desk_items (
  id uuid primary key default gen_random_uuid(),
  desk_item_type desk_item_type not null,
  status desk_item_status not null default 'active',
  linked_object_ids uuid[] not null default '{}',
  linked_artifact_ids uuid[] not null default '{}',
  linked_approval_ids uuid[] not null default '{}',
  source_trace jsonb,
  priority_band text,
  executive_state_hint text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  dismissed_at timestamptz,
  filed_at timestamptz,
  snoozed_until timestamptz
);
