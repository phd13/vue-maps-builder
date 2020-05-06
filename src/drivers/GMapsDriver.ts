import { IMapDriver, IGeoPoint } from '../interfaces.d';

declare const google: any;

export default class GMapsDriver implements IMapDriver {
  private element!: Element;

  private map!: Record<string, any>;

  private collection: [] = [];

  private bounds: any;

  public create(element: HTMLElement,center: IGeoPoint): void {
    this.element = element;

    // Ставим скрипт для использования карты
    const gMapsScript = document.createElement('script');
    gMapsScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBTKfXV6gO49IDRHLiGulLXFjPtsMeamDo');
    gMapsScript.setAttribute('type', 'text/javascript');
    document.head.appendChild(gMapsScript);

    // Инициализируем карту и ставим точки
    gMapsScript.addEventListener('load', () => {
      this.gMapsInit(center);
    });
  }

  public destroy(): void {
    this.element.innerHTML = '';
  }

  public addPoint({ lattitude, longitude }: IGeoPoint): void {
    const marker = new google.maps.Marker({ position: { lat: lattitude, lng: longitude } });

    this.collection.push(marker);
    marker.setMap(this.map);
    this.bounds.extend({ lat: lattitude, lng: longitude });
    this.map.fitBounds(this.bounds);
  }

  public removePoints(): void {
    this.collection.forEach(marker => marker.setMap(null));
    this.collection = [];    
  }

  private gMapsInit({ lattitude, longitude }: IGeoPoint) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: lattitude, lng: longitude },
      zoom: 10,
      maxZoom: 10,
    });
    this.bounds = new google.maps.LatLngBounds();
  }
}
