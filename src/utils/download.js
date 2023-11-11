export function download(content, filename, type) {
  const file = new Blob([content], { type });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href);
}
