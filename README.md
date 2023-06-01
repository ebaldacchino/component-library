# Component Library

Ever tried to use a library and realised there's a never ending amount of complexity and hoops to jump through every time it doesn't support your use case? Welcome to my inspiration for this component library. The purpose is to have something that's hopefully simple, lean, semantic and easily extendable. It may sound too good to be true, and most probably is. Anyway, the worst-case scenario is that it looks good on my portfolio, I gain a tonne of knowledge, and it makes handling the UI easier in my future projects.

The intention is to follow a path that's somewhat in accordance with [component driven development](https://www.componentdriven.org/). Therefore, I will start off with the essentials, the building blocks of other components, and increase complexity from there. For example:

-   `Input` is required for `TextField` and `Autocomplete`
-   `Portal` is required for `Modal` and `Dialog`
-   `Spinner` is required for `Button`
    The main exception is if there is anything else that I've already done, or appears simple and quick to add (provided that it's precursors are completed).

FYI, I'd refrain from basing anything off this as long as this message is here. I will rebase frequently until the library matures.

When styling and testing are more finalised, I will squash the additions into each feature's commit, as is appropriate. I'm currently styling using CSS modules. The plan is to use `@emotion/styled`. I have looked at build time CSS-in-JS (something like Linaria). The issue is that I will most likely wait until that particular library, or one of it's rivals, gains a wider share of the market.

I will also add testing for each component, just unsure as to what testing for components entails yet. The main libraries I intend to look at are _Jest_ and _React Testing Library_.

## Roadmap (not in chronological order)

-   Alert
-   Autocomplete
-   Avatar
-   Badge
-   Button ✔
-   Card
-   ClickAwayListener
-   Checkbox
-   CheckboxField
-   Chip
-   DataGrid
-   DatePicker
-   DateRangePicker
-   DateTimePicker
-   Dialog
-   Drawer
-   FilePicker
-   FocusTrap
-   FormControl
-   ImagePreview
-   Input
-   Modal
-   Popover
-   Popper
-   Portal
-   Select
-   Snackbar
-   Spinner
-   Switch
-   Textarea
-   TextField
-   Tooltip

_So I don't have to remember the unicodes_ ✔❔

https://www.webfx.com/tools/emoji-cheat-sheet/
