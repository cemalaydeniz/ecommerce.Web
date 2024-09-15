import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../models/language';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentLanguage: Language = undefined;
  supportedLanguages: Language[] = [
    { code: 'en', displayName: 'English', flagIconPath: '../assets/flags/en.svg' },
    { code: 'de', displayName: 'Deutsch', flagIconPath: '../assets/flags/de.svg' },
    { code: 'tr', displayName: 'Türkçe', flagIconPath: '../assets/flags/tr.svg' },
  ];

  constructor(private translateService: TranslateService) {
    this.initializeLocalization();
  }

  private initializeLocalization(): void {
    let language = localStorage.getItem('lang');
    this.currentLanguage = this.supportedLanguages.find(l => l.code == language);

    if (this.currentLanguage === undefined) {
      language = navigator.language;
      this.currentLanguage = this.supportedLanguages.find(l => l.code == language);

      if (this.currentLanguage === undefined) {
        this.currentLanguage = this.supportedLanguages[0];
      }
    }

    this.translateService.use(this.currentLanguage.code);
  }

  switchLanguage(langCode: string): void {
    const selectedLanguage = this.supportedLanguages.find(l => l.code == langCode);
    if (selectedLanguage === undefined)
      return;

    this.currentLanguage = selectedLanguage;
    this.translateService.use(selectedLanguage.code);
    localStorage.setItem('lang', selectedLanguage.code);
  }
}
