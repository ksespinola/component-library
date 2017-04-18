import React from 'react';
import { render } from 'react-dom'; // eslint-disable-line

import Header from '../src';

const headerImg = 'http://www.antolsun.com/wp-content/uploads/2014/08/ant-dota-2-takimi-kesl-300x130.jpg';
const i18n =
  {
    account_and_profile: 'Account & Profile',
    announcements: 'Announcements',
    app_marketplace_tool_tip: "Explore Procore's App Marketplace",
    back_to_company: 'Back to Company',
    change_company: 'Change',
    current_company: 'Current Company',
    favorites: 'Favorites',
    help_tool_tip: 'Support & Feedback',
    home: 'Home',
    logout: 'Logout of Procore',
    no_items_message: 'No Projects Found',
    no_recent_items: 'No Recent Projects',
    search_list_header: 'Projects',
    search_projects_placeholder: 'Search Portfolio...',
    see_all_announcements: 'See All Announcements',
    select_project: 'Select a Project',
    select_tool: 'Select a tool',
    style_guide: 'Style Guide',
    super_user: 'Super User',
    toolbox: 'Toolbox',
    product_lines: {
      core: 'Core',
      custom: 'Custom',
      financials: 'Construction Financials',
      pre_con: 'Pre-Con',
      project_management: 'Project Management',
      quality_safety: 'Quality & Safety',
      super: 'Super'
    },
    marketplace_dropdown: {
      app_marketplace: {
        description: 'Plug in to more ways to connect your projects.',
        title: 'APP MARKETPLACE'
      },
      builders_club: {
        description: 'Get rewarded inside the most exclusive Procore VIP club, built for professionals like you.',
        title: 'BUILDER’S CLUB'
      },
      jobsite: {
        description: 'Covering construction’s important stuff.  News, views, and the Construction Health Indicator.',
        title: 'JOBSITE'
      }
    }
  };

render(
  <Header {...{ i18n, headerImg }} />,
  window.document.getElementById('root'),
);
