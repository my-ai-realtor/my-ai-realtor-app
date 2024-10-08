// /imports/ui/pages/dashboard/dashboardConfig.js
import Chat from './Chat';
import _Blank from './_Blank';

export const dashboardConfig = {
  navItems: [
    { id: 'propertySearch', label: 'Property Search', path: 'property-search', component: _Blank },
    { id: 'inspection', label: 'Inspection', path: 'inspection', component: _Blank },
    { id: 'financing', label: 'Financing', path: 'financing', component: _Blank },
    { id: 'closing', label: 'Closing', path: 'closing', component: _Blank },
    { id: 'chat', label: 'Chat', path: 'chat', component: Chat },
  ],
};
