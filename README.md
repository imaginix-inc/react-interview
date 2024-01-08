# Zolplay React Interview Challenge

## About

In this exercise, we will be building a simple React app that will allow us to search for GitHub repositories and display the results.

The project is bootstrapped with [Next.js](https://nextjs.org/).

## Tech Stack
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)

## Set up for development

```bash
pnpm i
pnpm dev
```

## Do the interview question

1. Fork it
2. Push the code to your own branch

## Description of my changes

### GitHub Repository Search Implementation

In this project, I assume our goal is to implement the GitHub repository search functionality in the front-end interface. We aim to utilize the existing search API method to facilitate the search process and display the results seamlessly.

#### Project Overview

1. **Search API Integration**: The existing search API method will be used to fetch GitHub repositories based on user input. This integration ensures real-time results as the user types.

2. **User Interface Interaction**: As the user enters text into the search input, the application dynamically calls the search API, retrieves a list of GitHub repositories, and displays the results.

3. **Repository Display**: Each search result is represented using the `RepositoryOption.tsx` template. This template is responsible for rendering the details of each GitHub repository.

4. **Repository Navigation**: Users can click on any repository displayed in the search results to navigate to the corresponding GitHub repository.

#### Assumptions

- The backend provides a functional search API that requires no modifications for the purposes of this implementation.
  
- `RepositoryOption.tsx` is considered a pre-existing template to render each search result, and no alterations are made to it during this implementation.

- The primary code changes are concentrated in `Example.tsx`. There is no significant code refactoring, and the existing component structure is retained.

#### Implementation Details

1. **Dynamic API Calls**: The `Example.tsx` file orchestrates dynamic API calls as the user inputs text. This ensures that search results are updated in real-time, enhancing the user experience. I changed its name as `CoreFunction.tsx`. The search functionality is distinguished by its capability to swiftly and dynamically invoke the SEARCH method in response to user input, delivering prompt and accurate results. To circumvent the potential issue of excessive API calls within a condensed timeframe due to rapid user input, a debounce mechanism has been implemented. This ensures an optimized search process without compromising system performance. Additionally, users have the convenience of navigating to the relevant repository website by simply clicking on a repository listed in the search results.
An important consideration is the presence of a rate limit within the GitHub Search API. Users should be aware that surpassing this limit may result in usage constraints.

2. **Repository Rendering**: The `RepositoryOption.tsx` template is utilized to render each GitHub repository in the search results. I modified and replaced those hardcode text with variables.

3. **Navigation Handling**: Clicking on a repository in the search results triggers navigation to the corresponding GitHub repository. This enhances usability and provides a seamless transition for users.

#### Getting Started (Same as original project)

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application using `npm run dev`.
4. Open the application in your preferred web browser.

#### Usage

1. Enter your search query into the provided search input.
2. View the dynamically updated search results.
3. Click on a repository to navigate to its GitHub page.