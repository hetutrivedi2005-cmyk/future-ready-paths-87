-- Add education and career fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS education_level text,
ADD COLUMN IF NOT EXISTS field_of_study text,
ADD COLUMN IF NOT EXISTS current_occupation text,
ADD COLUMN IF NOT EXISTS years_of_experience integer,
ADD COLUMN IF NOT EXISTS target_sector text,
ADD COLUMN IF NOT EXISTS skills text[],
ADD COLUMN IF NOT EXISTS career_goals text;