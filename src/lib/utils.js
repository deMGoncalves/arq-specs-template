import { twMerge } from "tailwind-merge";

function collectClasses(value, acc) {
  if (!value) {
    return;
  }

  if (typeof value === "string" || typeof value === "number") {
    acc.push(String(value));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectClasses(item, acc));
    return;
  }

  if (typeof value === "object") {
    Object.entries(value).forEach(([key, shouldInclude]) => {
      if (shouldInclude) {
        acc.push(key);
      }
    });
  }
}

export function cn(...inputs) {
  const classes = [];
  inputs.forEach((input) => collectClasses(input, classes));
  return twMerge(classes.join(" "));
}

export function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function generateId(prefix = "id") {
  const random = Math.random().toString(36).slice(2, 8);
  const time = Date.now().toString(36).slice(-4);
  return `${prefix}-${time}${random}`;
}

export function ensureArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}
