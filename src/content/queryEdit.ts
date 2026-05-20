import { sendNewQuery } from "./content";

// Returns the query parameters as a string array
function getQueryArr(): string[] {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q") ?? "";
  return sanitizeParams(query.split(" "));
}

// adds the given filter
export function addQueryParam(param: string, filterName: string) {
  const query = getQueryArr();
  let editedQuery = query.filter((i) => !i.startsWith(filterName));
  editedQuery.push(`${param}`);
  const newQuery = editedQuery.join(" ");
  sendNewQuery(newQuery);
}

// removes the desired filter
export function removeQueryParam(filterName: string) {
  const query = getQueryArr();
  let editedQuery = query.filter((i) => !i.startsWith(filterName));
  const newQuery = editedQuery.join(" ");
  sendNewQuery(newQuery);
}

// checks if the given filter is set or not
export function isFilterSet(filter: string) {
  const query = getQueryArr();
  console.log(query);
  return query.some((element) => element.startsWith(filter));
}

// some filters have multiple keywords that can be used - star vs stars, created vs submitted, etc.
// we have to convert them all to one standard, otherwise we will not delete the right ones
function sanitizeParams(arr: string[]): string[] {
  return arr.map((element) => {
    if (element.startsWith("dr")) {
      return "hp" + element.slice(2);
    } else if (element.startsWith("star") && element[4] != "s") {
      return "stars" + element.slice(4);
    } else if (element.startsWith("key") && element[4] != "s") {
      return "keys" + element.slice(3);
    } else if (element.startsWith("submitted")) {
      return "created" + element.slice(9);
    } else {
      return element;
    }
  });
}
