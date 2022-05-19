import { HttpStatusCode } from "@angular/common/http";
import { Inject, Injectable, OnInit } from "@angular/core";
import { EventData } from "../interfaces/EventData";
import { EventBusService } from "../services/even-bus.service";

/**
 * Base class for all components. Contains general properties/methods to
 * be used across the application
 */
@Injectable()
export abstract class BaseComponent implements OnInit {
    @Inject(EventBusService) eventBusService! : EventBusService;
   
    /**
     * Emmits a 'logout' event
     * @param value anything to be passed to the logout event
     */
    protected doLogout(value : any) : void{
        this.eventBusService.emit(new EventData('logout', value));
    }

    protected get isLoading() : boolean {
        return this.isLoading;
    }

    protected set isLoading(loading : boolean){
        this.isLoading = loading;
    }

    protected get errorCount() : number {
        return this.errorCount;
    }

    protected set errorCount(count : number){
        this.errorCount = count;
    }

    /**
     * Logs-out if the status received from an http request is 403
     * @param error the error response gotten
     */
    protected onUnauthorized(error : any) : void {
        if(error.status === HttpStatusCode.Unauthorized){
          this.errorCount++;
        }
    }

    /**
     * Logs-out if the status received from an http request is 403
     * @param error the error response gotten
     */
    protected onForbidden(error : any) : void {
        if(error.status === HttpStatusCode.Forbidden){
          this.doLogout(null);
        }
    }

    /**
     * Handler for errors on http requests. The default implementation only
     * checks for forbidden status responses
     * @param error the error response gotten
     */
    protected onError(error : any) : void {
        console.log(error);
        this.onForbidden(error);
    }

    abstract ngOnInit(): void;
}