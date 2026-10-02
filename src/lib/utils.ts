import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(min: number, max: number): string {
  if (min === max) return `$${min}`;
  return `$${min} - $${max}`;
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\+\d{3}) (\d{3}) (\d{3}) (\d{3})/, "$1 $2 $3 $4");
}