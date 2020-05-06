export interface IMapDriver {
  create(element: HTMLElement, center: IGeoPoint): void;
  destroy(): void;
  addPoint(point: IGeoPoint): void;
  removePoints(): void;
}

export interface IGeoPoint {
  lattitude: number,
  longitude: number,
  name: string,
  id: number,
}