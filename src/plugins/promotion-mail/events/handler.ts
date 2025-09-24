import { EmailEventListener } from "@vendure/email-plugin";
import { RegisteringAccountEvent, SendPromotionEmailEvent } from "./custom-event";
import { AccountRegistrationEvent, LanguageCode } from "@vendure/core";

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

export const accountRegestrationEvent = new EmailEventListener('account-regestration')
  .on(RegisteringAccountEvent)
  .setFrom('abc@gmail.com')
  .setLanguageCode(event => event.languageCode as LanguageCode)

  .setRecipient(event => event.email)
  .setSubject(` {{ subject }}`)
  .setTemplateVars(event => ({
    name: event.name,
    subject: event.subject,
    LanguageCode: event.languageCode

  }));
