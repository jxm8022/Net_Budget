const versionHistory = [
    {
        id: 0,
        version: 1.0,
        title: 'Initial release',
        info: 'Created the base budgeting app.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/16'
    },
    {
        id: 1,
        version: 1.1,
        title: 'Fixed bug: Dates are not sorted after update',
        info: 'Fixed bug where when updating a transaction does not sort the transaction table leaving earlier dates after later dates.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/26'
    },
    {
        id: 2,
        version: 1.2,
        title: 'Code fix: Refactored reducer to use utility function',
        info: 'Edited the code to update adding a transaction to use a function used to find the amount of nets. It makes the code readable.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/18'
    },
    {
        id: 3,
        version: 2.0,
        title: 'Added feature: about page',
        info: 'Added a new page to the website, the about page. The page shows more information of the website and includes a developer portion at the bottom.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/25'
    },
    {
        id: 4,
        version: 2.1,
        title: 'Added feature: pie chart',
        info: 'Added a new chart, the pie chart. In month overview, the user can now see the percentages of needs, wants, and savings/debts. It can be toggled on and off with the button and the pie chart (to hide it).',
        link: 'https://github.com/jxm8022/Net_Budget/issues/24'
    },
    {
        id: 5,
        version: 2.2,
        title: 'Added feature: QoL updates',
        info: 'Added new updates to improve the overall feel of the website. Added dark and light mode styling, added page to hold versions of this application, and updated icons to match light and dark mode.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/27'
    }

]

export default versionHistory;