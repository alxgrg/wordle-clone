if (localStorage.getItem('settings')) {
  console.log('script!');
  const settings = JSON.parse(localStorage.getItem('settings'));
  console.log('settings!', settings.darkTheme);
  if (
    settings.darkTheme ||
    (!('settings' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.querySelector('html').classList.add('dark');
    console.log('script add!');
  } else {
    document.querySelector('html').classList.remove('dark');
    console.log('script! remove');
  }
}
