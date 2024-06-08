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

export async function selectFile(...patterns) {
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

export async function selectFiles(...patterns) {
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

export async function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        resolve(event.target.result);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
}

export async function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        resolve(event.target.result);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

export function download(content, filename, type = '') {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([content], { type }));
  link.download = filename;
  link.click();

  URL.revokeObjectURL(link.href);
}
