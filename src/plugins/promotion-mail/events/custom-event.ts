import { LanguageCode, RequestContext, VendureEvent } from "@vendure/core";

export class SendPromotionEmailEvent extends VendureEvent {
  constructor(
    public ctx: RequestContext,
    public email: string,
    public subject: string,
    public languageCode: LanguageCode,
    public created_at: string,
    public ends_at: string | undefined,
    public coupon_code: string,
    public name: string,
    public body: string,
  ) {
    super();
  }
}

export class RegisteringAccountEvent extends VendureEvent {
  constructor(
    public email: string,
    public ctx: RequestContext,
    public subject: string,
    public name: string,
    public languageCode: LanguageCode,
  ) {
    super();
  }
}
