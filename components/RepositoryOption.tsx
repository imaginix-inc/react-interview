import { FC } from 'react'
import { Combobox } from '@headlessui/react'
import {
  ChipIcon,
  InboxInIcon,
  ShareIcon,
  StarIcon,
} from '@heroicons/react/outline'
import { classNames } from './Example'
import Image from 'next/image'

const RepositoryOption: FC = () => {
  return (
    <Combobox.Option
      value={'repository'}
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
            <ChipIcon
              className={classNames(
                'h-5 w-5 flex-none',
                active ? 'text-white' : 'text-gray-200'
              )}
              aria-hidden="true"
            />
            <span className="ml-1 font-bold flex-auto truncate">仓库名</span>
          </header>

          <footer className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Owner */}
              <span className="flex items-center space-x-1">
                <span className="w-4 h-4 rounded-full overflow-hidden">
                  <Image
                    src={'https://avatars.githubusercontent.com/u/10830749?v=4'}
                    alt="User Avatar"
                    layout="responsive"
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
                <InboxInIcon className="w-4 h-4" />
                <span>99 issues</span>
              </span>
              {/* Forks */}
              <span className="flex items-center space-x-0.5">
                <ShareIcon className="w-4 h-4" />
                <span>211 forks</span>
              </span>
            </div>
          </footer>
        </>
      )}
    </Combobox.Option>
  )
}

export default RepositoryOption
