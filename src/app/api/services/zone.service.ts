import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { WatchQueryOptions } from '@apollo/client/core/watchQueryOptions';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IZonesResult } from '../models/zone.model';

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

  constructor(private readonly apollo: Apollo,
    private readonly httpClient: HttpClient) { }

  public getAllZones(): Observable<ApolloQueryResult<IZonesResult>> {
    return this.apollo
      .watchQuery<IZonesResult>({
        query: this.allZonesQuery
      } as WatchQueryOptions<any>)
      .valueChanges;
  }

  public getPath(fromZone: string, toZone: string, exclude?: string[]): Observable<any> {
    let params = new HttpParams();
    params = params.append('from', fromZone);
    params = params.append('to', toZone);
    if (exclude) {
      params = params.append('excluded', exclude.join(','));
    }
    return this.httpClient.get(`${this.apiUrl}/way/search`, { params } )
  }
}
