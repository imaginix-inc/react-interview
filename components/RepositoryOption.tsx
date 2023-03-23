import React from 'react'
import { Combobox } from '@headlessui/react'
import Image from 'next/image'
import { classNames } from '../lib/utils'
import {
  CpuChipIcon,
  StarIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline'

export function RepositoryOption() {
  return (
    <Combobox.Option
      value={'repository_name'}
      className={({ active }) =>
        classNames(
          'flex flex-col cursor-default select-none justify-center px-4 py-2 space-y-1.5',
          active ? 'bg-indigo-300/20 text-white' : 'text-gray-300'
        )
      }
    >
      {({ active }) => (
        <>
          <header className="flex items-center">
            <CpuChipIcon
              className={classNames(
                'h-5 w-5 flex-none',
                active ? 'text-white' : 'text-gray-200'
              )}
              aria-hidden="true"
            />
            <span className="ml-1 font-bold flex-auto truncate">Repo name</span>
          </header>

          <footer className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Owner */}
              <span className="flex items-center space-x-1">
                <span className="w-4 h-4 rounded-full overflow-hidden">
                  <Image
                    src={'https://avatars.githubusercontent.com/u/10830749?v=4'}
                    alt="User Avatar"
                    width={100}
                    height={100}
                  />
                </span>
                <span className="font-medium">CaliCastle</span>
              </span>
              {/* Language */}
              <span className="flex items-center space-x-1">
                <span className="block w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="font-medium">TypeScript</span>
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              {/* Stargazers */}
              <span className="flex items-center space-x-0.5">
                <StarIcon className="w-4 h-4" />
                <span>195 stars</span>
              </span>
              {/* Issues */}
              <span className="flex items-center space-x-0.5">
                <ViewfinderCircleIcon className="w-4 h-4" />
                <span>99 issues</span>
              </span>
              {/* Forks */}
              <span className="flex items-center space-x-0.5">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M752 100c-61.8 0-112 50.2-112 112 0 47.7 29.9 88.5 72 104.6v27.6L512 601.4 312 344.2v-27.6c42.1-16.1 72-56.9 72-104.6 0-61.8-50.2-112-112-112s-112 50.2-112 112c0 50.6 33.8 93.5 80 107.3v34.4c0 9.7 3.3 19.3 9.3 27L476 672.3v33.6c-44.2 15-76 56.9-76 106.1 0 61.8 50.2 112 112 112s112-50.2 112-112c0-49.2-31.8-91-76-106.1v-33.6l226.7-291.6c6-7.7 9.3-17.3 9.3-27v-34.4c46.2-13.8 80-56.7 80-107.3 0-61.8-50.2-112-112-112zM224 212a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0zm336 600a48.01 48.01 0 0 1-96 0 48.01 48.01 0 0 1 96 0zm192-552a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
                </svg>
                <span>211 forks</span>
              </span>
            </div>
          </footer>
        </>
      )}
    </Combobox.Option>
  )
}
