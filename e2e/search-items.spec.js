import HomePage from './pages/home';

describe('Searching for', () => {
    let homePage;
    let searchText;

    beforeAll(async() => {
        homePage = new HomePage();

        console.log('Loading the Home page...');
        await homePage.load();
    });

    describe('word mu', () => {
        beforeEach(async() => {
            searchText = 'mu';
            await homePage.spotifySearch.type(searchText);
        });

        it('should not trigger the search', async() => {
            const isVisible = await homePage.spotifySearch.isResultsContainerVisible();
            expect(isVisible).toBe(false);
        });
    });

    describe('word muse', () => {
        beforeEach(async() => {
            searchText = 'muse';
            await homePage.spotifySearch.type(searchText);
        });

        it('should show Top Tab active as default', async() => {
            const isActive = await homePage.spotifySearch.isTopTabActive();
            expect(isActive).toBe(true);
        });

        it('should show artist results on the Top Tab', async() => {
            const count = await homePage.spotifySearch.getTopTabArtistsCount();
            expect(count).toBeGreaterThan(0);
        });

        it('should show album results on the Top Tab', async() => {
            const count = await homePage.spotifySearch.getTopTabAlbumsCount();
            expect(count).toBeGreaterThan(0);
        });

        describe('and clicking on Artists -> More artists...', () => {
            beforeAll(async() => {
                await homePage.spotifySearch.clickArtistsTab();
            });

            it('should switch to the Artists Tab', async() => {
                const isActive = await homePage.spotifySearch.isArtistsTabActive();
                expect(isActive).toBe(true);
            });

            it('should show artist results', async() => {
                const count = await homePage.spotifySearch.getArtistsTabArtistsCount();
                expect(count).toBeGreaterThan(0);
            });

        });

        describe('and clicking on Albums -> More albums...', () => {
            beforeAll(async() => {
                await homePage.spotifySearch.clickAlbumsTab();
            });

            it('should switch to the Albums Tab', async() => {
                const isActive = await homePage.spotifySearch.isAlbumsTabActive();
                expect(isActive).toBe(true);
            });

            it('should show albums results', async() => {
                const count = await homePage.spotifySearch.getAlbumsTabAlbumsCount();
                expect(count).toBeGreaterThan(0);
            });

        });
    });
});