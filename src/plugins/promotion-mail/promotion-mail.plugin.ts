import { OnApplicationBootstrap } from '@nestjs/common';
import { AccountRegistrationEvent, CustomerService, EventBus, LanguageCode, PluginCommonModule, PromotionEvent, VendurePlugin } from '@vendure/core';
import { RegisteringAccountEvent, SendPromotionEmailEvent } from './events/custom-event';

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: config => {
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
        if (event.type === 'created') {
          const customer = await this.customerService.findAll(event.ctx, {})
          customer.items.map(x => this.eventBus.publish(new SendPromotionEmailEvent(event.ctx, x.emailAddress, 'promotion', LanguageCode.en, event.entity.createdAt.toISOString(), event?.entity?.endsAt?.toISOString(), event.entity.couponCode, event.entity.name, event.entity.description)))
        }

      });

    this.eventBus
      .ofType(AccountRegistrationEvent)
      .subscribe(async (event) => {
        const customer = await this.customerService.findOneByUserId(event.ctx, event.user.id)
        this.eventBus.publish(new RegisteringAccountEvent(event.user.identifier, event.ctx, 'welcome email', `${customer?.firstName} ${customer?.lastName}`, LanguageCode.en))
      })
  }
}
