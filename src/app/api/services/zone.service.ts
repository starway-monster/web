import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { WatchQueryOptions } from '@apollo/client/core/watchQueryOptions';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBestPathsDetails, IDependenciesResult, IZonesResult } from '../models/zone.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private apiUrl = environment.apiUrl;

  private readonly allZonesQuery = gql`
    query MyQuery {
      zones {
        name
      }
    }
  `;

  private readonly dependenciesQuery = gql`
    query MyQuery {
      edge: ibc_clients(distinct_on: [zone, chain_id], where: {ibc_connections: {ibc_channels: {}}}) {
        zone1: zone
        zone2: chain_id
      }
    }
  `;

  constructor(private readonly apollo: Apollo,
    private readonly httpClient: HttpClient) { }

  public getAllZones(): Observable<ApolloQueryResult<IZonesResult>> {
    return this.apollo
      .watchQuery<IZonesResult>({
        query: this.allZonesQuery
      } as WatchQueryOptions<IZonesResult>)
      .valueChanges;
  }

  public getAllDependencies(): Observable<ApolloQueryResult<IDependenciesResult>> {
    return this.apollo
      .watchQuery<IDependenciesResult>({
        query: this.dependenciesQuery
      } as WatchQueryOptions<IDependenciesResult>)
      .valueChanges;
  }

  public getPath(fromZone: string, toZone: string, exclude?: string[]): Observable<IBestPathsDetails> {
    let params = new HttpParams();
    params = params.append('from', fromZone);
    params = params.append('to', toZone);
    if (exclude) {
      params = params.append('exclude', exclude.join(','));
    }
    return this.httpClient.get<IBestPathsDetails>(`${this.apiUrl}/way/search`, { params } )
  }
}
