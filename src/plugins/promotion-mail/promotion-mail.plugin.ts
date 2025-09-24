import { OnApplicationBootstrap } from '@nestjs/common';
import { CustomerService, EventBus, LanguageCode, PluginCommonModule, PromotionEvent, VendurePlugin } from '@vendure/core';
import { filter } from 'rxjs/operators';
import { PROMOTION_MAIL_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
import { SendPromotionEmailEvent } from './events/custom-event';

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: config => {
    // Plugin-specific configuration
    // such as custom fields, custom permissions,
    // strategies etc. can be configured here by
    // modifying the `config` object.
    return config;
  },
  compatibility: '^3.0.0',
})
export class MyPlugin implements OnApplicationBootstrap {

  constructor(private eventBus: EventBus, private customerService: CustomerService) { }

  async onApplicationBootstrap() {

    this.eventBus
      .ofType(PromotionEvent)
      .pipe(
    )
      .subscribe(async (event) => {
        console.log("this is event", event.entity);
        const customer = await this.customerService.findAll(event.ctx, {})
        console.log("customer", customer);

        customer.items.map(x => this.eventBus.publish(new SendPromotionEmailEvent(event.ctx, x.emailAddress, 'promotion', LanguageCode.en, event.entity.createdAt.toISOString(), event?.entity?.endsAt?.toISOString(), event.entity.couponCode, event.entity.name, event.entity.description)))

      });
  }
}
