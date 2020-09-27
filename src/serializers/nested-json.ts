import { TSet } from "../core/core-definitions";
import {
  getDebugPath,
  logFatal,
  readJsonFile,
  writeJsonFile,
} from "../util/util";
import { flatten, unflatten } from "../util/flatten";

export function readTFile(path: string, lng: string): TSet {
  const nestedJson = readJsonFile(path);
  const flatJson: Record<string, string> = flatten(nestedJson);
  const tMap = new Map<string, string>();
  Object.keys(flatJson).forEach((key, index) => {
    if (tMap.get(key) !== undefined) {
      logFatal(`Key '${key}' in ${getDebugPath(path)} is duplicated`);
    }
    tMap.set(key, flatJson[key]);
  });
  return {
    translations: tMap,
    lng,
  };
}

export function writeTFile(path: string, tSet: TSet) {
  const flatJson: Record<string, string> = {};
  tSet.translations.forEach((value, key) => {
    flatJson[key] = value;
  });
  const nestedJson = unflatten(flatJson);
  writeJsonFile(path, nestedJson);
}