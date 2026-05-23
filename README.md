# osu! Extra Filters

![Demo Image 1](/.github/images/screenshot1.png)

An interactive filter selector for the [osu! beatmap search](https://osu.ppy.sh/beatmapsets) that adds the hidden osu! filters. Osu!'s beatmap search has many filters such as stars>5, artist="", etc. that are normally hidden from the user \([Read about them here](https://osu.ppy.sh/wiki/en/Beatmap_search)\). This extension aims to make those filters easy to use with no pre-existing knowledge required. It does this by expanding the user tags menu into a full-fledged filters menu, containing nearly all of the hidden filters.

## How to run:

1. Clone the repository:
   `git clone https://github.com/artizard/extraOsuFilters`
2. Go into the repository's directory
   `cd extraOsuFilters`
3. Install libaries
   `npm install`
4. Run extension
   `npm run dev`
5. Load the extension in chrome by going to manage extension, click "Load unpacked", and choosing the dist folder that was created from the previous command.

## Contributing

Contributions are welcome, if you are interested in working on this, pull requests are appreciated. Even if you don't want to actually work on it, feel free to open issues for bug reports or suggestions.

## Limitations

1. There are a few filters I did not include in the extension, but I left them out for a reason:

- featured_artist : It's a very niche filter, and it's hard to use without already knowing these identifiers (which is an arbitrary number). I figured it wasn't worth bloating the extension with it. If there's demand I can add it.
- divisor : In my testing I was not able to figure out how to use the filter; it may be defunct. If someone knows how, I could add that in the future.
- status : This is effectively the same as the normal "Categories" filter already on the page, so this one is redundant.

2. This extension only supports singular filters like </<=/>/>=/=, as well as range values. This realistically covers all use cases for these filters, but just know that the filter cannot handle cases where the user gives a query like "stars>5 stars=3 stars<=7". In the case that the user inputs this (manually, you cannot accidentally do this solely with the extension), the extension will not be able to parse the input, so the filter will be ignored.
3. The interaction between normal search terms (whatever you put in the search bar that's not a filter) is a little bit awkward, but I think I handled it as gracefully as possible given that the filters are contained within the search bar, not in their own parameters (like the normal filters such as genre, language, etc).

## Potential improvements for the future

- It's somewhat unclear at first glance whether a filter is being edited or is just a saved filter; I think that UI could be improved.
- There's no proper handling for if the user inputs three of the same filter (eg. stars=5 stars>6 stars<8), there needs to be some way of warning the user. I tried using alerts, but I found that annoying from the user's perspective, so for now it is just a console warning.
- When refreshing the page, you'll see the tag icon for a split second before it gets changed to the filter icon. I'm not sure how to fix that, but that would be a good fix even if it's a pretty minor thing.
- The tab the user selected is not saved if the user closes the menu and comes back, it always defaults to "map info".

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact info

For any questions contact me at nickcothrandev@gmail.com
