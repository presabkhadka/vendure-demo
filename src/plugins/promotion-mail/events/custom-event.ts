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
