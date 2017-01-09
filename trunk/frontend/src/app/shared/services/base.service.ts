import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';
import { BaseUrl } from "../url/base.url";
import 'rxjs/Rx';

@Injectable()
export class BaseService {

    constructor(private http:Http) { }

    getAll(url:string) {
        var headers = new Headers({ 'Content-Type': 'application/json' });

        let options = new RequestOptions({
            method: RequestMethod.Get,
            url: BaseUrl.BASE_URL + url,
            headers: headers,
        });

        return this.execute(options);
    }

   private execute(options:any) {
       return this.http.request(new Request(options))
            .catch(
            error => {
                return Observable.throw(error);

            });
    }

}
