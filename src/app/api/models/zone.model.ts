export interface IZonesResult {
  zones: IZone[];
}

export interface IZone {
  name: string;
}

export interface IEdge {
  zone1: string;
  zone2: string;
}

export interface IDependenciesResult {
  edge: IEdge[];
}
