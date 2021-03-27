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

export interface IBestPathsDetails {
  pathByFee: IDetailedPathInformation;
  pathByTransfers: IDetailedPathInformation;
}

export interface IDetailedPathInformation {
  fee: number;
  transfers: number;
  graph: IPath[]
}

export interface IPath {
  fromZone: string;
  toZone: string;
  fee: number;
}
