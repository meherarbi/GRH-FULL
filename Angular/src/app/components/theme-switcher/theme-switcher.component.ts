import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent implements OnInit {
  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.saveTheme();
    this.setTheme();
  }

  setTheme() {
    const hostClass = this.darkMode ? 'dark-theme' : '';
    document.body.classList.remove('dark-theme');
    document.body.classList.add(hostClass);
  }
  saveTheme(): void {
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }
  

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    this.darkMode = savedTheme === 'dark';
    this.setTheme();
  }
}
