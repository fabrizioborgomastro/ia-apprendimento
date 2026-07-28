create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  lesson_id text not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  cursor integer not null default 0 check (cursor >= 0),
  best_score integer not null default 0 check (best_score between 0 and 100),
  review_question_ids text[] not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;

create policy "Users can read their profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can create their profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Users can update their profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can read their learning progress"
on public.lesson_progress for select
using (auth.uid() = user_id);

create policy "Users can create their learning progress"
on public.lesson_progress for insert
with check (auth.uid() = user_id);

create policy "Users can update their learning progress"
on public.lesson_progress for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

revoke all on public.profiles from anon;
revoke all on public.lesson_progress from anon;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.lesson_progress to authenticated;
