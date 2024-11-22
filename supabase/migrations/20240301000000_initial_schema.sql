-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  medium text,
  bio text,
  profile_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create artworks table
create table public.artworks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price decimal(10,2) not null,
  image_url text not null,
  category text not null,
  artist_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.artworks enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Artworks policies
create policy "Artworks are viewable by everyone"
  on public.artworks for select
  using ( true );

create policy "Authenticated users can create artworks"
  on public.artworks for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update their own artworks"
  on public.artworks for update
  using ( auth.uid() = artist_id );

create policy "Users can delete their own artworks"
  on public.artworks for delete
  using ( auth.uid() = artist_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, medium)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    ''
  );
  return new;
end;
$$;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();