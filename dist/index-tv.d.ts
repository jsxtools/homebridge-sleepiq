import type { API, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic } from 'homebridge';
declare const _default: (api: API) => void;
export default _default;
export declare class ExampleTelevisionPlugin {
    readonly log: Logger;
    readonly config: PlatformConfig;
    readonly api: API;
    readonly Service: typeof Service;
    readonly Characteristic: typeof Characteristic;
    readonly tvAccessory: PlatformAccessory;
    constructor(log: Logger, config: PlatformConfig, api: API);
}
