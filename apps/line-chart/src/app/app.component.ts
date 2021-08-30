import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import { FirebaseService } from '../services';
import { CryptoCurrencyCode, CRYPTO_CURRENCY_CODES_AND_NAMES } from '@bp/shared-models';

@Component({
	selector: 'bp-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	currencyCodes = CRYPTO_CURRENCY_CODES_AND_NAMES;
	//@ts-ignore
	currencyOpts: CryptoCurrencyCode[] = Object.keys(CRYPTO_CURRENCY_CODES_AND_NAMES)
	selectedCurrency: CryptoCurrencyCode = 'BTC';
	
	constructor(public firebaseService: FirebaseService) {
	}

	ngOnInit() {
		this.firebaseService.turnOnRealtimeCryptoCurrencyPrices(this.selectedCurrency)
	}

	select(item: any) {
		this.firebaseService.setCurrency(item)
	}
}
