import { EmailEventListener } from "@vendure/email-plugin";
import { SendPromotionEmailEvent } from "./custom-event";
import { LanguageCode } from "@vendure/core";

export const promotionEmailListener = new EmailEventListener('promotion-email')
  .on(SendPromotionEmailEvent)
  .setFrom('abc@gmail.com')
  .setLanguageCode(event => event.languageCode as LanguageCode)

  .setRecipient(event => event.email)
  .setSubject(` {{ subject }}`)
  .setTemplateVars(event => ({
    body: event.body,
    created_at: event.createdAt,
    ends_at: event.ends_at,
    cupon_code: event.coupon_code,
    subject: event.subject,
  }));
