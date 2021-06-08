import { JsonConverter, JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('PersonLogInfo')
export class PersonLogInfo {
    @JsonProperty('person-id', String)
    personID: string = undefined;

    @JsonProperty('person-name', String)
    personName: string = undefined;

    @JsonProperty('person-phone', String)
    personPhone: string = undefined;

    @JsonProperty('person-address', String)
    personAddress: string = undefined;

    @JsonProperty('person-year', String)
    personYear: string = undefined;
}
