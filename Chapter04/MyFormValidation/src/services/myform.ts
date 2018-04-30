import { Injectable } from '@angular/core';

@Injectable()
export class MyFormService {
    public name: string = '';
    public phone: number;
    public comment: string = '';
}