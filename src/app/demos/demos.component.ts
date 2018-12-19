import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../common-app/notification.service';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
export class DemosComponent implements OnInit {
  public nombre = 'Mundo';
  public listado = [
    {id: 1, nombre: 'Toledo'},
    {id: 2, nombre: 'CIUDAD REAL'},
    {id: 3, nombre: 'cuenca'},
    {id: 4, nombre: 'GuadalajarA'},
  ];
  public idProvincia = 2;
  public fontsize = 14;

  public resultado: string = null;
  public visible = true;
  public estetica = { importante: true, error: false, urgente: true };

  constructor(public notify: NotificationService) { }

  ngOnInit() {
  }

  public saluda() {
    this.resultado = `Hola ${this.nombre}`;
  }
  public despide() {
    this.resultado = `Adios ${this.nombre}`;
  }
  public di(algo: string) {
    this.resultado = `Dice ${algo}`;
  }

  public cambia() {
    this.visible = !this.visible;
    this.estetica.error = !this.estetica.error;
    this.estetica.importante = !this.estetica.importante;
  }

  public calcula(a: number, b: number): number {
    return a + b;
  }

  public add(provincia: string): void {
    if (!provincia) {
      this.notify.add('Falta el mansaje de notificación.');
      return;
    }
    const newId = this.listado.length > 0 ?
      this.listado[this.listado.length - 1].id + 1 : 1;
    this.listado.push({ id: newId, nombre: provincia});
    this.idProvincia = newId;
  }

  // tslint:disable:member-ordering
  idiomas = [
    { codigo: 'es', region: 'España' },
    { codigo: 'pt', region: 'Portuges' },
    { codigo: 'en-US', region: 'USA' }
  ];
  idioma = this.idiomas[0].codigo;
  resultados: any[] = [];
  valCalculadora = 666;
  // tslint:enable:member-ordering
  ponResultado(origen: string, valor: any) {
    this.resultados.push({
      pos: this.resultados.length + 1,
      origen: origen,
      valor: valor
    });
  }
}
