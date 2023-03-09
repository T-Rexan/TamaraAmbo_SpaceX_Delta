import { format } from 'date-fns';

export default function formatDate(date_local: string) {
  return format(new Date(date_local), 'dd MMMM yyyy');
}
