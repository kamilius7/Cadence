document.addEventListener('DOMContentLoaded', () => {
  const toast = document.querySelector('.toast');
  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  document.querySelectorAll('[data-complete]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('[data-habit-card]');
      const status = card.querySelector('.day');
      const isDone = button.classList.toggle('done');
      button.textContent = isDone ? '✓' : '+';
      status.classList.toggle('status-done', isDone);
      status.textContent = isDone ? '✓' : '·';
      showToast(isDone ? 'Nice work — today is in the rhythm.' : 'Marked as open for today.');
    });
  });

  document.querySelectorAll('.day').forEach((day) => {
    day.addEventListener('click', () => showToast(`${day.dataset.day} selected for this habit.`));
  });

  document.querySelectorAll('[data-toast]').forEach((button) => {
    button.addEventListener('click', () => showToast(button.dataset.toast));
  });

  document.querySelectorAll('.filter').forEach((filter) => {
    filter.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
      filter.classList.add('active');
      showToast(`${filter.textContent.trim()} view selected.`);
    });
  });
});
