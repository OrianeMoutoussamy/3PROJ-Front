import { Channel } from "./Channel";
import { SubscriptionId } from "./SubscriptionId";

export interface Subscription {
  id: SubscriptionId;
  subscriber: Channel;
  channel: Channel;
}