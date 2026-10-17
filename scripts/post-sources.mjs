// These suffixes stop publication without removing the archived post source.
// Eleventy only renders .md files; verifier and historical importer share the aliases.
const unpublishedSuffixes = [".disabled", ".unpublished"];

export function postSourceVariants(source) {
  return [source, ...unpublishedSuffixes.map(suffix => `${source}${suffix}`)];
}
