import { format } from 'date-fns';
import * as Timeago from 'timeago.js';

export const DateFunctions = {
  formatDate(date: string | Date) {
    date = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return 'Today';
    else if (date.toDateString() === yesterday.toDateString())
      return 'Yesterday';
    else
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
  },

  formatNoticationDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
    const today = new Date();

    // Normalize both dates to midnight to ensure accurate day counting
    const dateMidnight = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const todayMidnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Calculate the difference in days
    const diffInMilliseconds = todayMidnight.getTime() - dateMidnight.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    // Handle Today and Yesterday
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';

    // Handle Days (2 to 6 days ago)
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }

    // Handle Weeks (7 to 29 days)
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }

    // Handle Months (30 to 364 days)
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }

    // Handle Years (365+ days)
    const years = Math.floor(diffInDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  },

  formatChatDate(date: string | Date) {
    date = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return this.getTime(date);
    else if (date.toDateString() === yesterday.toDateString())
      return 'Yesterday';
    else
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
  },

  formatDateTime(date: Date | string) {
    return format(new Date(date), 'MMMM d, yyyy hh:mm a');
  },

  formatTime(date: Date | string) {
    return format(new Date(date), 'hh:mm a');
  },

  formatTimeAgo(date: Date | string) {
    date = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    else return Timeago.format(date);
  },

  formatIntlDate(date: Date | string) {
    return format(new Date(date), 'd/MM/yyyy');
  },

  getDuration({ start, end }: { start: Date | string; end: Date | string }) {
    return `${format(new Date(start), 'MMM d')} - ${format(new Date(end), 'MMM dd')}`;
  },

  getTime(date: string | Date) {
    const dateString = new Date(date);
    const time = dateString.toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return time;
  },
};
