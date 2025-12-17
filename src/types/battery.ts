export interface BatteryStatus {
  level: number; 
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
}

export interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
  battery?: BatteryManager;
}

export interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => void;
  removeEventListener: (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) => void;
}