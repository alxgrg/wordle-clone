if (localStorage.getItem('settings')) {
  const settings = JSON.parse(localStorage.getItem('settings'));
  if (
    settings.darkTheme ||
    (!('settings' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.querySelector('html').classList.add('dark');
  } else {
    document.querySelector('html').classList.remove('dark');
  }
}
