import { sendNewQuery } from "../content/content";

// Returns the filters and base search text within the query
// I need to be able to handle and filter through the actual filters while still maintaining
// whatever non-filter text the user has inputted, so I parse that here and return an object
// which gives the base search and an array of filters
function parseQuery() {
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
  // split into tokens (regex to not split on spaces within quotes)
  const tokens = query.match(/(?:[^\s"]+|"[^"]*")+/g) || [];

  const baseSearch: string[] = [];
  const filters: string[] = [];

  const filterPattern = /[^^\s"]+(?:([<>]=?)|=)(?:[^\s"]+|"[^"]*")$/;

  // divide up into baseSearch and filters
  for (const token of tokens) {
    if (filterPattern.test(token)) {
      filters.push(token);
    } else {
      baseSearch.push(token);
    }
  }
  return {
    filters: sanitizeParams(filters),
    baseSearch: baseSearch.join(" "),
  };
}

// adds the given filter
export function addQueryParam(param: string, filterName: string) {
  const { filters, baseSearch } = parseQuery();
  let editedQuery = filters.filter((i) => !isFilterMatch(filterName, i));
  editedQuery.push(`${param}`);
  const newQuery = `${baseSearch} ${editedQuery.join(" ")}`.trim();
  sendNewQuery(newQuery);
}

// it wasn't enough to just do .startsWith() to filter the right filter because there are some overlapping filters
// like "ar" and "artist", plus the user could input non-existent filters that would match with a real one
function isFilterMatch(filter: string, item: string) {
  if (!item.startsWith(filter)) return false;
  return ["=", "<", "<=", ">", ">="].includes(item.charAt(filter.length));
}

// removes the desired filter
export function removeQueryParam(filterName: string) {
  const { filters, baseSearch } = parseQuery();
  let editedQuery = filters.filter((i) => !isFilterMatch(filterName, i));
  const newQuery = `${baseSearch} ${editedQuery.join(" ")}`.trim();
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

type RangeResult = {
  rangeType: "range";
  value: { min: string; max: string };
};
type OsuOperator = "=" | "<" | "<=" | ">" | ">=";
type StringResult = { rangeType: OsuOperator; value: string };
interface ParsedParam {
  filter: string;
  operator: string;
  value: string;
}
function parseQueryParam(param: string): ParsedParam | null {
  const parts = param.split(/([<>]=?|=)/);
  if (parts.length < 3) return null;
  // I had to make sure to join any extra elements, otherwise you would miss part of strings if there were equal signs, etc.
  return {
    filter: parts[0],
    operator: parts[1],
    value: parts.slice(2).join(""),
  };
}

export function getFilterParam(
  filter: string,
  filterType: string,
): RangeResult | StringResult | undefined {
  const query = parseQuery().filters;
  const rawParams = query.filter((element) => isFilterMatch(filter, element));

  // parse each parameter
  const parsedParams = rawParams
    .map(parseQueryParam)
    .filter((elem) => elem !== null);

  // no valid filters of type filter
  if (parsedParams.length === 0) {
    return undefined;
  }

  // strings cannot be range
  if (filterType === "string") {
    if (parsedParams.length > 1) {
      console.error("Extra duplicate filters, ERROR");
      return undefined;
    } else {
      let strippedVal = parsedParams[0].value;
      // strip quotation marks if present
      if (strippedVal.startsWith('"') && strippedVal.endsWith('"')) {
        strippedVal = strippedVal.slice(1, -1);
      }

      return {
        rangeType: parsedParams[0].operator as OsuOperator,
        value: strippedVal,
      };
    }
  }
  if (parsedParams.length > 2) {
    console.warn(
      "This extension can only handle single filters with </>/>=/<=/= or range values.",
    );
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
  let param1 = parsedParams[0];
  let param2 = parsedParams[1];

  // I ran into the issue when developing where I treat a range value as x <= # and y >= #, however the user can
  // go into the search bar and change that to any combination of </<=/>/>=. To handle parsing this without losing
  // the user's data, I turn any </> to a <=/>= and adjust the value accordingly to retain the same meaning. This
  // will lead to weird cases where the user will suddenly have a value like 5.01 when they manually inputted 5.
  // This isn't ideal, but for the sake of simplicity I went with this. I thought about allowing the user to manually
  // pick whether the values in the range were inclusive or not, but I couldn't for the life of me figure out an intuitive
  // way to lay ou the ui for that, so I opted for this simpler approach.

  // sanitize operators
  for (const param of [param1, param2]) {
    if (param.operator === ">") {
      if (filterType === "number") {
        param.value = String(Number(param.value) + 0.01);
      } else if (filterType === "date") {
        param.value = incrementDate(param.value, 1);
      }
      param.operator = ">=";
    } else if (param.operator === "<") {
      if (filterType === "number") {
        param.value = String(Number(param.value) - 0.01);
      } else if (filterType === "date") {
        param.value = incrementDate(param.value, -1);
      }
      param.operator = "<=";
    }
  }

  if (param1.operator === ">=" && param2.operator === "<=") {
    return {
      rangeType: "range",
      value: { min: param1.value, max: param2.value },
    };
  } else if (param1.operator === "<=" && param2.operator === ">=") {
    return {
      rangeType: "range",
      value: { min: param2.value, max: param1.value },
    };
  } else {
    // some illegal combination of operators
    console.warn(
      "This extension can only handle single filters with </>/>=/<=/= or range values.",
    );
    return undefined;
  }
}

// adds incrementBy days to an html date string and returns it as such
function incrementDate(dateString: string, incrementBy: number) {
  // there very well might be a bug with the timezones but I tried to fix it
  const date = new Date(dateString + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() + incrementBy);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}
