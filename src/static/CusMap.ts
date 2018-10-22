/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/22 10:37
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/22 10:37
 * @disc:自定义Map
 */
import {EventBus} from '../utils/EventBus';

class CusMap<K,V> extends EventBus{
    private _map:Map<K,V> = new Map<K, V>();
    public clear(){
        this._map.clear();
    };
    public delete(key: K){
        return this._map.delete(key);
    };
    public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void{
        return this._map.forEach(callbackfn,thisArg);
    };
    public get(key: K): V | undefined{
        return this._map.get(key);
    };
    public has(key: K): boolean{
        return this._map.has(key);
    };
    public set(key:K,value:V){
        this._map.set(key,value);
        this.trigger(key.toString());
        return this;
    }
    public keys(){
        return this._map.keys();
    }
    readonly size: number;
}

export {CusMap};