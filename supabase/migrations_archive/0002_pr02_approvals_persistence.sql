alter type approval_status add value if not exists 'pending';

alter table approvals
  add column if not exists approval_id uuid default gen_random_uuid(),
  add column if not exists action_type text,
  add column if not exists resource_type text,
  add column if not exists resource_id uuid,
  add column if not exists requested_by text,
  add column if not exists decided_by text;

update approvals
set approval_id = id
where approval_id is null;

update approvals
set action_type = coalesce(action_type, approval_type::text, 'other_protected_action')
where action_type is null;

update approvals
set resource_type = coalesce(resource_type, 'unknown')
where resource_type is null;

update approvals
set requested_by = coalesce(requested_by, requested_by_id::text, 'unknown')
where requested_by is null;

update approvals
set status = 'pending'
where status = 'draft';

alter table approvals
  alter column approval_id set not null,
  alter column action_type set not null,
  alter column resource_type set not null,
  alter column requested_by set not null,
  alter column status set default 'pending';

create unique index if not exists approvals_approval_id_key on approvals(approval_id);
create index if not exists approvals_resource_lookup_idx on approvals(resource_type, resource_id);
