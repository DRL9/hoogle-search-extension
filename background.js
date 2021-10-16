const BASE_URL = "https://hoogle.haskell.org/";
const SEARCH_URL = `${BASE_URL}`;

// Provide help text to the user.
browser.omnibox.setDefaultSuggestion({
    description: `Search Hoogle
    (e.g. "and")`
});

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
    addSuggestions([])
});

// Open the page based on how the user clicks on a suggestion.
browser.omnibox.onInputEntered.addListener((text, disposition) => {
    let url = text;
    url = `${SEARCH_URL}?hoogle=${text}`;
    switch (disposition) {
        case "currentTab":
            browser.tabs.update({ url });
            break;
        case "newForegroundTab":
            browser.tabs.create({ url });
            break;
        case "newBackgroundTab":
            browser.tabs.create({ url, active: false });
            break;
    }
});