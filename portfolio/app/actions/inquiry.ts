'use server';

import { supabase } from '@/lib/supabase';

export async function submitInquiry(formData: {
  full_name: string;
  email: string;
  program: string;
  message: string;
}) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        { 
          full_name: formData.full_name, 
          email: formData.email, 
          program: formData.program, 
          message: formData.message,
          status: 'pending'
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Inquiry submission error:', error);
    return { success: false, error };
  }
}
