import { Injectable } from '@angular/core';

export abstract class CustomLanguageService {
  abstract french: (text: string) => string;
  abstract japanese: (text: string) => string;
}
