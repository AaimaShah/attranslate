import { CliArgs } from "../../src/core/core-definitions";

export const defaultE2EArgs: CliArgs = {
  srcFile: "test-assets/flat-json/count-en.flat.json",
  srcLng: "en",
  srcFormat: "flat-json",
  targetFile: "default-target.json",
  targetLng: "de",
  targetFormat: "nested-json",
  service: "google-translate",
  serviceConfig: "gcloud/gcloud_service_account.json",
  cacheDir: "test-assets",
  matcher: "none",
  deleteStale: "true",
};

export function buildE2EArgs(args: CliArgs): string {
  const cmdArgs: string[] = [];
  for (const argKey of Object.keys(args)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const argValue: string | undefined = args[argKey];
    if (argValue) {
      cmdArgs.push(`--${argKey}='${argValue}'`);
    }
  }
  return cmdArgs.join(" ");
}
