import { Injectable } from '@angular/core';
import { createClient, Entry, Asset } from 'contentful';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Contentful {
  private cdaClient = createClient({
    space: environment.space,
    accessToken: environment.accessToken,
  });

  getGalleryItems(query?: object, limit?: number): Observable<Entry<any>[]> {
    return from(
      this.cdaClient
        .getEntries({
          content_type: environment.contentTypeIds.gallery,
          ...(limit && { limit }),
          ...query,
        })
        .then((res) => res.items),
    );
  }

  getGalleryHeroData(query?: object, limit?: number): Observable<Entry<any>[]> {
    return from(
      this.cdaClient
        .getEntries({
          content_type: environment.contentTypeIds.galleryHero,
          ...(limit && { limit }),
          ...query,
        })
        .then((res) => res.items),
    );
  }

  // getProjectDetails(contentType: string): Observable<Entry<any>[]> {
  //   return from(this.cdaClient.getEntries({ content_type: contentType }).then((res) => res.items));
  // }

  // getSingleProject(id: string): Observable<Entry<any>> {
  //   return from(this.cdaClient.getEntry(id));
  // }

  /**
   * Returns the parsed `skills` JSON object from the Resume Details entry
   * whose `type` field equals 'Skills'.
   */
  getImageData(assetId: string): Observable<Asset> {
    return from(this.cdaClient.getAsset(assetId).then((res) => res));
  }
}
