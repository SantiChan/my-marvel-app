# Marvel WebApp

This project has been created with `"next": "15.1.6"` and `"react":  "^19.0.0"`.

This is a [Next.js]project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Dev info

Marvel project to show and collect Characters of marvel ( in this case Dargon ball ).

The project was developed using the React framework, `Next.js`, and the styles are based on `CSS modules` for each component with the Sass preprocessor.

We developed a `hexagonal architecture` with layers to separate the business logic from the layers that interact with the data, maintaining consistency, cleanliness, order, and security in our code, making it easily scalable even for large-scale projects.

For `HTTP requests`, we use `fetch` calls with asynchronous functions and handle errors conveniently. All of this is done from the infrastructure layer of our application.

We also make use of `API routes` alongside the hexagonal architecture to create a route of endpoints into our app that facilitates development and code readability.

For `unit testing`, we use Jest to ensure the correct functionality of our application.

### Setup environment

- Install dependencies and run the development server:

```bash
    $ nvm use
    $ npm install
    $ npm run dev
```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Folder Architecture (Components)

- `src` contains all the application source code

    - `src/components` contains all the React components used to render UI
        - `src/components/CharacterList` contains the `CharacterList` component, where the list of characters is displayed.
        - `src/components/CharacterCard` contains the `CharacterCard` component, which displays the individual character cards.
        - `src/components/Header` contains the `Header` component, responsible for rendering the navigation and other top-level UI elements.
        - `src/components/SearchBar` contains the `SearchBar` component used for searching characters.
    - `src/context` contains all the React contexts and providers for global state management
        - `src/context/FavoritesContext` manages the user's favorite characters and their display preferences (like whether to show only favorites).
    - `src/pages` contains all the page components, typically associated with routing in Next.js
        - `src/pages/index.tsx` is the main entry point of the application.
    - `src/styles` contains global styles and SCSS files
        - `src/styles/global.scss` contains the global styles for the app, likely importing base styles and configurations.
    - `src/utils` contains utility functions used throughout the app, such as helpers for data formatting or common functions.
    - `src/api` contains API routes for the application (using Next.js API routes)
    - `src/api/characters.ts` contains the API route logic to fetch characters.
    - `src/api/characters/[id].ts` contains dynamic API routes to fetch a single character's details based on the `id`.

    The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

### Project Folder Hexagonal architecture

- `src` contains all the application source code
    - `src/domain` contains the domain logic, such as models and services.
        - `src/domain/character.ts` could define character-related types or models.
        - `src/domain/characterApi.ts` could contain logic to fetch character data from an API.
    - `src/infra` contains infrastructure code like repositories, mappers, and API interactions
        - `src/infra/dtos` contains Data Transfer Object classes used to map API data to application models.
        - `src/infra/mappers` contains logic to map between domain models and DTOs (e.g., from API response to character models).
        - `src/infra/CharacterApiRepository.ts` contains the repository for fetching characters from an API.
    - `src/test` contains all the test files
        - `src/test/components` contains tests for UI components (e.g., `CharacterCard.test.tsx`).
        - `src/test/pages` contains tests for Next.js pages (e.g., testing routes like `characters/[id].tsx`).
        - `src/test/api` contains tests for the API routes (`characters.ts`, `characters/[id].ts`).

### Best practices

This project uses `eslint`, `prettier` and `commitlint` to ensure good practices when programming and adding changes to the code.

It is automatically configured after running the `yarn install` script.

It is also recommended to use the @recommended vscode plugins that have been left enabled in the project.

## Test instructions

Unit testing of components, contexts and pages in the application

- Install dependencies and run the development server:

```bash
    $ npm run test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Prod instructions

Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

```

```
