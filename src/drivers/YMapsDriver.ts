import { IMapDriver, IGeoPoint } from '../interfaces.d';

declare const ymaps: any;

export default class YMapsDriver implements IMapDriver {
  private element!: Element;

  private map!: Record<string, any>;

  private collection: any = [];

  public create(element: HTMLElement, center: IGeoPoint): void {
    this.element = element;

    // Ставим скрипт для использования карты
    const yaMapsScript = document.createElement('script');
    yaMapsScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU');
    yaMapsScript.setAttribute('type', 'text/javascript');
    document.head.appendChild(yaMapsScript);

    // Инициализируем карту и ставим точки
    yaMapsScript.addEventListener('load', () => {
      this.yaMapInit(center);
    });
  }

  public destroy(): void {
    this.map.destroy();
  }

  public addPoint({ lattitude, longitude }: IGeoPoint): void {
    this.collection.add(new ymaps.Placemark([lattitude, longitude]));
    this.map
      .setBounds(this.collection.getBounds(), { checkZoomRange: true })
      .then(() => {
        if (this.map.getZoom() > 10) this.map.setZoom(10);
      });
  }

  public removePoints(): void {
    this.collection.removeAll();
  }

  private yaMapInit({ lattitude, longitude }: IGeoPoint) {
    ymaps.ready(() => {
      this.map = new ymaps.Map(this.element, {
        center: [lattitude, longitude],
        zoom: 10,
        controls: ['fullscreenControl'],
        searchControlProvider: 'yandex#search',
      });
      this.collection = new ymaps.GeoObjectCollection();
      this.map.geoObjects.add(this.collection);
    });
  }
}
