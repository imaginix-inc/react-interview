import React from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { RepositoryOption } from './RepositoryOption'
import { FaceSmileIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

// Define attributes of Repository which the search result presents
export type Repository = {
  id: string
  name: string
  full_name: string
  open_issues_count: number
  stargazers_count: number
  forks_count: number
  url: string
  language: string
  owner: {
    login: string
    avatar_url: string
  }
}

// The list that contains the repositories
type APIResponse = { items: Repository[] }

export default function CoreFunction() {
  // Control the Transition showing
  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setOpen(true)
      }, 500)
    }
  }, [open])

  // The raw query that user inputs
  const [rawQuery, setRawQuery] = React.useState('')
  // The query after filter
  const query = rawQuery.toLowerCase().replace(/^[#>]/, '')
  // Hints when there is nothing to show
  const [result, setResult] = React.useState('No result');

  // Error info for the search function
  const [error, setError] = React.useState(null);
  // The list contains repository item after mapping to Repository Type
  const [filteredItems, setFilteredItems] = React.useState<APIResponse>({ items: [] });

  /**
   * We have 'search' api under 'api' folder, we need to use that to do the search function
   * Here, we pass the 'query' to it and get response from it
   * Then we map and filter the responses to get the desired data
   * At the same time, we need to consider errors
   */
  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.items && data.items.length > 0) {
        setError(null);
        const filteredRepositories: Repository[] = data.items.map(mapToRepositoryType);
        setFilteredItems({ items: filteredRepositories });
      } else {
        // Handle the case when data.items is empty
        /**
         * Note: The REST API has a custom rate limit for searching. 
         * For authenticated requests, you can make up to 30 requests per minute for all search endpoints except for the "Search code" endpoint. 
         * The "Search code" endpoint requires you to authenticate and limits you to 10 requests per minute. 
         * For unauthenticated requests, the rate limit allows you to make up to 10 requests per minute.
         */
        setResult('No items found or reach rate limit');
        setFilteredItems({ items: [] });
      }
    } catch (error) {
      console.error('Fail to search repository due to error', error)
    }
  };

  /**
   * Function that maps each item in the json result to Repository data type
   * @param item each item in the json response
   * @returns a Repository object
   */
  const mapToRepositoryType = (item: any): Repository => {
    return {
      id: item.id.toString(),
      name: item.name || '',
      full_name: item.full_name || '',
      open_issues_count: item.open_issues_count || 0,
      stargazers_count: item.stargazers_count || 0,
      forks_count: item.forks_count || 0,
      url: item.html_url || '',
      language: item.language || '',
      owner: {
        login: item.owner?.login || '',
        avatar_url: item.owner?.avatar_url || '',
      },
    };
  };


  // Define a debounce function type
  type DebounceFunction = (callback: () => void, delay: number) => () => void;

  /**
   * Considering Github search api Rate limit, and the user friendly.
   * We set a debounce function for the search function so that 
   * it can response and returns search data instantly based on user input, 
   * while preventing excessive calls to search methods.
   * @param callback callback function
   * @param delay delay time
   * @returns a debounce function
   */
  const useDebounce: DebounceFunction = (callback, delay) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      timeoutRef.current = setTimeout(() => {
        callback();
        timeoutRef.current = null;
      }, delay);
    };
  };

  /**
   * As mentioned above, we define the customized search function,
   * and we can adjust the delay time based on real business
   */
  const delayedQueryFunction = useDebounce(() => {
    handleSearch();
  }, 300); // 300ms (0.3 second) delay

  /**
   * Whenever the query entered by the user changes, go ahead and call this search method
   */
  React.useEffect(() => {
    if (typeof query === 'string' && query.trim() !== '') {
      // Query is not an empty string
      delayedQueryFunction()
    }
  }, [query])

  /**
   * Open the repository github url
   * @param url the repository url that the user selected
   */
  const openRepositoryUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Transition.Root
      show={open}
      as={React.Fragment}
      afterLeave={() => setRawQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-2xl shadow-slate-300/10 bg-slate-900/70 shadow-2xl ring-1 ring-sky-500 ring-opacity-5 backdrop-blur-xl backdrop-filter transition-all">
              <Combobox
                value=""
                onChange={(item) => {
                  console.info('You have selected', item)
                  if (item) {
                    const repositoryUrl = item;
                    openRepositoryUrl(repositoryUrl);
                  }
                }}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm focus:outline-0"
                    placeholder="Search GitHub repos..."
                    onChange={(event) => {
                      setRawQuery(event.target.value)
                      delayedQueryFunction()
                    }}
                  />
                </div>

                <Combobox.Options
                  static
                  className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                >
                  <li>
                    <h2 className="text-xs font-semibold text-gray-200">
                      Repositories
                    </h2>
                    <ul className="-mx-4 mt-2 text-sm text-gray-700 space-y-0.5">
                      {filteredItems && filteredItems.items && filteredItems.items.length !== 0 ? ( filteredItems.items.map((repository) => (
                        <RepositoryOption key={repository.id} repository={repository} />
                      ))) : (
                        <span className="flex flex-wrap justify-center items-center">{result}</span>
                      )}
                    </ul>
                  </li>
                </Combobox.Options>
                <span className="flex flex-wrap items-center bg-slate-900/20 py-2.5 px-4 text-xs text-gray-400">
                  <FaceSmileIcon className="w-4 h-4 mr-1" />
                  Welcome to Zolplay&apos;s React Interview Challenge.
                </span>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
