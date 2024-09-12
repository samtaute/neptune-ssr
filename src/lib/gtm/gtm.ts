import TagManager, { TagManagerArgs } from 'react-gtm-module';
import { LS_BRIDGE_ANDROID_AID_INTERNAL, LS_BRIDGE_UUID } from './constants';

export class StorageService {
  constructor(private storage: Storage) {}

  public get(key: string): any {
    const item = this.storage.getItem(key);

    if (item === null) {
      return item;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  }

  public set(key: string, value: any): void {
    const item = typeof value === 'string' ? value : JSON.stringify(value);
    this.storage.setItem(key, item);
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

const getLocalStorage = ()=>{
  try {
    return new StorageService(localStorage);
  } catch (e: any) {
    return null;
  }
};

class GTM {
  private tagManagerArgs: TagManagerArgs = {
    gtmId: 'GTM-MVJ2H55',
  };

  init() {
    TagManager.initialize(this.tagManagerArgs);
  }

  emit(eventData: Record<string, any>) {
    (window as any).dataLayer?.push(eventData);
  }

  stop() {
    (window as any).dataLayer = [];
  }
}

const gtm = new GTM();

export default gtm;

export const setDNSMI = (value: boolean) => {
  const ls = getLocalStorage()
  ls?.set('local_mp_dnsmi', value);

  if (value) {
    gtm.stop();
  } else {
    gtm.init();
  }
};

export const getDNSMI = () => {
  const ls = getLocalStorage(); 
  return ls?.get('local_mp_dnsmi');
};


export function getAAID(){
  //todo: do not track
  return localStorage.getItem(LS_BRIDGE_ANDROID_AID_INTERNAL)
}

export function getMpid(){
  return localStorage.getItem(LS_BRIDGE_UUID)
}
