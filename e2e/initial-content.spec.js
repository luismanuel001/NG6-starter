import HomePage from './pages/home';

describe('Initial content', () => {
    let homePage;

    beforeAll(async() => {
        homePage = new HomePage();

        console.log('Loading the Home page...');
        await homePage.load();
    });

    it('should load navbar with correct title', async() => {
        const navbarTitle = await homePage.getNavbar();
        expect(navbarTitle).toEqual('Spotify Album Search');
    });

    describe('Spotify Search Box', () => {
        it('should be visible', async() => {
            const isVisible = await homePage.spotifySearch.isVisible();
            expect(isVisible).toBe(true);
        });

        it('should have correct placeholder', async() => {
            const actualPlaceholderText = await homePage.spotifySearch.getPlaceholderText();
            expect(actualPlaceholderText).toEqual('Type Album or Artist');
        });
    });

    describe('Search Results list', () => {
        it('should not be visible', async() => {
            const isVisible = await homePage.spotifySearch.isResultsContainerVisible();
            expect(isVisible).toEqual(false);
        });
    });
});