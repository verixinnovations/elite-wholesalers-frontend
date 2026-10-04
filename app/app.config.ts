export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: 'primary',
      neutral: 'neutral',
      secondary: 'secondary'
    },
    button: {
      base: 'cursor-pointer font-semibold! rounded-4xl',
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'dark:text-white'
        }
      ],
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    },
    badge: {
      base: 'cursor-pointer',
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'dark:text-white'
        }
      ],
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    },

    input: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-full border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ]
      },
      variants: {
        size: {
          lg: { base: 'px-4 py-2 text-base gap-2 w-full' }
        }
      },
      defaultVariants: { size: 'lg' }
    },
    inputMenu: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-full border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ]
      },
      variants: {
        size: {
          lg: { base: 'px-4 py-2 text-base gap-2 w-full' }
        }
      },
      defaultVariants: { size: 'lg' }
    },

    inputNumber: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-full border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        increment: 'absolute !hidden items-center',
        decrement: 'absolute !hidden items-center'
      },

      variants: {
        orientation: {
          vertical: {
            increment: 'hidden top-0 end-0 pe-1 [&>button]:py-0 scale-80',
            decrement: 'hidden bottom-0 end-0 pe-1 [&>button]:py-0 scale-80'
          }
        },

        size: {
          xl: 'px-5 py-4 text-base gap-2',
          md: 'py-2 text-sm gap-2'
        }
      },

      compoundVariants: [
        {
          orientation: 'horizontal',
          size: 'xl',
          class: 'pe-2 px-2.5'
        },
        {
          orientation: 'horizontal',
          size: 'md',
          class: 'pe-2 px-2.5'
        }
      ],
      defaultVariants: {
        size: 'xl',
        color: 'primary',
        variant: 'outline'
      }
    },

    selectMenu: {
      slots: {
        base: [
          'gap-2 w-full rounded-full border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
        // item: [
        //   'group text-base font-medium hide-scrollbar border-b border-neutral-950 dark:border-neutral-200'
        // ]
      },
      variants: {
        size: {
          lg: { base: 'px-4 py-2 text-base gap-2' }
        }
      },
      defaultVariants: { size: 'lg' }
    },
    select: {
      slots: {
        base: [
          'gap-2  rounded-full border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors'
        ],
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      },
      variants: {
        size: {
          lg: { base: 'px-4 py-2 text-base gap-2' }
        }
      },
      defaultVariants: { size: 'lg' }
    },

    radioGroup: {
      slots: {
        item: 'my-1',
        label: 'block font-normal text-base'
      }
    }
  }
})
