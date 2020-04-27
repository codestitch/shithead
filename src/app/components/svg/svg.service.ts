import {
   Injectable,
   ElementRef,
   SimpleChanges,
   Renderer2
} from '@angular/core';
import { Subject, Observable, EMPTY, combineLatest } from 'rxjs';
import {
   switchMap,
   filter,
   distinctUntilChanged,
   shareReplay,
   map,
   catchError
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IconCategory } from './models/icon-category';
const svgCacheMap: { [name: string]: Observable<string> } = {};

@Injectable()
export class SvgService {
   private el: ElementRef<HTMLElement>;
   changes$: Subject<SimpleChanges> = new Subject<SimpleChanges>();
   private value: string;
   private name: string;
   private size: number = 1.8;
   private type: 'icons' | 'images' = 'icons';
   private category: IconCategory;
   private title: string = '';

   constructor(private http: HttpClient, private renderer: Renderer2) {
      const size$ = this.changes$.pipe(
         filter(_ => !!this.size),
         map(_ => this.size),
         distinctUntilChanged()
      );

      const value$ = this.changes$.pipe(
         filter(_ => !!this.value),
         map(_ => this.value),
         distinctUntilChanged()
      );

      const info$ = this.changes$.pipe(
         filter(_ => !!this.name && !!this.title && !!this.category),
         map(_ => [this.name, this.title, this.category]),
         distinctUntilChanged()
      );

      info$
         .pipe(
            switchMap(([name, title, category]) => {
               return this.getSvg(name, title, category as IconCategory);
            })
         )
         .subscribe(val => {
            this.setSvg(val);
         });

      size$.subscribe(size => {
         this.setSvgSize(size);
      });

      value$
         .pipe(map(x => this.parseSvg(x, this.title), shareReplay(1)))
         .subscribe(size => {
            this.setSvg(size);
         });
   }

   registerSvgElement(el: ElementRef<HTMLElement>) {
      this.el = el;
   }

   setSize(size: number) {
      this.size = size;
      this.changes$.next();
   }

   setValue(value: string, title: string) {
      this.value = value;
      this.title = title || null;
      this.changes$.next();
   }

   setType(type: 'icons' | 'images') {
      this.type = type;
      this.changes$.next();
   }

   setDetail(name: string, title: string, category: IconCategory) {
      this.name = name;
      this.title = title || name;
      this.category = category || 'default';
      this.changes$.next();
   }

   private getSvg(name: string, title: string, category: IconCategory) {
      if (!svgCacheMap[name]) {
         const path =
            this.category !== 'default'
               ? `/assets/${this.type}/${category}/${name}.svg`
               : `/assets/${this.type}/${name}.svg`;

         svgCacheMap[name] = this.http
            .get(path, {
               responseType: 'text'
            })
            .pipe(
               map(x => this.parseSvg(x, title)),
               shareReplay(1),
               catchError(_ => EMPTY)
            );
      }
      return svgCacheMap[name];
   }

   private parseSvg(val: string, title: string) {
      const valStr = val.replace(/height="([^"]*)"/i, '');

      return title
         ? valStr.replace(/<title>([^\<]*)/gi, `<title>${title}`)
         : valStr;
   }

   private setSvg(val: string) {
      if (!this.el) {
         return;
      }
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', val);
      if (!this.size) {
         return;
      }

      this.setSvgSize(this.size);
   }

   private setSvgSize(size: number) {
      if (!this.el) {
         return;
      }
      const svg = this.el.nativeElement.children[0] as SVGElement;
      if (!svg) {
         return;
      }
      svg.setAttribute('width', size + 'rem');
      svg.setAttribute('height', size + 'rem');
   }
}
