const input = document.createElement('input');
input.type = 'file';

function accept(patterns) {
  return patterns
    .map((pattern) =>
      // prettier-ignore
      pattern.includes('*')
        ? pattern
        : pattern.startsWith('.')
          ? pattern
          : '.' + pattern,
    )
    .join(',');
}

export async function selectFileDialog(...patterns) {
  return new Promise((resolve) => {
    input.multiple = false;
    input.accept = accept(patterns);
    input.onchange = (event) => {
      const file = event.target.files[0];
      event.target.value = '';
      resolve(file);
    };
    input.click();
  });
}

export async function selectFilesDialog(...patterns) {
  return new Promise((resolve) => {
    input.multiple = true;
    input.accept = accept(patterns);
    input.onchange = (event) => {
      const files = [...event.target.files];
      event.target.value = '';
      resolve(files);
    };
    input.click();
  });
}

export async function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        return resolve(event.target.result);
      } catch (error) {
        return reject(error);
      }
    };
    reader.readAsText(file);
  });
}

export function download(content, filename, type) {
  const file = new Blob([content], { type });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href);
}
