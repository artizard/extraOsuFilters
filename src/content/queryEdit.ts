import { sendNewQuery } from "./content";

// Returns the query parameters as a string array
function getQueryArr(): string[] {
  let query;
  const searchBar = document.querySelector(
    "input.beatmapsets-search__input",
  ) as HTMLInputElement;

  if (searchBar) {
    query = searchBar.value;
    // backup since i was having some issues earlier finding the search bar from this file
  } else {
    console.log("FALLBACK");
    const url = new URL(window.location.href);
    query = url.searchParams.get("q") ?? "";
  }
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

type RangeResult = { rangeType: "range"; value: { min: string; max: string } };
type OsuOperator = "=" | "<" | "<=" | ">" | ">=";
type SingleResult = { rangeType: OsuOperator; value: string };
interface ParsedParam {
  filter: string;
  operator: string;
  value: string;
}
function parseQueryParam(param: string): ParsedParam | null {
  const parts = param.split(/([<>]=?|=)/);
  if (parts.length < 3) return null;
  return { filter: parts[0], operator: parts[1], value: parts[2] };
}

export function getFilterParam(
  filter: string,
  canBeRange: boolean,
): RangeResult | SingleResult | undefined {
  const query = getQueryArr();
  const rawParams = query.filter((element) => element.startsWith(filter));

  // parse each parameter
  const parsedParams = rawParams
    .map(parseQueryParam)
    .filter((elem) => elem !== null);

  // no valid filters of type filter
  if (parsedParams.length === 0) {
    return undefined;
  }

  // single parameter mode
  if (!canBeRange) {
    if (parsedParams.length > 1) {
      console.error("Extra duplicate filters, ERROR");
      return undefined;
    } else {
      return {
        rangeType: parsedParams[0].operator as OsuOperator,
        value: parsedParams[0].value,
      };
    }
  }
  if (parsedParams.length > 2) {
    console.error("More than two duplicate filters, ERROR");
    return undefined;
  }

  // range parameter mode

  // one param
  if (parsedParams.length === 1) {
    return {
      rangeType: parsedParams[0].operator as OsuOperator,
      value: parsedParams[0].value,
    };
  }

  // range param
  const param1 = parsedParams[0];
  const param2 = parsedParams[1];

  if (param1.operator === ">" && param2.operator === "<") {
    return {
      rangeType: "range",
      value: { min: param1.value, max: param2.value },
    };
  } else if (param1.operator === "<" && param2.operator === ">") {
    return {
      rangeType: "range",
      value: { min: param2.value, max: param1.value },
    };
  } else {
    console.error("Invalid range, something went wrong with the filters");
    return undefined;
  }
}
