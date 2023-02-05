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
    },
    {
        id: 6,
        version: 2.3,
        title: 'Add optional ratios',
        info: 'Added new table in month overview. The table displays the 50/30/20 rule being applied to income and potential income.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/34'
    },
    {
        id: 7,
        version: 2.4,
        title: 'Add user sign in',
        info: 'Added login and sign up page. Users can now login to their account and are logged out when their token expires. Aso, the user can sign up and create an account for the website.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/13'
    },
    {
        id: 8,
        version: 2.5,
        title: 'Move from local storage to database',
        info: 'Added database persistence. The user can now add, update, and delete data per usual but the data is now persistent through multiple devices.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/12'
    },
    {
        id: 9,
        version: 2.6,
        title: 'Updated rules for database authentication',
        info: 'Added rules to firebase database read and write access. Updated the APIs to pass authentication token to allow read and write.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/41'
    },
    {
        id: 10,
        version: 2.7,
        title: 'Authentication/Authorization enhancements',
        info: 'Added link to login in to allow users to reset their password if forgotten. Added new page for user to access account information. In said page, the user is able to update their password after logging in.',
        link: 'https://github.com/jxm8022/Net_Budget/issues/45'
    },
]

export default versionHistory;