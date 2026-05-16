import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface SessionData {
  split_name: string;
  duration: number;
  calories: number;
  form_score: number;
  avg_bpm: number;
  exercises: any[];
}

export function useSessions() {
  const [loading, setLoading] = useState(false);

  async function saveSession(data: SessionData) {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: session, error } = await supabase
      .from('sessions')
      .insert({ user_id: user.id, ...data })
      .select()
      .single();

    setLoading(false);
    if (error) throw error;
    return session;
  }

  async function getSessions() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setLoading(false);
    if (error) throw error;
    return data ?? [];
  }

  async function getProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) return null;
    return data;
  }

  async function updateProfile(updates: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  return { saveSession, getSessions, getProfile, updateProfile, loading };
}