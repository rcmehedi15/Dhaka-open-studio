UPDATE public.site_content
SET
  data = jsonb_set(
    jsonb_set(data, '{stats,0,value}', '"17+"'::jsonb, true),
    '{stats,1,value}',
    '"1000+"'::jsonb,
    true
  ),
  updated_at = now()
WHERE key = 'about';
