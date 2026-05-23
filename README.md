# osu! Extra Filters

![Demo Image](.github/images/frontpage.png)

An interactive filter selector to cover all of the hidden osu! filters. osu!'s beatmap search has many filters such as stars>5, artist="", etc. that are normally hidden from the user \([Read about them here](https://osu.ppy.sh/wiki/en/Beatmap_search)\). This extension aims to make those filters easy to use with no pre-existing knowledge required. It does this by expanding the user tags menu into a full-fledged filters menu, containing nearly all of the hidden filters.

## How to run:

1. Clone the repository:
   `git clone https://github.com/artizard/extraOsuFilters`
2. Go into the repository's directory
   `cd extraOsuFilters`
3. Install libaries
   `npm install`
4. Run extension
   ``npm run dev`
5. Load in chrome by going to manage extension, click "Load unpacked", and choosing the dist folder that was created from the previous command.

## Contributing

Contributions are welcome, if you are interested in working on this, pull requests are appreciated. Even if you don't want to actually work on it, feel free to open issues for bug reports or suggestions.

## Limitations

1. There are a few filters I did not include in the extension, but I left them out for a reason:

- featured_artist : It's a very niche filter, and it's hard to use without already knowing these identifiers. I figured it wasn't worth bloating the extension with it. If there's demand I can add it.
- divisor : In my testing I was not able to figure out how to use the filter; it may be defunct. If someone knows how, I could add that in the future.
- status : This is effectively the same as the normal "Categories" filter already on the page, so I figured there was no point in handling this one.

2. This extension only supports singular filters like </<=/>/>=/=, as well as range values. This realistically covers all use cases for these filters, but just know that the filter cannot handle cases where the user gives a query like "stars>5 stars=3 stars<=7". In the case that the user inputs this (manually, you cannot accidentally do this solely with the extension), the extension will not be able to parse the input, so the filter will be ignored.
3. The interaction between normal search terms (whatever you put in the search bar that's not a filter) is a little bit awkward, but I think I handled it as gracefully as possible given that the filters are contained within the search bar, not in their own parameters like the normal filters such as genre, language, etc.

## License

Distributed under the MIT License. See `LICENSE` for more information.

# Contact info

For any questions contact me at nickcothrandev@gmail.com
