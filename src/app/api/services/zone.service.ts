import { Injectable } from '@angular/core';
import { gql } from '@apollo/client/core';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { WatchQueryOptions } from '@apollo/client/core/watchQueryOptions';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { IZonesResult } from '../models/zone.model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private readonly allZonesQuery = gql`
    query MyQuery {
      zones {
        name
      }
    }
  `;

  constructor(private readonly apollo: Apollo) { }

  public getAllZones(): Observable<ApolloQueryResult<IZonesResult>> {
    return this.apollo
      .watchQuery<IZonesResult>({
        query: this.allZonesQuery
      } as WatchQueryOptions<any>)
      .valueChanges;
  }
}
