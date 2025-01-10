import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getURL() {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0B';

  const sizes: string[] = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
  const size: string = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size.replace(/\.00$/, '')}${sizes[i]}`;
}
