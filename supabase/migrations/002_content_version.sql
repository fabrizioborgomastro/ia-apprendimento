alter table public.lesson_progress
add column if not exists content_version integer not null default 1
check (content_version >= 1);
