import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import moment from 'moment';

import { Price } from '../../models/Price';
import {single} from '../../models/data'
import { FirebaseService } from '../../services';
import { CryptoCurrencyCode } from '@bp/shared-models';

@Component({
    selector: 'price-realtime-chart',
    templateUrl: './price-realtime-chart.component.html',
    styleUrls: ['./price-realtime-chart.component.scss']
})

export class PriceRealtimeChart implements OnInit, OnDestroy {

    single: any[] = [];
    multi: any[] = [];
    
    prices: Price[] = [];
    private unsubscribeAll$: Subject<any> = new Subject<any>();


    results: any[] = [];

    //chart configs
    view: [number, number] = [1200, 800]
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = 'Time';
    showYAxisLabel = true;
    yAxisLabel = 'Price ($)';
    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    
    autoScale = true;

    //@ts-ignore
    updateInterval: NodeJS.Timer;

    constructor(private firebaseService: FirebaseService) {
        Object.assign(this, { single })

        this.multi = [{
        "name": "BTC",
        "value": this.initData()
        }];

    }

    ngOnInit(): void{
        
        this.firebaseService.updatePrice$.pipe(takeUntil(this.unsubscribeAll$))
            .subscribe(res => {
                if (res.timestamp.length < 15) {
                    window.dispatchEvent(new Event('resize'));
                    this.addData(res)
                }
            })
        
        this.firebaseService.currency$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res: any) => {
            this.initialize(res)
        })
    }
    
    initData() {
        const array = [];
          array.push({
            "name": '',
            "value": 0
          });
        return array;
    }
    
    initialize(name: CryptoCurrencyCode) {
        this.multi = [{
            "name": name,
            "series": this.initData()
        }];
    }
    
    addData(price: Price) {
        const data =
        {
          "name": moment(Number(price.timestamp)).format("hh:mm:ss"),
          "value": price.price
          }
          
        this.multi[0].series.push(data);
        this.multi = [...this.multi];
      }
    
      getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

    ngOnDestroy() {
        this.unsubscribeAll$.next();
        this.unsubscribeAll$.complete()
    }

    onSelect(event: any) {

    }
}