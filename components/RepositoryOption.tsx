/*
 * @Author: 吴华彬
 * @Date: 2024-01-09 14:06:05
 * @LastEditTime: 2024-01-09 21:11:13
 * @LastEditors: 吴华彬
 * @Note: 
 */
import React from 'react'
import { Combobox } from '@headlessui/react'
import Image from 'next/image'
import { classNames } from '../lib/utils'
import {
  CpuChipIcon,
  StarIcon,
  ViewfinderCircleIcon,
} from '@heroicons/react/24/outline'
import type {Repository} from './Example'
function nFormatter(num:number, digits?:number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function RepositoryOption({data}:{data:Repository}) {
  
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
            <span className="ml-1 font-bold flex-auto truncate">{data.name}</span>
          </header>

          <footer className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Owner */}
              <span className="flex items-center space-x-1">
                <span className="w-4 h-4 rounded-full overflow-hidden">
                  <Image
                    src={data.owner.avatar_url}
                    alt="User Avatar"
                    width={100}
                    height={100}
                  />
                </span>
                <span className="font-medium">{data.owner.login}</span>
              </span>
              {/* Language */}
              <span className="flex items-center space-x-1">
                <span className="block w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="font-medium">{data.language}</span>
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              {/* Stargazers */}
              <span className="flex items-center space-x-0.5">
                <StarIcon className="w-4 h-4" />
                <span>{nFormatter(data.stargazers_count)} stars</span>
              </span>
              {/* Issues */}
              <span className="flex items-center space-x-0.5">
                <ViewfinderCircleIcon className="w-4 h-4" />
                <span>{nFormatter(data.open_issues_count)} issues</span>
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
                <span>{nFormatter(data.forks_count)} forks</span>
              </span>
            </div>
          </footer>
        </>
      )}
    </Combobox.Option>
  )
}
