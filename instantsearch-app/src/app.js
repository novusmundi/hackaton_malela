const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'MJX6I9X1WO',
  '57391ee3c0f7d6d918685b944f611144'
);

const search = instantsearch({
  indexName: 'artist',
  searchClient,
  future: { preserveSharedStateOnUnmount: true },
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: (hit, { html, components }) => html`
        <article>
          <img src=${hit.image_url} alt=${hit.name} />
          <div>
            <h1>${components.Highlight({ hit, attribute: 'name' })}</h1>
            <p>${components.Highlight({ hit, attribute: 'birth_city' })}</p>
            <p>${components.Highlight({ hit, attribute: 'birth_year' })}</p>
          </div>
        </article>
      `,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
