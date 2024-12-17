const editor = document.querySelector('#editor');
const boldBtn = document.querySelector('#boldBtn');
const italicBtn = document.querySelector('#italicBtn');
const clearBtn = document.querySelector('#clearBtn');

document.addEventListener('DOMContentLoaded', () => {
  const savedContent = localStorage.getItem('editorContent');
  if (savedContent) {
    editor.innerHTML = savedContent;
  }
});

editor.addEventListener('input', () => {
  localStorage.setItem('editorContent', editor.innerHTML);
});

const formatText = (format) => {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement('span');
  span.style[format === 'bold' ? 'fontWeight' : 'fontStyle'] = format === 'bold' ? 'bold' : 'italic';

  range.surroundContents(span);
  editor.focus();
};

boldBtn.addEventListener('click', () => {
  formatText('bold');
  boldBtn.classList.toggle('active');
});

italicBtn.addEventListener('click', () => {
  formatText('italic');
  italicBtn.classList.toggle('active');
});

clearBtn.addEventListener('click', () => {
  editor.innerHTML = '';
  localStorage.removeItem('editorContent');
  boldBtn.classList.remove('active');
  italicBtn.classList.remove('active');
  editor.focus();
}); 