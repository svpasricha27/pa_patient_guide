-- Run this in Supabase SQL Editor (supabase.com > your project > SQL Editor)

-- Table for treatment questionnaire responses
CREATE TABLE IF NOT EXISTS questionnaire_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Raw answers (index values: 0, 1, 2, etc.)
  user_role_answer INTEGER,
  age_answer INTEGER,
  htn_duration_answer INTEGER,
  bp_meds_answer INTEGER,
  potassium_answer INTEGER,
  bp_control_answer INTEGER,
  surgery_preference_answer INTEGER,
  meds_preference_answer INTEGER,
  health_answer INTEGER,
  
  -- Human-readable answer text
  user_role_text TEXT,
  age_text TEXT,
  htn_duration_text TEXT,
  bp_meds_text TEXT,
  potassium_text TEXT,
  bp_control_text TEXT,
  surgery_preference_text TEXT,
  meds_preference_text TEXT,
  health_text TEXT,
  
  -- Computed scores
  surgical_benefit_score INTEGER,
  surgical_fit_score INTEGER,
  preference_score INTEGER,
  total_score INTEGER,
  
  -- Result
  result_category TEXT,
  result_title TEXT,
  
  -- Metadata
  user_agent TEXT
);

-- Enable Row Level Security (required by Supabase)
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (the anon key can insert but not read/update/delete)
CREATE POLICY "Allow anonymous inserts" ON questionnaire_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (you) can read the data
CREATE POLICY "Only authenticated users can read" ON questionnaire_responses
  FOR SELECT
  TO authenticated
  USING (true);
