import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/observable";
import { Url } from '../../shared/url/api.url';
import 'rxjs/Rx';

@Injectable()
export class MenuService {
    constructor(private _baseService: BaseService) {
    }

    getAllMenu(): Observable<any> {
        let result = this._baseService.getAll(Url.MENU)
            .map(this.extractData)
            .catch(this.handleError);
        return result;
    }

    getEditMenu(id): Observable<any> {
        let result = this._baseService.getById(Url.MENU, id)
            .map(this.extractData)
            .catch(this.handleError);
        return result;
    }

    addMenu(data): Observable<any> {
        let result = this._baseService.create(Url.MENU, data)
                                        .map(this.extractData)
                                        .catch(this.handleError);
        return result;
    }

    removeMenu(id): Observable<any> {
        let result = this._baseService.remove(Url.MENU + '/' + id);
        return result;
    } 

    
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}