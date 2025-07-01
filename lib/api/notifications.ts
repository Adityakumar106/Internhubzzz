import { supabase } from '../supabase';
import type { Notification, Message } from '../supabase';

export class NotificationsAPI {
  static async createNotification(notificationData: Omit<Notification, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notificationData)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async getNotifications(userId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async markAsRead(notificationId: string) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async sendMessage(messageData: Omit<Message, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert(messageData)
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }

  static async getMessages(userId: string, otherUserId?: string) {
    try {
      let query = supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(full_name, avatar_url),
          recipient:profiles!messages_recipient_id_fkey(full_name, avatar_url)
        `)
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: true });

      if (otherUserId) {
        query = query.or(`sender_id.eq.${otherUserId},recipient_id.eq.${otherUserId}`);
      }

      const { data, error } = await query;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
}