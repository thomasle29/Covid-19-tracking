import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('TrackingLog')
export class TrackingLog {
  @JsonProperty('person-id', String)
  trackingLogID: string = undefined;

  @JsonProperty('person-name', String)
  trackingLogName: string = undefined;

  @JsonProperty('person-phone', String)
  trackingLogPhone: string = undefined;
  
  @JsonProperty('person-address', String)
  trackingLogAddress: string = undefined;

  @JsonProperty('person-year', String)
  trackingLogYear: string = undefined;

  @JsonProperty('person-f-number', Number)
  trackingLogFNumber: number = undefined;

  @JsonProperty('person-before', [String])
  trackingLogBefore: string[] = undefined;
}