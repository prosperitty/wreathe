'use client'

import { Transition, Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import React, { useState, Fragment, useEffect } from 'react'

export default function Modal({
  children,
  threadType,
}: {
  children: React.ReactNode
  threadType: String
}) {
  let [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!isOpen) {
      return router.back()
    }
  }, [isOpen, router])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 text-left align-middle shadow-xl transition-all'>
                <div className='flex items-center justify-between p-4 border-b'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900 dark:text-white'
                  >
                    Compose A {threadType}
                  </Dialog.Title>
                  <button
                    onClick={() => router.back()}
                    className='p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:dark:bg-gray-600'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-5 h-5 mx-auto'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
